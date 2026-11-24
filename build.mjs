// Сборка: React + Tailwind -> один файл index.html в корне проекта (CSS, JS и фото внутри).
// Так страницу сразу открывает GitHub Pages.
import { build } from "esbuild";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

mkdirSync(".build", { recursive: true });

await build({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: ".build/app.js",
  logLevel: "warning",
});

execSync("npx tailwindcss -c tailwind.config.js -i src/input.css -o .build/style.css --minify", { stdio: "inherit" });

const js = readFileSync(".build/app.js", "utf8").replaceAll("</script", "<\\/script");
const css = readFileSync(".build/style.css", "utf8");
const html = readFileSync("index.template.html", "utf8")
  .replace("/*CSS*/", () => css)
  .replace("/*JS*/", () => js);
writeFileSync("index.html", html);
console.log(`index.html: ${Math.round(html.length / 1024)} KB`);
