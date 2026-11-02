import { useEffect, useRef, useState } from "react";
import { LuCheck, LuArrowRight, LuArrowLeft, LuRotateCcw, LuBookmark, LuSend, LuUsers, LuCalendar, LuMapPin, LuPlus, LuChevronUp, LuX, LuInfo } from "react-icons/lu";
import { useApp, planTotal, serves, vendorById, savePlan } from "./store";
import { CATS, DESTINATIONS, EXTRAS, STYLES, VENDORS, type Cat } from "./data";
import { Img, SectionHead, Stars, useLockBody } from "./ui";
import { fmt } from "./i18n";

function useAnimatedNumber(value: number) {
  const [n, setN] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 600);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(a + (value - a) * e));
      if (p < 1) raf = requestAnimationFrame(step);
      else from.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); from.current = value; };
  }, [value]);
  return n;
}

export function Builder() {
  const { t, L, lang, plan, setPlan, setVendor } = useApp();
  const [step, setStep] = useState<Cat>("venue");
  const idx = CATS.findIndex((c) => c.id === step);
  const total = planTotal(plan);
  const shown = useAnimatedNumber(total);
  const [sheet, setSheet] = useState(false);
  useLockBody(sheet);

  const pool = step === "extras" ? [] : VENDORS.filter((v) => v.cat === step && serves(v, plan.dest));
  const pick = (cat: Exclude<Cat, "extras">, id: string) =>
    setPlan((p) => ({ ...p, pkg: undefined, sel: { ...p.sel, [cat]: p.sel[cat] === id ? undefined : id } }));
  const toggleExtra = (id: string) =>
    setPlan((p) => ({ ...p, extras: p.extras.includes(id) ? p.extras.filter((x) => x !== id) : [...p.extras, id] }));

  // Drop selections that don't serve the new destination
  useEffect(() => {
    setPlan((p) => {
      const sel = { ...p.sel };
      let changed = false;
      for (const [k, id] of Object.entries(sel)) {
        const v = vendorById(id);
        if (v && !serves(v, p.dest)) { delete sel[k as keyof typeof sel]; changed = true; }
      }
      return changed ? { ...p, sel } : p;
    });
  }, [plan.dest, setPlan]);

  const done = (c: Cat) => (c === "extras" ? plan.extras.length > 0 : !!plan.sel[c as Exclude<Cat, "extras">]);

  const renderSummary = () => (
    <div className="summary">
      <div className="summary-head">
        <span className="eyebrow">{t("b.summary")}</span>
        <h3>{L(DESTINATIONS.find((d) => d.id === plan.dest)!.name)}</h3>
        <p className="muted">{plan.date ? new Date(plan.date).toLocaleDateString(lang === "el" ? "el-GR" : "en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—"} · {plan.guests} {t("b.guestsShort")}</p>
      </div>
      <ul className="summary-list">
        {CATS.filter((c) => c.id !== "extras").map((c) => {
          const v = vendorById(plan.sel[c.id as Exclude<Cat, "extras">]);
          const cost = v ? (v.perGuest ? v.price * plan.guests : v.price) : 0;
          return (
            <li key={c.id} className={v ? "has" : ""}>
              <button onClick={() => { setStep(c.id); setSheet(false); document.getElementById("builder-steps")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
                <span className="s-cat">{L(c.short)}</span>
                <span className="s-name">{v ? v.name : t("b.notSelected")}</span>
                <span className="s-price">{v ? fmt(cost, lang) : "—"}</span>
              </button>
            </li>
          );
        })}
        {plan.extras.map((x) => {
          const e = EXTRAS.find((y) => y.id === x)!;
          return (
            <li key={x} className="has extra">
              <button onClick={() => toggleExtra(x)} title="Remove">
                <span className="s-cat">+</span><span className="s-name">{L(e.name)}</span><span className="s-price">{fmt(e.price, lang)}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="summary-total">
        <span>{t("b.total")}</span>
        <strong>{fmt(shown, lang)}</strong>
      </div>
      <p className="tiny muted"><LuInfo /> {t("b.estimate")}</p>
      <div className="summary-actions">
        <button className="btn btn-gold btn-block" onClick={() => { setSheet(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}><LuSend /> {t("b.request")}</button>
        <div className="row2">
          <SaveBtn />
          <button className="btn btn-outline" onClick={() => setPlan((p) => ({ ...p, sel: {}, extras: [], pkg: undefined }))}><LuRotateCcw /> {t("b.reset")}</button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="section builder" id="builder">
      <div className="wrap">
        <SectionHead eyebrow={t("b.eyebrow")} title={t("b.title")} sub={t("b.sub")} />

        <div className="b-context">
          <label className="b-field">
            <span><LuMapPin /> {t("b.destination")}</span>
            <select value={plan.dest} onChange={(e) => setPlan((p) => ({ ...p, dest: e.target.value as typeof p.dest }))}>
              {DESTINATIONS.map((d) => <option key={d.id} value={d.id}>{L(d.name)}</option>)}
            </select>
          </label>
          <label className="b-field">
            <span><LuCalendar /> {t("b.date")}</span>
            <input type="date" value={plan.date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setPlan((p) => ({ ...p, date: e.target.value }))} />
          </label>
          <label className="b-field guests">
            <span><LuUsers /> {t("b.guests")}: <b>{plan.guests}</b></span>
            <input type="range" min={10} max={300} step={5} value={plan.guests} onChange={(e) => setPlan((p) => ({ ...p, guests: +e.target.value }))} style={{ ["--p" as string]: `${((plan.guests - 10) / 290) * 100}%` }} />
          </label>
        </div>

        <div className="b-layout">
          <div className="b-main">
            <div className="stepper" id="builder-steps" role="tablist">
              {CATS.map((c, i) => (
                <button key={c.id} role="tab" aria-selected={step === c.id} className={`${step === c.id ? "on" : ""} ${done(c.id) ? "done" : ""}`} onClick={() => setStep(c.id)}>
                  <span className="st-n">{done(c.id) ? <LuCheck /> : i + 1}</span>
                  <span className="st-l">{L(c.short)}</span>
                </button>
              ))}
            </div>

            <div className="b-step-head">
              <h3>{L(CATS[idx].label)}</h3>
              <span className="muted">{idx + 1} / {CATS.length}</span>
            </div>

            <div className="b-grid" key={step + plan.dest}>
              {step !== "extras" && pool.map((v, i) => {
                const on = plan.sel[step as Exclude<Cat, "extras">] === v.id;
                return (
                  <article key={v.id} className={`bcard ${on ? "on" : ""}`} style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="bcard-img" onClick={() => setVendor(v.id)}>
                      <Img k={v.images[0]} w={640} h={440} alt={v.name} />
                      {on && <span className="bcard-check"><LuCheck /></span>}
                    </div>
                    <div className="bcard-body">
                      <div className="bcard-top">
                        <h4>{v.name}</h4>
                        <span className="bcard-rating"><Stars r={v.rating} /> {v.rating.toFixed(1)}</span>
                      </div>
                      <p className="bcard-blurb">{L(v.blurb)}</p>
                      <div className="tags">
                        {v.styles.map((s) => <i key={s}>{L(STYLES.find((x) => x.id === s)!.label)}</i>)}
                        {v.capacity && <i className="cap">{t("b.capacity")} {v.capacity}</i>}
                      </div>
                      <div className="bcard-foot">
                        <span className="price">{fmt(v.price, lang)}{v.perGuest && <small> {t("b.perGuest")}</small>}</span>
                        <div className="bcard-btns">
                          <button className="btn-link" onClick={() => setVendor(v.id)}>{t("b.view")}</button>
                          <button className={`btn btn-sm ${on ? "btn-navy" : "btn-outline"}`} onClick={() => pick(step as Exclude<Cat, "extras">, v.id)} aria-pressed={on}>
                            {on ? <><LuCheck /> {t("b.selected")}</> : t("b.select")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
              {step === "extras" && EXTRAS.map((e, i) => {
                const on = plan.extras.includes(e.id);
                return (
                  <article key={e.id} className={`bcard extra ${on ? "on" : ""}`} style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="bcard-img" onClick={() => toggleExtra(e.id)}>
                      <Img k={e.image} w={640} h={400} alt={L(e.name)} />
                      {on && <span className="bcard-check"><LuCheck /></span>}
                    </div>
                    <div className="bcard-body">
                      <h4>{L(e.name)}</h4>
                      <div className="bcard-foot">
                        <span className="price">{fmt(e.price, lang)}</span>
                        <button className={`btn btn-sm ${on ? "btn-navy" : "btn-outline"}`} onClick={() => toggleExtra(e.id)} aria-pressed={on}>
                          {on ? <><LuCheck /> {t("b.added")}</> : <><LuPlus /> {t("b.add")}</>}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="b-nav">
              <button className="btn btn-outline" disabled={idx === 0} onClick={() => setStep(CATS[idx - 1].id)}><LuArrowLeft /> {t("b.prev")}</button>
              {idx < CATS.length - 1
                ? <button className="btn btn-navy" onClick={() => setStep(CATS[idx + 1].id)}>{t("b.next")}<span className="hide-xs">: {L(CATS[idx + 1].short)}</span> <LuArrowRight /></button>
                : <button className="btn btn-gold" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>{t("b.request")} <LuArrowRight /></button>}
            </div>
          </div>

          <aside className="b-aside">{renderSummary()}</aside>
        </div>
      </div>

      {/* Mobile bottom bar + sheet */}
      <MobileBar total={shown} onOpen={() => setSheet(true)} />
      <div className={`sheet-backdrop ${sheet ? "on" : ""}`} onClick={() => setSheet(false)} />
      <div className={`sheet ${sheet ? "on" : ""}`} role="dialog" aria-modal="true" aria-hidden={!sheet}>
        <button className="icon-btn sheet-close" onClick={() => setSheet(false)} aria-label={t("b.hideSummary")}><LuX /></button>
        {renderSummary()}
      </div>
    </section>
  );
}

function MobileBar({ total, onOpen }: { total: number; onOpen: () => void }) {
  const { t, lang } = useApp();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = document.getElementById("builder");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`mbar ${vis ? "on" : ""}`}>
      <div>
        <span className="tiny">{t("b.total")}</span>
        <strong>{fmt(total, lang)}</strong>
      </div>
      <button className="btn btn-gold btn-sm" onClick={onOpen}><LuChevronUp /> {t("b.showSummary")}</button>
    </div>
  );
}

function SaveBtn() {
  const { t, plan } = useApp();
  const [ok, setOk] = useState(false);
  return (
    <button className="btn btn-outline" onClick={() => { savePlan(plan); setOk(true); setTimeout(() => setOk(false), 2200); }}>
      {ok ? <><LuCheck /> {t("b.saved")}</> : <><LuBookmark /> {t("b.save")}</>}
    </button>
  );
}
