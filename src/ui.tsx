import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { img, type ImgKey } from "./images";

const FALLBACKS = [
  "linear-gradient(135deg,#e8dcc8,#8fb3c7)",
  "linear-gradient(135deg,#f3e7da,#c4745a)",
  "linear-gradient(135deg,#dfe8ee,#1f3a5f)",
];

export function Img({ k, w = 1200, h, alt = "", className = "", eager = false, style }: { k: ImgKey; w?: number; h?: number; alt?: string; className?: string; eager?: boolean; style?: CSSProperties }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fb = FALLBACKS[k.length % FALLBACKS.length];
  if (failed) return <div className={`img-fallback ${className}`} style={{ background: fb, ...style }} role="img" aria-label={alt} />;
  return (
    <img
      src={img(k, w, h)}
      srcSet={`${img(k, Math.round(w / 2), h ? Math.round(h / 2) : undefined)} ${Math.round(w / 2)}w, ${img(k, w, h)} ${w}w`}
      sizes={`(max-width: 700px) 100vw, ${w}px`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`${className} ${loaded ? "is-loaded" : "is-loading"}`}
      style={{ background: fb, ...style }}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: any }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setShown(true), io.disconnect())),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function Logo({ light = false, size = 40 }: { light?: boolean; size?: number }) {
  const c = light ? "#FAF6EF" : "#1F3A5F";
  const g = "#B8955A";
  return (
    <span className="logo" style={{ color: c }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="none" stroke={g} strokeWidth="1" />
        <circle cx="32" cy="32" r="26.5" fill="none" stroke={g} strokeWidth=".5" opacity=".6" />
        <path d="M19 19.5h26M32 19.5v20" stroke={c} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M19.5 19.5c0-2 1-3 2.5-3M44.5 19.5c0-2-1-3-2.5-3" stroke={c} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M16 45c3-2.6 6-2.6 9 0s6 2.6 9 0 6-2.6 9 0 4 2 5 1.4" stroke={g} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M19 50.5c2.6-2 5.2-2 7.8 0s5.2 2 7.8 0 5.2-2 7.8 0" stroke={g} strokeWidth="1" fill="none" strokeLinecap="round" opacity=".7" />
      </svg>
      <span className="logo-word">
        <span className="logo-name">Thalassa</span>
        <span className="logo-sub">Weddings · Greece</span>
      </span>
    </span>
  );
}

export function SectionHead({ eyebrow, title, sub, center = true, light = false }: { eyebrow: string; title: string; sub?: string; center?: boolean; light?: boolean }) {
  return (
    <Reveal className={`section-head ${center ? "center" : ""} ${light ? "light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2">{title}</h2>
      {sub && <p className="lead">{sub}</p>}
    </Reveal>
  );
}

export function Stars({ r }: { r: number }) {
  return (
    <span className="stars" aria-label={`${r} / 5`}>
      {"★★★★★".split("").map((s, i) => (
        <span key={i} style={{ opacity: i < Math.round(r) ? 1 : 0.25 }}>{s}</span>
      ))}
    </span>
  );
}

export function useLockBody(on: boolean) {
  useEffect(() => {
    if (!on) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && window.dispatchEvent(new CustomEvent("tw-escape"));
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [on]);
}

export function useEscape(fn: () => void) {
  useEffect(() => {
    const h = () => fn();
    window.addEventListener("tw-escape", h);
    return () => window.removeEventListener("tw-escape", h);
  }, [fn]);
}
