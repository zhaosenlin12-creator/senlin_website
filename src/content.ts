// 中文站点内容

export const SITE = {
  name: "森林",
  nameLatin: "Senlin",
  role: "乐启享合伙人 · 副校长",
  kicker: "教师 / 作者 / 剧场主理人",
  badge: "2026 课程招生中",
  statement:
    "我是森林，乐启享合伙人兼副校长，坐标湖北宜昌。这六年，我一边走在高中、创室、赛场里，一边把 Python、C++、网页与人工智能变成学生能拿起来、能带走的东西。",
  heroVideos: [
    "/media/videos/hero-teaching.mp4",
    "/media/videos/hero-studio.mp4",
  ],
};

export const NAV_ITEMS = [
  { id: "story", label: "关于我" },
  { id: "practice", label: "教学方向" },
  { id: "gallery", label: "穹顶画廊" },
  { id: "video", label: "作品视频" },
  { id: "apps", label: "项目应用" },
  { id: "contact", label: "联系" },
];

export const EXPERTISE = [
  {
    id: "video",
    number: "00",
    title: "教学现场",
    summary: "一个课堂、一个舞台、一个创作者。",
    description: "",
    bullets: ["课堂幻灯片", "学生作品镜头", "每届人都上台"],
    media: "/media/gallery/4e7cde1d67137f31dbbaceea09b3ba97.jpg",
    kind: "image" as const,
  },
  {
    id: "python",
    number: "01",
    title: "Python · 项目式",
    summary: "从一行代码到一份作品。",
    description: "Python 入门像是一座一座小岛。每座岛上都有任务、有同伴、有可带走的作品。",
    bullets: ["从第一行到第一个作品", "关卡式进阶", "随身临场式指导"],
    media: "/media/scenes/python-path.jpg",
    kind: "image" as const,
  },
  {
    id: "cpp",
    number: "02",
    title: "C++ · NOI / CSP",
    summary: "从爱好走向系统。",
    description: "从一道题、一份训练，走到一个能上台面的自己。",
    bullets: ["从爱好走向系统", "习题与复盘", "从爱好到出成果"],
    media: "/media/scenes/cpp-noi-path.jpg",
    kind: "image" as const,
  },
  {
    id: "ai",
    number: "03",
    title: "人工智能课堂",
    summary: "让 AI 成为课堂的一部分。",
    description: "让 AI 走下神坛，变成孩子课桌上的一个工具，而不是新闻里的一个词。",
    bullets: ["AI 赋能课堂", "与学生谈生活", "现场演示与试验"],
    media: "/media/scenes/ai-classroom-path.jpg",
    kind: "image" as const,
  },
  {
    id: "robotics",
    number: "04",
    title: "机器人",
    summary: "从一台机器人到一场比赛。",
    description: "从一台机器到一场比赛。拼装、调试、上台，孩子学到的远不止是机械。",
    bullets: ["从零拼装到调试", "队友间的思考", "走上赛场的一次尝试"],
    media: "/media/gallery/wrc7.jpg",
    kind: "image" as const,
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
    qrSrc: "/media/qr/ai4k.jpg",
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
      id: "7701303350285351835",
      cover: "/media/douyin/7701303350285351835.jpg",
      title: "眼看就要 vibecoding 完一个项目了，最近状态快要绷不住了",
      date: "2026-10-27",
      likes: "16",
      tag: "最新",
    },
    {
      id: "7700646094896466587",
      cover: "/media/douyin/7700646094896466587.jpg",
      title: "普通人靠 AI 两天就能做出这款游戏？除了不能商用，别的方面基本都很完美",
      date: "2026-10-26",
      likes: "31",
      tag: "最新",
    },
    {
      id: "7699500562203466673",
      cover: "/media/douyin/7699500562203466673.jpg",
      title: "挖到微软出的普通人 AI 入门 18 次课，完全面向零基础",
      date: "2026-10-22",
      likes: "120",
      tag: "合拍",
    },
    {
      id: "7699894298053369802",
      cover: "/media/douyin/7699894298053369802.jpg",
      title: "分享我自己开源的待办事项工具，支持自配后端同步和智能整理",
      date: "2026-10-24",
      likes: "39",
      tag: "51CodeTodo",
    },
    {
      id: "7698406791009669746",
      cover: "/media/douyin/7698406791009669746.jpg",
      title: "靠完整提示词五分钟做出高级页面，不需要登录也不需要付费",
      date: "2026-10-19",
      likes: "43",
      tag: "高互动",
    },
    {
      id: "7696548374560262986",
      cover: "/media/douyin/7696548374560262986.jpg",
      title: "这个逆向项目已经 231k 星，各路大神都用它复刻了多款收费软件",
      date: "2026-10-14",
      likes: "33",
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
      plays: "46w",
      tag: "爆款",
    },
    {
      id: "7678756921637716465",
      cover: "/media/douyin/7678756921637716465.jpg",
      title: "20 多万人在看的知识库搭建思路，详细版来啦！",
      date: "2026-08-28",
      likes: "6711",
      favorites: "5774",
      plays: "18w",
      tag: "爆款",
    },
    {
      id: "7699866315155411377",
      cover: "/media/douyin/7699866315155411377.jpg",
      title: "把 AI 装进 U 盘里？这个真的有用吗",
      date: "2026-10-23",
      likes: "112",
      favorites: "48",
      plays: "4395",
      tag: "高互动",
    },
    {
      id: "7695821381725332465",
      cover: "/media/douyin/7695821381725332465.jpg",
      title: "为啥你的 AI 总是答非所问",
      date: "2026-10-13",
      likes: "40",
      favorites: "16",
      plays: "1238",
      tag: "高互动",
    },
    {
      id: "7700608943311332091",
      cover: "/media/douyin/7700608943311332091.jpg",
      title: "想问下个人知识库搭建完就要一直更新吗",
      date: "2026-10-25",
      likes: "129",
      favorites: "53",
      plays: "2851",
      tag: "最新",
    },
    {
      id: "7701733459970870961",
      cover: "/media/douyin/7701733459970870961.jpg",
      title: "小学生 vibecoding 踩坑没？",
      date: "2026-10-28",
      likes: "14",
      favorites: "0",
      plays: "0",
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

// 代表作：乐启享学生作品三件 + GitHub 上的开源项目三件
export const APPS: App[] = [
  {
    id: "yixiaozhi",
    name: "宜小智工作台",
    href: "https://github.com/zhaosenlin12-creator/yxz-3d",
    media: "/media/apps/yixiaozhi.jpg",
    kind: "image",
    category: "AI 创作工作台",
    kicker: "学生作品 · 已开源",
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
    kicker: "学生作品 · 已开源",
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
    kicker: "二次开发 · 已开源",
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
  { value: "06", suffix: "+", label: "年经验教学" },
  { value: "1000", suffix: "+", label: "指导学生" },
  { value: "120", suffix: "+", label: "上线作品" },
  { value: "信奥", suffix: "", label: "竞赛指导教师" },
];

export const CONTACT = {
  wechat: { src: "/media/qr/wechat.jpg", label: "微信", sub: "扫码加我" },
  douyin: { src: "/media/qr/douyin.jpg", label: "抖音", sub: "看作品与更新" },
};

export const HEAD_LINES = [
  { text: "我叫森林。", italic: false },
  { text: "六年来，", italic: false },
  { text: "我和学生一起写代码。", italic: true },
];

export const STORY = [
  "我教 Python、C++、网页与人工智能，也教机器人；带学生做宜小智工作台、高考志愿填报模拟器、动物足球，也把 AI 用进每天的备课里。",
  "课堂像一棵树，每片叶子都是孩子自己长出来的；我能做的是浇水、点灯、让他们相信自己的手可以造出东西。",
  "他们带走的，不是一摞笔记，是一个能站上舞台的、属于他们自己的作品。",
];

export const BIO_LINES = [
  "我叫森林，",
  "一位手艺人出身的教育者。",
  "六年来，我一直在教 Python、C++、Web、AI 与机器人。",
];

export const BIO_PARAGRAPH =
  "六年来，我陪 8 到 18 岁的孩子写代码、上台、讲自己的故事。每一届人走出教室时，手里都握着一样东西——一个他自己造出来、愿意拿给世界看的小作品。";
