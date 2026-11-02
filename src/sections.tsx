import { useEffect, useMemo, useState } from "react";
import { LuMenu, LuX, LuArrowRight, LuChevronLeft, LuChevronRight, LuMapPin, LuPhone, LuMail, LuInstagram, LuFacebook, LuCheck, LuSparkles, LuHeart, LuCompass, LuWand, LuPartyPopper, LuStar } from "react-icons/lu";
import { FaWhatsapp, FaPinterestP } from "react-icons/fa";
import { useApp, buildForTier, TIER_EXTRAS, TIER_GUESTS, planTotal, vendorById } from "./store";
import { DESTINATIONS, PACKAGES, VENDORS, CATS, STYLES, GALLERY, TESTIMONIALS, type Cat, type DestId, type Style } from "./data";
import { Img, Logo, Reveal, SectionHead, Stars, useEscape, useLockBody } from "./ui";
import { fmt } from "./i18n";
import type { ImgKey } from "./images";

/* ───────────────────────── Header ───────────────────────── */
export function Header() {
  const { t, lang, setLang, setQuizOpen, goto } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useLockBody(open);
  const links: [string, Parameters<typeof t>[0]][] = [
    ["destinations", "nav.destinations"], ["packages", "nav.packages"], ["builder", "nav.builder"],
    ["vendors", "nav.vendors"], ["gallery", "nav.gallery"], ["contact", "nav.contact"],
  ];
  const go = (id: string) => { setOpen(false); setTimeout(() => goto(id), 10); };
  const LangToggle = ({ light }: { light?: boolean }) => (
    <div className={`lang ${light ? "light" : ""}`} role="group" aria-label={t("lang")}>
      {(["el", "en"] as const).map((l) => (
        <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)} aria-pressed={lang === l}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap header-in">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Thalassa Weddings">
            <Logo light={!scrolled} size={38} />
          </a>
          <nav className="nav" aria-label="Main">
            {links.map(([id, k]) => <button key={id} onClick={() => go(id)}>{t(k)}</button>)}
          </nav>
          <div className="header-actions">
            <LangToggle light={!scrolled} />
            <button className="btn btn-gold btn-sm hide-sm" onClick={() => setQuizOpen(true)}>{t("cta.plan")}</button>
            <button className="burger" onClick={() => setOpen(true)} aria-label="Menu"><LuMenu /></button>
          </div>
        </div>
      </header>
      <div className={`mmenu ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="mmenu-top">
          <Logo light size={36} />
          <button className="icon-btn light" onClick={() => setOpen(false)} aria-label={t("close")}><LuX /></button>
        </div>
        <nav className="mmenu-links">
          {links.map(([id, k], i) => (
            <button key={id} style={{ transitionDelay: `${open ? 80 + i * 50 : 0}ms` }} onClick={() => go(id)}>{t(k)}</button>
          ))}
        </nav>
        <div className="mmenu-foot">
          <LangToggle light />
          <button className="btn btn-gold" onClick={() => { setOpen(false); setQuizOpen(true); }}>{t("cta.plan")}</button>
        </div>
      </div>
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
const HERO: { dest: DestId; img: ImgKey }[] = [
  { dest: "santorini", img: "oia" },
  { dest: "mykonos", img: "mykonos" },
  { dest: "athens", img: "acropolis" },
  { dest: "riviera", img: "sounion" },
  { dest: "crete", img: "balos" },
  { dest: "corfu", img: "corfuBay" },
];

export function Hero() {
  const { t, L, setQuizOpen, goto, setPlan } = useApp();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % HERO.length), 6500);
    return () => clearInterval(id);
  }, [paused]);
  const d = DESTINATIONS.find((x) => x.id === HERO[i].dest)!;
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        {HERO.map((h, n) => (
          <div key={h.img} className={`hero-slide ${n === i ? "on" : ""}`}>
            <Img k={h.img} w={2000} eager={n < 2} alt={L(DESTINATIONS.find((x) => x.id === h.dest)!.name)} />
          </div>
        ))}
        <div className="hero-shade" />
      </div>
      <div className="wrap hero-in">
        <p className="eyebrow light fade-up" style={{ animationDelay: "200ms" }}>{t("hero.eyebrow")}</p>
        <h1 className="h1 fade-up" style={{ animationDelay: "350ms" }}>
          {t("hero.title1")}<br /><em>{t("hero.title2")}</em>
        </h1>
        <p className="hero-sub fade-up" style={{ animationDelay: "500ms" }}>{t("hero.sub")}</p>
        <div className="hero-ctas fade-up" style={{ animationDelay: "650ms" }}>
          <button className="btn btn-gold btn-lg" onClick={() => setQuizOpen(true)}><LuSparkles /> {t("cta.plan")}</button>
          <button className="btn btn-ghost-light btn-lg" onClick={() => goto("packages")}>{t("cta.packages")}</button>
        </div>
        <div className="hero-dests fade-up" style={{ animationDelay: "800ms" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {HERO.map((h, n) => (
            <button key={h.dest} className={n === i ? "on" : ""} onClick={() => { setI(n); setPaused(true); setPlan((p) => ({ ...p, dest: h.dest })); }}>
              {L(DESTINATIONS.find((x) => x.id === h.dest)!.name)}
            </button>
          ))}
        </div>
      </div>
      <div className="hero-caption wrap">
        <span key={d.id} className="cap-anim"><LuMapPin /> {L(d.name)} · <em>{L(d.tagline)}</em></span>
      </div>
      <button className="scroll-cue" onClick={() => goto("trust")} aria-label={t("hero.scroll")}>
        <span>{t("hero.scroll")}</span><i />
      </button>
    </section>
  );
}

/* ───────────────────────── Trust strip ───────────────────────── */
export function Trust() {
  const { t } = useApp();
  const items: [string, Parameters<typeof t>[0]][] = [["250+", "trust.weddings"], ["120", "trust.vendors"], ["6", "trust.dest"], ["4.9★", "trust.rating"]];
  return (
    <section className="trust" id="trust">
      <div className="wrap trust-in">
        {items.map(([n, k], i) => (
          <Reveal key={k} delay={i * 90} className="trust-item">
            <span className="trust-n">{n}</span>
            <span className="trust-l">{t(k)}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Destinations ───────────────────────── */
export function Destinations() {
  const { t, L, lang, setPlan, goto } = useApp();
  return (
    <section className="section" id="destinations">
      <div className="wrap">
        <SectionHead eyebrow={t("dest.eyebrow")} title={t("dest.title")} sub={t("dest.sub")} />
        <div className="dest-grid">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 100} className={`dest-card d${i}`}>
              <button onClick={() => { setPlan((p) => ({ ...p, dest: d.id, sel: { ...p.sel, venue: undefined } })); goto("builder"); }} aria-label={L(d.name)}>
                <Img k={d.images[0]} w={i === 0 ? 1400 : 900} alt={L(d.name)} />
                <div className="dest-shade" />
                <div className="dest-info">
                  <span className="dest-season">{L(d.season)}</span>
                  <h3>{L(d.name)}</h3>
                  <p>{L(d.tagline)}</p>
                  <span className="dest-meta">
                    <span>{t("dest.from")} <b>{fmt(d.from, lang)}</b></span>
                    <span className="dest-go">{t("dest.plan")} <LuArrowRight /></span>
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Packages ───────────────────────── */
export function Packages() {
  const { t, L, lang, plan, setPlan, goto, flash } = useApp();
  const apply = (tier: 1 | 2 | 3, id: string, go: boolean) => {
    setPlan((p) => ({ ...p, pkg: id, guests: TIER_GUESTS[tier], sel: buildForTier(tier, p.dest, p.style), extras: TIER_EXTRAS[tier] }));
    flash(`${PACKAGES.find((x) => x.id === id)!.name[lang]} ✓`);
    if (go) setTimeout(() => goto("builder"), 50);
  };
  return (
    <section className="section section-sand" id="packages">
      <div className="wrap">
        <SectionHead eyebrow={t("pkg.eyebrow")} title={t("pkg.title")} sub={t("pkg.sub")} />
        <div className="pkg-grid">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.id} delay={i * 120} className={`pkg ${p.id === "signature" ? "featured" : ""} ${plan.pkg === p.id ? "chosen" : ""}`}>
              {p.id === "signature" && <span className="pkg-badge"><LuStar /> {t("pkg.popular")}</span>}
              <div className="pkg-img"><Img k={p.image} w={800} h={520} alt={L(p.name)} /></div>
              <div className="pkg-body">
                <h3 className="pkg-name">{L(p.name)}</h3>
                <p className="pkg-sub">{L(p.sub)}</p>
                <div className="pkg-price"><span>{t("pkg.from")}</span> {fmt(p.from, lang)}</div>
                <p className="pkg-guests">{L(p.guests)}</p>
                <ul className="pkg-list">
                  {p.includes.map((x, n) => <li key={n}><LuCheck /> {L(x)}</li>)}
                </ul>
                <div className="pkg-actions">
                  <button className={`btn ${p.id === "signature" ? "btn-gold" : "btn-navy"}`} onClick={() => apply(p.tier, p.id, true)}>{t("pkg.select")}</button>
                  <button className="btn-link" onClick={() => apply(p.tier, p.id, true)}>{t("pkg.customize")} <LuArrowRight /></button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── How it works ───────────────────────── */
export function HowItWorks() {
  const { t } = useApp();
  const steps = [
    [LuHeart, "h.1", "h.1d"], [LuCompass, "h.2", "h.2d"], [LuWand, "h.3", "h.3d"], [LuPartyPopper, "h.4", "h.4d"],
  ] as const;
  return (
    <section className="section how">
      <div className="how-bg"><Img k="caldera" w={2000} alt="" /></div>
      <div className="wrap how-in">
        <SectionHead eyebrow={t("h.eyebrow")} title={t("h.title")} light />
        <div className="how-grid">
          {steps.map(([Icon, a, b], i) => (
            <Reveal key={a} delay={i * 120} className="how-step">
              <span className="how-n">0{i + 1}</span>
              <Icon className="how-icon" />
              <h3>{t(a)}</h3>
              <p>{t(b)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Vendors ───────────────────────── */
export function Vendors() {
  const { t, L, lang, plan, setVendor } = useApp();
  const [cat, setCat] = useState<Cat | "all">("all");
  const [dest, setDest] = useState<DestId | "all">("all");
  const [style, setStyle] = useState<Style | "all">("all");
  const list = useMemo(
    () => VENDORS.filter((v) => (cat === "all" || v.cat === cat) && (dest === "all" || v.dests === "all" || v.dests.includes(dest)) && (style === "all" || v.styles.includes(style))),
    [cat, dest, style]
  );
  const chosen = new Set(Object.values(plan.sel));
  return (
    <section className="section" id="vendors">
      <div className="wrap">
        <SectionHead eyebrow={t("v.eyebrow")} title={t("v.title")} sub={t("v.sub")} />
        <Reveal className="filters">
          <div className="chips" role="tablist">
            <button className={cat === "all" ? "on" : ""} onClick={() => setCat("all")}>{t("v.all")}</button>
            {CATS.filter((c) => c.id !== "extras").map((c) => (
              <button key={c.id} className={cat === c.id ? "on" : ""} onClick={() => setCat(c.id)}>{L(c.label)}</button>
            ))}
          </div>
          <div className="selects">
            <label className="select"><LuMapPin />
              <select value={dest} onChange={(e) => setDest(e.target.value as DestId | "all")} aria-label={t("b.destination")}>
                <option value="all">{t("v.allDest")}</option>
                {DESTINATIONS.map((d) => <option key={d.id} value={d.id}>{L(d.name)}</option>)}
              </select>
            </label>
            <label className="select"><LuSparkles />
              <select value={style} onChange={(e) => setStyle(e.target.value as Style | "all")} aria-label="Style">
                <option value="all">{t("v.allStyles")}</option>
                {STYLES.map((s) => <option key={s.id} value={s.id}>{L(s.label)}</option>)}
              </select>
            </label>
          </div>
        </Reveal>
        <div className="vendor-grid">
          {list.map((v, i) => (
            <Reveal key={v.id} delay={(i % 4) * 70} className="vcard">
              <button onClick={() => setVendor(v.id)}>
                <div className="vcard-img">
                  <Img k={v.images[0]} w={640} h={480} alt={v.name} />
                  <span className="vcard-cat">{L(CATS.find((c) => c.id === v.cat)!.short)}</span>
                  {chosen.has(v.id) && <span className="vcard-in"><LuCheck /></span>}
                </div>
                <div className="vcard-body">
                  <h3>{v.name}</h3>
                  <div className="vcard-meta"><Stars r={v.rating} /> <span>{v.rating.toFixed(1)} · {v.reviews} {t("v.reviews")}</span></div>
                  <div className="vcard-foot">
                    <span className="price">{t("dest.from")} {fmt(v.price, lang)}{v.perGuest ? <small> {t("b.perGuest")}</small> : null}</span>
                    <span className="tags">{v.styles.slice(0, 2).map((s) => <i key={s}>{L(STYLES.find((x) => x.id === s)!.label)}</i>)}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
          {list.length === 0 && <p className="empty">{t("v.none")}</p>}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Gallery ───────────────────────── */
export function Gallery() {
  const { t } = useApp();
  const [cat, setCat] = useState<"all" | "ceremony" | "reception" | "details" | "couples">("all");
  const [lb, setLb] = useState<number | null>(null);
  const items = GALLERY.filter((g) => cat === "all" || g.cat === cat);
  useLockBody(lb !== null);
  useEscape(() => setLb(null));
  useEffect(() => {
    if (lb === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLb((x) => (x! + 1) % items.length);
      if (e.key === "ArrowLeft") setLb((x) => (x! - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lb, items.length]);
  return (
    <section className="section section-sand" id="gallery">
      <div className="wrap">
        <SectionHead eyebrow={t("g.eyebrow")} title={t("g.title")} />
        <Reveal className="chips center">
          {(["all", "ceremony", "reception", "details", "couples"] as const).map((c) => (
            <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{t(`g.${c}` as Parameters<typeof t>[0])}</button>
          ))}
        </Reveal>
        <div className="masonry">
          {items.map((g, i) => (
            <button key={g.image} className={`m-item ${g.tall ? "tall" : ""}`} onClick={() => setLb(i)} aria-label={t(`g.${g.cat}` as Parameters<typeof t>[0])}>
              <Img k={g.image} w={700} h={g.tall ? 980 : 520} alt="" />
            </button>
          ))}
        </div>
      </div>
      {lb !== null && items[lb] && (
        <div className="lightbox" onClick={() => setLb(null)} role="dialog" aria-modal="true">
          <button className="icon-btn light lb-close" aria-label={t("close")}><LuX /></button>
          <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + items.length) % items.length); }} aria-label="Previous"><LuChevronLeft /></button>
          <div className="lb-img" onClick={(e) => e.stopPropagation()}><Img k={items[lb].image} w={1800} alt="" eager /></div>
          <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % items.length); }} aria-label="Next"><LuChevronRight /></button>
          <span className="lb-count">{lb + 1} / {items.length}</span>
        </div>
      )}
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */
export function Testimonials() {
  const { t, L } = useApp();
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, [i]);
  const q = TESTIMONIALS[i];
  return (
    <section className="section testi">
      <div className="wrap testi-in">
        <Reveal className="testi-img">
          {TESTIMONIALS.map((x, n) => (
            <div key={x.names} className={`testi-slide ${n === i ? "on" : ""}`}><Img k={x.image} w={900} h={1100} alt={x.names} /></div>
          ))}
        </Reveal>
        <Reveal className="testi-text" delay={120}>
          <span className="eyebrow">{t("t.eyebrow")}</span>
          <h2 className="h2">{t("t.title")}</h2>
          <div className="quote-wrap">
            <span className="qmark">“</span>
            <blockquote key={i} className="quote">{L(q.quote)}</blockquote>
            <p className="quote-by"><b>{q.names}</b> · {L(q.from)}</p>
          </div>
          <div className="testi-ctrl">
            <button className="icon-btn" onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Previous"><LuChevronLeft /></button>
            <div className="dots">{TESTIMONIALS.map((_, n) => <button key={n} className={n === i ? "on" : ""} onClick={() => setI(n)} aria-label={`${n + 1}`} />)}</div>
            <button className="icon-btn" onClick={() => setI((i + 1) % TESTIMONIALS.length)} aria-label="Next"><LuChevronRight /></button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */
export function Contact() {
  const { t, L, lang, plan } = useApp();
  const [sent, setSent] = useState(false);
  const total = planTotal(plan);
  const hasPlan = Object.keys(plan.sel).some((k) => plan.sel[k as keyof typeof plan.sel]);
  return (
    <section className="section contact" id="contact">
      <div className="contact-bg"><Img k="brideSea" w={1800} alt="" /></div>
      <div className="wrap contact-in">
        <Reveal className="contact-info">
          <span className="eyebrow light">{t("c.eyebrow")}</span>
          <h2 className="h2">{t("c.title")}</h2>
          <p className="lead">{t("c.sub")}</p>
          <ul className="contact-list">
            <li><LuMapPin /> <span><b>{t("c.office")}</b><br />Αγίου Ιωάννου, Αγία Παρασκευή, Αθήνα</span></li>
            <li><LuPhone /> <span>+30 210 000 0000</span></li>
            <li><LuMail /> <span>hello@thalassaweddings.gr</span></li>
          </ul>
          <a className="btn btn-whatsapp" href="https://wa.me/302100000000" target="_blank" rel="noreferrer"><FaWhatsapp /> {t("c.whatsapp")}</a>
        </Reveal>
        <Reveal className="contact-card" delay={120}>
          {sent ? (
            <div className="sent">
              <span className="sent-icon"><LuCheck /></span>
              <h3>{t("c.thanks")}</h3>
              <p>{t("c.thanksSub")}</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid2">
                <Field label={t("c.names")}><input required placeholder="Maria & Alex" /></Field>
                <Field label={t("c.email")}><input required type="email" placeholder="you@email.com" /></Field>
                <Field label={t("c.phone")}><input type="tel" placeholder="+30 …" /></Field>
                <Field label={t("c.date")}><input type="date" defaultValue={plan.date} /></Field>
                <Field label={t("c.dest")}>
                  <select defaultValue={plan.dest}>{DESTINATIONS.map((d) => <option key={d.id} value={d.id}>{L(d.name)}</option>)}</select>
                </Field>
                <Field label={t("c.guests")}><input type="number" min={2} defaultValue={plan.guests} /></Field>
              </div>
              <Field label={t("c.budget")}>
                <select defaultValue={total > 40000 ? "4" : total > 20000 ? "3" : total > 10000 ? "2" : "1"}>
                  <option value="1">€5.000 – €10.000</option>
                  <option value="2">€10.000 – €20.000</option>
                  <option value="3">€20.000 – €40.000</option>
                  <option value="4">€40.000+</option>
                </select>
              </Field>
              <Field label={t("c.message")}><textarea rows={4} /></Field>
              {hasPlan && <p className="plan-note"><LuSparkles /> {t("c.planAttached")} <b>{fmt(total, lang)}</b></p>}
              <button className="btn btn-gold btn-block" type="submit">{t("c.send")} <LuArrowRight /></button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}

/* ───────────────────────── Footer ───────────────────────── */
export function Footer() {
  const { t, goto } = useApp();
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div className="footer-brand">
          <Logo light size={44} />
          <p>{t("f.tag")}</p>
          <div className="socials">
            <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}><LuInstagram /></a>
            <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}><LuFacebook /></a>
            <a href="#" aria-label="Pinterest" onClick={(e) => e.preventDefault()}><FaPinterestP /></a>
          </div>
        </div>
        <div>
          <h4>{t("f.explore")}</h4>
          <ul>
            {(["destinations", "packages", "builder", "vendors", "gallery"] as const).map((id) => (
              <li key={id}><button onClick={() => goto(id)}>{t(`nav.${id === "builder" ? "builder" : id}` as Parameters<typeof t>[0])}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t("f.contact")}</h4>
          <ul>
            <li>hello@thalassaweddings.gr</li>
            <li>+30 210 000 0000</li>
            <li>Αγία Παρασκευή, Αθήνα</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Thalassa Weddings</span>
        <span>{t("f.demo")}</span>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return <a className="fab-wa" href="https://wa.me/302100000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>;
}

export function Toast() {
  const { toast } = useApp();
  return <div className={`toast ${toast ? "on" : ""}`} role="status" aria-live="polite">{toast}</div>;
}

export { vendorById };
