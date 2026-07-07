import { useCallback, useEffect, useRef } from "react";
import "./BorderGlow.css";

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  return {
    "--glow-color": `hsl(${base} / ${Math.min(100 * intensity, 100)}%)`,
    "--glow-color-60": `hsl(${base} / ${Math.min(60 * intensity, 100)}%)`,
    "--glow-color-50": `hsl(${base} / ${Math.min(50 * intensity, 100)}%)`,
    "--glow-color-40": `hsl(${base} / ${Math.min(40 * intensity, 100)}%)`,
    "--glow-color-30": `hsl(${base} / ${Math.min(30 * intensity, 100)}%)`,
    "--glow-color-20": `hsl(${base} / ${Math.min(20 * intensity, 100)}%)`,
    "--glow-color-10": `hsl(${base} / ${Math.min(10 * intensity, 100)}%)`,
  };
}

const gradientPositions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const gradientKeys = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i += 1) {
    const color = colors[Math.min(colorMap[i], colors.length - 1)];
    vars[gradientKeys[i]] = `radial-gradient(at ${gradientPositions[i]}, ${color} 0px, transparent 50%)`;
  }
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = (x) => 1 - (1 - x) ** 3, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else onEnd?.();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "190 90 72",
  backgroundColor = "#151515",
  borderRadius = 32,
  glowRadius = 34,
  glowIntensity = 0.9,
  coneSpread = 25,
  animated = false,
  colors = ["#7dd3fc", "#a78bfa", "#2dd4bf"],
  fillOpacity = 0.34,
}) {
  const cardRef = useRef(null);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const [cx, cy] = getCenterOfElement(card);
    const dx = x - cx;
    const dy = y - cy;
    const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
    const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    const angle = dx === 0 && dy === 0 ? 0 : Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
    card.style.setProperty("--cursor-angle", `${angle < 0 ? angle + 360 : angle}deg`);
  }, [getCenterOfElement]);

  useEffect(() => {
    if (!animated || !cardRef.current) return;
    const card = cardRef.current;
    card.classList.add("sweep-active");
    animateValue({ duration: 500, onUpdate: (v) => card.style.setProperty("--edge-proximity", v) });
    animateValue({
      duration: 1700,
      onUpdate: (v) => card.style.setProperty("--cursor-angle", `${110 + 355 * (v / 100)}deg`),
    });
    animateValue({
      delay: 1800,
      duration: 1200,
      start: 100,
      end: 0,
      onUpdate: (v) => card.style.setProperty("--edge-proximity", v),
      onEnd: () => card.classList.remove("sweep-active"),
    });
  }, [animated]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`}
      style={{
        "--card-bg": backgroundColor,
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
