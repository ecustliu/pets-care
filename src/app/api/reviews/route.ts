import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDisplayReviews } from "@/lib/reviews";
import { petTypes } from "@/data/site";
import type { ReviewPayload, ReviewRecord } from "@/types/review";
import { isServicePackage } from "@/types/service-package";

function serializeReview(review: {
  id: string;
  authorName: string;
  petInfo: string;
  avatar: string;
  stars: number;
  content: string;
  packageType: string | null;
  petType: string | null;
  createdAt: Date;
}): ReviewRecord {
  return {
    id: review.id,
    authorName: review.authorName,
    petInfo: review.petInfo,
    avatar: review.avatar,
    stars: review.stars,
    content: review.content,
    packageType: review.packageType as ReviewRecord["packageType"],
    petType: review.petType,
    createdAt: review.createdAt.toISOString(),
  };
}

function validateReview(body: Partial<ReviewPayload>): string | null {
  if (!body.authorName?.trim()) return "请填写您的称呼";
  if (!body.petInfo?.trim()) return "请填写宠物信息（品种 · 名字）";
  if (!body.content?.trim() || body.content.trim().length < 10) {
    return "评价内容至少 10 个字";
  }
  if (!body.stars || body.stars < 1 || body.stars > 5) {
    return "请选择评分";
  }
  if (body.petType && !petTypes.includes(body.petType as (typeof petTypes)[number])) {
    return "请选择有效的宠物类型";
  }
  if (body.packageType && !isServicePackage(body.packageType)) {
    return "请选择有效的服务套餐";
  }
  return null;
}

function dbConfigError() {
  return NextResponse.json(
    {
      error:
        "数据库未配置。请复制 .env.example 为 .env.local，填入 Neon 的 DATABASE_URL，并执行 npm run db:push",
    },
    { status: 503 },
  );
}

export async function GET(request: Request) {
  if (!process.env.DATABASE_URL) {
    return dbConfigError();
  }

  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured") === "true";
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 15, 1), 30);

  try {
    const rows = featured
      ? await getDisplayReviews(limit)
      : await prisma.review.findMany({
          where: { status: "approved" },
          orderBy: { createdAt: "desc" },
          take: limit,
        });

    return NextResponse.json({
      reviews: rows.map(serializeReview),
    });
  } catch {
    return NextResponse.json({ error: "读取评价失败" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return dbConfigError();
  }

  try {
    const body = (await request.json()) as Partial<ReviewPayload>;
    const error = validateReview(body);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await prisma.review.create({
      data: {
        authorName: body.authorName!.trim(),
        petInfo: body.petInfo!.trim(),
        avatar: body.avatar?.trim() || "🐾",
        stars: body.stars!,
        content: body.content!.trim(),
        packageType: body.packageType ?? null,
        petType: body.petType ?? null,
        status: "pending",
        featured: false,
      },
    });

    return NextResponse.json(
      { success: true, message: "评价已提交，审核通过后将展示在首页" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "提交评价失败，请稍后重试" }, { status: 500 });
  }
}
