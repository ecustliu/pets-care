"use client";

import { useState } from "react";
import Contact from "@/components/Contact";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import type { ServicePackage } from "@/types/service-package";

export default function BookingSection() {
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | "">("");

  return (
    <>
      <Pricing onSelectPlan={setSelectedPackage} />
      <Reviews />
      <Contact selectedPackage={selectedPackage} />
    </>
  );
}
