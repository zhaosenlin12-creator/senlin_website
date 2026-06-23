import {
  Award,
  BookOpen,
  Bot,
  BrainCircuit,
  ChevronDown,
  CircleCheck,
  CodeXml,
  Layers,
  Rocket,
  Trophy,
  X,
  ZoomIn,
} from "lucide-react";

export const SECTION_NAV_ITEMS = [
  { id: "hero", label: "首页" },
  { id: "marquee", label: "身份" },
  { id: "about", label: "人物" },
  { id: "media", label: "作品" },
  { id: "evidence", label: "成果" },
  { id: "learning-universe", label: "学习宇宙" },
  { id: "contact", label: "联系" },
];

export const TYPEWRITER_LINES = [
  "编程教育 / 全栈应用 / 竞赛指导",
  "NOI 指导教师 / 1000+ 学员成果",
  "乐启教育 / 副校长 / 合伙人",
  "Python / C++ / Web / AI 教学实践",
];

export const MARQUEE_ITEMS = [
  { text: "NOI 指导教师", accent: true },
  { text: "1000+ 学员成长", accent: false },
  { text: "编程教育", accent: true },
  { text: "AI 工具", accent: false },
  { text: "机器人竞赛", accent: true },
  { text: "项目式学习", accent: false },
  { text: "全栈应用", accent: true },
  { text: "课堂服务闭环", accent: false },
];

export const STAT_ITEMS = [
  { label: "学员成果与获奖", to: 1000, suffix: "+" },
  { label: "编程教育深耕", to: 6, suffix: "年+" },
  { label: "课程 / 项目 / 竞赛", to: "多线", suffix: "" },
];

export const EXPERTISE_ITEMS = [
  {
    title: "Python / C++ 教学",
    icon: CodeXml,
    desc: "把抽象语法、算法思维和作品表达拆成孩子能理解、能完成、能展示的学习路径。",
  },
  {
    title: "全栈应用开发",
    icon: Layers,
    desc: "用真实 Web 应用和工具系统承载课程，让学习结果不只停留在课堂练习里。",
  },
  {
    title: "AI 与互动课堂",
    icon: BrainCircuit,
    desc: "把 AI 工具、生成式内容和课堂即时互动接入教学现场，提升理解、表达和反馈效率。",
  },
  {
    title: "机器人与竞赛指导",
    icon: Bot,
    desc: "围绕机器人项目、NOI/CSP 方向和团队展示，训练学生从方案到调试再到舞台表达。",
  },
];

export const ACHIEVEMENT_ITEMS = [
  {
    num: "01",
    title: "NOI 与信息学竞赛指导经验",
    desc: "长期深耕算法、数据结构和竞赛路径，让学生从兴趣学习进入更系统的训练。",
  },
  {
    num: "02",
    title: "机器人赛事与项目化成果",
    desc: "围绕编程、机器人和综合实践项目，持续产出可真实展示的团队成果。",
  },
  {
    num: "03",
    title: "课程研发与教学服务闭环",
    desc: "把课程、工具、反馈和作品展示组织成完整的学习体验，而不只是上课记录。",
  },
  {
    num: "04",
    title: "作品发布与内容表达",
    desc: "把课堂作品、应用入口和短视频展示连接起来，让家长能直接看见孩子的学习成果。",
  },
];

export const CERTIFICATION_ITEMS = [
  "NCT 青少年编程教师职业技能认证",
  "全国青少年编程能力等级考试相关经验",
  "NOI 系列竞赛指导实践",
  "全栈开发与教学场景融合实践",
];

export const CONTACT_ITEMS = [
  {
    label: "微信 / WeChat",
    src: "/qr-wechat.webp",
    sub: "扫码添加联系",
    testId: "contact-wechat",
  },
  {
    label: "抖音 / Douyin",
    src: "/qr-douyin.webp",
    sub: "查看作品与更新",
    testId: "contact-douyin",
  },
];

export const HERO_LEFT_STATUS = [
  "SYS // EDUCATOR_PROFILE_v5.0",
  "STATUS // TEACHING FIELD ONLINE",
  "FOCUS // EDU / AI / ROBOTICS",
];

export const HERO_RIGHT_STATUS = [
  "NOI // PRACTICE",
  "STUDENTS // 1000+",
  "WRCC // 2025",
];

export const LEARNING_NODES = [
  {
    id: "python",
    title: "Python",
    subtitle: "从入门到作品表达",
    description: "用闯关任务和真实小项目，把语法学习转化成可见的创作体验。",
    chips: ["游戏化", "项目作品", "即时反馈"],
    focus: "python-adventure",
  },
  {
    id: "cpp",
    title: "C++ / NOI",
    subtitle: "竞赛思维与算法训练",
    description: "用清晰的路线拆解数据结构、算法策略和题目表达，让训练更有方向。",
    chips: ["算法", "数据结构", "竞赛路线"],
    focus: "competition-floor",
  },
  {
    id: "ai",
    title: "AI 课堂",
    subtitle: "把新工具接入学习现场",
    description: "让学生理解 AI 的能力边界，并把提示词、生成内容和研究过程变成课堂素材。",
    chips: ["AI 工具", "研究式学习", "互动生成"],
    focus: "ai-classroom",
  },
  {
    id: "robotics",
    title: "机器人",
    subtitle: "从搭建调试到赛事表达",
    description: "把机器人项目拆成结构、控制、策略和展示四个层次，训练真实问题解决能力。",
    chips: ["调试", "团队协作", "竞赛现场"],
    focus: "robot-competition-team",
  },
  {
    id: "projects",
    title: "作品发布",
    subtitle: "让学习成果被看见",
    description: "鼓励学生把代码变成可演示、可讲述、可迭代的作品，而不只是完成练习。",
    chips: ["Web 应用", "作品集", "公开展示"],
    focus: "code-research",
  },
  {
    id: "service",
    title: "教学闭环",
    subtitle: "课堂、家庭与成长记录",
    description: "通过反馈系统、小程序和阶段记录，把学习过程沉淀成可追踪的成长证据。",
    chips: ["反馈系统", "家校沟通", "成长档案"],
    focus: "class-system",
  },
];

export const HERO_ICONS = {
  Award,
  BookOpen,
  ChevronDown,
  CircleCheck,
  Rocket,
  Trophy,
  X,
  ZoomIn,
};
