// Build: bun run build.ts  →  outputs static site into /docs (served by GitHub Pages)
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync } from "fs";
rmSync("docs", { recursive: true, force: true });
mkdirSync("docs/assets", { recursive: true });
const r = await Bun.build({ entrypoints: ["src/main.tsx"], outdir: "docs/assets", minify: true, naming: "app.[hash].js", define: { "process.env.NODE_ENV": '"production"' } });
if (!r.success) { console.error(r.logs); process.exit(1); }
const js = r.outputs[0].path.split("/").pop();
const css = "styles." + Bun.hash(readFileSync("src/styles.css")).toString(36) + ".css";
cpSync("src/styles.css", "docs/assets/" + css);
const html = readFileSync("index.html", "utf8").replace("%CSS%", "assets/" + css).replace("%JS%", "assets/" + js);
writeFileSync("docs/index.html", html);
writeFileSync("docs/.nojekyll", "");
console.log("built", js, css);
