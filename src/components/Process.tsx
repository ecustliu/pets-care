import FadeIn from "@/components/FadeIn";
import { processSteps } from "@/data/site";

export default function Process() {
  return (
    <section id="process">
      <div className="section-inner">
        <FadeIn className="section-header">
          <span className="section-tag">洗护流程</span>
          <h2>四步完成专业洗护</h2>
          <p>标准化流程，确保每一只宠物都能获得安全、舒适的服务体验</p>
        </FadeIn>
        <div className="process-steps">
          {processSteps.map((step) => (
            <FadeIn key={step.step} className="process-step">
              <div className="step-number">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
