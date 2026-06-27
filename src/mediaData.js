const appImageModules = import.meta.glob("../iamges/app-photo/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const videoModules = import.meta.glob("../video/*.{mp4,webm,mov}", {
  eager: true,
  import: "default",
});

const assetByName = (modules) =>
  Object.fromEntries(Object.entries(modules).map(([path, src]) => [path.split("/").pop(), src]));

const appImages = assetByName(appImageModules);
const localVideos = assetByName(videoModules);

const typingHref =
  "https://game.codebn.cn/typing/index.html?source=game-google&apiBase=%2Fapi%2Ftyping&returnUrl=https%3A%2F%2Fgame.codebn.cn%2F";

export const STAGE_APPS = [
  {
    id: "python-adventure",
    name: "Python 冒险岛",
    href: "https://game.codebn.cn/",
    screenshot: appImages["python冒险岛.png"],
    category: "游戏化编程",
    kicker: "核心学习入口",
    description: "把 Python 入门做成地图、关卡、任务和即时反馈，让学生先进入体验，再理解代码。",
    highlights: ["地图闯关", "即时反馈", "作品型课堂入口"],
    accent: "cyan",
    posterTitle: "闯关学习",
    posterSubtitle: "任务、逻辑与 Python",
    posterStats: ["主应用入口", "闯关学习", "课程分支核心"],
  },
  {
    id: "class-system",
    name: "class 教学系统",
    href: "https://class.codebn.cn/",
    screenshot: appImages["class教学系统.png"],
    category: "课堂服务中枢",
    kicker: "课堂服务中枢",
    description: "把课堂组织、资源入口、学习反馈和教学服务放进统一系统，支撑后续分支管理。",
    highlights: ["课堂入口", "服务闭环", "多应用分发"],
    accent: "amber",
    posterTitle: "课堂系统",
    posterSubtitle: "课程、反馈与成长",
    posterStats: ["主应用入口", "课堂组织", "教学系统核心"],
  },
];

export const APP_SHOWCASE_ITEMS = [
  {
    id: "ai-classroom",
    name: "AI 互动课堂",
    href: "https://ai.codebn.cn/",
    screenshot: appImages["ai互动课堂.png"],
    category: "AI 课堂互动",
    summary: "面向课堂即时提问、生成式讲解和主题延展，让 AI 成为现场讨论的放大器。",
    palette: "cyan",
    poster: {
      eyebrow: "AI 课堂",
      title: "提问互动",
      subtitle: "把问题变成互动现场",
      metrics: ["AI 生成", "课堂提问", "即时参与"],
    },
  },
  {
    id: "code-research",
    name: "Code Research",
    href: "https://game.codebn.cn/code-research",
    screenshot: appImages["code research.png"],
    category: "代码研究",
    summary: "通过案例拆解和代码阅读，让学生从会写升级到会看、会改、会讲。",
    palette: "blue",
    poster: {
      eyebrow: "代码研究",
      title: "阅读调试",
      subtitle: "理解代码背后的结构",
      metrics: ["代码阅读", "案例拆解", "表达训练"],
    },
  },
  {
    id: "simulation-lab",
    name: "仿真模拟实验室",
    href: "https://phet.colorado.edu/",
    screenshot: appImages["仿真模拟实验室.png"],
    category: "科学仿真",
    summary: "把抽象科学概念转成可拖拽、可调参、可观察的仿真实验入口。",
    palette: "indigo",
    poster: {
      eyebrow: "仿真实验",
      title: "观察调参",
      subtitle: "用交互理解科学模型",
      metrics: ["可视化", "实验参数", "概念理解"],
    },
  },
  {
    id: "pet-camp",
    name: "乐启享宠物",
    href: "https://camp.codebn.cn/",
    screenshot: appImages["乐启享宠物.png"],
    category: "学习营地",
    summary: "用陪伴型角色和任务感增强持续学习动力，让入口更轻、更有亲近感。",
    palette: "lime",
    poster: {
      eyebrow: "学习营地",
      title: "陪伴成长",
      subtitle: "把成长感做得更可爱",
      metrics: ["陪伴角色", "营地体验", "学习动力"],
    },
  },
  {
    id: "typing-fun",
    name: "乐启享打字",
    href: typingHref,
    screenshot: appImages["乐启享打字.png"],
    category: "基础能力训练",
    summary: "把打字速度、准确率和等级反馈做成训练系统，适合低门槛进入编程课堂。",
    palette: "teal",
    poster: {
      eyebrow: "打字训练",
      title: "速度专注",
      subtitle: "基础能力也要有反馈",
      metrics: ["速度训练", "等级反馈", "课堂热身"],
    },
  },
  {
    id: "management-system",
    name: "乐启享管理系统",
    href: "https://stu.codebn.cn/",
    screenshot: appImages["乐启享管理系统.png"],
    category: "教学服务管理",
    summary: "连接课堂评价、小程序触达和成长记录，是教学服务闭环里的运营入口。",
    palette: "amber",
    poster: {
      eyebrow: "服务闭环",
      title: "记录连接",
      subtitle: "把服务过程变成可追踪数据",
      metrics: ["反馈闭环", "家校触达", "服务升级"],
    },
  },
  {
    id: "shiyun",
    name: "诗云 Poetry Cloud",
    href: "https://shiyun.cohenjikan.com/",
    screenshot: appImages["shiyun.png"],
    category: "诗歌互动星图",
    summary: "32,657 位诗人组成三维星图，点击虚空即可捞起一首可能的诗，让阅读、遇见和再创作发生在同一张星图里。",
    palette: "violet",
    poster: {
      eyebrow: "Poetry Cloud",
      title: "漫步星图",
      subtitle: "虚空里藏着一切可能",
      metrics: ["3D 星图", "诗人星团", "互动探索"],
    },
  },
  {
    id: "gaokao-volunteer-map",
    name: "云游志愿",
    href: "https://agentsfeed.org/app-demo/gaokao-map",
    screenshot: appImages["gaokao-map.png"],
    category: "高考志愿地图",
    summary: "把高考志愿拆成看得见、点得动的可视地图，让学生和家长能一起浏览、对比和选择。",
    palette: "teal",
    poster: {
      eyebrow: "Gaokao Map",
      title: "可视志愿",
      subtitle: "地图里选择下一站",
      metrics: ["可视地图", "志愿对比", "家校共看"],
    },
  },
  {
    id: "model-training",
    name: "模型训练",
    href: "https://www.aibase.com/de/tool/12518",
    screenshot: appImages["模型训练.png"],
    category: "AI 实验",
    summary: "通过样本、训练和结果反馈帮助学生理解模型思维，而不只是停留在工具使用。",
    palette: "violet",
    poster: {
      eyebrow: "模型实验",
      title: "样本训练",
      subtitle: "看见模型如何学习",
      metrics: ["样本意识", "模型反馈", "实验体验"],
    },
  },
];

export const FEATURED_VIDEOS = [
  {
    id: "personal-site",
    title: "个人建站作品演示",
    filename: "个人建站.mp4",
    src: localVideos["个人建站.mp4"],
    badge: "Douyin Video 01",
    summary: "用短视频展示网站搭建、页面呈现和作品表达，把技术成果变成可传播内容。",
    chips: ["个人网站", "作品展示", "技术表达"],
  },
  {
    id: "interactive-knowledge",
    title: "交互知识工具现场",
    filename: "交互知识.mp4",
    src: localVideos["交互知识.mp4"],
    badge: "Douyin Video 02",
    summary: "把知识点拆成可操作、可观察的互动过程，让学习内容更适合被理解和复盘。",
    chips: ["互动工具", "知识理解", "课堂演示"],
  },
  {
    id: "color-english",
    title: "涂色英语资源演示",
    filename: "涂色英语.mp4",
    src: localVideos["涂色英语.mp4"],
    badge: "Douyin Video 03",
    summary: "把英语启蒙资源做成更轻松的视觉体验，适合作为家长和学生的第一触点。",
    chips: ["英语启蒙", "资源整理", "亲子学习"],
  },
];

export const DOUYIN_PROFILE = {
  name: "@愈见森林",
  subtitle: "持续分享课堂工具、学习资源与应用作品",
  href: "https://www.douyin.com/user/MS4wLjABAAAAxHHFo-1JZJ3GPL_HYbgUo6X7hN5jWrk5wJUYl42rgW0",
  stats: ["抖音主页直达", "精选视频预览", "内容与作品双入口"],
};
