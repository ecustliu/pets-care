import type { ServicePackage } from "@/types/service-package";

export type BookingPayload = {
  ownerName: string;
  phone: string;
  petName: string;
  petType: string;
  packageType: ServicePackage;
  date: string;
  time: string;
  notes?: string;
};

export type BookingRecord = BookingPayload & {
  id: string;
  createdAt: string;
};
