const sampleTracker = {
  account: {
    handle: "@ak_threads",
    timezone: "Asia/Bangkok",
  },
  last_updated: "2026-04-26T09:00:00+07:00",
  posts: [
    {
      id: "sample_001",
      text: "Most creators do not need more ideas. They need a cleaner way to see which ideas are already earning trust.",
      created_at: "2026-04-18T09:15:00+07:00",
      content_type: "opinion",
      topics: ["creator systems", "trust", "positioning"],
      metrics: { views: 18400, likes: 612, replies: 88, reposts: 24, shares: 57 },
    },
    {
      id: "sample_002",
      text: "A good post gives the reader a sentence they can reuse. A great post gives them a lens they cannot unsee.",
      created_at: "2026-04-20T13:30:00+07:00",
      content_type: "psychology",
      topics: ["writing", "retellability", "audience psychology"],
      metrics: { views: 24600, likes: 930, replies: 112, reposts: 45, shares: 83 },
    },
    {
      id: "sample_003",
      text: "If your content calendar only tracks topics, you miss the real pattern: what pressure the reader was under when the post worked.",
      created_at: "2026-04-22T18:10:00+07:00",
      content_type: "data-insight",
      topics: ["content calendar", "reader pressure", "strategy"],
      metrics: { views: 12900, likes: 381, replies: 61, reposts: 16, shares: 34 },
    },
    {
      id: "sample_004",
      text: "The fastest way to sound less like AI is not adding slang. It is removing the part where you explain the obvious.",
      created_at: "2026-04-24T08:40:00+07:00",
      content_type: "anti-ai",
      topics: ["AI tone", "voice", "editing"],
      metrics: { views: 20100, likes: 714, replies: 96, reposts: 31, shares: 69 },
    },
  ],
};

const i18n = {
  zh: {
    htmlLang: "zh-Hant",
    brandEyebrow: "本地面板",
    sidebarAria: "面板導覽",
    primaryAria: "主要導覽",
    navOverview: "總覽",
    navCommand: "總面板",
    navDiagnosis: "診斷",
    navPosts: "貼文",
    navTopics: "主題地圖",
    navSignals: "訊號",
    source: "資料來源",
    topbarAria: "工作區控制",
    topEyebrow: "決策優先的帳號視圖",
    topTitle: "內容駕駛艙",
    languageTitle: "切換語言",
    languageLabel: "EN",
    folderTitle: "開啟工作資料夾",
    folder: "資料夾",
    trackerTitle: "匯入 tracker JSON",
    tracker: "Tracker",
    sampleTitle: "重新載入範例資料",
    sample: "範例",
    rebuildTitle: "重建 compiled memory",
    rebuild: "重建",
    rebuildOk: "compiled memory 已重建",
    rebuildFail: "重建失敗",
    heroEyebrow: "帳號總覽",
    heroTitle: "AK Threads 數據面板",
    heroSummary: "用本地資料快速看表現、主題、留言與下一步。",
    metricsAria: "帳號指標",
    metricPosts: "貼文",
    metricViews: "觀看",
    metricEngagement: "互動率",
    summaryAria: "表現摘要",
    bestPost: "最佳貼文",
    bestTopic: "最強主題",
    recentWindow: "近期窗口",
    postLibrary: "貼文資料庫",
    allPosts: "所有貼文",
    sortAria: "貼文排序",
    sortNewest: "最新",
    sortViews: "觀看",
    sortEngagement: "互動率",
    sortReplies: "回覆",
    selectedAria: "選取的貼文",
    selectedPost: "選取貼文",
    analyze: "分析",
    predict: "預測",
    review: "回顧",
    semanticField: "語意場",
    topicMap: "主題地圖",
    nextMoveQueue: "下一步佇列",
    moves: "行動",
    accountState: "帳號狀態",
    signals: "訊號",
    companionEyebrow: "伴隨資料",
    companionTitle: "可讀檔案",
    postsByDate: "按時間排序",
    postsByTopic: "按主題分類",
    commentsFile: "留言記錄",
    sourceSample: "範例資料",
    sourceServer: "Skill 資料",
    localAccount: "本地帳號",
    loadedSummary: (handle) => `${handle} · 本地資料已載入。Tracker 是數據源頭，分析區塊只做可視化整理。`,
    commandEyebrow: "總面板",
    commandTitle: "用戶最想先知道的事",
    growthEyebrow: "帳號數據成長",
    growthTitle: "追蹤觀看曲線",
    quickReadEyebrow: "快速判讀",
    accountStatus: "帳號狀態",
    growthStatus: "成長狀態",
    strongestLever: "最值得加碼",
    mainRisk: "主要風險",
    nextMoveEmpty: "尚未產生下一步資料，按 Rebuild 或先提供 tracker。",
    growthFallback: "無 snapshot，改用發文累積觀看。",
    growthUp: "近期高於中位，動能偏強。",
    growthFlat: "近期低於中位，需要檢查題材與開頭。",
    riskLowData: "資料量偏少，先累積更多貼文。",
    riskRepetition: "主題集中度高，注意疲勞。",
    riskOk: "沒有明顯紅線，持續追蹤下一篇。",
    noPostLoaded: "尚未載入貼文",
    noTopicLoaded: "尚未載入主題",
    noRecentPosts: "尚無近期貼文",
    views: "觀看",
    interactions: "互動",
    posts: "貼文",
    post: "貼文",
    unknownDate: "未知日期",
    untitledPost: "未命名貼文",
    unlabeled: "未標記",
    noPostSelected: "尚未選取貼文",
    choosePost: "從列表選一篇貼文。",
    statViews: "觀看",
    statLikes: "讚",
    statReplies: "回覆",
    statShares: "分享",
    topicLine: (views, engagement) => `${views} 觀看 / ${engagement} 互動`,
    noNextMoves: "尚未載入 compiled next move 檔案。",
    noAccountState: "尚未載入 compiled account state 檔案。",
    noPostsByDate: "尚未載入歷史貼文時間檔。",
    noPostsByTopic: "尚未載入歷史貼文主題檔。",
    noComments: "尚未載入留言記錄。",
    trendEyebrow: "趨勢",
    trendTitle: "近期動能",
    searchPlaceholder: "搜尋貼文",
    topicFilterAria: "主題篩選",
    typeFilterAria: "內容類型篩選",
    dateFilterAria: "日期篩選",
    dateAll: "全部時間",
    date30: "最近 30 天",
    date90: "最近 90 天",
    allTopics: "全部主題",
    allTypes: "全部類型",
    snapshots: "成長快照",
    noSnapshots: "這篇沒有 snapshot 成長資料。",
    promptPlaceholder: "AI action 指令會出現在這裡。",
    promptCopied: "已產生指令，可複製到 Codex 對話使用。",
    diagnosisEyebrow: "帳號診斷",
    diagnosisTitle: "資料正在說什麼",
    performanceEyebrow: "表現階梯",
    performanceTitle: "觀看分布",
    timeEyebrow: "發文時間",
    timeTitle: "高效時段",
    contentMixEyebrow: "內容組合",
    contentMixTitle: "格式表現",
    conversationEyebrow: "留言互動",
    conversationTitle: "回覆訊號",
    topPostsEyebrow: "贏家樣本",
    topPostsTitle: "高表現貼文",
    weakPostsEyebrow: "需要回看",
    weakPostsTitle: "低表現貼文",
    medianViews: "中位觀看",
    recentAverage: "近期平均",
    topThreshold: "高標門檻",
    dataCoverage: "資料完整度",
    sourceCoverage: "來源檔案",
    companionCoverage: "伴隨資料",
    trackerFound: "Tracker 已找到",
    trackerMissing: "Tracker 未找到",
    replyLoad: "作者回覆量",
    avgViews: "平均觀看",
    medianShort: "中位",
    items: "筆",
    authorReplies: "作者回覆",
    comments: "留言",
    noData: "尚無可用資料",
    topicTableHead: "主題排行",
    serverFolderUnavailable: "這個瀏覽器不支援資料夾讀取。請改用 Tracker 匯入 JSON。",
    trackerReadError: (message) => `無法讀取 tracker JSON：${message}`,
    folderReadError: (message) => `無法開啟資料夾：${message}`,
  },
  en: {
    htmlLang: "en",
    brandEyebrow: "Local Panel",
    sidebarAria: "Panel navigation",
    primaryAria: "Primary",
    navOverview: "Overview",
    navCommand: "Command",
    navDiagnosis: "Diagnosis",
    navPosts: "Posts",
    navTopics: "Topic Map",
    navSignals: "Signals",
    source: "Source",
    topbarAria: "Workspace controls",
    topEyebrow: "Decision-first account view",
    topTitle: "Content cockpit",
    languageTitle: "Switch language",
    languageLabel: "中文",
    folderTitle: "Open workspace folder",
    folder: "Folder",
    trackerTitle: "Import tracker JSON",
    tracker: "Tracker",
    sampleTitle: "Reload sample data",
    sample: "Sample",
    rebuildTitle: "Rebuild compiled memory",
    rebuild: "Rebuild",
    rebuildOk: "Compiled memory rebuilt",
    rebuildFail: "Rebuild failed",
    heroEyebrow: "Account overview",
    heroTitle: "AK Threads Data Panel",
    heroSummary: "Use local data to scan performance, topics, comments, and next moves.",
    metricsAria: "Account metrics",
    metricPosts: "Posts",
    metricViews: "Views",
    metricEngagement: "Engagement",
    summaryAria: "Performance summary",
    bestPost: "Best post",
    bestTopic: "Strongest topic",
    recentWindow: "Recent window",
    postLibrary: "Post library",
    allPosts: "All posts",
    sortAria: "Sort posts",
    sortNewest: "Newest",
    sortViews: "Views",
    sortEngagement: "Engagement",
    sortReplies: "Replies",
    selectedAria: "Selected post",
    selectedPost: "Selected post",
    analyze: "Analyze",
    predict: "Predict",
    review: "Review",
    semanticField: "Semantic field",
    topicMap: "Topic map",
    nextMoveQueue: "Next move queue",
    moves: "Moves",
    accountState: "Account state",
    signals: "Signals",
    companionEyebrow: "Companion files",
    companionTitle: "Readable archives",
    postsByDate: "By date",
    postsByTopic: "By topic",
    commentsFile: "Comments",
    sourceSample: "Sample data",
    sourceServer: "Skill data",
    localAccount: "local account",
    loadedSummary: (handle) => `${handle} · Local data loaded. Tracker is the source of truth; analysis blocks are visual summaries.`,
    commandEyebrow: "Command center",
    commandTitle: "What the user wants to know first",
    growthEyebrow: "Account growth",
    growthTitle: "Tracked view curve",
    quickReadEyebrow: "Quick read",
    accountStatus: "Account status",
    growthStatus: "Growth status",
    strongestLever: "Best lever",
    mainRisk: "Main risk",
    nextMoveEmpty: "No next-move data yet. Click Rebuild or provide a tracker first.",
    growthFallback: "No snapshots; using cumulative views by post date.",
    growthUp: "Recent average is above median. Momentum looks strong.",
    growthFlat: "Recent average is below median. Check topic and opening strength.",
    riskLowData: "Small dataset. Build more post history first.",
    riskRepetition: "Topics are concentrated. Watch fatigue.",
    riskOk: "No obvious red line. Keep tracking the next post.",
    noPostLoaded: "No post loaded",
    noTopicLoaded: "No topic loaded",
    noRecentPosts: "No recent posts",
    views: "views",
    interactions: "interactions",
    posts: "posts",
    post: "post",
    unknownDate: "Unknown date",
    untitledPost: "Untitled post",
    unlabeled: "Unlabeled",
    noPostSelected: "No post selected",
    choosePost: "Choose a post from the list.",
    statViews: "Views",
    statLikes: "Likes",
    statReplies: "Replies",
    statShares: "Shares",
    topicLine: (views, engagement) => `${views} views / ${engagement} interactions`,
    noNextMoves: "No compiled next move file loaded.",
    noAccountState: "No compiled account state file loaded.",
    noPostsByDate: "No post-by-date archive loaded.",
    noPostsByTopic: "No post-by-topic archive loaded.",
    noComments: "No comments archive loaded.",
    trendEyebrow: "Trend",
    trendTitle: "Recent momentum",
    searchPlaceholder: "Search posts",
    topicFilterAria: "Topic filter",
    typeFilterAria: "Content type filter",
    dateFilterAria: "Date filter",
    dateAll: "All time",
    date30: "Last 30 days",
    date90: "Last 90 days",
    allTopics: "All topics",
    allTypes: "All types",
    snapshots: "Growth snapshots",
    noSnapshots: "This post has no snapshot growth data.",
    promptPlaceholder: "AI action prompt appears here.",
    promptCopied: "Prompt generated. Paste it into Codex when ready.",
    diagnosisEyebrow: "Account diagnosis",
    diagnosisTitle: "What the data says",
    performanceEyebrow: "Performance ladder",
    performanceTitle: "View distribution",
    timeEyebrow: "Posting time",
    timeTitle: "Best slots",
    contentMixEyebrow: "Content mix",
    contentMixTitle: "Format performance",
    conversationEyebrow: "Conversation",
    conversationTitle: "Reply signals",
    topPostsEyebrow: "Winners",
    topPostsTitle: "Top posts",
    weakPostsEyebrow: "Needs review",
    weakPostsTitle: "Low performers",
    medianViews: "Median views",
    recentAverage: "Recent average",
    topThreshold: "High bar",
    dataCoverage: "Data coverage",
    sourceCoverage: "Source files",
    companionCoverage: "Companion coverage",
    trackerFound: "Tracker found",
    trackerMissing: "Tracker missing",
    replyLoad: "Author replies",
    avgViews: "Avg views",
    medianShort: "Median",
    items: "items",
    authorReplies: "author replies",
    comments: "comments",
    noData: "No usable data",
    topicTableHead: "Topic ranking",
    serverFolderUnavailable: "Folder access is not available in this browser. Import tracker JSON instead.",
    trackerReadError: (message) => `Could not read tracker JSON: ${message}`,
    folderReadError: (message) => `Could not open folder: ${message}`,
  },
};

const savedLanguage = window.localStorage.getItem("akPanelLanguage");

let state = {
  tracker: sampleTracker,
  source: "sample",
  language: savedLanguage === "en" ? "en" : "zh",
  selectedPostId: null,
  compiled: {
    nextMoves: "行動 1：加強可被轉述的受眾心理洞察。\n行動 2：每篇先抓一個具體壓力點，再談框架。\n行動 3：不要重複提醒 AI 味，除非有新鮮例子。",
    accountState: "演算法狀態：已有可用訊號基礎。\n受眾狀態：最強內容通常能說中讀者的隱形壓力。\n反 AI 狀態：短、冷靜、不過度解釋的文字質地最好。",
  },
  companions: {
    postsByDate: "",
    postsByTopic: "",
    comments: "",
  },
  manifest: null,
  filters: {
    search: "",
    topic: "all",
    type: "all",
    date: "all",
  },
};

const els = {
  sourceLabel: document.querySelector("#sourceLabel"),
  accountSummary: document.querySelector("#accountSummary"),
  metricPostsCard: document.querySelector('.hero-metrics [data-metric="posts"]'),
  metricViewsCard: document.querySelector('.hero-metrics [data-metric="views"]'),
  metricEngagementCard: document.querySelector('.hero-metrics [data-metric="engagement"]'),
  bestPostTitle: document.querySelector("#bestPostTitle"),
  bestPostMeta: document.querySelector("#bestPostMeta"),
  bestTopicTitle: document.querySelector("#bestTopicTitle"),
  bestTopicMeta: document.querySelector("#bestTopicMeta"),
  recentTitle: document.querySelector("#recentTitle"),
  recentMeta: document.querySelector("#recentMeta"),
  accountGrowthChart: document.querySelector("#accountGrowthChart"),
  executiveCards: document.querySelector("#executiveCards"),
  nextMoveCards: document.querySelector("#nextMoveCards"),
  postList: document.querySelector("#postList"),
  sortSelect: document.querySelector("#sortSelect"),
  searchInput: document.querySelector("#searchInput"),
  topicFilter: document.querySelector("#topicFilter"),
  typeFilter: document.querySelector("#typeFilter"),
  dateFilter: document.querySelector("#dateFilter"),
  detailTitle: document.querySelector("#detailTitle"),
  detailText: document.querySelector("#detailText"),
  detailStats: document.querySelector("#detailStats"),
  detailMeta: document.querySelector("#detailMeta"),
  snapshotChart: document.querySelector("#snapshotChart"),
  aiPromptBox: document.querySelector("#aiPromptBox"),
  topicCloud: document.querySelector("#topicCloud"),
  trendChart: document.querySelector("#trendChart"),
  insightGrid: document.querySelector("#insightGrid"),
  performanceBars: document.querySelector("#performanceBars"),
  timeSlotList: document.querySelector("#timeSlotList"),
  contentTypeList: document.querySelector("#contentTypeList"),
  conversationList: document.querySelector("#conversationList"),
  topPostList: document.querySelector("#topPostList"),
  weakPostList: document.querySelector("#weakPostList"),
  topicTable: document.querySelector("#topicTable"),
  nextMoveBox: document.querySelector("#nextMoveBox"),
  accountStateBox: document.querySelector("#accountStateBox"),
  postsByDateBox: document.querySelector("#postsByDateBox"),
  postsByTopicBox: document.querySelector("#postsByTopicBox"),
  commentsBox: document.querySelector("#commentsBox"),
  trackerInput: document.querySelector("#trackerInput"),
  folderButton: document.querySelector("#folderButton"),
  sampleButton: document.querySelector("#sampleButton"),
  rebuildButton: document.querySelector("#rebuildButton"),
  languageToggle: document.querySelector("#languageToggle"),
  languageLabel: document.querySelector("#languageLabel"),
};

function text(key, ...args) {
  const value = i18n[state.language][key];
  return typeof value === "function" ? value(...args) : value;
}

function numberFormat(value) {
  const locale = state.language === "zh" ? "zh-Hant" : "en";
  return new Intl.NumberFormat(locale, { notation: value > 9999 ? "compact" : "standard" }).format(value || 0);
}

function splitFormatted(value) {
  const locale = state.language === "zh" ? "zh-Hant" : "en";
  const fmt = new Intl.NumberFormat(locale, { notation: value > 9999 ? "compact" : "standard" });
  let main = "";
  let unit = "";
  for (const part of fmt.formatToParts(Number(value) || 0)) {
    if (part.type === "compact" || part.type === "literal" && /[A-Za-z一-鿿]/.test(part.value)) {
      unit += part.value;
    } else {
      main += part.value;
    }
  }
  return { main: main.trim(), unit: unit.trim() };
}

function trendIconSvg(direction) {
  if (direction === "up") {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 17 10 10 14 14 21 7"/><polyline points="14 7 21 7 21 14"/></svg>';
  }
  if (direction === "down") {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 7 10 14 14 10 21 17"/><polyline points="14 17 21 17 21 10"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/></svg>';
}

function metricTrend(posts, kind) {
  const dated = posts.filter((post) => post.created_at);
  if (dated.length < 4) return null;
  const sorted = [...dated].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const anchor = new Date(sorted[0].created_at).getTime();
  const dayMs = 86400000;
  const last = [];
  const prev = [];
  for (const post of sorted) {
    const t = new Date(post.created_at).getTime();
    if (t > anchor - 14 * dayMs) last.push(post);
    else if (t > anchor - 28 * dayMs) prev.push(post);
  }
  if (!last.length || !prev.length) return null;
  const stat = (arr) => {
    if (kind === "count") return arr.length;
    const sumViews = arr.reduce((sum, post) => sum + postMetrics(post).views, 0);
    if (kind === "views") {
      return arr.length ? sumViews / arr.length : 0;
    }
    const sumEng = arr.reduce((sum, post) => sum + postMetrics(post).engagement, 0);
    return sumViews ? sumEng / sumViews : 0;
  };
  const a = stat(last);
  const b = stat(prev);
  if (!b) return null;
  const delta = (a - b) / b;
  if (!Number.isFinite(delta)) return null;
  const direction = delta > 0.02 ? "up" : delta < -0.02 ? "down" : "flat";
  return { delta, direction };
}

function trendDeltaLabel(trend) {
  if (!trend || trend.direction === "flat") return "0%";
  const pct = Math.round(Math.abs(trend.delta) * 100);
  const sign = trend.direction === "up" ? "+" : "−";
  return `${sign}${pct}%`;
}

function renderHeroMetric(node, value, label, trend, options = {}) {
  if (!node) return;
  const { isPercent = false } = options;
  let main;
  let unit;
  if (isPercent) {
    const num = Number(value) || 0;
    main = num.toFixed(1);
    unit = "%";
  } else {
    const parts = splitFormatted(Number(value) || 0);
    main = parts.main;
    unit = parts.unit;
  }
  const trendHtml = trend
    ? `<span class="trend ${trend.direction}">${trendIconSvg(trend.direction)}<span>${trendDeltaLabel(trend)}</span></span>`
    : "";
  node.innerHTML = `
    <div class="metric-row">
      <span class="value">${escapeHtml(main)}</span>${unit ? `<span class="unit">${escapeHtml(unit)}</span>` : ""}${trendHtml}
    </div>
    <p>${escapeHtml(label)}</p>
  `;
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function renderMarkdown(src) {
  if (!src) return "";
  const lines = String(src).split(/\r?\n/);
  const out = [];
  let para = [];
  let listType = null;
  let inCode = false;
  let codeBuf = [];

  const inline = (s) =>
    escapeHtml(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };

  for (const raw of lines) {
    if (/^\s*```/.test(raw)) {
      flushPara();
      flushList();
      if (inCode) {
        out.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
        codeBuf = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(raw);
      continue;
    }
    if (!raw.trim()) {
      flushPara();
      flushList();
      continue;
    }
    const heading = raw.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      flushPara();
      flushList();
      const level = Math.min(heading[1].length, 4);
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    const ul = raw.match(/^\s*[-*+]\s+(.+)$/);
    if (ul) {
      flushPara();
      if (listType !== "ul") {
        flushList();
        out.push("<ul>");
        listType = "ul";
      }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }
    const ol = raw.match(/^\s*\d+[.)]\s+(.+)$/);
    if (ol) {
      flushPara();
      if (listType !== "ol") {
        flushList();
        out.push("<ol>");
        listType = "ol";
      }
      out.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }
    flushList();
    para.push(raw.trim());
  }
  if (inCode && codeBuf.length) {
    out.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
  }
  flushPara();
  flushList();
  return out.join("\n");
}

function dateFormat(value) {
  if (!value) return text("unknownDate");
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return text("unknownDate");
  const locale = state.language === "zh" ? "zh-Hant" : "en";
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function postMetrics(post) {
  const metrics = post.metrics || {};
  const views = Number(metrics.views || 0);
  const likes = Number(metrics.likes || 0);
  const replies = Number(metrics.replies || 0);
  const reposts = Number(metrics.reposts || 0);
  const shares = Number(metrics.shares || 0);
  const engagement = likes + replies + reposts + shares;
  const engagementRate = views ? engagement / views : 0;
  return { views, likes, replies, reposts, shares, engagement, engagementRate };
}

function median(values) {
  const clean = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (!clean.length) return 0;
  const middle = Math.floor(clean.length / 2);
  return clean.length % 2 ? clean[middle] : (clean[middle - 1] + clean[middle]) / 2;
}

function average(values) {
  const clean = values.filter((value) => Number.isFinite(value));
  return clean.length ? clean.reduce((sum, value) => sum + value, 0) / clean.length : 0;
}

function measuredValues(values) {
  const positive = values.filter((value) => Number.isFinite(value) && value > 0);
  return positive.length ? positive : values;
}

function percentile(values, ratio) {
  const clean = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (!clean.length) return 0;
  const index = Math.min(clean.length - 1, Math.max(0, Math.ceil(clean.length * ratio) - 1));
  return clean[index];
}

function postTitle(post) {
  const title = String(post.text || text("untitledPost")).replace(/\s+/g, " ").trim();
  return title.length > 110 ? `${title.slice(0, 110)}...` : title;
}

function normalizePosts(tracker) {
  return Array.isArray(tracker?.posts) ? tracker.posts : [];
}

function topicStats(posts) {
  const map = new Map();
  posts.forEach((post) => {
    const metrics = postMetrics(post);
    (post.topics || [text("unlabeled")]).forEach((topic) => {
      const key = String(topic || text("unlabeled"));
      const current = map.get(key) || { topic: key, count: 0, views: 0, engagement: 0, replies: 0, shares: 0 };
      current.count += 1;
      current.views += metrics.views;
      current.engagement += metrics.engagement;
      current.replies += metrics.replies;
      current.shares += metrics.shares;
      map.set(key, current);
    });
  });
  return [...map.values()].sort((a, b) => b.views - a.views || b.count - a.count);
}

function groupStats(posts, getKey) {
  const map = new Map();
  posts.forEach((post) => {
    const key = getKey(post) || text("unlabeled");
    const metrics = postMetrics(post);
    const current = map.get(key) || { key, count: 0, views: 0, engagement: 0, replies: 0, authorReplies: 0, comments: 0 };
    current.count += 1;
    current.views += metrics.views;
    current.engagement += metrics.engagement;
    current.replies += metrics.replies;
    current.authorReplies += Array.isArray(post.author_replies) ? post.author_replies.length : 0;
    current.comments += Array.isArray(post.comments) ? post.comments.length : 0;
    map.set(key, current);
  });
  return [...map.values()].sort((a, b) => b.views / Math.max(1, b.count) - a.views / Math.max(1, a.count));
}

function hourSlot(post) {
  const raw = post.posting_time_slot || post.created_at;
  if (!raw) return text("unknownDate");
  const match = String(raw).match(/(\d{1,2}):/);
  if (!match) return text("unknownDate");
  const hour = Number(match[1]);
  if (!Number.isFinite(hour)) return text("unknownDate");
  const end = (hour + 1) % 24;
  return `${String(hour).padStart(2, "0")}:00-${String(end).padStart(2, "0")}:00`;
}

function sortedPosts(posts) {
  const mode = els.sortSelect.value;
  return [...posts].sort((a, b) => {
    const ma = postMetrics(a);
    const mb = postMetrics(b);
    if (mode === "views") return mb.views - ma.views;
    if (mode === "engagement") return mb.engagementRate - ma.engagementRate;
    if (mode === "replies") return mb.replies - ma.replies;
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });
}

function allTopics(posts) {
  return [...new Set(posts.flatMap((post) => post.topics || []).filter(Boolean).map(String))].sort();
}

function allTypes(posts) {
  return [...new Set(posts.map((post) => post.content_type).filter(Boolean).map(String))].sort();
}

function filteredPosts(posts) {
  const query = state.filters.search.trim().toLowerCase();
  const cutoffDays = state.filters.date === "all" ? null : Number(state.filters.date);
  const cutoff = cutoffDays ? Date.now() - cutoffDays * 24 * 60 * 60 * 1000 : null;
  return posts.filter((post) => {
    const textBlob = `${post.text || ""} ${post.title || ""} ${(post.topics || []).join(" ")}`.toLowerCase();
    if (query && !textBlob.includes(query)) return false;
    if (state.filters.topic !== "all" && !(post.topics || []).map(String).includes(state.filters.topic)) return false;
    if (state.filters.type !== "all" && String(post.content_type || "") !== state.filters.type) return false;
    if (cutoff) {
      const time = new Date(post.created_at || 0).getTime();
      if (!time || time < cutoff) return false;
    }
    return true;
  });
}

function fillSelect(select, options, current, allLabel) {
  const previous = current || "all";
  select.innerHTML = [
    `<option value="all">${escapeHtml(allLabel)}</option>`,
    ...options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`),
  ].join("");
  select.value = options.includes(previous) ? previous : "all";
}

function renderFilters(posts) {
  if (els.searchInput.value !== state.filters.search) els.searchInput.value = state.filters.search;
  fillSelect(els.topicFilter, allTopics(posts), state.filters.topic, text("allTopics"));
  fillSelect(els.typeFilter, allTypes(posts), state.filters.type, text("allTypes"));
  els.dateFilter.value = state.filters.date;
}

function applyStaticTranslations() {
  document.documentElement.lang = text("htmlLang");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = text(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.title = text(node.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", text(node.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = text(node.dataset.i18nPlaceholder);
  });
  els.languageLabel.textContent = text("languageLabel");
}

function renderSummary(posts) {
  const total = posts.reduce(
    (acc, post) => {
      const metrics = postMetrics(post);
      acc.views += metrics.views;
      acc.engagement += metrics.engagement;
      return acc;
    },
    { views: 0, engagement: 0 },
  );
  const handle = state.tracker?.account?.handle || text("localAccount");

  els.sourceLabel.textContent =
    state.source === "sample" ? text("sourceSample") : state.source === "server" ? text("sourceServer") : state.source;
  els.accountSummary.textContent = text("loadedSummary", handle);
  const engagementValue = total.views ? (100 * total.engagement) / total.views : 0;
  renderHeroMetric(els.metricPostsCard, posts.length, text("metricPosts"), metricTrend(posts, "count"));
  renderHeroMetric(els.metricViewsCard, total.views, text("metricViews"), metricTrend(posts, "views"));
  renderHeroMetric(els.metricEngagementCard, engagementValue, text("metricEngagement"), metricTrend(posts, "engagementRate"), { isPercent: true });

  const bestPost = [...posts].sort((a, b) => postMetrics(b).views - postMetrics(a).views)[0];
  if (bestPost) {
    const metrics = postMetrics(bestPost);
    els.bestPostTitle.textContent = postTitle(bestPost);
    els.bestPostMeta.textContent = `${numberFormat(metrics.views)} ${text("views")}, ${numberFormat(metrics.engagement)} ${text("interactions")}`;
  } else {
    els.bestPostTitle.textContent = "-";
    els.bestPostMeta.textContent = text("noPostLoaded");
  }

  const topics = topicStats(posts);
  const bestTopic = topics[0];
  if (bestTopic) {
    els.bestTopicTitle.textContent = bestTopic.topic;
    els.bestTopicMeta.textContent = `${bestTopic.count} ${text("posts")}, ${numberFormat(bestTopic.views)} ${text("views")}`;
  } else {
    els.bestTopicTitle.textContent = "-";
    els.bestTopicMeta.textContent = text("noTopicLoaded");
  }

  const newest = [...posts].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))[0];
  els.recentTitle.textContent = newest ? dateFormat(newest.created_at) : "-";
  els.recentMeta.textContent = newest ? postTitle(newest) : text("noRecentPosts");
}

function renderPosts(posts) {
  const selected = state.selectedPostId || posts[0]?.id || null;
  state.selectedPostId = selected;

  els.postList.innerHTML = "";
  sortedPosts(posts).forEach((post) => {
    const metrics = postMetrics(post);
    const button = document.createElement("button");
    button.className = `post-row${post.id === selected ? " is-selected" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span>
        <strong>${escapeHtml(postTitle(post))}</strong>
        <small>${escapeHtml(dateFormat(post.created_at))} / ${escapeHtml(post.content_type || text("post"))}</small>
      </span>
      <span class="post-score">${numberFormat(metrics.views)}<span>${text("views")}</span></span>
    `;
    button.addEventListener("click", () => {
      state.selectedPostId = post.id;
      render();
    });
    els.postList.appendChild(button);
  });
}

function renderDetail(posts) {
  const post = posts.find((item) => item.id === state.selectedPostId) || posts[0];
  if (!post) {
    els.detailTitle.textContent = text("noPostSelected");
    els.detailText.textContent = text("choosePost");
    els.detailStats.innerHTML = "";
    return;
  }

  const metrics = postMetrics(post);
  els.detailTitle.textContent = post.id || "Selected post";
  els.detailText.textContent = post.text || "";
  els.detailStats.innerHTML = [
    [text("statViews"), metrics.views],
    [text("statLikes"), metrics.likes],
    [text("statReplies"), metrics.replies],
    [text("statShares"), metrics.shares],
  ]
    .map(([label, value]) => `<div class="stat-pill"><strong>${numberFormat(value)}</strong><span>${label}</span></div>`)
    .join("");
  const authorReplies = Array.isArray(post.author_replies) ? post.author_replies.length : 0;
  const comments = Array.isArray(post.comments) ? post.comments.length : 0;
  const topics = Array.isArray(post.topics) ? post.topics.join(" / ") : text("unlabeled");
  els.detailMeta.innerHTML = `
    <div><b>${escapeHtml(text("semanticField"))}</b><span>${escapeHtml(topics)}</span></div>
    <div><b>${escapeHtml(text("contentMixTitle"))}</b><span>${escapeHtml(post.content_type || text("post"))}</span></div>
    <div><b>${escapeHtml(text("conversationTitle"))}</b><span>${numberFormat(authorReplies)} ${text("authorReplies")} · ${numberFormat(comments)} ${text("comments")}</span></div>
  `;
  renderSnapshotChart(post);
}

function accountGrowthSeries(posts) {
  const snapshotMap = new Map();
  posts.forEach((post) => {
    (post.snapshots || []).forEach((snapshot) => {
      if (!snapshot.captured_at || !Number(snapshot.views || 0)) return;
      const key = String(snapshot.captured_at).slice(0, 10);
      snapshotMap.set(key, (snapshotMap.get(key) || 0) + Number(snapshot.views || 0));
    });
  });
  if (snapshotMap.size >= 2) {
    return {
      fallback: false,
      points: [...snapshotMap.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, value]) => ({ date, value })),
    };
  }

  let cumulative = 0;
  const byPostDate = [...posts]
    .filter((post) => post.created_at)
    .sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0))
    .map((post) => {
      cumulative += postMetrics(post).views;
      return { date: String(post.created_at).slice(0, 10), value: cumulative };
    });
  return { fallback: true, points: byPostDate };
}

function renderAccountGrowth(posts) {
  const series = accountGrowthSeries(posts);
  const points = series.points.slice(-14);
  const baselineValue = series.fallback ? null : median(points.map((p) => Number(p.value || 0)));
  const baselineLabel = state.language === "zh" ? "中位數" : "Median";
  els.accountGrowthChart.innerHTML = points.length
    ? `
      ${renderLineChart(points, {
        width: 720,
        height: 260,
        area: true,
        baseline: baselineValue,
        baselineLabel: `${baselineLabel} ${numberFormat(Math.round(baselineValue || 0))}`,
      })}
      <div class="chart-legend">
        <strong>${numberFormat(points.at(-1)?.value || 0)}</strong>
        <span>${escapeHtml(points.at(0)?.date || "")} - ${escapeHtml(points.at(-1)?.date || "")}</span>
      </div>
      <p class="muted">${series.fallback ? text("growthFallback") : `${points.length} ${text("items")}`}</p>
    `
    : `<p class="muted">${text("noData")}</p>`;
}

function renderLineChart(points, options = {}) {
  const width = options.width || 640;
  const height = options.height || 220;
  const pad = 24;
  const values = points.map((point) => Number(point.value || 0));
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const xStep = points.length > 1 ? (width - pad * 2) / (points.length - 1) : 0;
  const scaleY = (value) => {
    const ratio = (value - min) / Math.max(1, max - min);
    return height - pad - ratio * (height - pad * 2);
  };
  const coords = points.map((point, index) => {
    const x = pad + index * xStep;
    const y = scaleY(Number(point.value || 0));
    return { x, y, point };
  });
  const path = coords.map((coord, index) => `${index ? "L" : "M"}${coord.x.toFixed(1)} ${coord.y.toFixed(1)}`).join(" ");
  const area = `${path} L${(pad + (points.length - 1) * xStep).toFixed(1)} ${height - pad} L${pad} ${height - pad} Z`;
  const labels = coords.filter((_, index) => index === 0 || index === coords.length - 1 || index === Math.floor(coords.length / 2));
  let baselineSvg = "";
  if (Number.isFinite(options.baseline) && options.baseline !== null) {
    const by = scaleY(options.baseline).toFixed(1);
    const labelX = (width - pad - 6).toFixed(1);
    const labelText = options.baselineLabel ? escapeHtml(options.baselineLabel) : "";
    baselineSvg = `
      <line x1="${pad}" y1="${by}" x2="${width - pad}" y2="${by}" class="chart-baseline" />
      ${labelText ? `<text x="${labelX}" y="${(Number(by) - 6).toFixed(1)}" class="chart-baseline-label" text-anchor="end">${labelText}</text>` : ""}
    `;
  }
  return `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="chart">
      <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" class="chart-axis" />
      <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" class="chart-axis" />
      ${options.area ? `<path d="${area}" class="chart-area"></path>` : ""}
      ${baselineSvg}
      <path d="${path}" class="chart-line"></path>
      ${coords.map((coord) => `<circle cx="${coord.x.toFixed(1)}" cy="${coord.y.toFixed(1)}" r="3" class="chart-dot"><title>${escapeHtml(coord.point.date)}: ${numberFormat(coord.point.value)}</title></circle>`).join("")}
      ${labels.map((coord) => `<text x="${coord.x.toFixed(1)}" y="${height - 6}" class="chart-label" text-anchor="middle">${escapeHtml(String(coord.point.date).slice(5))}</text>`).join("")}
    </svg>
  `;
}

function renderBarChart(points, options = {}) {
  const width = options.width || 640;
  const height = options.height || 220;
  const pad = 24;
  const max = Math.max(1, ...points.map((point) => Number(point.value || 0)));
  const gap = 8;
  const barWidth = Math.max(8, (width - pad * 2 - gap * Math.max(0, points.length - 1)) / Math.max(1, points.length));
  return `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="bar chart">
      <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" class="chart-axis" />
      ${points.map((point, index) => {
        const x = pad + index * (barWidth + gap);
        const barHeight = Math.max(4, Number(point.value || 0) / max * (height - pad * 2));
        const y = height - pad - barHeight;
        return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${barHeight.toFixed(1)}" rx="4" class="chart-bar"><title>${escapeHtml(point.date)}: ${numberFormat(point.value)}</title></rect>`;
      }).join("")}
    </svg>
  `;
}

function cleanMoveLine(line) {
  return line
    .replace(/^#+\s*/, "")
    .replace(/^[-*]\s*/, "")
    .replace(/^\d+[.)]\s*/, "")
    .replace(/\*\*/g, "")
    .trim();
}

function nextMoveItems(posts) {
  if (state.language === "zh") {
    const topics = topicStats(posts);
    const bestTopic = topics[0];
    const secondTopic = topics[1];
    const byViews = [...posts].sort((a, b) => postMetrics(b).views - postMetrics(a).views);
    const topPost = byViews[0];
    const conversationPost = [...posts]
      .map((post) => {
        const metrics = postMetrics(post);
        const authorReplies = Array.isArray(post.author_replies) ? post.author_replies.length : 0;
        return { post, score: metrics.replies + authorReplies };
      })
      .sort((a, b) => b.score - a.score)[0]?.post;
    const concentration = bestTopic ? bestTopic.count / Math.max(1, posts.length) : 0;
    const moves = [];
    if (bestTopic) {
      moves.push(`下一篇優先加碼「${bestTopic.topic}」，它目前是最高觀看主題；角度要換，不要重複同一個說法。`);
    }
    if (topPost) {
      moves.push(`拆解最高表現貼文「${postTitle(topPost)}」：保留它的開頭壓力與分享理由，換成新的案例。`);
    }
    if (conversationPost) {
      moves.push(`用留言最多的貼文做延伸：把留言裡反覆出現的疑問整理成下一篇，不要直接做教學清單。`);
    }
    if (concentration > 0.35 && secondTopic) {
      moves.push(`主題集中度偏高，下一篇可切到「${secondTopic.topic}」降低疲勞風險。`);
    }
    return moves.slice(0, 4).length ? moves.slice(0, 4) : [text("nextMoveEmpty")];
  }

  const fromCompiled = String(state.compiled.nextMoves || "")
    .split(/\r?\n/)
    .map(cleanMoveLine)
    .filter((line) => {
      const lowered = line.toLowerCase();
      return line
        && !line.startsWith(">")
        && !line.startsWith("#")
        && !line.includes("```")
        && !lowered.includes("generated_at")
        && !lowered.includes("posts_count")
        && !lowered.includes("source_tracker")
        && !lowered.includes("confidence_level")
        && !lowered.includes("coverage_notes")
        && !lowered.includes("next move queue")
        && !lowered.includes("required gate")
        && !lowered.includes("runtime notes");
    })
    .slice(0, 4);
  if (fromCompiled.length) return fromCompiled;
  const bestTopic = topicStats(posts)[0]?.topic;
  return bestTopic ? [`${text("strongestLever")}: ${bestTopic}`, text("riskOk")] : [text("nextMoveEmpty")];
}

function renderCommandCenter(posts) {
  const views = posts.map((post) => postMetrics(post).views);
  const measuredViews = measuredValues(views);
  const recent = [...posts]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, Math.min(10, posts.length))
    .map((post) => postMetrics(post).views);
  const med = median(measuredViews);
  const recentAvg = average(recent);
  const bestTopic = topicStats(posts)[0];
  const topicConcentration = bestTopic ? bestTopic.count / Math.max(1, posts.length) : 0;
  const risk = posts.length < 10 ? text("riskLowData") : topicConcentration > 0.38 ? text("riskRepetition") : text("riskOk");
  const cards = [
    [text("accountStatus"), `${posts.length} ${text("posts")}`, `${text("medianViews")}: ${numberFormat(Math.round(med))}`],
    [text("growthStatus"), recentAvg >= med ? text("growthUp") : text("growthFlat"), `${text("recentAverage")}: ${numberFormat(Math.round(recentAvg))}`],
    [text("strongestLever"), bestTopic?.topic || text("noData"), bestTopic ? `${bestTopic.count} ${text("posts")} · ${numberFormat(Math.round(bestTopic.views / Math.max(1, bestTopic.count)))} ${text("avgViews")}` : ""],
    [
      text("mainRisk"),
      risk,
      topicConcentration
        ? state.language === "zh"
          ? `主題集中度 ${Math.round(topicConcentration * 100)}%`
          : `${Math.round(topicConcentration * 100)}% topic concentration`
        : "",
    ],
  ];
  els.executiveCards.innerHTML = cards.map(([label, value, meta]) => `
    <article class="executive-card">
      <p class="eyebrow">${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(meta || "")}</span>
    </article>
  `).join("");

  els.nextMoveCards.innerHTML = nextMoveItems(posts).map((move, index) => `
    <article class="next-card">
      <span>${index + 1}</span>
      <p>${escapeHtml(move)}</p>
    </article>
  `).join("");
  renderAccountGrowth(posts);
}

function renderSnapshotChart(post) {
  const snapshots = Array.isArray(post.snapshots) ? post.snapshots.filter((item) => Number(item.views || 0) > 0) : [];
  if (!snapshots.length) {
    els.snapshotChart.innerHTML = `<p class="muted">${text("noSnapshots")}</p>`;
    return;
  }
  const points = snapshots.map((item) => ({
    date: `${Math.round(Number(item.hours_since_publish || 0))}h`,
    value: Number(item.views || 0),
  }));
  els.snapshotChart.innerHTML = `
    <p class="eyebrow">${text("snapshots")}</p>
    ${renderLineChart(points, { width: 520, height: 180, area: true })}
  `;
}

function renderTopics(posts) {
  const topics = topicStats(posts).slice(0, 12);
  const max = Math.max(...topics.map((topic) => topic.views), 1);
  els.topicCloud.innerHTML = topics
    .map((topic) => {
      const width = Math.max(8, Math.round((topic.views / max) * 100));
      return `
        <article class="topic-tile">
          <p class="eyebrow">${topic.count} ${text("posts")}</p>
          <h3>${escapeHtml(topic.topic)}</h3>
          <p class="muted">${escapeHtml(text("topicLine", numberFormat(topic.views), numberFormat(topic.engagement)))}</p>
          <div class="topic-meter" aria-hidden="true"><span style="width: ${width}%"></span></div>
        </article>
      `;
    })
    .join("");

  els.topicTable.innerHTML = `
    <h3>${escapeHtml(text("topicTableHead"))}</h3>
    ${topics.slice(0, 10).map((topic, index) => `
      <div class="table-row">
        <strong>${index + 1}. ${escapeHtml(topic.topic)}</strong>
        <span>${topic.count} ${text("posts")}</span>
        <span>${numberFormat(Math.round(topic.views / Math.max(1, topic.count)))} ${text("avgViews")}</span>
        <span>${numberFormat(topic.replies)} ${text("statReplies")}</span>
      </div>
    `).join("")}
  `;
}

function renderInsightGrid(posts) {
  const views = posts.map((post) => postMetrics(post).views);
  const measuredViews = measuredValues(views);
  const sortedRecent = [...posts].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  const recent = sortedRecent.slice(0, Math.min(10, sortedRecent.length)).map((post) => postMetrics(post).views);
  const withText = posts.filter((post) => String(post.text || "").trim()).length;
  const withViews = posts.filter((post) => postMetrics(post).views > 0).length;
  const authorReplies = posts.reduce((sum, post) => sum + (Array.isArray(post.author_replies) ? post.author_replies.length : 0), 0);
  const manifestFiles = state.manifest?.files || {};
  const foundFiles = Object.values(manifestFiles).filter((item) => item?.found).length;
  const requiredFiles = state.manifest?.required_count || Object.keys(manifestFiles).length || 0;
  const companionKeys = ["posts_by_date.md", "posts_by_topic.md", "comments.md", "brand_voice.md", "style_guide.md"];
  const foundCompanions = companionKeys.filter((key) => manifestFiles[key]?.found).length;
  const trackerFound = state.source === "server" || Boolean(manifestFiles.tracker?.found);
  const cards = [
    [text("medianViews"), numberFormat(Math.round(median(measuredViews))), `${withViews}/${posts.length} ${text("posts")}`],
    [text("recentAverage"), numberFormat(Math.round(average(recent))), `${Math.min(10, posts.length)} ${text("posts")}`],
    [text("topThreshold"), numberFormat(Math.round(percentile(measuredViews, 0.9))), "P90"],
    [
      text("dataCoverage"),
      `${Math.round((withText + withViews) / Math.max(1, posts.length * 2) * 100)}%`,
      state.language === "zh"
        ? `${withText}/${posts.length} 文字 · ${withViews}/${posts.length} 觀看`
        : `${withText}/${posts.length} text · ${withViews}/${posts.length} views`,
    ],
    [text("replyLoad"), numberFormat(authorReplies), text("authorReplies")],
    [text("sourceCoverage"), requiredFiles ? `${foundFiles}/${requiredFiles}` : "0/0", trackerFound ? text("trackerFound") : text("trackerMissing")],
    [text("companionCoverage"), `${foundCompanions}/${companionKeys.length}`, companionKeys.filter((key) => !manifestFiles[key]?.found).slice(0, 2).join(" · ") || "OK"],
  ];
  els.insightGrid.innerHTML = cards.map(([label, value, meta]) => `
    <article class="insight-card">
      <p class="eyebrow">${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(meta)}</span>
    </article>
  `).join("");
}

function renderPerformanceBars(posts) {
  const buckets = [
    { label: "0-999", min: 0, max: 999 },
    { label: "1K-4.9K", min: 1000, max: 4999 },
    { label: "5K-9.9K", min: 5000, max: 9999 },
    { label: "10K-49K", min: 10000, max: 49999 },
    { label: "50K+", min: 50000, max: Infinity },
  ].map((bucket) => {
    const items = posts.filter((post) => {
      const value = postMetrics(post).views;
      return value >= bucket.min && value <= bucket.max;
    });
    return { ...bucket, count: items.length, avg: Math.round(average(items.map((post) => postMetrics(post).views))) };
  });
  const maxCount = Math.max(1, ...buckets.map((bucket) => bucket.count));
  els.performanceBars.innerHTML = buckets.map((bucket) => `
    <div class="bar-row">
      <span>${bucket.label}</span>
      <div class="bar-track"><i style="width:${Math.max(4, bucket.count / maxCount * 100)}%"></i></div>
      <strong>${bucket.count}</strong>
      <small>${numberFormat(bucket.avg)} ${text("avgViews")}</small>
    </div>
  `).join("");
}

function renderTrend(posts) {
  const recent = [...posts]
    .filter((post) => post.created_at)
    .sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0))
    .slice(-14);
  els.trendChart.innerHTML = recent.length
    ? renderBarChart(recent.map((post) => ({
      id: post.id,
      date: dateFormat(post.created_at),
      value: postMetrics(post).views,
    })), { width: 640, height: 220 })
    : `<p class="muted">${text("noData")}</p>`;
}

function renderRankList(node, rows, valueFormatter) {
  node.innerHTML = rows.length
    ? rows.map((row, index) => `
      <button class="rank-row" type="button" data-post-id="${escapeHtml(row.id || "")}">
        <span><b>${index + 1}. ${escapeHtml(row.label)}</b><small>${escapeHtml(row.meta || "")}</small></span>
        <strong>${escapeHtml(valueFormatter(row))}</strong>
      </button>
    `).join("")
    : `<p class="muted">${text("noData")}</p>`;
  node.querySelectorAll("[data-post-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-post-id");
      if (id) {
        state.selectedPostId = id;
        render();
        document.querySelector("#posts")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function renderAnalysisBlocks(posts) {
  const byContent = groupStats(posts, (post) => post.content_type).slice(0, 8);
  renderRankList(
    els.contentTypeList,
    byContent.map((item) => ({ label: item.key, meta: `${item.count} ${text("posts")}`, value: item.views / Math.max(1, item.count) })),
    (row) => `${numberFormat(Math.round(row.value))} ${text("avgViews")}`,
  );

  const byTime = groupStats(posts, hourSlot).slice(0, 8);
  renderRankList(
    els.timeSlotList,
    byTime.map((item) => ({ label: item.key, meta: `${item.count} ${text("posts")}`, value: item.views / Math.max(1, item.count) })),
    (row) => `${numberFormat(Math.round(row.value))} ${text("avgViews")}`,
  );

  const conversation = [...posts]
    .map((post) => {
      const metrics = postMetrics(post);
      const authorReplies = Array.isArray(post.author_replies) ? post.author_replies.length : 0;
      const comments = Array.isArray(post.comments) ? post.comments.length : 0;
      return { id: post.id, label: postTitle(post), meta: dateFormat(post.created_at), value: metrics.replies + authorReplies + comments };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
  renderRankList(els.conversationList, conversation, (row) => `${numberFormat(row.value)} ${text("comments")}`);

  const byViews = [...posts]
    .map((post) => ({ id: post.id, label: postTitle(post), meta: dateFormat(post.created_at), value: postMetrics(post).views }))
    .sort((a, b) => b.value - a.value);
  renderRankList(els.topPostList, byViews.slice(0, 8), (row) => `${numberFormat(row.value)} ${text("views")}`);
  renderRankList(els.weakPostList, byViews.slice(-8).reverse(), (row) => `${numberFormat(row.value)} ${text("views")}`);
}

function accountStateSummary(posts) {
  if (!posts.length) return text("noAccountState");
  const metrics = posts.map(postMetrics);
  const views = metrics.map((item) => item.views);
  const measuredViews = measuredValues(views);
  const totalViews = metrics.reduce((sum, item) => sum + item.views, 0);
  const totalEngagement = metrics.reduce((sum, item) => sum + item.engagement, 0);
  const engagementRate = totalViews ? `${(100 * totalEngagement / totalViews).toFixed(1)}%` : "0%";
  const recent = [...posts]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, Math.min(10, posts.length))
    .map((post) => postMetrics(post).views);
  const med = median(measuredViews);
  const recentAvg = average(recent);
  const bestTopic = topicStats(posts)[0];
  const concentration = bestTopic ? bestTopic.count / Math.max(1, posts.length) : 0;
  const manifestFiles = state.manifest?.files || {};
  const foundFiles = Object.values(manifestFiles).filter((item) => item?.found).length;
  const requiredFiles = state.manifest?.required_count || Object.keys(manifestFiles).length || 0;

  if (state.language === "zh") {
    return [
      `帳號資料：${numberFormat(posts.length)} 篇貼文，累計 ${numberFormat(totalViews)} 觀看，互動率 ${engagementRate}。`,
      `成長狀態：近 ${recent.length} 篇平均 ${numberFormat(Math.round(recentAvg))} 觀看；全體中位數 ${numberFormat(Math.round(med))}。`,
      bestTopic
        ? `最強主題：「${bestTopic.topic}」，共 ${bestTopic.count} 篇，平均 ${numberFormat(Math.round(bestTopic.views / Math.max(1, bestTopic.count)))} 觀看。`
        : "最強主題：目前資料不足。",
      concentration > 0.38
        ? `風險提示：主題集中度 ${Math.round(concentration * 100)}%，下一篇需要換角度或切到第二主題。`
        : "風險提示：目前沒有明顯紅線，下一篇重點是維持開頭張力與可轉述性。",
      requiredFiles ? `資料覆蓋：已找到 ${foundFiles}/${requiredFiles} 個本地資料檔。` : "資料覆蓋：目前使用匯入的 tracker。"
    ].join("\n\n");
  }

  return [
    `Account data: ${numberFormat(posts.length)} posts, ${numberFormat(totalViews)} total views, ${engagementRate} engagement rate.`,
    `Growth state: recent ${recent.length}-post average is ${numberFormat(Math.round(recentAvg))}; account median is ${numberFormat(Math.round(med))}.`,
    bestTopic
      ? `Strongest topic: "${bestTopic.topic}", ${bestTopic.count} posts, ${numberFormat(Math.round(bestTopic.views / Math.max(1, bestTopic.count)))} average views.`
      : "Strongest topic: not enough data yet.",
    concentration > 0.38
      ? `Risk note: topic concentration is ${Math.round(concentration * 100)}%; vary the angle or use the second topic next.`
      : "Risk note: no obvious red line; keep the next post sharp and retellable.",
    requiredFiles ? `Source coverage: ${foundFiles}/${requiredFiles} local data files found.` : "Source coverage: using imported tracker."
  ].join("\n\n");
}

function renderCompiled() {
  const posts = normalizePosts(state.tracker);
  const moves = nextMoveItems(posts)
    .map((move) => `1. ${move}`)
    .join("\n");
  els.nextMoveBox.innerHTML = moves
    ? renderMarkdown(moves)
    : `<p class="muted">${escapeHtml(text("noNextMoves"))}</p>`;
  els.accountStateBox.innerHTML = renderMarkdown(accountStateSummary(posts));
}

function previewMarkdown(value, emptyText) {
  if (!value) return `<p class="muted">${escapeHtml(emptyText)}</p>`;
  const cleaned = value.trim();
  const trimmed = cleaned.length > 2400 ? `${cleaned.slice(0, 2400)}\n\n…` : cleaned;
  return renderMarkdown(trimmed);
}

function renderCompanions() {
  els.postsByDateBox.innerHTML = previewMarkdown(state.companions.postsByDate, text("noPostsByDate"));
  els.postsByTopicBox.innerHTML = previewMarkdown(state.companions.postsByTopic, text("noPostsByTopic"));
  els.commentsBox.innerHTML = previewMarkdown(state.companions.comments, text("noComments"));
}

function render() {
  applyStaticTranslations();
  const allPostsList = normalizePosts(state.tracker);
  renderFilters(allPostsList);
  const posts = filteredPosts(allPostsList);
  if (!posts.find((post) => post.id === state.selectedPostId)) {
    state.selectedPostId = posts[0]?.id || null;
  }
  renderCommandCenter(allPostsList);
  renderSummary(posts);
  renderPosts(posts);
  renderDetail(posts);
  renderTopics(posts);
  renderInsightGrid(posts);
  renderTrend(posts);
  renderPerformanceBars(posts);
  renderAnalysisBlocks(posts);
  renderCompiled();
  renderCompanions();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function readJsonFile(file) {
  const text = await file.text();
  return JSON.parse(text);
}

async function readTextFile(handle, name) {
  try {
    const fileHandle = await handle.getFileHandle(name);
    return await (await fileHandle.getFile()).text();
  } catch {
    return "";
  }
}

async function readCompiledFile(root, pathParts) {
  try {
    let handle = root;
    for (let index = 0; index < pathParts.length - 1; index += 1) {
      handle = await handle.getDirectoryHandle(pathParts[index]);
    }
    return await readTextFile(handle, pathParts[pathParts.length - 1]);
  } catch {
    return "";
  }
}

els.trackerInput.addEventListener("change", async (event) => {
  const [file] = event.target.files || [];
  if (!file) return;
  try {
    state.tracker = await readJsonFile(file);
    state.source = file.name;
    state.selectedPostId = null;
    render();
  } catch (error) {
    window.alert(text("trackerReadError", error.message));
  }
});

els.folderButton.addEventListener("click", async () => {
  if (!window.showDirectoryPicker) {
    window.alert(text("serverFolderUnavailable"));
    return;
  }

  try {
    const root = await window.showDirectoryPicker();
    const trackerText = await readTextFile(root, "threads_daily_tracker.json");
    if (trackerText) {
      state.tracker = JSON.parse(trackerText);
      state.source = root.name || "Workspace folder";
      state.selectedPostId = null;
    }

    const nextMoves = await readCompiledFile(root, ["compiled", "next_move_queue.md"]);
    const accountState = await readCompiledFile(root, ["compiled", "account_state.md"]);
    state.compiled.nextMoves = nextMoves || state.compiled.nextMoves;
    state.compiled.accountState = accountState || state.compiled.accountState;
    render();
  } catch (error) {
    if (error.name !== "AbortError") {
      window.alert(text("folderReadError", error.message));
    }
  }
});

els.sampleButton.addEventListener("click", () => {
  const language = state.language;
  state = {
    tracker: sampleTracker,
    source: "sample",
    language,
    selectedPostId: null,
    compiled: {
      nextMoves: "行動 1：加強可被轉述的受眾心理洞察。\n行動 2：每篇先抓一個具體壓力點，再談框架。\n行動 3：不要重複提醒 AI 味，除非有新鮮例子。",
      accountState: "演算法狀態：已有可用訊號基礎。\n受眾狀態：最強內容通常能說中讀者的隱形壓力。\n反 AI 狀態：短、冷靜、不過度解釋的文字質地最好。",
    },
    companions: {
      postsByDate: "",
      postsByTopic: "",
      comments: "",
    },
    manifest: null,
    filters: {
      search: "",
      topic: "all",
      type: "all",
      date: "all",
    },
  };
  render();
});

els.languageToggle.addEventListener("click", () => {
  state.language = state.language === "zh" ? "en" : "zh";
  window.localStorage.setItem("akPanelLanguage", state.language);
  render();
});

els.sortSelect.addEventListener("change", render);
els.searchInput.addEventListener("input", () => {
  state.filters.search = els.searchInput.value;
  render();
});
els.topicFilter.addEventListener("change", () => {
  state.filters.topic = els.topicFilter.value;
  render();
});
els.typeFilter.addEventListener("change", () => {
  state.filters.type = els.typeFilter.value;
  render();
});
els.dateFilter.addEventListener("change", () => {
  state.filters.date = els.dateFilter.value;
  render();
});

document.querySelectorAll("[data-ai-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const post = normalizePosts(state.tracker).find((item) => item.id === state.selectedPostId);
    if (!post) return;
    const action = button.getAttribute("data-ai-action");
    const command = action === "analyze" ? "/analyze" : action === "predict" ? "/predict" : "/review";
    const metrics = postMetrics(post);
    els.aiPromptBox.value = `${command}\n\nPost ID: ${post.id || ""}\nCreated at: ${post.created_at || ""}\nMetrics: views=${metrics.views}, likes=${metrics.likes}, replies=${metrics.replies}, reposts=${metrics.reposts}, shares=${metrics.shares}\nTopics: ${(post.topics || []).join(", ")}\n\n${post.text || ""}`;
    els.aiPromptBox.focus();
    els.aiPromptBox.select();
  });
});

els.rebuildButton.addEventListener("click", async () => {
  els.rebuildButton.disabled = true;
  const original = els.rebuildButton.lastElementChild.textContent;
  els.rebuildButton.lastElementChild.textContent = "...";
  try {
    const response = await fetch("/__action/rebuild-compiled", { method: "POST" });
    const result = await response.json();
    els.rebuildButton.lastElementChild.textContent = response.ok && result.ok ? text("rebuildOk") : text("rebuildFail");
    if (response.ok && result.ok) {
      await autoLoadServedWorkspace();
      render();
    }
  } catch {
    els.rebuildButton.lastElementChild.textContent = text("rebuildFail");
  } finally {
    window.setTimeout(() => {
      els.rebuildButton.disabled = false;
      els.rebuildButton.lastElementChild.textContent = original;
    }, 1800);
  }
});

async function fetchText(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) return "";
    return await response.text();
  } catch {
    return "";
  }
}

async function autoLoadServedWorkspace() {
  if (!["http:", "https:"].includes(window.location.protocol)) return;

  const manifestText = await fetchText("/__data/manifest.json");
  if (manifestText) {
    try {
      state.manifest = JSON.parse(manifestText);
    } catch {
      state.manifest = null;
    }
  }

  const trackerText = (await fetchText("/__data/tracker.json")) || (await fetchText("../threads_daily_tracker.json"));
  if (trackerText) {
    try {
      state.tracker = JSON.parse(trackerText);
      state.source = "server";
      state.selectedPostId = null;
    } catch {
      state.source = "sample";
    }
  }

  const nextMoves = (await fetchText("/__data/text/next_move_queue.md")) || (await fetchText("../compiled/next_move_queue.md"));
  const accountState = (await fetchText("/__data/text/account_state.md")) || (await fetchText("../compiled/account_state.md"));
  const brandVoice = await fetchText("/__data/text/brand_voice.md");
  const styleGuide = await fetchText("/__data/text/style_guide.md");
  const postsByDate = await fetchText("/__data/text/posts_by_date.md");
  const postsByTopic = await fetchText("/__data/text/posts_by_topic.md");
  const comments = await fetchText("/__data/text/comments.md");
  state.compiled.nextMoves = nextMoves || state.compiled.nextMoves;
  state.compiled.accountState = accountState || brandVoice || styleGuide || state.compiled.accountState;
  state.companions.postsByDate = postsByDate || state.companions.postsByDate;
  state.companions.postsByTopic = postsByTopic || state.companions.postsByTopic;
  state.companions.comments = comments || state.companions.comments;
}

async function init() {
  await autoLoadServedWorkspace();
  render();
}

init();
