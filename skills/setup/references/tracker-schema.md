# v1 Tracker Schema (`/setup` Step 2)

Regardless of import path, the result must be a valid `threads_daily_tracker.json` in this shape. Template reference: Glob `**/templates/tracker-template.json`.

---

```json
{
  "schema_version": 1,
  "account": {
    "handle": "@example",
    "source": "api",
    "timezone": "Asia/Bangkok"
  },
  "posts": [
    {
      "id": "post_id",
      "text": "Post content",
      "created_at": "ISO timestamp",
      "permalink": "",
      "media_type": "TEXT",
      "is_reply_post": false,
      "content_type": "opinion",
      "topics": ["threads", "growth"],
      "hook_type": null,
      "ending_type": null,
      "emotional_arc": null,
      "word_count": null,
      "paragraph_count": null,
      "posting_time_slot": null,
      "algorithm_signals": {
        "discovery_surface": {
          "threads": null,
          "instagram": null,
          "facebook": null,
          "profile": null,
          "topic_feed": null,
          "other": null
        },
        "topic_graph": {
          "topic_tag_used": null,
          "topic_tag_count": null,
          "topic_match_clarity": null,
          "single_topic_clarity": null,
          "bio_topic_match": null
        },
        "topic_freshness": {
          "semantic_cluster": null,
          "similar_recent_posts": null,
          "recent_cluster_frequency": null,
          "days_since_last_similar_post": null,
          "freshness_score": null,
          "fatigue_risk": null
        },
        "originality_risk": {
          "caption_content_mismatch": null,
          "hashtag_stuffing_risk": null,
          "duplicate_cluster_risk": null,
          "minor_edit_repost_risk": null,
          "low_value_reaction_risk": null,
          "fake_engagement_pattern_risk": null
        }
      },
      "psychology_signals": {
        "hook_payoff": {
          "hook_strength": null,
          "payoff_strength": null,
          "hook_payoff_gap": null
        },
        "share_motive_split": {
          "dm_forwardability": null,
          "public_repostability": null,
          "identity_signal_strength": null,
          "utility_share_strength": null
        },
        "retellability": null
      },
      "metrics": {
        "views": 0,
        "likes": 0,
        "replies": 0,
        "reposts": 0,
        "quotes": 0,
        "shares": 0
      },
      "performance_windows": {
        "24h": null,
        "72h": null,
        "7d": null
      },
      "snapshots": [],
      "prediction_snapshot": null,
      "review_state": {
        "last_reviewed_at": null,
        "actual_checkpoint_hours": null,
        "deviation_summary": null,
        "calibration_notes": [],
        "validated_signals": {
          "discovery_surface_notes": null,
          "topic_graph_notes": null,
          "topic_freshness_notes": null,
          "originality_risk_notes": null,
          "hook_payoff_gap_notes": null,
          "share_motive_split_notes": null,
          "retellability_notes": null
        }
      },
      "comments": [
        {
          "user": "username",
          "text": "Comment content",
          "created_at": "ISO timestamp",
          "likes": 0
        }
      ],
      "source": {
        "import_path": "api",
        "data_completeness": "full"
      }
    }
  ],
  "last_updated": "ISO timestamp"
}
```

---

## Required core fields

- `id` · `text` · `created_at` · `metrics` · `comments` · `content_type` · `topics`

## Optional enriched fields

- `hook_type` · `ending_type` · `emotional_arc` · `word_count` · `paragraph_count` · `posting_time_slot` · `performance_windows` · `snapshots` · `prediction_snapshot` · `algorithm_signals` · `psychology_signals` · `review_state` · `source`

If enriched fields are missing, leave them `null` and allow downstream modules to derive temporary values.

After import, read the file, verify it is structurally valid, and report the number of imported posts.
