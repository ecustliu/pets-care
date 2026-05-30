"use client";

import FadeIn from "@/components/FadeIn";
import { pricingPlans } from "@/data/site";
import type { ServicePackage } from "@/types/service-package";

type PricingProps = {
  onSelectPlan: (pkg: ServicePackage) => void;
};

export default function Pricing({ onSelectPlan }: PricingProps) {
  const handleSelect = (pkg: ServicePackage) => {
    onSelectPlan(pkg);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pricing" id="pricing">
      <div className="section-inner">
        <FadeIn className="section-header">
          <span className="section-tag">价格套餐</span>
          <h2>选择适合的护理方案</h2>
          <p>透明定价，无隐形消费。小型犬、中型犬、大型犬价格略有差异</p>
        </FadeIn>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <FadeIn
              key={plan.name}
              className={`pricing-card${plan.featured ? " featured" : ""}`}
            >
              <span className="plan-tag">{plan.tag}</span>
              <h3>{plan.name}</h3>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-price">
                ¥{plan.price}
                <span>起</span>
              </div>
              <p className="plan-period">小型犬参考价</p>
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                className={`btn ${plan.featured ? "btn-primary" : "btn-outline"}`}
                onClick={() => handleSelect(plan.package)}
              >
                选择套餐
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
