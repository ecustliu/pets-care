export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="logo">
            <div className="logo-icon">🐾</div>
            PawCare
          </a>
          <p>
            专注宠物洗护 5 年，用专业和爱心呵护每一只毛孩子。进口天然产品，一对一专属服务。
          </p>
        </div>
        <div className="footer-col">
          <h4>服务项目</h4>
          <ul>
            <li>
              <a href="#services">基础洗护</a>
            </li>
            <li>
              <a href="#services">造型修剪</a>
            </li>
            <li>
              <a href="#services">SPA 护理</a>
            </li>
            <li>
              <a href="#services">上门洗护</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>关于我们</h4>
          <ul>
            <li>
              <a href="#">品牌故事</a>
            </li>
            <li>
              <a href="#">团队介绍</a>
            </li>
            <li>
              <a href="#">加入我们</a>
            </li>
            <li>
              <a href="#">合作伙伴</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>帮助中心</h4>
          <ul>
            <li>
              <a href="#">常见问题</a>
            </li>
            <li>
              <a href="#">洗护须知</a>
            </li>
            <li>
              <a href="#">取消政策</a>
            </li>
            <li>
              <a href="#contact">联系我们</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PawCare 宠物洗护. All rights reserved.</span>
        <span>🐾 用心呵护每一只毛孩子</span>
      </div>
    </footer>
  );
}
