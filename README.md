# Thalassa Weddings — demo

Luxury destination-wedding platform demo (Greece): curated packages + a live "Build your wedding" builder, a 5-step planning quiz, vendor directory with profiles and availability, gallery, testimonials and enquiry form. Greek by default with an EN toggle. All data is illustrative.

**Live:** https://reservifygr.github.io/wedding.planner/

## Stack
React 19 + TypeScript, hand-written CSS (no framework), bundled with [Bun](https://bun.sh). Static output in `/docs`, served by GitHub Pages (Settings → Pages → Deploy from branch `main`, folder `/docs`).

## Develop
```bash
bun install            # or: npm i react react-dom react-icons
bun run build.ts       # builds into /docs
npx serve docs         # preview locally
```

## Where to change things
| What | File |
|---|---|
| Brand name / logo | `src/ui.tsx` (`Logo`) and `index.html` |
| Colours, fonts, spacing | `src/styles.css` (`:root` tokens) |
| All Greek / English copy | `src/i18n.ts` |
| Destinations, packages, vendors, prices | `src/data.ts` |
| Photos (Unsplash IDs) | `src/images.ts` |

Photos: Unsplash, free to use under the Unsplash License. Every image falls back to a soft gradient if a link breaks.
