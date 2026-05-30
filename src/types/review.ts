import type { ServicePackage } from "@/types/service-package";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type ReviewPayload = {
  authorName: string;
  petInfo: string;
  stars: number;
  content: string;
  avatar?: string;
  packageType?: ServicePackage;
  petType?: string;
};

export type ReviewRecord = {
  id: string;
  authorName: string;
  petInfo: string;
  avatar: string;
  stars: number;
  content: string;
  packageType: ServicePackage | null;
  petType: string | null;
  createdAt: string;
};

export type ReviewDisplay = {
  id: string;
  stars: number;
  quote: string;
  author: string;
  pet: string;
  avatar: string;
};

export function toReviewDisplay(review: ReviewRecord): ReviewDisplay {
  return {
    id: review.id,
    stars: review.stars,
    quote: review.content,
    author: review.authorName,
    pet: review.petInfo,
    avatar: review.avatar,
  };
}

export function toReviewDisplayFromStatic(review: {
  stars: number;
  quote: string;
  author: string;
  pet: string;
  avatar: string;
}): ReviewDisplay {
  return {
    id: `${review.author}-${review.pet}`,
    ...review,
  };
}
