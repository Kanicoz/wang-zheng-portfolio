import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PillNav.css";

export default function PillNav({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  pillColor = "#120F17",
  hoveredPillTextColor = "#120F17",
  pillTextColor,
  initialLoadAnimation = true,
}) {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        const radius = ((w * w) / 4 + h * h) / (2 * h);
        const diameter = Math.ceil(2 * radius) + 2;
        const delta = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (w * w) / 4))) + 1;
        const originY = diameter - delta;
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;
        circle.style.bottom = `-${delta}px`;
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector(".pill-label");
        const hover = pill.querySelector(".pill-label-hover");
        gsap.set(label, { y: 0 });
        gsap.set(hover, { y: h + 12, opacity: 0 });
        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
        tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout).catch(() => {});
    if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { visibility: "hidden", opacity: 0, y: -8 });
    if (initialLoadAnimation) {
      if (logoRef.current) {
        gsap.fromTo(logoRef.current, { scale: 0 }, { scale: 1, duration: 0.55, ease });
      }
      if (navItemsRef.current) {
        gsap.fromTo(navItemsRef.current, { width: 0, overflow: "hidden" }, { width: "auto", duration: 0.55, ease });
      }
    }
    return () => window.removeEventListener("resize", layout);
  }, [ease, initialLoadAnimation, items]);

  useEffect(() => {
    const lines = hamburgerRef.current?.querySelectorAll(".hamburger-line");
    const menu = mobileMenuRef.current;
    if (!lines || !menu) return;
    gsap.to(lines[0], { rotation: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 3 : 0, duration: 0.25, ease });
    gsap.to(lines[1], { rotation: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -3 : 0, duration: 0.25, ease });
    gsap.to(menu, {
      autoAlpha: isMobileMenuOpen ? 1 : 0,
      y: isMobileMenuOpen ? 0 : -8,
      duration: 0.25,
      ease,
    });
  }, [ease, isMobileMenuOpen]);

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--pill-text": resolvedPillTextColor,
    "--hover-text": hoveredPillTextColor,
  };

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const handleLogoEnter = () => {
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(logoImgRef.current, { rotate: 360, duration: 0.22, ease, overwrite: "auto" });
  };

  return (
    <div className={`pill-nav-container ${className}`} style={cssVars}>
      <nav className="pill-nav" aria-label="Main navigation">
        <a ref={logoRef} className="pill-logo" href="#top" onMouseEnter={handleLogoEnter}>
          <img ref={logoImgRef} src={logo} alt={logoAlt} />
        </a>
        <div ref={navItemsRef} className="pill-nav-items desktop-only">
          <ul className="pill-list">
            {items.map((item, i) => (
              <li key={item.href}>
                <a
                  className={`pill${activeHref === item.href ? " is-active" : ""}`}
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span className="hover-circle" ref={(el) => { circleRefs.current[i] = el; }} />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover">{item.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mobile-menu-button mobile-only"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>
      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef}>
        <ul className="mobile-menu-list">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`mobile-menu-link${activeHref === item.href ? " is-active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
