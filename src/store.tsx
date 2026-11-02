import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DICT, type Key } from "./i18n";
import { EXTRAS, VENDORS, type Cat, type DestId, type Lang, type Style, type T2, type Vendor } from "./data";

export type Sel = Partial<Record<Exclude<Cat, "extras">, string>>;
export interface Plan { dest: DestId; date: string; guests: number; sel: Sel; extras: string[]; style?: Style; pkg?: string }

const DEFAULT_PLAN: Plan = { dest: "santorini", date: "", guests: 80, sel: {}, extras: [] };

const read = <T,>(k: string, d: T): T => {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d; } catch { return d; }
};
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };

export const vendorById = (id?: string) => VENDORS.find((v) => v.id === id);
export const serves = (v: Vendor, d: DestId) => v.dests === "all" || v.dests.includes(d);

export function planTotal(p: Plan) {
  let total = 0;
  for (const id of Object.values(p.sel)) {
    const v = vendorById(id);
    if (v) total += v.perGuest ? v.price * p.guests : v.price;
  }
  for (const x of p.extras) total += EXTRAS.find((e) => e.id === x)?.price ?? 0;
  return total;
}

/** Pick the best vendor per category for a tier, destination and (optional) style. */
export function buildForTier(tier: 1 | 2 | 3, dest: DestId, style?: Style): Sel {
  const sel: Sel = {};
  (["venue", "photo", "beauty", "music", "catering", "florals"] as const).forEach((cat) => {
    const pool = VENDORS.filter((v) => v.cat === cat && serves(v, dest));
    const score = (v: Vendor) => Math.abs(v.tier - tier) * 10 + (style && v.styles.includes(style) ? 0 : 3) + (v.id === "b-sliakas" && dest !== "athens" && dest !== "riviera" ? 50 : 0);
    const best = [...pool].sort((a, b) => score(a) - score(b))[0];
    if (best) sel[cat] = best.id;
  });
  return sel;
}

export const TIER_EXTRAS: Record<number, string[]> = { 1: [], 2: ["x-drone"], 3: ["x-yacht", "x-fire", "x-welcome", "x-brunch"] };
export const TIER_GUESTS: Record<number, number> = { 1: 50, 2: 100, 3: 180 };

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
  L: (o: T2) => string;
  plan: Plan;
  setPlan: (fn: (p: Plan) => Plan) => void;
  quizOpen: boolean;
  setQuizOpen: (b: boolean) => void;
  vendor: string | null;
  setVendor: (id: string | null) => void;
  toast: string | null;
  flash: (m: string) => void;
  goto: (id: string) => void;
}

const C = createContext<Ctx>(null as unknown as Ctx);
export const useApp = () => useContext(C);

export function Provider({ children }: { children: ReactNode }) {
  const [lang, setLangS] = useState<Lang>(() => read<Lang>("tw-lang", "el"));
  const [plan, setPlanS] = useState<Plan>(() => ({ ...DEFAULT_PLAN, ...read<Partial<Plan>>("tw-plan", {}) }));
  const [quizOpen, setQuizOpen] = useState(false);
  const [vendor, setVendor] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { document.documentElement.lang = lang; write("tw-lang", lang); }, [lang]);

  const setPlan = useCallback((fn: (p: Plan) => Plan) => setPlanS((p) => fn(p)), []);
  const t = useCallback((k: Key) => DICT[lang][k] ?? k, [lang]);
  const L = useCallback((o: T2) => o[lang], [lang]);
  const flash = useCallback((m: string) => { setToast(m); window.setTimeout(() => setToast(null), 2600); }, []);
  const goto = useCallback((id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), []);

  const value = useMemo(
    () => ({ lang, setLang: setLangS, t, L, plan, setPlan, quizOpen, setQuizOpen, vendor, setVendor, toast, flash, goto }),
    [lang, t, L, plan, setPlan, quizOpen, vendor, toast, flash, goto]
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}

export const savePlan = (p: Plan) => write("tw-plan", p);
