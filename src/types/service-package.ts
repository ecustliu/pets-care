/** 预约可选的三种价格套餐（仅存枚举值，不单独建表） */
export enum ServicePackage {
  REFRESHING = "REFRESHING",
  PREMIUM = "PREMIUM",
  ROYAL_SPA = "ROYAL_SPA",
}

export const SERVICE_PACKAGE_LABELS: Record<ServicePackage, string> = {
  [ServicePackage.REFRESHING]: "清爽洗护",
  [ServicePackage.PREMIUM]: "精致护理",
  [ServicePackage.ROYAL_SPA]: "皇家 SPA",
};

export const SERVICE_PACKAGE_PRICES: Record<ServicePackage, number> = {
  [ServicePackage.REFRESHING]: 68,
  [ServicePackage.PREMIUM]: 168,
  [ServicePackage.ROYAL_SPA]: 298,
};

export const servicePackageOptions = (
  Object.values(ServicePackage) as ServicePackage[]
).map((pkg) => ({
  value: pkg,
  label: `${SERVICE_PACKAGE_LABELS[pkg]} - ¥${SERVICE_PACKAGE_PRICES[pkg]}起`,
}));

const packageValues = new Set<string>(Object.values(ServicePackage));

export function isServicePackage(value: string): value is ServicePackage {
  return packageValues.has(value);
}
