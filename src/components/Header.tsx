"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header id="header" className={scrolled ? "scrolled" : ""}>
      <nav>
        <a href="#" className="logo">
          <div className="logo-icon">🐾</div>
          PawCare
        </a>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button type="button" className="nav-cta" onClick={scrollToContact}>
          立即预约
        </button>
        <button
          type="button"
          className="menu-toggle"
          aria-label="菜单"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </nav>
    </header>
  );
}
