#!/usr/bin/env python3
"""
AK-Threads-Booster: Build low-token compiled memory from threads_daily_tracker.json.

Usage:
    python scripts/build_compiled_memory.py --tracker threads_daily_tracker.json
    python scripts/build_compiled_memory.py --tracker threads_daily_tracker.json --output-dir compiled

Outputs:
    compiled/account_wiki.md
    compiled/post_feature_index.jsonl
    compiled/cluster_wiki.json
    compiled/exemplar_bank.md
    compiled/recent_window.md

The tracker remains the source of truth. These files are derived runtime caches.
"""

import argparse
import hashlib
import json
import re
import statistics
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple


WORD_RE = re.compile(r"[A-Za-z0-9_\-\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af\u0e00-\u0e7f]+")


def parse_iso(value: Optional[str]) -> Optional[datetime]:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed
    except ValueError:
        return None


def sort_key(post: Dict[str, Any]) -> datetime:
    return parse_iso(post.get("created_at")) or datetime.min.replace(tzinfo=timezone.utc)


def post_text(post: Dict[str, Any]) -> str:
    return str(post.get("text") or "").strip()


def word_count(text: str) -> int:
    return len(WORD_RE.findall(text))


def paragraph_count(text: str) -> int:
    return len([p for p in re.split(r"\n\s*\n|\r\n\s*\r\n", text.strip()) if p.strip()]) if text.strip() else 0


def summarize_text(text: str, limit: int = 110) -> str:
    compact = re.sub(r"\s+", " ", text).strip()
    if len(compact) <= limit:
        return compact
    return compact[: limit - 1].rstrip() + "..."


def metric(post: Dict[str, Any], name: str) -> Optional[int]:
    value = (post.get("metrics") or {}).get(name)
    if value is None:
        return None
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def views(post: Dict[str, Any]) -> int:
    return metric(post, "views") or 0


def semantic_cluster(post: Dict[str, Any]) -> Optional[str]:
    signals = post.get("algorithm_signals") or {}
    freshness = signals.get("topic_freshness") or {}
    cluster = freshness.get("semantic_cluster")
    if cluster:
        return str(cluster)
    topics = post.get("topics") or []
    if topics:
        return " / ".join(str(t).strip().lower() for t in topics[:2] if str(t).strip())
    content_type = post.get("content_type")
    return str(content_type) if content_type else None


def freshness_value(post: Dict[str, Any], field: str) -> Any:
    signals = post.get("algorithm_signals") or {}
    freshness = signals.get("topic_freshness") or {}
    return freshness.get(field)


def confidence_level(posts: List[Dict[str, Any]]) -> Tuple[str, str]:
    count = len(posts)
    with_text = sum(1 for p in posts if post_text(p))
    with_views = sum(1 for p in posts if metric(p, "views") is not None)
    if count >= 100 and with_text / max(count, 1) >= 0.9 and with_views / max(count, 1) >= 0.8:
        return "Deep", "Large tracker with strong text and metrics coverage."
    if count >= 50 and with_text / max(count, 1) >= 0.8:
        return "Strong", "Enough history for stable pattern references."
    if count >= 20 and with_text / max(count, 1) >= 0.7:
        return "Usable", "Enough posts for directional comparisons, with some gaps."
    if count >= 10:
        return "Weak", "Limited history; use comparisons cautiously."
    return "Directional", "Very small history; treat patterns as temporary."


def tracker_hash(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def shared_meta(tracker_path: Path, posts: List[Dict[str, Any]]) -> Dict[str, Any]:
    level, notes = confidence_level(posts)
    return {
        "schema_version": "1.0.0",
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "source_tracker": tracker_path.name,
        "source_tracker_hash": tracker_hash(tracker_path),
        "posts_count": len(posts),
        "confidence_level": level,
        "coverage_notes": notes,
    }


def post_feature_row(post: Dict[str, Any]) -> Dict[str, Any]:
    text = post_text(post)
    cluster = semantic_cluster(post)
    return {
        "id": post.get("id"),
        "created_at": post.get("created_at"),
        "summary": summarize_text(text),
        "text_excerpt": summarize_text(text, 180),
        "content_type": post.get("content_type"),
        "hook_type": post.get("hook_type"),
        "ending_type": post.get("ending_type"),
        "emotional_arc": post.get("emotional_arc"),
        "word_count": post.get("word_count") or word_count(text),
        "paragraph_count": post.get("paragraph_count") or paragraph_count(text),
        "topics": post.get("topics") or [],
        "semantic_cluster": cluster,
        "freshness_score": freshness_value(post, "freshness_score"),
        "fatigue_risk": freshness_value(post, "fatigue_risk"),
        "metrics": {
            "views": metric(post, "views"),
            "likes": metric(post, "likes"),
            "replies": metric(post, "replies"),
            "reposts": metric(post, "reposts"),
            "shares": metric(post, "shares"),
        },
        "source_post_id": post.get("id"),
    }


def top_posts(posts: List[Dict[str, Any]], limit: int = 10) -> List[Dict[str, Any]]:
    return sorted(posts, key=views, reverse=True)[:limit]


def median(values: Iterable[int]) -> Optional[float]:
    clean = [v for v in values if v is not None]
    if not clean:
        return None
    return float(statistics.median(clean))


def build_cluster_wiki(meta: Dict[str, Any], posts: List[Dict[str, Any]]) -> Dict[str, Any]:
    buckets: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
    for post in posts:
        buckets[semantic_cluster(post) or "uncategorized"].append(post)

    clusters = []
    now_sorted = sorted(posts, key=sort_key, reverse=True)
    recent_ids = {p.get("id") for p in now_sorted[:10]}

    for cluster, bucket in sorted(buckets.items(), key=lambda item: (-len(item[1]), item[0])):
        bucket_sorted = sorted(bucket, key=sort_key, reverse=True)
        top_bucket = top_posts(bucket, 3)
        fatigue_counts = Counter(str(freshness_value(p, "fatigue_risk") or "unknown") for p in bucket)
        common_topics = Counter()
        for post in bucket:
            for topic in post.get("topics") or []:
                if str(topic).strip():
                    common_topics[str(topic).strip().lower()] += 1
        clusters.append({
            "cluster": cluster,
            "post_count": len(bucket),
            "last_post_at": bucket_sorted[0].get("created_at") if bucket_sorted else None,
            "recent_count": sum(1 for p in bucket if p.get("id") in recent_ids),
            "median_views": median(views(p) for p in bucket),
            "top_post_ids": [p.get("id") for p in top_bucket if p.get("id")],
            "representative_post_ids": [p.get("id") for p in bucket_sorted[:3] if p.get("id")],
            "common_topics": [topic for topic, _ in common_topics.most_common(5)],
            "fatigue_risk": fatigue_counts.most_common(1)[0][0] if fatigue_counts else "unknown",
            "notes": "Derived from tracker features. Verify against source posts before making strong claims.",
        })
    return {"_meta": meta, "clusters": clusters}


def markdown_meta(meta: Dict[str, Any]) -> str:
    return (
        f"generated_at: {meta['generated_at']}\n"
        f"source_tracker_hash: {meta['source_tracker_hash']}\n"
        f"posts_count: {meta['posts_count']}\n"
        f"confidence_level: {meta['confidence_level']}\n"
        f"coverage_notes: {meta['coverage_notes']}\n"
    )


def render_account_wiki(meta: Dict[str, Any], posts: List[Dict[str, Any]]) -> str:
    recent = sorted(posts, key=sort_key, reverse=True)[:10]
    best = top_posts(posts, 10)
    content_types = Counter(str(p.get("content_type") or "unknown") for p in posts)
    topics = Counter()
    clusters = Counter()
    for post in posts:
        clusters[semantic_cluster(post) or "uncategorized"] += 1
        for topic in post.get("topics") or []:
            if str(topic).strip():
                topics[str(topic).strip().lower()] += 1

    lines = [
        "# Account Wiki",
        "",
        "> Compiled memory for low-token runtime. Tracker remains the source of truth.",
        "",
        "```yaml",
        markdown_meta(meta).rstrip(),
        "```",
        "",
        "## Account Baseline",
        f"- Historical posts indexed: {len(posts)}",
        f"- Confidence: {meta['confidence_level']} - {meta['coverage_notes']}",
        f"- Common content types: {', '.join(f'{k} ({v})' for k, v in content_types.most_common(5)) or 'unknown'}",
        f"- Common topics: {', '.join(f'{k} ({v})' for k, v in topics.most_common(8)) or 'unknown'}",
        f"- Common clusters: {', '.join(f'{k} ({v})' for k, v in clusters.most_common(8)) or 'unknown'}",
        "",
        "## Highest-Performing Reference Posts",
    ]
    for post in best[:8]:
        lines.append(f"- `{post.get('id')}` views={views(post)} cluster={semantic_cluster(post) or 'unknown'} :: {summarize_text(post_text(post), 130)}")
    lines.extend(["", "## Recent Window"])
    for post in recent:
        lines.append(f"- `{post.get('id')}` {post.get('created_at') or 'unknown'} cluster={semantic_cluster(post) or 'unknown'} :: {summarize_text(post_text(post), 110)}")
    lines.extend([
        "",
        "## Runtime Notes",
        "- Use post IDs above as provenance anchors.",
        "- If a claim matters, verify against `threads_daily_tracker.json` before treating it as strong.",
        "- Rebuild this file after `/setup`, `/refresh`, or `/review` changes the tracker.",
    ])
    return "\n".join(lines) + "\n"


def render_exemplar_bank(meta: Dict[str, Any], posts: List[Dict[str, Any]], limit: int = 20) -> str:
    selected = []
    seen = set()
    for post in top_posts(posts, limit=limit):
        pid = post.get("id")
        if pid not in seen:
            selected.append(post)
            seen.add(pid)
    for post in sorted(posts, key=sort_key, reverse=True)[:10]:
        if len(selected) >= limit:
            break
        pid = post.get("id")
        if pid not in seen:
            selected.append(post)
            seen.add(pid)

    lines = [
        "# Exemplar Bank",
        "",
        "> Capped representative posts for style and performance reference.",
        "",
        "```yaml",
        markdown_meta(meta).rstrip(),
        "```",
        "",
    ]
    for idx, post in enumerate(selected, start=1):
        lines.extend([
            f"## {idx}. `{post.get('id')}`",
            f"- created_at: {post.get('created_at') or 'unknown'}",
            f"- views: {views(post)}",
            f"- cluster: {semantic_cluster(post) or 'unknown'}",
            f"- topics: {', '.join(str(t) for t in (post.get('topics') or [])) or 'unknown'}",
            "",
            post_text(post),
            "",
        ])
    return "\n".join(lines).rstrip() + "\n"


def render_recent_window(meta: Dict[str, Any], posts: List[Dict[str, Any]], limit: int = 10) -> str:
    recent = sorted(posts, key=sort_key, reverse=True)[:limit]
    cluster_counts = Counter(semantic_cluster(p) or "uncategorized" for p in recent)
    lines = [
        "# Recent Window",
        "",
        "> Last posts for repetition and topic freshness checks.",
        "",
        "```yaml",
        markdown_meta(meta).rstrip(),
        "```",
        "",
        "## Recent Cluster Distribution",
    ]
    for cluster, count in cluster_counts.most_common():
        lines.append(f"- {cluster}: {count}")
    lines.extend(["", "## Recent Posts"])
    for post in recent:
        lines.append(f"- `{post.get('id')}` {post.get('created_at') or 'unknown'} views={views(post)} cluster={semantic_cluster(post) or 'unknown'} fatigue={freshness_value(post, 'fatigue_risk') or 'unknown'} :: {summarize_text(post_text(post), 130)}")
    return "\n".join(lines) + "\n"


def write_jsonl(path: Path, meta: Dict[str, Any], posts: List[Dict[str, Any]]) -> None:
    with path.open("w", encoding="utf-8", newline="\n") as fh:
        fh.write(json.dumps({"_meta": meta}, ensure_ascii=False) + "\n")
        for post in sorted(posts, key=sort_key, reverse=True):
            fh.write(json.dumps(post_feature_row(post), ensure_ascii=False) + "\n")


def write_outputs(tracker_path: Path, output_dir: Path) -> None:
    tracker = json.loads(tracker_path.read_text(encoding="utf-8"))
    posts = tracker.get("posts") or []
    output_dir.mkdir(parents=True, exist_ok=True)
    meta = shared_meta(tracker_path, posts)

    (output_dir / "account_wiki.md").write_text(render_account_wiki(meta, posts), encoding="utf-8", newline="\n")
    write_jsonl(output_dir / "post_feature_index.jsonl", meta, posts)
    (output_dir / "cluster_wiki.json").write_text(
        json.dumps(build_cluster_wiki(meta, posts), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )
    (output_dir / "exemplar_bank.md").write_text(render_exemplar_bank(meta, posts), encoding="utf-8", newline="\n")
    (output_dir / "recent_window.md").write_text(render_recent_window(meta, posts), encoding="utf-8", newline="\n")


def main() -> int:
    parser = argparse.ArgumentParser(description="Build low-token compiled memory from a Threads tracker.")
    parser.add_argument("--tracker", required=True, help="Path to threads_daily_tracker.json")
    parser.add_argument("--output-dir", default=None, help="Output directory. Defaults to ./compiled beside tracker.")
    args = parser.parse_args()

    tracker_path = Path(args.tracker).resolve()
    if not tracker_path.exists():
        raise SystemExit(f"Tracker not found: {tracker_path}")
    output_dir = Path(args.output_dir).resolve() if args.output_dir else tracker_path.parent / "compiled"
    write_outputs(tracker_path, output_dir)
    print(f"Compiled memory written to {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
