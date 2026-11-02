import { useCallback, useMemo, useState } from "react";
import { LuX, LuArrowRight, LuArrowLeft, LuCheck, LuMapPin, LuSparkles } from "react-icons/lu";
import { useApp, buildForTier, TIER_EXTRAS, vendorById, serves } from "./store";
import { CATS, DESTINATIONS, PACKAGES, STYLES, type DestId, type Style, type Cat } from "./data";
import { Img, Stars, useEscape, useLockBody } from "./ui";
import { fmt, MONTHS } from "./i18n";
import type { ImgKey } from "./images";

/* ───────────────────────── Quiz ───────────────────────── */
const BUDGETS = [
  { v: 1, label: "€5k – €15k" },
  { v: 2, label: "€15k – €35k" },
  { v: 3, label: "€35k – €70k" },
  { v: 4, label: "€70k+" },
];
const GUESTS = [30, 60, 100, 150, 220];
const STYLE_IMG: Record<Style, ImgKey> = { romantic: "sunsetKiss", boho: "goldenField", classic: "whiteTable", glam: "sparkKiss", rustic: "longTable" };

export function Quiz() {
  const { t, L, lang, quizOpen, setQuizOpen, setPlan, goto } = useApp();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<{ dest?: DestId; month?: number; year?: number; guests?: number; budget?: number; style?: Style }>({ year: new Date().getFullYear() + 1 });
  const close = useCallback(() => setQuizOpen(false), [setQuizOpen]);
  useLockBody(quizOpen);
  useEscape(close);

  const tier = useMemo<1 | 2 | 3>(() => {
    const b = a.budget ?? 2;
    const g = a.guests ?? 80;
    const perGuest = [0, 10000, 25000, 52000, 90000][b] / g;
    if (b >= 4 || perGuest > 300) return 3;
    if (b >= 2) return 2;
    return 1;
  }, [a.budget, a.guests]);
  const pkg = PACKAGES.find((p) => p.tier === tier)!;

  if (!quizOpen) return null;
  const steps = 5;
  const can = [!!a.dest, true, !!a.guests, !!a.budget, !!a.style][step];
  const next = () => setStep((s) => Math.min(steps, s + 1));
  const finish = () => {
    const dest = a.dest ?? "santorini";
    const date = a.month !== undefined ? `${a.year}-${String(a.month + 1).padStart(2, "0")}-15` : "";
    setPlan((p) => ({ ...p, dest, date, guests: a.guests ?? p.guests, style: a.style, pkg: pkg.id, sel: buildForTier(tier, dest, a.style), extras: TIER_EXTRAS[tier] }));
    setQuizOpen(false);
    setStep(0);
    setTimeout(() => goto("builder"), 60);
  };
  const qs = [t("q.where"), t("q.when"), t("q.how"), t("q.budget"), t("q.style")];

  return (
    <div className="modal-wrap" role="dialog" aria-modal="true" aria-label={t("q.title")}>
      <div className="modal-backdrop" onClick={close} />
      <div className="modal quiz">
        <button className="icon-btn modal-x" onClick={close} aria-label={t("close")}><LuX /></button>
        <div className="quiz-side">
          <Img k={step === 0 ? "oia" : step === 1 ? "domes" : step === 2 ? "toast" : step === 3 ? "goldTable" : step === 4 ? STYLE_IMG[a.style ?? "romantic"] : pkg.image} w={900} h={1200} alt="" eager />
          <div className="quiz-side-shade" />
          <div className="quiz-side-text">
            <span className="eyebrow light">{t("q.title")}</span>
            {step < steps && <p>{t("q.step")} {step + 1} {t("q.of")} {steps}</p>}
          </div>
        </div>
        <div className="quiz-main">
          {step < steps && <div className="progress"><i style={{ width: `${((step + 1) / steps) * 100}%` }} /></div>}

          <div className="quiz-body" key={step}>
            {step < steps && <h3 className="quiz-q">{qs[step]}</h3>}

            {step === 0 && (
              <div className="opt-grid dests">
                {DESTINATIONS.map((d) => (
                  <button key={d.id} className={`opt img ${a.dest === d.id ? "on" : ""}`} onClick={() => { setA({ ...a, dest: d.id }); setTimeout(next, 220); }}>
                    <Img k={d.images[0]} w={400} h={300} alt="" />
                    <span>{L(d.name)}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="years">
                  {[0, 1, 2].map((o) => {
                    const y = new Date().getFullYear() + o;
                    return <button key={y} className={`chip ${a.year === y ? "on" : ""}`} onClick={() => setA({ ...a, year: y })}>{y}</button>;
                  })}
                </div>
                <div className="opt-grid months">
                  {MONTHS[lang].map((m, i) => (
                    <button key={m} className={`opt ${a.month === i ? "on" : ""}`} onClick={() => setA({ ...a, month: i })}>{m}</button>
                  ))}
                </div>
                <button className="btn-link" onClick={() => { setA({ ...a, month: undefined }); next(); }}>{t("q.flexible")} <LuArrowRight /></button>
              </div>
            )}

            {step === 2 && (
              <div className="opt-grid five">
                {GUESTS.map((g, i) => (
                  <button key={g} className={`opt big ${a.guests === g ? "on" : ""}`} onClick={() => { setA({ ...a, guests: g }); setTimeout(next, 220); }}>
                    <b>{i === GUESTS.length - 1 ? "200+" : `≈ ${g}`}</b>
                    <small>{t("b.guestsShort")}</small>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="opt-grid two">
                {BUDGETS.map((b) => (
                  <button key={b.v} className={`opt big ${a.budget === b.v ? "on" : ""}`} onClick={() => { setA({ ...a, budget: b.v }); setTimeout(next, 220); }}>
                    <b>{b.label}</b>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="opt-grid styles">
                {STYLES.map((s) => (
                  <button key={s.id} className={`opt img ${a.style === s.id ? "on" : ""}`} onClick={() => { setA({ ...a, style: s.id }); setTimeout(next, 220); }}>
                    <Img k={STYLE_IMG[s.id]} w={400} h={300} alt="" />
                    <span>{L(s.label)}</span>
                  </button>
                ))}
              </div>
            )}

            {step === steps && (
              <div className="quiz-result">
                <span className="eyebrow"><LuSparkles /> {t("q.result")}</span>
                <h3 className="h2">{L(pkg.name)}</h3>
                <p className="lead">{t("q.resultSub")}</p>
                <div className="result-meta">
                  <span><LuMapPin /> {L(DESTINATIONS.find((d) => d.id === (a.dest ?? "santorini"))!.name)}</span>
                  {a.month !== undefined && <span>{MONTHS[lang][a.month]} {a.year}</span>}
                  <span>{a.guests} {t("b.guestsShort")}</span>
                  {a.style && <span>{L(STYLES.find((s) => s.id === a.style)!.label)}</span>}
                </div>
                <ul className="pkg-list">{pkg.includes.slice(0, 5).map((x, i) => <li key={i}><LuCheck /> {L(x)}</li>)}</ul>
                <div className="pkg-price"><span>{t("pkg.from")}</span> {fmt(pkg.from, lang)}</div>
                <button className="btn btn-gold btn-lg" onClick={finish}>{t("q.open")} <LuArrowRight /></button>
              </div>
            )}
          </div>

          {step < steps && (
            <div className="quiz-nav">
              <button className="btn btn-outline" disabled={step === 0} onClick={() => setStep(step - 1)}><LuArrowLeft /> {t("b.prev")}</button>
              <button className="btn btn-navy" disabled={!can} onClick={next}>{t("b.next")} <LuArrowRight /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Vendor drawer ───────────────────────── */
export function VendorDrawer() {
  const { t, L, lang, vendor, setVendor, plan, setPlan, flash } = useApp();
  const v = vendorById(vendor ?? undefined);
  const [imgI, setImgI] = useState(0);
  const close = useCallback(() => { setVendor(null); setImgI(0); }, [setVendor]);
  useLockBody(!!v);
  useEscape(close);

  // deterministic pseudo-availability for next month
  const cal = useMemo(() => {
    if (!v) return null;
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth() + 1;
    const first = new Date(y, m, 1);
    const days = new Date(y, m + 1, 0).getDate();
    const offset = (first.getDay() + 6) % 7;
    const seed = v.id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
    const booked = new Set(Array.from({ length: days }, (_, i) => i + 1).filter((d) => ((d * 7 + seed) % 5 === 0) || ((d + seed) % 11 === 0)));
    return { y, m, days, offset, booked, label: first.toLocaleDateString(lang === "el" ? "el-GR" : "en-GB", { month: "long", year: "numeric" }) };
  }, [v, lang]);

  if (!v || !cal) return null;
  const cat = v.cat as Exclude<Cat, "extras">;
  const inWedding = plan.sel[cat] === v.id;
  const servesHere = serves(v, plan.dest);
  const add = () => {
    setPlan((p) => ({ ...p, pkg: undefined, dest: servesHere ? p.dest : (v.dests === "all" ? p.dest : v.dests[0]), sel: { ...p.sel, [cat]: v.id } }));
    flash(`${v.name} ✓`);
  };
  const dow = lang === "el" ? ["Δ", "Τ", "Τ", "Π", "Π", "Σ", "Κ"] : ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="drawer-wrap" role="dialog" aria-modal="true" aria-label={v.name}>
      <div className="modal-backdrop" onClick={close} />
      <aside className="drawer">
        <button className="icon-btn light modal-x" onClick={close} aria-label={t("close")}><LuX /></button>
        <div className="drawer-gallery">
          {v.images.map((k, i) => <div key={k} className={`dg-slide ${i === imgI ? "on" : ""}`}><Img k={k} w={1100} h={760} alt={v.name} eager={i === 0} /></div>)}
          <div className="dg-thumbs">
            {v.images.map((k, i) => <button key={k} className={i === imgI ? "on" : ""} onClick={() => setImgI(i)} aria-label={`${i + 1}`}><Img k={k} w={160} h={120} alt="" /></button>)}
          </div>
        </div>
        <div className="drawer-body">
          <span className="eyebrow">{L(CATS.find((c) => c.id === v.cat)!.label)}</span>
          <h3 className="h3">{v.name}</h3>
          <div className="vcard-meta"><Stars r={v.rating} /> <span>{v.rating.toFixed(1)} · {v.reviews} {t("v.reviews")}</span></div>

          <div className="drawer-price">
            <span className="price big">{fmt(v.price, lang)}{v.perGuest && <small> {t("b.perGuest")}</small>}</span>
            {v.capacity && <span className="muted">{t("b.capacity")} {v.capacity} {t("b.guestsShort")}</span>}
          </div>

          <h4>{t("v.about")}</h4>
          <p>{L(v.blurb)}</p>
          <div className="tags">{v.styles.map((s) => <i key={s}>{L(STYLES.find((x) => x.id === s)!.label)}</i>)}</div>

          <h4>{t("v.serves")}</h4>
          <p className="muted"><LuMapPin /> {v.dests === "all" ? t("v.everywhere") : v.dests.map((d) => L(DESTINATIONS.find((x) => x.id === d)!.name)).join(", ")}</p>

          <h4>{t("v.availability")} · <span className="muted cap-first">{cal.label}</span></h4>
          <div className="cal">
            {dow.map((d, i) => <span key={i} className="dow">{d}</span>)}
            {Array.from({ length: cal.offset }).map((_, i) => <span key={"e" + i} />)}
            {Array.from({ length: cal.days }, (_, i) => i + 1).map((d) => (
              <span key={d} className={`day ${cal.booked.has(d) ? "booked" : "free"}`}>{d}</span>
            ))}
          </div>
          <div className="legend"><span><i className="free" /> {t("v.available")}</span><span><i className="booked" /> {t("v.booked")}</span></div>
        </div>
        <div className="drawer-foot">
          <button className={`btn btn-block ${inWedding ? "btn-navy" : "btn-gold"}`} onClick={add} disabled={inWedding}>
            {inWedding ? t("v.inWedding") : t("v.addToWedding")}
          </button>
        </div>
      </aside>
    </div>
  );
}
