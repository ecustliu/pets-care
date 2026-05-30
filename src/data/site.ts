import { ServicePackage } from "@/types/service-package";

export const navLinks = [
  { href: "#services", label: "服务项目" },
  { href: "#process", label: "洗护流程" },
  { href: "#pricing", label: "价格套餐" },
  { href: "#reviews", label: "用户评价" },
  { href: "#contact", label: "预约咨询" },
] as const;

export const services = [
  {
    icon: "🛁",
    title: "基础洗护",
    description: "深层清洁、吹干梳理，使用低敏天然洗护液，适合日常护理。",
    price: 68,
  },
  {
    icon: "✂️",
    title: "造型修剪",
    description: "专业美容师根据品种特点设计造型，让毛孩子焕然一新。",
    price: 128,
  },
  {
    icon: "💆",
    title: "SPA 护理",
    description: "精油按摩、毛发滋养、皮肤调理，给宠物极致放松体验。",
    price: 198,
  },
  {
    icon: "🦷",
    title: "口腔护理",
    description: "牙齿清洁、口气清新，预防牙结石，守护口腔健康。",
    price: 58,
  },
  {
    icon: "💅",
    title: "指甲修剪",
    description: "安全修剪指甲、打磨甲面，避免抓伤，呵护肉垫健康。",
    price: 38,
  },
  {
    icon: "🏠",
    title: "上门洗护",
    description: "专业团队携带设备上门，减少宠物出行应激，在家也能享受服务。",
    price: 168,
  },
] as const;

export const processSteps = [
  { step: 1, title: "健康检查", description: "检查皮肤、耳朵、指甲状况，确认适合洗护" },
  { step: 2, title: "深层清洁", description: "温水预洗、专业洗护液深层清洁毛发与皮肤" },
  { step: 3, title: "护理造型", description: "吹干梳理、修剪造型、SPA 护理等定制服务" },
  { step: 4, title: "完成交付", description: "最终检查、拍照记录，温馨送宠回家" },
] as const;

export const pricingPlans = [
  {
    tag: "基础版",
    name: "清爽洗护",
    package: ServicePackage.REFRESHING,
    description: "适合日常清洁护理",
    price: 68,
    featured: false,
    features: ["健康检查", "深层沐浴清洁", "专业吹干梳理", "耳朵基础清洁", "指甲修剪"],
  },
  {
    tag: "最受欢迎",
    name: "精致护理",
    package: ServicePackage.PREMIUM,
    description: "洗护 + 造型一站式",
    price: 168,
    featured: true,
    features: [
      "包含基础版全部服务",
      "专业造型修剪",
      "毛发滋养护理",
      "口腔基础清洁",
      "香氛喷雾",
      "免费拍照留念",
    ],
  },
  {
    tag: "尊享版",
    name: "皇家 SPA",
    package: ServicePackage.ROYAL_SPA,
    description: "顶级奢华护理体验",
    price: 298,
    featured: false,
    features: [
      "包含精致版全部服务",
      "精油 SPA 按摩",
      "皮肤深层调理",
      "进口高端洗护产品",
      "专属一对一服务",
      "护理报告 + 照片",
    ],
  },
] as const;

export const reviews = [
  {
    stars: 5,
    quote:
      "带我家柯基来做精致护理，美容师非常有耐心，狗狗全程都很配合。洗完美毛蓬松发亮，造型也超可爱！",
    author: "李女士",
    pet: "柯基 · 土豆",
    avatar: "🐕",
  },
  {
    stars: 5,
    quote:
      "第一次带猫咪来洗护，本来很担心应激反应。工作人员专业又温柔，还用了猫咪专用的低敏产品，体验非常好。",
    author: "张先生",
    pet: "英短 · 咪咪",
    avatar: "🐱",
  },
  {
    stars: 5,
    quote:
      "上门洗护太方便了！金毛体型大，出门洗澡很麻烦。师傅准时到达，设备齐全，洗完家里也收拾得很干净。",
    author: "王小姐",
    pet: "金毛 · 大黄",
    avatar: "🦮",
  },
  {
    stars: 5,
    quote:
      "办了年卡很划算，每月固定来护理，狗狗皮肤状况明显改善。前台还会提醒驱虫和洗澡周期，很贴心。",
    author: "陈先生",
    pet: "泰迪 · 豆豆",
    avatar: "🐩",
  },
  {
    stars: 5,
    quote:
      "SPA 套餐做完毛发特别顺滑，还有香薰放松环节。店里环境干净无异味，等候区还有免费咖啡，体验满分。",
    author: "赵女士",
    pet: "布偶 · 雪球",
    avatar: "🐱",
  },
  {
    stars: 5,
    quote:
      "两只狗一起预约，工作人员安排得井井有条，没有互相干扰。护理报告写得很详细，照片也拍得好看。",
    author: "刘女士",
    pet: "柴犬 · 小橙 & 边牧 · 乐乐",
    avatar: "🐕",
  },
] as const;

export const storeLocation = {
  address: "上海市长宁区金钟路960号",
  lat: 31.2212,
  lng: 121.3508,
} as const;

export const contactInfo = [
  { icon: "📍", title: "门店地址", content: storeLocation.address },
  { icon: "📞", title: "联系电话", content: "400-888-6666（每日 9:00 - 21:00）" },
  { icon: "💬", title: "微信咨询", content: "PawCare888 · 扫码添加客服微信" },
  { icon: "🕐", title: "营业时间", content: "周一至周日 9:00 - 21:00（节假日正常营业）" },
] as const;

export const petTypes = ["小型犬", "中型犬", "大型犬", "猫咪", "其他"] as const;
