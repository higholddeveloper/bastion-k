// Сборка: React + Tailwind -> один файл dist/index.html (CSS, JS и фото внутри).
import { build } from "esbuild";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

mkdirSync("dist", { recursive: true });

await build({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  loader: { ".webp": "dataurl" },
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: "dist/app.js",
  logLevel: "warning",
});

execSync("npx tailwindcss -c tailwind.config.js -i src/input.css -o dist/style.css --minify", { stdio: "inherit" });

const js = readFileSync("dist/app.js", "utf8").replaceAll("</script", "<\\/script");
const css = readFileSync("dist/style.css", "utf8");
const html = readFileSync("index.template.html", "utf8")
  .replace("/*CSS*/", () => css)
  .replace("/*JS*/", () => js);
writeFileSync("dist/index.html", html);
console.log(`dist/index.html: ${Math.round(html.length / 1024)} KB`);
