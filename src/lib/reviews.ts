import { prisma } from "@/lib/prisma";

type ReviewRow = {
  id: string;
  authorName: string;
  petInfo: string;
  avatar: string;
  stars: number;
  content: string;
  packageType: string | null;
  petType: string | null;
  createdAt: Date;
};

export async function getDisplayReviews(limit: number): Promise<ReviewRow[]> {
  const featured = await prisma.review.findMany({
    where: { status: "approved", featured: true },
    orderBy: [{ featuredOrder: "asc" }, { createdAt: "desc" }],
    take: limit,
  });

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const selected = [...featured];
  const selectedIds = new Set(selected.map((r) => r.id));
  const seenPetTypes = new Set(selected.map((r) => r.petType).filter(Boolean));
  const seenPackages = new Set(selected.map((r) => r.packageType).filter(Boolean));

  const candidates = await prisma.review.findMany({
    where: {
      status: "approved",
      id: { notIn: [...selectedIds] },
      stars: { gte: 4 },
    },
    orderBy: [{ stars: "desc" }, { createdAt: "desc" }],
    take: limit * 3,
  });

  for (const candidate of candidates) {
    if (selected.length >= limit) break;
    if (candidate.content.length < 15) continue;

    const addsDiversity =
      (candidate.petType && !seenPetTypes.has(candidate.petType)) ||
      (candidate.packageType && !seenPackages.has(candidate.packageType));

    if (addsDiversity || selected.length < 6) {
      selected.push(candidate);
      selectedIds.add(candidate.id);
      if (candidate.petType) seenPetTypes.add(candidate.petType);
      if (candidate.packageType) seenPackages.add(candidate.packageType);
    }
  }

  for (const candidate of candidates) {
    if (selected.length >= limit) break;
    if (!selectedIds.has(candidate.id)) {
      selected.push(candidate);
      selectedIds.add(candidate.id);
    }
  }

  return selected;
}
