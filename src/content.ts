// 中文站点内容

export const SITE = {
  name: "森林",
  nameLatin: "Senlin",
  role: "乐启享合伙人 · 副校长",
  kicker: "少儿编程教师 / AI 实战讲师 / 独立开发者",
  badge: "2026 课程招生中",
  statement:
    "我是森林，乐启享合伙人兼副校长，坐标湖北宜昌。这六年，我一边在教室里带学生写代码、造机器人，一边给企业和普通人做 AI 培训——左边是孩子的课堂，右边是真交付的系统与智能体。",
  heroVideos: [
    "/media/videos/hero-teaching.mp4",
    "/media/videos/hero-studio.mp4",
  ],
};

export const NAV_ITEMS = [
  { id: "story", label: "关于我" },
  { id: "practice", label: "教学方向" },
  { id: "deliver", label: "交付成果" },
  { id: "courses", label: "课程体系" },
  { id: "scene", label: "真实现场" },
  { id: "video", label: "作品视频" },
  { id: "apps", label: "我的产品" },
  { id: "mentor", label: "收徒" },
];

export type Track = {
  id: string;
  label: string;
  note: string;
  grid: string;
  cards: ExpertiseCard[];
};

export type ExpertiseCard = {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  bullets: string[];
  media: string;
  kind: "image";
  accent: string;
  badge?: string;
};

// 两条轨道：少儿编程造物 / 成人 AI 实战与交付
export const TRACKS: Track[] = [
  {
    id: "k12",
    label: "少儿 · 编程与造物",
    note: "8–18 岁 · 课堂项目式推进",
    grid: "sm:grid-cols-2",
    cards: [
      {
        id: "scene",
        number: "00",
        title: "教学现场",
        summary: "一个课堂、一个舞台、一个创作者。",
        description: "",
        bullets: ["课堂幻灯片", "学生作品镜头", "每届人都上台"],
        media: "/media/scene/prompt-class-wide.jpg",
        kind: "image" as const,
        accent: "cream",
      },
      {
        id: "python",
        number: "01",
        title: "Python · 项目式",
        summary: "从一行代码到一份作品。",
        description: "Python 入门像是一座一座小岛。每座岛上都有任务、有同伴、有可带走的作品。",
        bullets: ["从第一行到第一个作品", "关卡式进阶", "随手临场式指导"],
        media: "/media/scenes/python-path.jpg",
        kind: "image" as const,
        accent: "mint",
      },
      {
        id: "cpp",
        number: "02",
        title: "C++ · NOI / CSP",
        summary: "从爱好走向系统。",
        description: "从一道题、一份训练，走到一个能上台面的自己。",
        bullets: ["从爱好走向系统", "习题与复盘", "信奥竞赛指导教师"],
        media: "/media/scenes/cpp-noi-path.jpg",
        kind: "image" as const,
        accent: "cyan",
        badge: "信奥 · 竞赛指导",
      },
      {
        id: "robotics",
        number: "03",
        title: "机器人 · 赛场",
        summary: "从一台机器到一场比赛。",
        description: "从一台机器到一场比赛。拼装、调试、上台，孩子学到的远不止是机械。",
        bullets: ["从零拼装到调试", "队友间的思考", "WRC 赛场实战"],
        media: "/media/gallery/wrc7.jpg",
        kind: "image" as const,
        accent: "amber",
      },
    ],
  },
  {
    id: "adult",
    label: "成人 · AI 实战与交付",
    note: "职场人 · 创业者 · 大学生",
    grid: "md:grid-cols-3",
    cards: [
      {
        id: "ai-class",
        number: "04",
        title: "AI 实战课堂",
        summary: "把 AI 用进真实的工作。",
        description:
          "Codex & WorkBuddy 全流程实战：提示词工程、Agent 原理、知识库搭建、自动化工作流，用完就能交付。",
        bullets: ["提示词工程", "Agent 与工作流", "知识库搭建"],
        media: "/media/scene/prompt-wall.jpg",
        kind: "image" as const,
        accent: "cyan",
      },
      {
        id: "corp",
        number: "05",
        title: "企业内训",
        summary: "按岗位定制，不讲空话。",
        description:
          "为企业员工做定制内训，围绕真实任务：文档表格自动化、资料与知识库、岗位专属提示词，把工具落到工位上。",
        bullets: ["岗位任务拆解", "定制课程与演练", "课后落地陪跑"],
        media: "/media/scene/demo-outdoor.jpg",
        kind: "image" as const,
        accent: "violet",
      },
      {
        id: "office",
        number: "06",
        title: "职场 AI 提效",
        summary: "零基础也能用起来。",
        description:
          "给普通人普及 AI：写材料、做表格、剪视频、做海报，把 AI 变成日常生产力，而不是新闻里的一个词。",
        bullets: ["办公场景实操", "从 0 到 1 交付", "一人也能上手"],
        media: "/media/scene/student-lab.jpg",
        kind: "image" as const,
        accent: "mint",
      },
    ],
  },
];

// 两个抖音账号：主号 + AI 四小只
export const DOUYIN_CHANNELS = [
  {
    id: "senlin",
    name: "@愈见森林",
    alias: "森林老师 · 主号",
    douyinId: "79212093120",
    href: "https://www.douyin.com/user/MS4wLjABAAAAxHHFo-1JZJ3GPL_HYbgUo6X7hN5jWrk5wJUYl42rgW0",
    qrSrc: "/media/qr/douyin-code.jpg",
    qrTone: "light" as const,
    subtitle: "持续分享课堂工具、学习资源与应用作品。",
    followers: "922",
    likes: "9062",
    accent: "primary",
  },
  {
    id: "ai4k",
    name: "@AI 四小只",
    alias: "4 个少年 AI 实战",
    douyinId: "zl_20201120",
    href: "https://www.douyin.com/user/MS4wLjABAAAAQg5TgrTfWN0FphobcDhritBsLl8V3SS5H3ckUfdrXrI",
    qrSrc: "/media/qr/ai4k-official-mark.png",
    qrTone: "brand" as const,
    subtitle: "做产品、打比赛、训模型：把 AI 用在真事上。",
    followers: "4408",
    likes: "2.6w",
    accent: "mint",
  },
];

export const VIDEOS = [
  { id: "personal-site", title: "个人站搭建全流程", poster: "/media/posters/personal-site.jpg", src: "/media/videos/personal-site.mp4", duration: "01:24", tag: "网站 · 项目" },
  { id: "interactive-knowledge", title: "互动知识课堂", poster: "/media/posters/interactive-knowledge.jpg", src: "/media/videos/interactive-knowledge.mp4", duration: "02:08", tag: "课堂记录" },
  { id: "color-english", title: "色彩英语 · AI 演示", poster: "/media/posters/color-english.jpg", src: "/media/videos/color-english.mp4", duration: "01:47", tag: "人工智能 · 教学" },
];

// ── 交付成果：真实做出来、系统在被用的东西 ──────────────────────────
export type DeliverableItem = {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  meta?: string;
  href?: string;
};

export type DeliverableGroup = {
  id: string;
  index: string;
  label: string;
  title: string;
  intro: string;
  accent: string;
  items: DeliverableItem[];
};

export const DELIVERABLE_GROUPS: DeliverableGroup[] = [
  {
    id: "systems",
    index: "01",
    label: "AI 系统与智能体",
    title: "交付过的系统，不止是演示",
    intro:
      "有人每天在用的东西才算交付。下面两件是真实客户项目：从模型训练到业务侧对接，从爆款拆解到批量生产。",
    accent: "cyan",
    items: [
      {
        id: "yolo",
        name: "YOLO 视觉识别系统",
        desc:
          "基于 YOLO 系列模型搭建的实时视觉识别系统。完成数据集处理、模型训练与迭代、推理服务部署，并把检测结果以结构化形式对接进业务侧流程，图片与视频双路稳定检出。",
        tags: ["目标检测", "模型训练与调优", "推理服务部署"],
        meta: "真实交付",
      },
      {
        id: "douyin-agent",
        name: "爆款卖货视频复刻工作流智能体",
        desc:
          "拆解抖音爆火卖货视频的脚本结构、镜头节奏与钩子设计，做成一条可复用的工作流智能体：丢进一条爆款，产出可二次创作的脚本、分镜与素材方案，批量跑不靠人肉。",
        tags: ["工作流智能体", "爆款结构拆解", "批量内容生产"],
        meta: "真实交付",
      },
    ],
  },
  {
    id: "training",
    index: "02",
    label: "企业与公众培训",
    title: "把 AI 带进真实的工作流",
    intro:
      "不做概念搬运。面向企业员工和普通人的两套训练，讲的全是今天回去就能用的做法。",
    accent: "mint",
    items: [
      {
        id: "corp-training",
        name: "企业员工 AI 培训",
        desc:
          "为企业员工做定制内训。先把岗位上的真实任务拆出来，再围绕它设计课程：文档与表格自动化、部门知识库搭建、提示词工程、AI 辅助办公流程演练。课后继续陪跑，确保真的落到工位上。",
        tags: ["企业内训", "岗位任务定制", "落地陪跑"],
        meta: "已交付",
      },
      {
        id: "public-training",
        name: "普通人 AI 办公提效培训",
        desc:
          "面向大众的 AI 普及课：AI 到底是什么、怎么用、用在哪些日常活儿上——写材料、整表格、剪视频、做海报、搭个人知识库。不需要技术背景，学完就能把 AI 变成日常生产力。",
        tags: ["公众普及", "办公提效", "零基础可上手"],
        meta: "常年开课",
      },
    ],
  },
];

// ── 课程体系：三门真实在开的课 ──────────────────────────────────────
export type Course = {
  id: string;
  stage: string;
  title: string;
  audience: string;
  lessons: string;
  poster: string;
  summary: string;
  modules: string[];
  accent: string;
};

export const COURSES: Course[] = [
  {
    id: "magic-camp",
    stage: "第一阶段",
    title: "AI 魔法启蒙营",
    audience: "8–16 岁 · 零基础",
    lessons: "16 节课",
    poster: "/media/posters/ai-magic-camp.jpg",
    summary:
      "让孩子从「AI」开始，爱上创造。六大趣味主题，从和 AI 聊第一句开始，到用 vibe coding 做出人生第一个互动小游戏。",
    modules: ["AI 初体验", "提示词魔法", "AI 创意绘画", "故事创作", "动画小剧场", "AI 编程入门"],
    accent: "amber",
  },
  {
    id: "humanities-camp",
    stage: "第二阶段",
    title: "AI 人文数字探索营",
    audience: "9–16 岁 · 跨学科",
    lessons: "16 节课",
    poster: "/media/posters/ai-humanities-camp.jpg",
    summary:
      "把 AI 用起来，让知识变成作品。六大主题都在真实场景里用 AI 创造：修复老照片、复原古画、画古诗意境、搭自己的小工具。",
    modules: ["老照片修复", "古画数字复原", "古诗意境画", "英语对话工具", "个人记账工具", "智能问答助手"],
    accent: "violet",
  },
  {
    id: "ai-combat",
    stage: "成人 · 职场",
    title: "Codex & WorkBuddy AI 实战",
    audience: "职场人 · 创业者 · 大学生",
    lessons: "10 项实战能力",
    poster: "/media/posters/ai-combat-course.jpg",
    summary:
      "从入门到实战交付，用 AI 解决真实工作问题。十项能力覆盖自动化办公、知识库、Agent、提示词工程、智能体与生产级建站，学完直接交付项目。",
    modules: [
      "自动化办公",
      "个人知识库搭建",
      "理解 Agent 原理",
      "专业提示词工程",
      "生产级网站 / 小程序",
      "智能体产出课件",
      "个性化工作台",
      "自动化工作流",
      "视频剪辑与制作",
      "项目实战交付",
    ],
    accent: "cyan",
  },
];

// ── 真实现场：课堂与研讨会照片 ──────────────────────────────────────
export type ScenePhoto = {
  src: string;
  title: string;
  desc: string;
  tag: string;
  span: string;
};

export const SCENE_PHOTOS: ScenePhoto[] = [
  {
    src: "/media/scene/prompt-class-wide.jpg",
    title: "提示词工程 · 实战课堂",
    desc: "同一个问题，两种问法。投影上是对比，桌面上是每个人自己的答案。",
    tag: "成人 · AI 赋能",
    span: "md:col-span-4",
  },
  {
    src: "/media/scene/prompt-wall.jpg",
    title: "工作坊现场",
    desc: "学员跟着屏幕上的对比，一边改自己的提问，一边改自己的流程。",
    tag: "实战工作坊",
    span: "md:col-span-2",
  },
  {
    src: "/media/scene/student-lab.jpg",
    title: "少年造物课",
    desc: "学生在自己那台机器上动手，切模型、贴纹理、一点点把想法变成形状。",
    tag: "少儿 · 3D 造物",
    span: "md:col-span-2",
  },
  {
    src: "/media/scene/demo-outdoor.jpg",
    title: "宜小智工作台 · 现场演示",
    desc: "宜昌市中小学生人工智能教育成果交流研讨会，工作台现场跑通全流程。",
    tag: "成果交流会",
    span: "md:col-span-2",
  },
  {
    src: "/media/scene/demo-3d.jpg",
    title: "从一句话到 3D 模型",
    desc: "现场生成、随时可打印。课堂里的想法，走出屏幕就成了实物。",
    tag: "真实交付",
    span: "md:col-span-2",
  },
];

// ── 收徒：常年开放的三条带教路径 ────────────────────────────────────
export type MentorPath = {
  id: string;
  title: string;
  audience: string;
  desc: string;
  points: string[];
  accent: string;
};

export const MENTORSHIP = {
  badge: "常年收徒",
  title: "从第一次写代码，到把 AI 用进工作里",
  intro:
    "实际带过的人不少，抖音两个账号合计 5000+ 关注，几乎每天都有人私信问「怎么学」。三条路径，按你现在的问题选一条走。",
  paths: [
    {
      id: "kids",
      title: "少儿编程启蒙",
      audience: "8–16 岁 · 零基础",
      desc: "Python、C++、机器人、AI 启蒙，课堂项目式推进，每学期交付一个能上台的作品。",
      points: ["每学期一个作品", "课堂同款项目", "有比赛就上场"],
      accent: "mint",
    },
    {
      id: "college",
      title: "大学生 · AI 提效",
      audience: "在校大学生 · 竞赛 / 考研 / 求职",
      desc: "把 AI 接进你的专业：课程作业、资料整理、比赛项目、求职作品集，从会用工具到能交付。",
      points: ["学业与竞赛", "简历作品集", "一人也能起步"],
      accent: "cyan",
    },
    {
      id: "pro",
      title: "职场人 · AI 实战",
      audience: "职场人士 · 创业者 · 自由职业者",
      desc: "从办公自动化到自建智能体与工作流，把一件事真的做成，交付到能用为止。",
      points: ["真实业务场景", "从 0 到 1 交付", "课后持续答疑"],
      accent: "amber",
    },
  ] satisfies MentorPath[],
  cta: "聊聊你想做的事",
};

export type DouyinWork = {
  id: string;
  title: string;
  date: string;
  likes: string;
  favorites?: string;
  plays?: string;
  cover?: string;
  tag: string;
};

// 抖音作品：2026-11-04 实抓两个账号主页，取最新与高互动各半
export const DOUYIN_WORKS: Record<string, DouyinWork[]> = {
  senlin: [
    {
      id: "7703971298678882441",
      cover: "/media/douyin/7703971298678882441.jpg",
      title: "AI 个人档案：换任何 AI 工具都不用反复自我介绍",
      date: "2026-11-03",
      likes: "9",
      favorites: "6",
      tag: "最新",
    },
    {
      id: "7703211002610855795",
      cover: "/media/douyin/7703211002610855795.jpg",
      title: "图片转 3D 模型，这个技能真的超好用",
      date: "2026-11-01",
      likes: "42",
      favorites: "36",
      tag: "最新",
    },
    {
      id: "7702450558066671347",
      cover: "/media/douyin/7702450558066671347.jpg",
      title: "AI 自动化端到端测试，加上 egolite 太舒服了",
      date: "2026-10-30",
      likes: "79",
      favorites: "61",
      tag: "高互动",
    },
    {
      id: "7678758230135639667",
      cover: "/media/douyin/7678758230135639667.jpg",
      title: "Obsidian 知识库搭建全步骤，卡帕西同款",
      date: "2026-08-28",
      likes: "1287",
      favorites: "1185",
      tag: "爆款",
    },
    {
      id: "7682429085759720945",
      cover: "/media/douyin/7682429085759720945.jpg",
      title: "南大教授说没 token 就可以退学了？token 真有这么重要吗",
      date: "2026-09-06",
      likes: "57",
      favorites: "11",
      plays: "4294",
      tag: "高播放",
    },
    {
      id: "7676155101807122414",
      cover: "/media/douyin/7676155101807122414.jpg",
      title: "一步步教你搭个性化工作台",
      date: "2026-08-23",
      likes: "303",
      favorites: "187",
      tag: "高互动",
    },
  ],
  ai4k: [
    {
      id: "7676115863665333169",
      cover: "/media/douyin/7676115863665333169.jpg",
      title: "刚接触 AI 的朋友，可以先试试搭个人知识库",
      date: "2026-08-21",
      likes: "1.5w",
      favorites: "1.2w",
      plays: "46.7w",
      tag: "爆款",
    },
    {
      id: "7678756921637716465",
      cover: "/media/douyin/7678756921637716465.jpg",
      title: "20 多万人在看的知识库搭建思路，详细版来啦",
      date: "2026-08-28",
      likes: "6711",
      favorites: "5773",
      plays: "18.7w",
      tag: "爆款",
    },
    {
      id: "7688227097130823601",
      cover: "/media/douyin/7688227097130823601.jpg",
      title: "提升 AI 审美方法来了，你们看看可行不",
      date: "2026-09-22",
      likes: "202",
      favorites: "148",
      plays: "8390",
      tag: "高互动",
    },
    {
      id: "7700608943311332091",
      cover: "/media/douyin/7700608943311332091.jpg",
      title: "想问下个人知识库搭建完就要一直更新吗",
      date: "2026-10-25",
      likes: "129",
      favorites: "54",
      plays: "2928",
      tag: "高互动",
    },
    {
      id: "7699866315155411377",
      cover: "/media/douyin/7699866315155411377.jpg",
      title: "把 AI 装进 U 盘里？这个真的有用吗",
      date: "2026-10-23",
      likes: "112",
      favorites: "48",
      plays: "4431",
      tag: "高互动",
    },
    {
      id: "7703566629574186673",
      cover: "/media/douyin/7703566629574186673.jpg",
      title: "分享普通人用 AI 的好用小技巧",
      date: "2026-11-02",
      likes: "26",
      favorites: "8",
      plays: "657",
      tag: "最新",
    },
  ],
};

export type AppLink = { label: string; href: string };

export type App = {
  id: string;
  name: string;
  href: string;
  media: string;
  screenshot?: string;
  kind: "image" | "video";
  category: string;
  kicker: string;
  description: string;
  highlights: string[];
  accent: string;
  badges?: string[];
  links?: AppLink[];
  action?: string;
};

// 代表作：自主产品三件 + GitHub 上的开源项目三件
export const APPS: App[] = [
  {
    id: "yixiaozhi",
    name: "宜小智工作台",
    href: "https://github.com/zhaosenlin12-creator/yxz-3d",
    media: "/media/apps/yixiaozhi.jpg",
    kind: "image",
    category: "AI 创作工作台",
    kicker: "我的产品 · 已开源上线",
    description:
      "学生对着机器人助手「宜小智」把想法说清楚，工作台就依次给出方案、生成预览图、在画布上批注，再导出 STL / GLB 模型，直接接本机 3D 打印与激光切割。",
    highlights: ["对话式创作", "预览图 + 画布批注", "STL / GLB 导出", "对接 3D 打印"],
    accent: "cyan",
    badges: ["TypeScript"],
    action: "看源码与说明",
    links: [
      { label: "新闻报道", href: "https://mp.weixin.qq.com/s/TnXYkqoGI2mw22PX2M_Hfg" },
      { label: "视频号现场", href: "https://weixin.qq.com/sph/Aq6kciu0I4" },
    ],
  },
  {
    id: "gaokao-simulator",
    name: "高考志愿填报模拟器",
    href: "https://github.com/zhaosenlin12-creator/gaokao_design",
    media: "/media/apps/gaokao-simulator.jpg",
    kind: "image",
    category: "数据可视化",
    kicker: "我的产品 · 已开源上线",
    description:
      "把全国 1596 所大学铺在古风山河地图上。选省份、科目，输分数或位次，立刻按冲、稳、保三档给出院校推荐，红黄绿三色旗帜直接在地图上亮起来。",
    highlights: ["1596 所院校上图", "冲 / 稳 / 保三档", "历年录取位次", "志愿表收藏"],
    accent: "amber",
    badges: ["MapLibre GL"],
    action: "看源码与说明",
  },
  {
    id: "animal-cup",
    name: "动物足球 Animal Cup",
    href: "https://github.com/zhaosenlin12-creator/animal-world-cup",
    media: "/media/apps/animal-cup.jpg",
    kind: "image",
    category: "AI 模拟游戏",
    kicker: "我的产品 · 已开源上线",
    description:
      "AI 动物足球模拟器。8 支动物国家队任你挑，2-3-1 等阵型自由排布，AI 全自动跑一整场，也能自己上手操控 7v7；局域网扫个码，手机就能变手柄。",
    highlights: ["8 支动物国家队", "AI 模拟 / 亲自操控", "手机扫码当手柄", "实时控球率统计"],
    accent: "mint",
    badges: ["Next.js 15", "115★ 上游"],
    action: "看源码与说明",
    links: [{ label: "上游原版 115★", href: "https://github.com/NeoXu954/animal-world-cup" }],
  },
  {
    id: "vibe-know-skill",
    name: "Vibe 知识大赏 · 视频生成 Skill",
    href: "https://github.com/zhaosenlin12-creator/vibe-know--skill",
    media: "/media/apps/vibe-know.jpg",
    kind: "image",
    category: "AI 视频 Skill",
    kicker: "开源项目 · 14★",
    description:
      "把选题丢进去，自动出文案、分镜、动效、字幕与声音，直接渲成能发的 mp4。仓库里自带《如何像刷短视频一样对学习上瘾》《习得性无助》《熵增》等 100 秒级完整成片工程。",
    highlights: ["文案分镜自动生成", "字幕动效配音", "100 秒完整成片", "Python + Playwright"],
    accent: "violet",
    badges: ["14★ Star", "Python"],
    action: "看源码与说明",
  },
  {
    id: "create-photo-shop",
    name: "照片纪念品店",
    href: "https://github.com/zhaosenlin12-creator/create-photo-shop",
    media: "/media/apps/create-photo-shop.jpg",
    kind: "image",
    category: "3D 生成式站点",
    kicker: "开源项目 · 可在线体验",
    description:
      "把一组照片变成一间能漫步的 3D 纪念品店：推门进去，抬头看挂饰，拿起商品在手里把玩，再回头和启发它的照片一一对照。示例店「落日工作室」有 33 幅插画、101 款商品。",
    highlights: ["无后端纯静态", "WASD 漫步 / 拿起把玩", "101 款 3D 商品", "照片衍生率 100%"],
    accent: "rose",
    badges: ["Three.js", "Skill 工程"],
    action: "看源码与说明",
    links: [{ label: "在线预览", href: "https://zhaosenlin12-creator.github.io/create-photo-shop/" }],
  },
  {
    id: "51codetodo",
    name: "51CodeTodo",
    href: "https://github.com/zhaosenlin12-creator/51CodeTodo",
    media: "/media/apps/51codetodo.jpg",
    kind: "image",
    category: "效率工具 · 桌面端",
    kicker: "开源项目 · 可下载安装",
    description:
      "面向个人与小团队的轻量待办工具。本地记录、语音与截图智能整理、桌面上会换表情的浮球提醒，还能自建零依赖云端服务端做多人同步与看板协作。",
    highlights: ["语音 / 截图智能整理", "动态表情浮球", "零依赖同步服务端", "Windows / 安卓安装包"],
    accent: "blue",
    badges: ["Tauri", "Rust + React"],
    action: "看源码与说明",
    links: [{ label: "下载安装包", href: "https://github.com/zhaosenlin12-creator/51CodeTodo/releases/latest" }],
  },
];

// 乐启享平台上线的其他应用
export const MORE_APPS = [
  { id: "python-adventure", name: "Python 冒险岛", href: "https://game.codebn.cn/", tag: "冒险小岛" },
  { id: "class-system", name: "class 教学系统", href: "https://class.codebn.cn/", tag: "课堂中枢" },
  { id: "ai-classroom", name: "AI 互动课堂", href: "https://ai.codebn.cn/", tag: "AI 玩练场" },
  { id: "code-research", name: "Code Research", href: "https://game.codebn.cn/code-research", tag: "作品集" },
  { id: "leqi-pets", name: "乐启宠物", href: "https://camp.codebn.cn/", tag: "养成营地" },
  { id: "typing-lab", name: "乐启享打字", href: "https://game.codebn.cn/typing/index.html", tag: "打字小课" },
  { id: "english-game", name: "英语游戏", href: "https://www.gamestolearnenglish.com/", tag: "边玩边学" },
  { id: "sim-lab", name: "仿真模拟实验室", href: "https://phet.colorado.edu/zh_CN/", tag: "动手实验" },
];

export const GITHUB_PROFILE = {
  href: "https://github.com/zhaosenlin12-creator",
  handle: "@zhaosenlin12-creator",
  note: "90+ 个开源仓库",
};

export const GALLERY_IMAGES = [
  { src: "/media/gallery/wrc7.jpg", alt: "WRC 训练体系" },
  { src: "/media/gallery/python-course.jpg", alt: "Python 课程" },
  { src: "/media/gallery/cpp-course.jpg", alt: "C++ 竞赛路径" },
  { src: "/media/gallery/robot-detail1.jpg", alt: "机器人项目细节" },
  { src: "/media/gallery/4e7cde1d67137f31dbbaceea09b3ba97.jpg", alt: "课堂辅导瞬间" },
  { src: "/media/gallery/5532032ec1ecd25b5aab600c3c66653e.jpg", alt: "工作坊瞬间" },
  { src: "/media/gallery/7ea7aec2c2fc24cdff315baf30e19994.jpg", alt: "学生作品展示" },
  { src: "/media/gallery/bf42704d89c36b8f7175792f2c6406df.jpg", alt: "幕后现场" },
  { src: "/media/gallery/03e58ed3352bb2c5b6c34475e3ef5c05.jpg", alt: "教学现场" },
  { src: "/media/gallery/11.jpg", alt: "学生作品" },
  { src: "/media/gallery/4c034334db22d80ecae7cd665b142e62.jpg", alt: "课堂剪影" },
  { src: "/media/gallery/ebe3db8e9e230e42fa4a3821dc906ca8.jpg", alt: "活动现场" },
];

// KPI: 使用全中文，避免任何西文字体回退导致的乱码。
export const KPI = [
  { value: "06", suffix: "+", label: "年一线教学" },
  { value: "1000", suffix: "+", label: "累计学员" },
  { value: "120", suffix: "+", label: "上线作品" },
  { value: "10", suffix: " 项", label: "AI 实战能力" },
];

export const CONTACT = {
  channels: [
    { src: "/media/qr/wechat.jpg", label: "微信", sub: "扫码加我" },
    { src: "/media/qr/douyin.jpg", label: "抖音", sub: "看作品与更新" },
  ],
  phone: "13071210697",
  site: "codebn.cn",
  place: "宜昌市乐启享科创中心",
};

export const HEAD_LINES = [
  { text: "我叫森林。", italic: false },
  { text: "教孩子写代码，", italic: false },
  { text: "也教大人用 AI 干活。", italic: true },
];

export const STORY = [
  "我是森林，乐启享合伙人兼副校长。六年里，我在宜昌带少儿编程，也给企业和普通人做 AI 培训——左边是孩子的课堂，右边是真实交付的系统和智能体。",
  "我能拿出的不只是课：YOLO 视觉识别系统、自动复刻抖音爆款卖货视频的工作流智能体，还有从 0 到 1 自己做出来的宜小智工作台、高考志愿填报模拟器和动物足球。",
  "课堂上，AI 不是新闻里的一个词，是学生桌面上的一件工具；工作坊里，AI 也不是概念，是把表格、文档、剪辑、交付真真切切跑通一遍。",
];

export const BIO_LINES = [
  "我叫森林，",
  "一位手艺人出身的教育者。",
  "六年来，我教孩子写代码，也教大人把 AI 用起来。",
];

export const BIO_PARAGRAPH =
  "六年来，我陪 8 到 18 岁的孩子写代码、上台、讲自己的故事，也陪企业和普通人把 AI 装进日常流程。每一届人走出教室时，手里都握着一样东西——一个他自己造出来、愿意拿给世界看的小作品。";
