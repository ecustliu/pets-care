import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seeds = [
  {
    authorName: "李女士",
    petInfo: "柯基 · 土豆",
    avatar: "🐕",
    stars: 5,
    content:
      "带我家柯基来做精致护理，美容师非常有耐心，狗狗全程都很配合。洗完美毛蓬松发亮，造型也超可爱！",
    packageType: "PREMIUM",
    petType: "小型犬",
    status: "approved",
    featured: true,
    featuredOrder: 1,
  },
  {
    authorName: "张先生",
    petInfo: "英短 · 咪咪",
    avatar: "🐱",
    stars: 5,
    content:
      "第一次带猫咪来洗护，本来很担心应激反应。工作人员专业又温柔，还用了猫咪专用的低敏产品，体验非常好。",
    packageType: "REFRESHING",
    petType: "猫咪",
    status: "approved",
    featured: true,
    featuredOrder: 2,
  },
  {
    authorName: "王小姐",
    petInfo: "金毛 · 大黄",
    avatar: "🦮",
    stars: 5,
    content:
      "金毛体型大，出门洗澡很麻烦。师傅服务很专业，设备齐全，洗完毛发特别顺滑，体验非常好。",
    packageType: "REFRESHING",
    petType: "大型犬",
    status: "approved",
    featured: true,
    featuredOrder: 3,
  },
  {
    authorName: "陈先生",
    petInfo: "泰迪 · 豆豆",
    avatar: "🐩",
    stars: 5,
    content:
      "办了年卡很划算，每月固定来护理，狗狗皮肤状况明显改善。前台还会提醒驱虫和洗澡周期，很贴心。",
    packageType: "PREMIUM",
    petType: "小型犬",
    status: "approved",
    featured: true,
    featuredOrder: 4,
  },
  {
    authorName: "赵女士",
    petInfo: "布偶 · 雪球",
    avatar: "🐱",
    stars: 5,
    content:
      "SPA 套餐做完毛发特别顺滑，还有香薰放松环节。店里环境干净无异味，等候区还有免费咖啡，体验满分。",
    packageType: "ROYAL_SPA",
    petType: "猫咪",
    status: "approved",
    featured: true,
    featuredOrder: 5,
  },
  {
    authorName: "刘女士",
    petInfo: "柴犬 · 小橙 & 边牧 · 乐乐",
    avatar: "🐕",
    stars: 5,
    content:
      "两只狗一起预约，工作人员安排得井井有条，没有互相干扰。护理报告写得很详细，照片也拍得好看。",
    packageType: "PREMIUM",
    petType: "中型犬",
    status: "approved",
    featured: true,
    featuredOrder: 6,
  },
];

async function main() {
  const count = await prisma.review.count();
  if (count > 0) {
    console.log(`已有 ${count} 条评价，跳过种子数据导入`);
    return;
  }

  await prisma.review.createMany({ data: seeds });
  console.log(`已导入 ${seeds.length} 条精选评价`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
