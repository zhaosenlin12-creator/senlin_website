// 中文站点内容

export const SITE = {
  name: "森林",
  nameLatin: "Senlin",
  role: "乐启享合伙人 · 副校长",
  kicker: "教师 / 作者 / 剧场主理人",
  badge: "2026 课程招生中",
  statement:
    "我是森林。这六年,我一边走在高中、创室、赛场里,一边把 Python、C++、网页与人工智能变成学生能拿起来、能带走的东西。",
  heroVideos: [
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4",
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
    media: "/media/scenes/python-path.webp",
    kind: "image" as const,
  },
  {
    id: "cpp",
    number: "02",
    title: "C++ · NOI / CSP",
    summary: "从爱好走向系统。",
    description: "从一道题、一份训练,走到一个能上台面的自己。",
    bullets: ["从爱好走向系统", "习题与复盘", "从爱好到出成果"],
    media: "/media/scenes/cpp-noi-path.webp",
    kind: "image" as const,
  },
  {
    id: "ai",
    number: "03",
    title: "人工智能课堂",
    summary: "让 AI 成为课堂的一部分。",
    description: "让 AI 走下神坛,变成孩子课桌上的一个工具,而不是新闻里的一个词。",
    bullets: ["AI 赋能课堂", "与学生谈生活", "现场演示与试验"],
    media: "/media/scenes/ai-classroom-path.webp",
    kind: "image" as const,
  },
  {
    id: "robotics",
    number: "04",
    title: "机器人",
    summary: "从一台机器人到一场比赛。",
    description: "从一台机器到一场比赛。拼装、调试、上台,孩子学到的远不止是机械。",
    bullets: ["从零拼装到调试", "队友间的思考", "走上赛场的一次尝试"],
    media: "/media/gallery/wrc7.webp",
    kind: "image" as const,
  },
];

export const DOUYIN = {
  name: "@森林老师",
  href: "https://www.douyin.com/user/MS4wLjABAAAAxHHFo-1JZJ3GPL_HYbgUo6X7hN5jWrk5wJUYl42rgW0",
  qrSrc: "/media/qr/douyin.webp",
  subtitle: "持续分享课堂工具、学习资源与应用作品。",
  followers: "1.2w",
  likes: "36w",
};

export const VIDEOS = [
  { id: "personal-site", title: "个人站搭建全流程", poster: "/media/posters/personal-site.webp", src: "/media/videos/personal-site.mp4", duration: "01:24", tag: "网站 · 项目" },
  { id: "interactive-knowledge", title: "互动知识课堂", poster: "/media/posters/interactive-knowledge.webp", src: "/media/videos/interactive-knowledge.mp4", duration: "02:08", tag: "课堂记录" },
  { id: "color-english", title: "色彩英语 · AI 演示", poster: "/media/posters/color-english.webp", src: "/media/videos/color-english.mp4", duration: "01:47", tag: "人工智能 · 教学" },
];

export const APPS = [
  { id: "python-adventure", name: "Python 冒险岛", href: "https://game.codebn.cn/", screenshot: "/media/apps/python-adventure.png", media: "/media/scenes/python-path.webp", kind: "image" as const, category: "冒险小岛", kicker: "冒险小岛", description: '一个不会让人喊"太难"的 Python 入门。在走完一座小岛之前,代码会在你脚下一步一步长出来。', highlights: ["玩着上手", "小关小卡", "一周一个作品"], accent: "cyan" },
  { id: "class-system", name: "class 教学系统", href: "https://class.codebn.cn/", screenshot: "/media/apps/class-system.png", media: "/media/videos/interactive-knowledge.mp4", kind: "video" as const, category: "课堂中枢", kicker: "课堂中枢", description: "上课下课、交付作业、预约课时——都在这里。它把教室里所有碎碎的事收拾起来,让老师能够安心上课。", highlights: ["一个后台搞定", "动态设置", "多课堂打通"], accent: "amber" },
  { id: "ai-classroom", name: "AI 互动课堂", href: "https://ai.codebn.cn/", screenshot: "/media/apps/ai-classroom.png", media: "/media/scenes/ai-classroom-path.webp", kind: "image" as const, category: "AI 玩练场", kicker: "AI 玩练场", description: "在这里,AI 不是听听看看的新鲜事。学生会拿起它们,让 AI 变成可以动手、可以话剧、可以在课堂里交互的伙伴。", highlights: ["AI 随身带", "话剧式课堂", "实时互动"], accent: "mint" },
  { id: "code-research", name: "Code Research", href: "https://codebn.cn/code-research", screenshot: "/media/apps/code-research.png", media: "/media/scenes/project-release-path.webp", kind: "image" as const, category: "作品集", kicker: "作品集", description: "一面为学生举起的镜头。他们的作品、他们的笔记、他们在舞台上讲的事,都在这里被记下。", highlights: ["个人作品集", "笔记与随笔", "公开上架"], accent: "violet" },
  { id: "typing-lab", name: "乐启享打字", href: "https://game.codebn.cn/typing/", screenshot: "/media/apps/typing.png", media: "/media/videos/color-english.mp4", kind: "video" as const, category: "打字小课", kicker: "打字小课", description: "一个不让人压力的打字场。上手就是一个个亮起来的灯泡,学生看着自己手指越来越熟。", highlights: ["打个卷上去", "一天一步", "顺带上手"], accent: "rose" },
  { id: "sim-lab", name: "仿真模拟实验室", href: "https://codebn.cn/sim-lab", screenshot: "/media/apps/sim-lab.png", media: "/media/scenes/service-loop-path.webp", kind: "image" as const, category: "实验室", kicker: "实验室", description: "一个仿真的实验台。抽象的算法变成可视的动画,学生不是在听,是在担任一台虚拟里的一部分。", highlights: ["小场景快试", "动手调参数", "看见中间过程"], accent: "blue" },
  { id: "model-trainer", name: "模型训练", href: "https://codebn.cn/model-trainer", screenshot: "/media/apps/model-trainer.png", media: "/media/scenes/robotics-path.webp", kind: "image" as const, category: "训练上手", kicker: "训练上手", description: "让学生一次二三个小时里,看见一个模型是怎么从不会说话,一步步变聪明。", highlights: ["看过程", "玩参数", "调出个性"], accent: "teal" },
];

export const GALLERY_IMAGES = [
  { src: "/media/gallery/wrc7.webp", alt: "WRC 训练体系" },
  { src: "/media/gallery/python-course.webp", alt: "Python 课程" },
  { src: "/media/gallery/cpp-course.webp", alt: "C++ 竞赛路径" },
  { src: "/media/gallery/robot-detail1.webp", alt: "机器人项目细节" },
  { src: "/media/gallery/4e7cde1d67137f31dbbaceea09b3ba97.jpg", alt: "课堂辅导瞬间" },
  { src: "/media/gallery/5532032ec1ecd25b5aab600c3c66653e.jpg", alt: "工作坊瞬间" },
  { src: "/media/gallery/7ea7aec2c2fc24cdff315baf30e19994.jpg", alt: "学生作品展示" },
  { src: "/media/gallery/bf42704d89c36b8f7175792f2c6406df.jpg", alt: "幕后现场" },
  { src: "/media/gallery/03e58ed3352bb2c5b6c34475e3ef5c05.jpg", alt: "教学现场" },
  { src: "/media/gallery/11.jpg", alt: "学生作品" },
  { src: "/media/gallery/4c034334db22d80ecae7cd665b142e62.jpg", alt: "课堂剪影" },
  { src: "/media/gallery/ebe3db8e9e230e42fa4a3821dc906ca8.jpg", alt: "活动现场" },
];

// KPI: 使用全中文,避免任何西文字体回退导致的乱码。
export const KPI = [
  { value: "06", suffix: "+", label: "年经验教学" },
  { value: "1000", suffix: "+", label: "指导学生" },
  { value: "120", suffix: "+", label: "上线作品" },
  { value: "信奥", suffix: "", label: "竞赛指导教师" },
];

export const CONTACT = {
  wechat: { src: "/media/qr/wechat.webp", label: "微信", sub: "扫码加我" },
  douyin: { src: "/media/qr/douyin.webp", label: "抖音", sub: "看作品与更新" },
};

export const BIO_LINES = [
  "我叫森林,",
  "一位手艺人出身的教育者。",
  "六年来,我一直在教 Python、C++、Web、AI 与机器人。",
];

export const BIO_PARAGRAPH =
  "六年来,我陪 8 到 18 岁的孩子写代码、上台、讲自己的故事。每一届人走出教室时,手里都握着一样东西——一个他自己造出来、愿意拿给世界看的小作品。";
