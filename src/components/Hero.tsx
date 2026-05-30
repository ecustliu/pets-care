export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">🌟 全城口碑第一 · 已服务 8000+ 毛孩子</div>
          <h1>
            给毛孩子
            <br />
            <span>专业温柔的洗护体验</span>
          </h1>
          <p className="hero-desc">
            采用进口天然洗护产品，一对一专属服务。让每一只宠物都能享受安全、舒适、专业的洗护护理。
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              📅 在线预约
            </a>
            <a href="#services" className="btn btn-outline">
              了解服务
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <strong>8000+</strong>
              <span>服务宠物</span>
            </div>
            <div className="stat-item">
              <strong>4.9</strong>
              <span>用户评分</span>
            </div>
            <div className="stat-item">
              <strong>5年</strong>
              <span>专业经验</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-header">
              <div className="pet-avatar">🐕</div>
              <div>
                <h3>今日预约 · 豆豆</h3>
                <p>金毛 · 精致洗护套餐</p>
              </div>
            </div>
            <div className="service-preview">
              <div className="service-preview-item">
                <div className="icon bath">🛁</div>
                <div>
                  <strong>深层清洁沐浴</strong>
                  <span>约 30 分钟 · 进行中</span>
                </div>
              </div>
              <div className="service-preview-item">
                <div className="icon cut">✂️</div>
                <div>
                  <strong>造型修剪</strong>
                  <span>约 45 分钟 · 待开始</span>
                </div>
              </div>
              <div className="service-preview-item">
                <div className="icon spa">💆</div>
                <div>
                  <strong>SPA 护理</strong>
                  <span>约 20 分钟 · 待开始</span>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-badge top">✨ 100% 好评</div>
          <div className="floating-badge bottom">🏆 专业认证</div>
        </div>
      </div>
    </section>
  );
}
