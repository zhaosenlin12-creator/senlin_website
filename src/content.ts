// 中文站点内容

export const SITE = {
  name: "森林",
  nameLatin: "Senlin",
  role: "乐启享合伙人 · 副校长",
  kicker: "少儿编程教师 / AI 实战讲师 / 独立开发者",
  badge: "2026 课程招生中",
  statement:
    "我在宜昌做了七年教育：一边带 8–18 岁的孩子写代码、造机器人，一边给企业和普通人做 AI 培训与系统交付。",
  heroVideos: [
    "/media/videos/hero-teaching.mp4",
    "/media/videos/hero-studio.mp4",
  ],
};

export const NAV_ITEMS = [
  { id: "story", label: "关于我" },
  { id: "deliver", label: "交付成果" },
  { id: "courses", label: "课程体系" },
  { id: "scene", label: "真实现场" },
  { id: "gallery", label: "作品墙" },
  { id: "video", label: "作品视频" },
  { id: "apps", label: "我的产品" },
  { id: "mentor", label: "收徒" },
];

export type Track = {
  id: string;
  label: string;
  note: string;
  headline: string;
  desc: string;
  points: string[];
  accent: string;
};

// 两条赛道：少儿编程造物 / 成人 AI 实战与交付。
// 只在这里分流一次，课程体系那一屏不再重复讲。
export const TRACKS: Track[] = [
  {
    id: "k12",
    label: "少儿 · 编程与造物",
    note: "8–18 岁",
    headline: "孩子的作品，从课堂走上赛场。",
    desc: "从 AI 启蒙到信奥、机器人与白名单赛事，每学期一个能上台的成品。",
    points: ["Python · C++ 信奥辅导", "机器人 · 3D 打印造物", "两期 16 节 AI 启蒙营"],
    accent: "cream",
  },
  {
    id: "adult",
    label: "成人 · AI 实战与交付",
    note: "职场人 · 创业者 · 大学生",
    headline: "把 AI 从「会用」做到「能交付」。",
    desc: "十项实战能力打底，高阶定制课只做你手上那一件事，最后交出一个能用的东西。",
    points: ["办公 · 知识库 · Agent · 建站", "8 次课的高阶定制", "企业内训与公众普及"],
    accent: "cyan",
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
  { id: "vibe-coding", title: "教 AI 写代码 · 从想法到上线", poster: "/media/posters/vibe-coding.jpg", src: "/media/videos/vibe-coding.mp4", duration: "00:57", tag: "AI 编程 · 工作流" },
  { id: "yolo-vision", title: "YOLO 视觉识别 · 训练到跑通", poster: "/media/posters/yolo-vision.jpg", src: "/media/videos/yolo-vision.mp4", duration: "00:44", tag: "AI 视觉 · 实战" },
  { id: "51codetodo", title: "51CodeTodo · 个人版到团队版", poster: "/media/posters/51codetodo.jpg", src: "/media/videos/51codetodo.mp4", duration: "01:51", tag: "开源项目 · 产品" },
];

// ── 交付成果：交付之后的系统状态 ────────────────────────────────────
// 这一屏不摆人物照，只摆「系统长什么样、跑通了哪几步」。
export type DeliverableItem = {
  id: string;
  name: string;
  /** 终端标题栏里的模块名 */
  code: string;
  /** 右上角状态灯 */
  status: string;
  headline: string;
  desc: string;
  tags: string[];
  /** Remotion 渲染的运行画面（无声循环），比静态截图更能说明「还跑着」 */
  video?: { src: string; poster: string };
  /** 真实系统界面 / 课件画面，放大后可左右翻 */
  shots: { src: string; alt: string; label: string }[];
  /** 交付流程节点 */
  steps: string[];
  /** 关键指标 */
  metrics: { label: string; value: string }[];
  href?: string;
  accent: string;
};

export type DeliverableGroup = {
  id: string;
  index: string;
  label: string;
  title: string;
  intro: string;
  items: DeliverableItem[];
};

export const DELIVERABLE_GROUPS: DeliverableGroup[] = [
  {
    id: "systems",
    index: "01",
    label: "AI 系统与智能体",
    title: "交出去的系统，现在还跑着",
    intro:
      "演示会散场，系统不会。下面两件是真实客户项目：一条接进业务线，一条接进内容线。",
    items: [
      {
        id: "yolo",
        name: "YOLO 视觉识别系统",
        code: "YOLO 实时检测 · 推理服务控制台",
        status: "在线 · 已接入业务线",
        headline: "实时检出，图片视频双路稳定跑。",
        desc:
          "数据集处理、模型训练与迭代、推理服务部署全流程做完，检测结果以结构化 JSON 回灌到客户业务流程里。",
        tags: ["目标检测", "模型训练与调优", "推理服务部署"],
        video: {
          src: "/media/loops/yolo.mp4",
          poster: "/media/scene/dl-yolo.jpg",
        },
        shots: [
          {
            src: "/media/scene/dl-yolo.jpg",
            alt: "YOLO 实时检测 · 推理服务控制台全貌",
            label: "控制台全貌",
          },
          {
            src: "/media/scene/dl-yolo-panel.jpg",
            alt: "YOLO 推理服务控制台：实时检测结果与置信度",
            label: "检测结果",
          },
          {
            src: "/media/scene/dl-yolo-bars.jpg",
            alt: "YOLO 本帧检测结果：5 个目标的置信度",
            label: "置信度",
          },
        ],
        steps: ["数据集处理", "模型训练与迭代", "推理服务部署", "业务侧对接"],
        metrics: [
          { label: "模型", value: "yolov8n" },
          { label: "单帧目标", value: "5" },
          { label: "实时帧率", value: "24 FPS" },
          { label: "置信度阈值", value: "0.80" },
        ],
        accent: "cyan",
      },
      {
        id: "douyin-agent",
        name: "爆款卖货视频复刻工作流智能体",
        code: "爆款复刻工作流 · 内容生产线",
        status: "在用 · 批量生产",
        headline: "丢一条爆款，产出一整套二创方案。",
        desc:
          "把爆款视频的钩子、痛点、演示、逼单四段结构拆出来，做成可复用的工作流：脚本、分镜、成片批量出，不靠人肉。",
        tags: ["工作流智能体", "爆款结构拆解", "批量内容生产"],
        video: {
          src: "/media/loops/douyin.mp4",
          poster: "/media/scene/dl-douyin-agent.jpg",
        },
        shots: [
          {
            src: "/media/scene/dl-douyin-agent.jpg",
            alt: "爆款复刻工作流：爆款源、结构拆解、二创产出",
            label: "工作流全貌",
          },
          {
            src: "/media/scene/dl-douyin-mid.jpg",
            alt: "爆款结构拆解：钩子、痛点、演示、逼单四段",
            label: "结构拆解",
          },
        ],
        steps: ["丢一条爆款", "自动拆结构", "出脚本分镜", "批量生产"],
        metrics: [
          { label: "源片时长", value: "42s" },
          { label: "结构段落", value: "4 段" },
          { label: "出稿速度", value: "分钟级" },
          { label: "生产方式", value: "可复用" },
        ],
        accent: "rose",
      },
    ],
  },
  {
    id: "training",
    index: "02",
    label: "企业与公众培训",
    title: "把 AI 带进真实的工作流里",
    intro:
      "不做概念搬运。企业按岗位出课，普通人从零学会就用在今天手头的事上。",
    items: [
      {
        id: "corp-training",
        name: "企业员工 AI 培训",
        code: "企业内训 · 岗位定制课件",
        status: "已交付 · 按岗位定制",
        headline: "按岗位出课，课后陪跑到工位上。",
        desc:
          "先把岗位上的真实任务拆出来，再围绕它设计文档表格自动化、知识库搭建、提示词工程与 AI 办公演练，课后继续陪跑。",
        tags: ["企业内训", "岗位任务定制", "落地陪跑"],
        video: {
          src: "/media/loops/delivery.mp4",
          poster: "/media/delivery/ai-delivery-menu.jpg",
        },
        shots: [
          {
            src: "/media/delivery/ai-delivery-menu.jpg",
            alt: "AI 交付定制课：八个可定制方向",
            label: "方向菜单",
          },
          {
            src: "/media/delivery/ai-delivery-scope.jpg",
            alt: "AI 交付定制课：交付范围与场景清单",
            label: "交付范围",
          },
          {
            src: "/media/delivery/ai-delivery-skill.jpg",
            alt: "AI 交付定制课：把规矩封装成 Skill",
            label: "封装 Skill",
          },
          {
            src: "/media/delivery/ai-delivery-assets.jpg",
            alt: "AI 交付定制课：六年沉淀的公开资产",
            label: "交付资产",
          },
        ],
        steps: ["岗位任务拆解", "定制课件", "现场实操", "课后陪跑"],
        metrics: [
          { label: "出课方式", value: "按岗位" },
          { label: "课时", value: "8 次" },
          { label: "交付物", value: "岗位工作流" },
          { label: "课后", value: "持续陪跑" },
        ],
        accent: "mint",
      },
      {
        id: "public-training",
        name: "普通人 AI 办公提效培训",
        code: "AI 办公提效训练营 · 公众课程",
        status: "常年开课 · 第 1–8 课",
        headline: "零基础，学完就把 AI 用进日常。",
        desc:
          "AI 是什么、怎么用、用在哪些日常活儿上——写材料、整表格、剪视频、做海报、搭个人知识库，全程动手做。",
        tags: ["公众普及", "办公提效", "零基础可上手"],
        video: {
          src: "/media/loops/office.mp4",
          poster: "/media/delivery/office-bootcamp-lesson.jpg",
        },
        shots: [
          {
            src: "/media/delivery/office-bootcamp-cover.jpg",
            alt: "AI 办公提效训练营：第 1 课 AI 全景认知",
            label: "第 1 课",
          },
          {
            src: "/media/delivery/office-bootcamp-lesson.jpg",
            alt: "AI 办公提效训练营课堂页面",
            label: "课堂实操",
          },
          {
            src: "/media/delivery/office-bootcamp-about.jpg",
            alt: "AI 办公提效训练营课程说明",
            label: "训练营说明",
          },
        ],
        steps: ["AI 全景认知", "办公实操", "个人工作台", "落地流程"],
        metrics: [
          { label: "课次", value: "8 课" },
          { label: "每课实操", value: "1 次" },
          { label: "入门门槛", value: "零基础" },
          { label: "结课产出", value: "个人工作流" },
        ],
        accent: "amber",
      },
    ],
  },
];

// ── 课程体系：少儿四门 + 成人两门 ──────────────────────────────────
export type Course = {
  id: string;
  stage: string;
  title: string;
  subtitle?: string;
  audience: string;
  lessons: string;
  poster: string;
  /** 弹窗里的完整图集（海报 + 课堂实拍），可左右翻 */
  gallery: string[];
  /** 卡片上轮播的海报组：只用海报，保证完整显示不裁切 */
  covers?: string[];
  /** 主视觉用的课件页（16:9），只在成人线的主卡上用 */
  slides?: string[];
  summary: string;
  modules: string[];
  /** 亮点条，弹窗里展示 */
  highlights: string[];
  /** 逐课明细 / 方向拆解 */
  outline?: { title: string; items: string[] }[];
  price?: string;
  /** 卡片版式：poster = 竖版海报在左，slide = 横版课件在上 */
  cardLayout?: "poster" | "slide";
  /** k12 = 少儿线，adult = 成人线 */
  line: "k12" | "adult";
  accent: string;
  featured?: boolean;
};

export const COURSES: Course[] = [
  {
    id: "magic-camp",
    stage: "第一阶段 · 少儿",
    title: "AI 魔法启蒙营",
    audience: "8–16 岁 · 零基础",
    lessons: "16 节课",
    poster: "/media/posters/ai-magic-camp.jpg",
    gallery: [
      "/media/posters/ai-magic-camp.jpg",
      "/media/gallery/11.jpg",
      "/media/gallery/4e7cde1d67137f31dbbaceea09b3ba97.jpg",
    ],
    covers: ["/media/posters/ai-magic-camp.jpg"],
    summary:
      "从和 AI 聊第一句，到用 vibe coding 做出人生第一个互动小游戏。",
    modules: ["AI 初体验", "提示词魔法", "AI 创意绘画", "故事创作", "动画小剧场", "AI 编程入门"],
    highlights: ["零基础第一节课就能做出东西", "每节一作品，结课可展示", "课堂同款项目可带走"],
    outline: [
      {
        title: "6 大主题 · 16 节课",
        items: [
          "AI 初体验：和 AI 聊第一句，学会描述需求",
          "提示词魔法：把想法说得更准，拿到更好结果",
          "AI 创意绘画：用自己的风格画一整组作品",
          "故事创作：把一个点子写成有情节的故事",
          "动画小剧场：让角色动起来，做成小短片",
          "AI 编程入门：用 vibe coding 做出第一个互动小游戏",
        ],
      },
    ],
    line: "k12",
    accent: "amber",
  },
  {
    id: "humanities-camp",
    stage: "第二阶段 · 少儿",
    title: "AI 人文数字探索营",
    audience: "9–16 岁 · 跨学科",
    lessons: "16 节课",
    poster: "/media/posters/ai-humanities-camp.jpg",
    gallery: [
      "/media/posters/ai-humanities-camp.jpg",
      "/media/gallery/cpp-course.jpg",
      "/media/gallery/7ea7aec2c2fc24cdff315baf30e19994.jpg",
    ],
    covers: ["/media/posters/ai-humanities-camp.jpg"],
    summary:
      "真实场景里用 AI 创造：修复老照片、复原古画、画古诗意境、搭自己的小工具。",
    modules: ["老照片修复", "古画数字复原", "古诗意境画", "英语对话工具", "个人记账工具", "智能问答助手"],
    highlights: ["人文 + 工具的双线", "每个主题都产出一个真作品", "可作为科创赛参赛选题"],
    outline: [
      {
        title: "6 大主题 · 16 节课",
        items: [
          "老照片修复：AI 把模糊的老照片重新拼回来",
          "古画数字复原：补全残缺的名画局部",
          "古诗意境画：把一句诗变成一张画",
          "英语对话工具：做一个能聊天的单词陪练",
          "个人记账工具：给自己做一个记账小程序",
          "智能问答助手：把资料变成一个会答的机器人",
        ],
      },
    ],
    line: "k12",
    accent: "violet",
  },
  {
    id: "arcade-camp",
    stage: "创赛营 · 少儿",
    title: "Python Arcade 创赛课",
    subtitle: "5 个半天，做出一个参赛作品",
    audience: "小学高段 – 初中",
    lessons: "5 个半天",
    poster: "/media/posters/camp-arcade.jpg",
    gallery: [
      "/media/posters/camp-arcade.jpg",
      "/media/gallery/wrc7.jpg",
      "/media/gallery/4c034334db22d80ecae7cd665b142e62.jpg",
    ],
    covers: ["/media/posters/camp-arcade.jpg"],
    summary:
      "从对象建模到关卡系统，5 个半天做出结构完整的作品，对接《星际科考先锋》参赛方向。",
    modules: [
      "对象建模与角色系统",
      "跳跃物理与碰撞规则",
      "地图关卡与机关设计",
      "交互系统与智能障碍物",
      "主题包装与参赛表达",
    ],
    highlights: ["5 个半天出完整作品", "对接白名单赛事方向", "讲得清才能参赛"],
    outline: [
      {
        title: "5 个半天学什么",
        items: [
          "第 1 讲：对象建模与角色系统——学会用类管理角色、平台、状态与交互",
          "第 2 讲：跳跃物理与碰撞规则——理解重力、速度、边界与精准判定",
          "第 3 讲：地图关卡与机关设计——完成钥匙、舱门、移动平台与通路路线",
          "第 4 讲：交互系统与智能障碍物——实现生命值、攻击、反馈、追踪 AI 与难度节奏",
          "第 5 讲：主题包装与参赛表达——把闯关原型升级为《星际科考先锋》参赛作品",
        ],
      },
      {
        title: "学完能带走",
        items: ["面向对象思维", "完整作品开发", "参赛讲解表达"],
      },
    ],
    line: "k12",
    accent: "cyan",
    featured: true,
  },
  {
    id: "creation-camp",
    stage: "创赛营 · 少儿",
    title: "少年造物创赛营",
    subtitle: "5 个半天，一个能参赛的原创作品",
    audience: "8–15 岁 · 零基础",
    lessons: "5 个半天 · 三大营",
    poster: "/media/posters/camp-mars.jpg",
    gallery: [
      "/media/posters/camp-mars.jpg",
      "/media/posters/camp-geometry.jpg",
      "/media/posters/space-explore.jpg",
      "/media/gallery/ebe3db8e9e230e42fa4a3821dc906ca8.jpg",
    ],
    covers: [
      "/media/posters/camp-mars.jpg",
      "/media/posters/camp-geometry.jpg",
      "/media/posters/space-explore.jpg",
    ],
    summary:
      "火星移民、几何世界、星际创赛三条线并行，做完就是一件能上台的原创作品，对接电教馆白名单赛事。",
    modules: [
      "火星移民创作营",
      "几何世界游戏创作营",
      "星际创赛 · 少年创意秀",
    ],
    highlights: ["三大任务模块，作品即参赛件", "对接电教馆白名单赛事", "专业导师 + 家长反馈机制"],
    outline: [
      {
        title: "三大营",
        items: [
          "火星移民创作营：加入火星战队 → 创作故事世界 → 制作动画开场 → 丰富剧情表现 → 设计游戏玩法",
          "几何世界游戏创作营：进入几何王国 → 角色设计 → 世界搭建 → 玩法设计 → 作品完成",
          "星际创赛 · 少年创意秀：把想法做成能上台展示的原创作品",
        ],
      },
      {
        title: "能力清单",
        items: [
          "动画创作能力：设计故事、制作动画",
          "逻辑思维能力：拆解问题、解决问题",
          "游戏设计能力：设计规则、制作挑战",
          "表达讲解能力：作品讲解、自信展示",
          "团队协作能力：分工合作、共同完成",
        ],
      },
    ],
    line: "k12",
    accent: "rose",
    featured: true,
  },
  {
    id: "ai-office",
    stage: "大众 · 普及",
    title: "AI 办公提效训练营",
    subtitle: "8 节课，把 AI 变成日常习惯",
    audience: "职场人 · 创业者 · 大学生",
    lessons: "8 节课 · 每节 60 分钟",
    poster: "/media/delivery/office-bootcamp-cover.jpg",
    gallery: [
      "/media/delivery/office-bootcamp-cover.jpg",
      "/media/delivery/office-bootcamp-about.jpg",
      "/media/delivery/office-bootcamp-lesson.jpg",
    ],
    covers: ["/media/delivery/office-bootcamp-cover.jpg"],
    summary:
      "不讲难概念，先把 AI 用起来：从第一次有效对话，到写出文档、做表格、出课件、搭出自己的日常工作流。",
    modules: [
      "AI 全景认知与第一次有效对话",
      "提示词：把需求说清楚",
      "AI 写作与文档处理",
      "AI 表格与数据整理",
      "AI 做 PPT 与课件",
      "AI 图片与视频素材",
      "个人工作流搭建",
      "实战复盘与答疑",
    ],
    highlights: ["零基础可跟，60 分钟一节", "课上就做，产出带走", "企业内训同款课程"],
    outline: [
      {
        title: "8 节课怎么上",
        items: [
          "第 1 课 AI 全景认知：装好工具，说出第一句让 AI 真能干活的话",
          "第 2 课 提示词入门：把想做的事说清楚，拿到能用的结果",
          "第 3 课 写作与文档：周报、方案、总结，让 AI 起草你来定稿",
          "第 4 课 表格与数据：清洗、汇总、出图，不再对着公式发呆",
          "第 5 课 PPT 与课件：从一页提纲到一整套能讲的课件",
          "第 6 课 图片与视频：做图、做封面、做短视频素材",
          "第 7 课 个人工作流：把重复的活固化成一条能反复跑的流程",
          "第 8 课 复盘与答疑：带走一份属于自己的 AI 使用手册",
        ],
      },
      {
        title: "特别适合",
        items: [
          "被杂事淹没的职场人",
          "想自己搭站点、做小工具的创业者",
          "要做课件、做教研的一线老师",
          "想用 AI 提效的大学生与求职者",
        ],
      },
    ],
    price: "公开课 8 节 · 企业内训与定制单独排期",
    cardLayout: "slide",
    line: "adult",
    accent: "mint",
  },
  {
    id: "ai-combat",
    stage: "成人 · 职场",
    title: "Codex & WorkBuddy AI 实战",
    audience: "职场人 · 创业者 · 大学生",
    lessons: "10 项实战能力",
    poster: "/media/posters/ai-combat-course.jpg",
    gallery: [
      "/media/posters/ai-combat-course.jpg",
      "/media/delivery/office-bootcamp-about.jpg",
      "/media/delivery/office-bootcamp-lesson.jpg",
    ],
    summary:
      "十项能力覆盖自动化办公、知识库、Agent、提示词工程与生产级建站，学完直接交付项目。",
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
    highlights: ["10 项能力做成可交付系统", "课后继续陪跑", "面向零基础到有项目的人"],
    outline: [
      {
        title: "十项实战能力",
        items: [
          "自动化办公：把一天里的杂事交出去",
          "个人知识库搭建：经验变成能检索的资产",
          "理解 Agent 原理：知道它能做什么、不能做什么",
          "专业提示词工程：把需求写成可复用的指令",
          "生产级网站 / 小程序：从想法到上线",
          "智能体产出课件：让 AI 帮你备一节课",
          "个性化工作台：给自己搭一个专属操作台",
          "自动化工作流：重复动作固化成一条流水线",
          "视频剪辑与制作：从素材到成片",
          "项目实战交付：拿出一个真东西",
        ],
      },
    ],
    line: "adult",
    accent: "cyan",
  },
  {
    id: "ai-delivery",
    stage: "高阶 · 定制",
    title: "AI 交付定制课",
    subtitle: "从会用 AI，到用 AI 交付",
    audience: "职场人 · 创业者 · 教师 · 大学生",
    lessons: "8 次课 · 只做你的一件事",
    poster: "/media/posters/adult-delivery.jpg",
    gallery: [
      "/media/posters/adult-delivery.jpg",
      "/media/delivery/ai-delivery-cover.jpg",
      "/media/delivery/ai-delivery-scope.jpg",
      "/media/delivery/ai-delivery-menu.jpg",
      "/media/delivery/ai-delivery-skill.jpg",
      "/media/delivery/ai-delivery-assets.jpg",
    ],
    slides: [
      "/media/delivery/ai-delivery-cover.jpg",
      "/media/delivery/ai-delivery-scope.jpg",
      "/media/delivery/ai-delivery-menu.jpg",
      "/media/delivery/ai-delivery-skill.jpg",
      "/media/delivery/ai-delivery-assets.jpg",
    ],
    summary:
      "按你的场景定制 syllabus，现场把你的东西做出来：定目标、搭流程、接真实数据、封装成 Skill，最后上线。",
    modules: [
      "工作流自动化",
      "智能体与 Skill",
      "知识库工程",
      "全栈开发",
      "AI 视频与内容",
      "AI 编程与代码托管",
      "数据采集与洞察",
      "教学与教研",
    ],
    highlights: [
      "课前 24 小时场景对齐，现场确认这次交付什么",
      "课中 90 分钟动手做，我在旁边盯细节",
      "课后 24 小时作业点评，答疑不限次数",
    ],
    outline: [
      {
        title: "8 次课逐课明细",
        items: [
          "第 1 课 需求诊断：把你的场景问清楚、定死交付物 ——《交付目标卡》",
          "第 2 课 选型与搭环境：把工具装好，跑通一个最小闭环 —— 可运行环境 + 工具清单",
          "第 3 课 拆主流程：把要做的事拆到每一步都能执行 —— 流程图 + 分步脚本",
          "第 4 课 跑通 v1：端到端跑通一次，允许丑但不许假 —— 一个能跑的 v1",
          "第 5 课 接真实数据：把你手上的真实数据接进来 —— 真实数据管道",
          "第 6 课 质量与容错：加日志、异常处理、失败重试 —— 稳定性检查清单",
          "第 7 课 封装成 Skill：让它能被反复调用，也能交给别人 —— 可复用的 Skill 包",
          "第 8 课 上线与交付：部署、写教程、完整复盘 —— 上线地址 + 教程 + 复盘",
        ],
      },
      {
        title: "八方向按「要交付什么」挑",
        items: [
          "工作流自动化：把每周重复的手工活变成一条流水线",
          "智能体与 Skill：让 AI 记住你的规矩、格式与判断标准",
          "知识库工程：把散落的经验沉淀成能检索的资产",
          "全栈开发：从想法到上线，Web、小程序与自动化",
          "AI 视频与内容：一句话出片，从脚本一路走到成片",
          "AI 编程与代码托管：让 AI 进仓库，读代码、改代码、跑测试",
          "数据采集与洞察：把散落的信息变成能看的结论",
          "教学与教研：备课出题批改答疑，把时间还给自己",
        ],
      },
      {
        title: "特别适合",
        items: [
          "手上一堆重复劳动的人 → 带走一条能跑的流水线",
          "想做产品的开发者 → 带走一个能上线的小工具",
          "一线教师与教研团队 → 带走一整套备课出题流程",
          "内容创作者与电商 → 带走一条选题到发布的线",
          "学生与求职者 → 带走可复现的项目与作品",
          "团队负责人与主管 → 带走一套能照做的规范",
          "小微创业者与商家 → 带走不招人的运营自动化",
          "重度 AI 用户 → 带走可复用的 Skill 库",
        ],
      },
    ],
    price: "自学交付包 998 元 · 90 分钟陪跑 150 元/次（8 次 1200 元）",
    line: "adult",
    accent: "amber",
    featured: true,
  },
];

export const COURSE_LINES: {
  id: "k12" | "adult";
  label: string;
  note: string;
  intro: string;
}[] = [
  {
    id: "k12",
    label: "少儿 · 编程与造物",
    note: "启蒙 → 进阶 → 创赛",
    intro: "两期 16 节课营打底，两期 5 天创赛营出作品，每一阶段都有能带走的成品。",
  },
  {
    id: "adult",
    label: "成人 · AI 实战与交付",
    note: "普及 → 实战 → 高阶定制",
    intro: "办公提效普及、十项实战能力打底，高阶定制课只做你的一件事。",
  },
];

// ── 真实现场：课堂与研讨会照片 ──────────────────────────────────────
export type ScenePhoto = {
  src: string;
  title: string;
  desc: string;
  tag: string;
  span: string;
  height: string;
};

export const SCENE_PHOTOS: ScenePhoto[] = [
  {
    src: "/media/scene/dl-enterprise.jpg",
    title: "企业内训 · 现场",
    desc: "按岗位出课，白板上是他们自己的业务流程，讲完就上手做。",
    tag: "企业 · 内训",
    span: "md:col-span-4",
    height: "h-[280px] sm:h-[340px] md:h-[420px]",
  },
  {
    src: "/media/scene/dl-office.jpg",
    title: "AI 办公提效 · 零基础课堂",
    desc: "职场人、创业者、大学生坐在一起，从第一句对话开始练。",
    tag: "公众 · 训练营",
    span: "md:col-span-2",
    height: "h-[280px] sm:h-[340px] md:h-[420px]",
  },
  {
    src: "/media/gallery/yxz-live-demo.jpg",
    title: "成果交流会 · 现场演示",
    desc: "宜昌市中小学生人工智能教育成果交流研讨会，工作台现场跑通全流程。",
    tag: "成果 · 展示",
    span: "md:col-span-3",
    height: "h-[240px] sm:h-[300px] md:h-[360px]",
  },
  {
    src: "/media/gallery/cpp-course.jpg",
    title: "课件与作业 · 真实页面",
    desc: "每节课结束，屏幕上留的是学生自己交上来的那份作业。",
    tag: "课程内容",
    span: "md:col-span-3",
    height: "h-[240px] sm:h-[300px] md:h-[360px]",
  },
  {
    src: "/media/gallery/11.jpg",
    title: "Python 初级班 · 课堂大屏",
    desc: "投影上是刚敲完的代码，下面坐着二十多个孩子。",
    tag: "少儿 · 课堂",
    span: "md:col-span-2",
    height: "h-[230px] sm:h-[280px] md:h-[320px]",
  },
  {
    src: "/media/gallery/4e7cde1d67137f31dbbaceea09b3ba97.jpg",
    title: "一对一辅导",
    desc: "手把手教到能跑通为止——一个一个学生看，不放手。",
    tag: "少儿 · 课堂",
    span: "md:col-span-2",
    height: "h-[230px] sm:h-[280px] md:h-[320px]",
  },
  {
    src: "/media/gallery/ebe3db8e9e230e42fa4a3821dc906ca8.jpg",
    title: "作品发布 · 课堂现场",
    desc: "站在大屏前讲自己做的项目，讲得清才算做完。",
    tag: "少儿 · 课堂",
    span: "md:col-span-2",
    height: "h-[230px] sm:h-[280px] md:h-[320px]",
  },
  {
    src: "/media/gallery/wrc7.jpg",
    title: "机器人赛场 · WRCC2025",
    desc: "BoxBot 格斗赛项轻量级中学组，冠军上台领奖。",
    tag: "少儿 · 机器人赛场",
    span: "md:col-span-3",
    height: "h-[240px] sm:h-[300px] md:h-[360px]",
  },
  {
    src: "/media/gallery/4c034334db22d80ecae7cd665b142e62.jpg",
    title: "乐博士机器人 · 北京锦标赛",
    desc: "从宜昌赛区一路打进北京决赛的队伍。",
    tag: "少儿 · 机器人赛场",
    span: "md:col-span-3",
    height: "h-[240px] sm:h-[300px] md:h-[360px]",
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
  note: "115 个公开仓库",
};

// 成果穹顶：全部是我自己做出来的东西——产品界面与交付课件，没有人物照。
export const GALLERY_IMAGES = [
  { src: "/media/works/gaokao-ui.jpg", alt: "高考志愿填报模拟器 · 山河地图" },
  { src: "/media/works/gaokao-02.jpg", alt: "高考志愿填报模拟器 · 院校详情" },
  { src: "/media/works/animal-ui.jpg", alt: "动物足球 · 阵容排布" },
  { src: "/media/works/animal-03.jpg", alt: "动物足球 · 实时比分" },
  { src: "/media/works/shop-online.jpg", alt: "照片纪念品店 · 3D 空间" },
  { src: "/media/works/shop-gallery.jpg", alt: "照片纪念品店 · 商品陈列" },
  { src: "/media/works/vibe-pigeon.jpg", alt: "Vibe 知识大赏 · 视频成片" },
  { src: "/media/works/vibe-stim.jpg", alt: "Vibe 知识大赏 · 动效成片" },
  { src: "/media/works/vibe-fold.jpg", alt: "Vibe 知识大赏 · 折叠成片" },
  { src: "/media/works/yxz-ui.jpg", alt: "宜小智工作台界面" },
  { src: "/media/works/yxz-02.jpg", alt: "宜小智工作台 · AI 生成预览" },
  { src: "/media/works/yxz-03.jpg", alt: "宜小智工作台 · 3D 模型生成" },
  { src: "/media/delivery/ai-delivery-cover.jpg", alt: "AI 交付定制课 · 课程体系" },
  { src: "/media/delivery/ai-delivery-menu.jpg", alt: "AI 交付定制课 · 能力菜单" },
  { src: "/media/delivery/ai-delivery-scope.jpg", alt: "AI 交付定制课 · 交付范围" },
  { src: "/media/delivery/office-bootcamp-cover.jpg", alt: "AI 办公提效训练营 · 课程体系" },
  { src: "/media/gallery/yxz-live-demo.jpg", alt: "宜小智工作台 · 成果交流会现场演示" },
  { src: "/media/gallery/03e58ed3352bb2c5b6c34475e3ef5c05.jpg", alt: "学员合影" },
  { src: "/media/gallery/7ea7aec2c2fc24cdff315baf30e19994.jpg", alt: "学生作品展示" },
  { src: "/media/gallery/5532032ec1ecd25b5aab600c3c66653e.jpg", alt: "班级合影" },
  { src: "/media/gallery/python-course.jpg", alt: "Python 课程课件" },
  { src: "/media/gallery/robot-detail1.jpg", alt: "机器人作品细节" },
];

// KPI: 数字进场滚动，避免任何西文字体回退导致的乱码。
export const KPI = [
  { value: 1200, suffix: "+", label: "在读学员" },
  { value: 7, suffix: " 年", label: "一线教学" },
  { value: 115, suffix: " 个", label: "GitHub 仓库" },
  { value: 135, suffix: " 篇", label: "Agent Skill" },
];

export const CONTACT = {
  channels: [
    { src: "/media/qr/wechat.jpg", label: "微信", sub: "扫码加我" },
    { src: "/media/qr/douyin.jpg", label: "抖音", sub: "看作品与更新" },
  ],
  phone: "17371701272",
  site: "codebn.cn",
  place: "宜昌市猇亭区金岭路 59-1 号",
};

export const HEAD_LINES = [
  { text: "我叫森林。", italic: false },
  { text: "教孩子写代码，", italic: false },
  { text: "也教大人用 AI 干活。", italic: true },
];

export const STORY = [
  "乐启享合伙人兼副校长，坐标宜昌。七年里，我在课堂上带 8–18 岁的孩子写代码、造机器人，也给企业和普通人做 AI 培训与系统交付。",
  "课堂上，AI 是学生桌面上的一件工具；工作坊里，AI 是把表格、文档、剪辑、交付真真切切跑通一遍。做出来的东西我都摆在明面上：YOLO 视觉识别系统、爆款复刻工作流智能体，还有我自己从 0 到 1 写的宜小智工作台、高考志愿填报模拟器和动物足球。",
];
