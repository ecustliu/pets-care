import FadeIn from "@/components/FadeIn";
import { services } from "@/data/site";

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="section-inner">
        <FadeIn className="section-header">
          <span className="section-tag">我们的服务</span>
          <h2>全方位宠物洗护方案</h2>
          <p>从基础清洁到高端 SPA，为不同品种、不同需求的毛孩子提供定制化护理服务</p>
        </FadeIn>
        <div className="services-grid">
          {services.map((service) => (
            <FadeIn key={service.title} className="service-card">
              <div className="icon-wrap">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="price">
                ¥{service.price} <small>起</small>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
