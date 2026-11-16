const c = (v) => `rgb(var(--${v}) / <alpha-value>)`;
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        bg: c("bg"), surface: c("surface"), surface2: c("surface2"), fg: c("fg"), muted: c("muted"),
        accent: c("accent"), accentink: c("accentink"), alert: c("alert"), ok: c("ok"),
        paper: c("paper"), paper2: c("paper2"), ink: c("ink"), paperline: c("paperline"), papermuted: c("papermuted"), forest: c("forest"),
        line: "rgb(var(--linec) / 0.18)",
      },
      fontFamily: {
        display: ["Oswald", "Arial Narrow", "Impact", "sans-serif"],
        body: ["Onest", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 6px 18px -8px rgb(var(--accent) / 0.5)",
        card: "0 1px 0 rgb(255 255 255 / 0.04) inset, 0 18px 40px -22px rgb(0 0 0 / 0.55)",
        lift: "0 30px 60px -28px rgb(0 0 0 / 0.65)",
      },
    },
  },
};
