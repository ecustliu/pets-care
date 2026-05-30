"use client";

import { useState } from "react";
import Contact from "@/components/Contact";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";

export default function BookingSection() {
  const [selectedService, setSelectedService] = useState("");

  return (
    <>
      <Pricing onSelectPlan={setSelectedService} />
      <Reviews />
      <Contact selectedService={selectedService} />
    </>
  );
}
