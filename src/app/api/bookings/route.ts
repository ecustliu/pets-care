import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { BookingPayload, BookingRecord } from "@/types/booking";
import { petTypes } from "@/data/site";
import { isServicePackage } from "@/types/service-package";

function serializeBooking(booking: {
  id: string;
  ownerName: string;
  phone: string;
  petName: string;
  petType: string;
  packageType: string;
  date: string;
  time: string;
  notes: string;
  createdAt: Date;
}): BookingRecord {
  return {
    id: booking.id,
    ownerName: booking.ownerName,
    phone: booking.phone,
    petName: booking.petName,
    petType: booking.petType,
    packageType: booking.packageType as BookingRecord["packageType"],
    date: booking.date,
    time: booking.time,
    notes: booking.notes,
    createdAt: booking.createdAt.toISOString(),
  };
}

function validateBooking(body: Partial<BookingPayload>): string | null {
  if (!body.ownerName?.trim()) return "请填写您的姓名";
  if (!body.phone?.trim() || !/^1\d{10}$/.test(body.phone.trim())) return "请填写有效的手机号";
  if (!body.petName?.trim()) return "请填写宠物名字";
  if (!body.petType || !petTypes.includes(body.petType as (typeof petTypes)[number])) {
    return "请选择宠物类型";
  }
  if (!body.packageType || !isServicePackage(body.packageType)) {
    return "请选择预约服务套餐";
  }
  if (!body.date) return "请选择期望日期";
  if (!body.time || !/^([01]\d|2[0-3]):[0-5]\d$/.test(body.time)) return "请选择具体时间";

  const [hours, minutes] = body.time.split(":").map(Number);
  if (hours < 9 || hours > 21 || (hours === 21 && minutes > 0)) {
    return "预约时间需在 9:00 - 21:00 之间";
  }

  const selectedDate = new Date(`${body.date}T${body.time}:00`);
  const now = new Date();
  if (Number.isNaN(selectedDate.getTime()) || selectedDate <= now) {
    return "请选择有效的预约日期和时间";
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

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return dbConfigError();
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      bookings: bookings.map(serializeBooking),
    });
  } catch {
    return NextResponse.json({ error: "读取预约记录失败" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return dbConfigError();
  }

  try {
    const body = (await request.json()) as Partial<BookingPayload>;
    const error = validateBooking(body);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        ownerName: body.ownerName!.trim(),
        phone: body.phone!.trim(),
        petName: body.petName!.trim(),
        petType: body.petType!,
        packageType: body.packageType!,
        date: body.date!,
        time: body.time!,
        notes: body.notes?.trim() || "",
      },
    });

    return NextResponse.json(
      { success: true, booking: serializeBooking(booking) },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "保存预约失败，请稍后重试" }, { status: 500 });
  }
}
