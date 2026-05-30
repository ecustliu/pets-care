export type BookingPayload = {
  ownerName: string;
  phone: string;
  petName: string;
  petType: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
};

export type BookingRecord = BookingPayload & {
  id: string;
  createdAt: string;
};
