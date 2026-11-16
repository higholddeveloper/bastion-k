import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const PALETTES = [
  { id: "a", name: "A · Зелёный", sw: ["#07261f", "#0b4d3f", "#7ee0b2", "#eceeed"] },
  { id: "b", name: "B · Графит и зелёный", sw: ["#151918", "#0b4d3f", "#2fbf8a", "#e8ecea"] },
  { id: "c", name: "C · Светлый", sw: ["#eef1ef", "#0b4d3f", "#083a2f", "#7ee0b2"] },
  { id: "d", name: "D · Зелёный и коралловый", sw: ["#0a1c16", "#0b4d3f", "#fe5945", "#d6dbd9"] },
];

function PaletteSwitch() {
  const [id, setId] = useState("a");
  useEffect(() => { document.documentElement.setAttribute("data-palette", id); }, [id]);
  return (
    <div data-palette-switch style={{ position: "fixed", left: 0, right: 0, bottom: "max(10px, env(safe-area-inset-bottom, 0px))", zIndex: 80, display: "flex", justifyContent: "center", pointerEvents: "none", padding: "0 10px" }}>
      <div role="group" aria-label="Вариант палитры" style={{ pointerEvents: "auto", display: "flex", gap: 6, padding: 6, borderRadius: 16, background: "rgba(20,24,23,.92)", border: "1px solid rgba(255,255,255,.18)", boxShadow: "0 10px 30px rgba(0,0,0,.45)", maxWidth: "100%", overflowX: "auto" }}>
        {PALETTES.map((p) => (
          <button key={p.id} onClick={() => setId(p.id)} aria-pressed={id === p.id}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 11, border: 0, cursor: "pointer", whiteSpace: "nowrap", font: "600 13px Onest, system-ui, sans-serif", color: id === p.id ? "#0a1410" : "#e8ecea", background: id === p.id ? "#e8ecea" : "transparent" }}>
            <span style={{ display: "inline-flex" }}>
              {p.sw.map((c) => <i key={c} style={{ width: 10, height: 18, background: c, border: "1px solid rgba(128,128,128,.5)", marginLeft: -1 }} />)}
            </span>
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<><App /><PaletteSwitch /></>);
