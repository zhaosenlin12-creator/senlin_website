const imageModules = import.meta.glob("../iamges/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

const imageByName = Object.fromEntries(
  Object.entries(imageModules)
    .filter(([path]) => !path.endsWith("/_contact_sheet.jpg"))
    .map(([path, src]) => [path.split("/").pop(), src]),
);

const curatedGallery = [
  {
    slug: "classroom-guidance",
    filename: "4e7cde1d67137f31dbbaceea09b3ba97.jpg",
    title: "课堂辅导时刻",
    category: "教学现场",
    description: "围在电脑前拆问题，把抽象思路讲成学生能马上操作的具体步骤。",
  },
  {
    slug: "teacher-student-portrait",
    filename: "03e58ed3352bb2c5b6c34475e3ef5c05.jpg",
    title: "师生同框",
    category: "师生合影",
    description: "真实陪伴带来的安全感，会影响学生是否敢表达、敢继续做项目。",
  },
  {
    slug: "student-group-energy",
    filename: "145fb7106917a5e7c056478f657577c6.jpg",
    title: "课堂展示气氛",
    category: "学生团队",
    description: "作品展示后的兴奋和表达欲，是课堂氛围被真正点亮的信号。",
  },
  {
    slug: "wrcc-stage-portrait",
    filename: "415738909ed8cf9eb1594535c8e3537e.jpg",
    title: "WRCC 现场留影",
    category: "竞赛成果",
    description: "站上正式赛场后，学生会更清楚项目训练不是练习题，而是可被看见的成果。",
  },
  {
    slug: "wrcc-team-banner",
    filename: "4c034334db22d80ecae7cd665b142e62.jpg",
    title: "团队展板合影",
    category: "竞赛成果",
    description: "团队照把项目成果、现场气氛和集体归属感合在了一起。",
  },
  {
    slug: "classroom-brothers",
    filename: "5532032ec1ecd25b5aab600c3c66653e.jpg",
    title: "教室里的团队站位",
    category: "学生团队",
    description: "同一个学习空间里形成的伙伴关系，会把学习过程变得更有持续性。",
  },
  {
    slug: "wrcc-yichang-award",
    filename: "57b76a27feb1167ff4387a3bcb517eae.jpg",
    title: "WRCC 宜昌领奖台",
    category: "竞赛成果",
    description: "从平时训练到领奖时刻，学生能看见自己的投入最终长成了什么样子。",
  },
  {
    slug: "wrcc-beijing-team",
    filename: "6e43b26aa8d461efbe6bfd108898c4bf.jpg",
    title: "北京锦标赛团队照",
    category: "竞赛成果",
    description: "赛事现场也是长期训练、项目执行和舞台表达能力的集中呈现。",
  },
  {
    slug: "window-team",
    filename: "7274f1e1f018e70e0e0b5f17d360949e.jpg",
    title: "窗边学生团队",
    category: "学生团队",
    description: "不同年龄段学生一起成长时，团队氛围会自然把新生也带起来。",
  },
  {
    slug: "great-wall-outing",
    filename: "7b0629ffd37a15672eabce6da7b6563c.jpg",
    title: "长城活动日",
    category: "活动出行",
    description: "学习之外的同行与出行，会让老师和学生之间的长期连接更真实。",
  },
  {
    slug: "project-photo-wall",
    filename: "7ea7aec2c2fc24cdff315baf30e19994.jpg",
    title: "作品墙前合影",
    category: "教学现场",
    description: "当作品能被公开展示，学生对项目的拥有感和表达欲会明显提升。",
  },
  {
    slug: "python-adventure-stage",
    filename: "821a0144bad69f633441e1e7f00b0e20.jpg",
    title: "Python 冒险岛现场分享",
    category: "项目展示",
    description: "把应用项目讲给更多人听，本身就是教学能力和作品能力的一次同步展示。",
  },
  {
    slug: "teacher-student-medal",
    filename: "85fa5f3cea36d06b89a2802a08dd6d3a.jpg",
    title: "获奖后合影",
    category: "师生合影",
    description: "成果落地的一刻最能说明长期投入的价值，也最能建立后续信任。",
  },
  {
    slug: "robot-competition-team",
    filename: "9f553117006eb7273508fce3e103dc84.jpg",
    title: "赛场团队展示",
    category: "竞赛成果",
    description: "大型活动现场让项目训练和舞台表达能力一起被放大出来。",
  },
  {
    slug: "competition-floor",
    filename: "b28454710e48410eece89976a37892f6.jpg",
    title: "比赛执行现场",
    category: "竞赛成果",
    description: "从讲解到调试再到现场执行，训练价值往往体现在这些细节时刻。",
  },
  {
    slug: "debugging-scene",
    filename: "bf42704d89c36b8f7175792f2c6406df.jpg",
    title: "赛中调试时刻",
    category: "竞赛成果",
    description: "问题解决能力发生在临场调试和快速判断的瞬间。",
  },
  {
    slug: "certificate-group",
    filename: "c96b1c78e290ab5926348141528de895.jpg",
    title: "证书合影",
    category: "学生团队",
    description: "证书不是终点，但会给学生一个很强的确认感。",
  },
  {
    slug: "celebration-class",
    filename: "ca5c3b9bbe952a3346d5352649d7c360.jpg",
    title: "课堂成果庆祝",
    category: "学生团队",
    description: "把成果举起来分享的那一刻，会自然形成下一轮学习动力。",
  },
  {
    slug: "daily-portrait",
    filename: "d192b171f4334ba3f7d1987d8cd29b5e.jpg",
    title: "日常课堂自拍",
    category: "教学现场",
    description: "普通课堂里持续稳定的陪伴，才是长期效果的核心。",
  },
  {
    slug: "small-award-photo",
    filename: "dd3021a727e24d95c138b1f8e91c8d66.jpg",
    title: "小小成果时刻",
    category: "师生合影",
    description: "每一次小成果都值得被记录，因为它是学生建立自信最快的方式之一。",
  },
  {
    slug: "certificate-selfie",
    filename: "ebd6de98caacf995a5fc46d55623341d.jpg",
    title: "证书自拍现场",
    category: "教学现场",
    description: "老师和学生一起举起证书时，成就感会从个人扩展成集体感受。",
  },
  {
    slug: "classroom-crew",
    filename: "ebe3db8e9e230e42fa4a3821dc906ca8.jpg",
    title: "日常学习小队",
    category: "学生团队",
    description: "团队学习让学生更自然地进入表达、合作和互相带动。",
  },
  {
    slug: "mentor-checkpoint",
    filename: "efe82287a2ef87a865246b17efb2cb5a.jpg",
    title: "阶段性陪伴合影",
    category: "师生合影",
    description: "每个阶段的合影都像一个检查点，记录学生已经走过的真实路径。",
  },
];

export const GALLERY_ITEMS = curatedGallery.map((item) => ({
  ...item,
  src: imageByName[item.filename],
}));
