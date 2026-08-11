import React from "react";

const MAP = {
  disponible: { text: "DISPONIBLE", bg: "#0D0D0D", color: "#F6F5F1" },
  ultimas: { text: "ULTIMAS UNIDADES", bg: "#F6F5F1", color: "#0D0D0D" },
  sinstock: { text: "SIN STOCK", bg: "#DCDAD3", color: "#8A877E" },
};

export default function StockBadge({ type }) {
  const s = MAP[type];
  return (
    <span
      className="inline-block px-2.5 py-1 text-[10px] tracking-widest border"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        background: s.bg,
        color: s.color,
        borderColor: "#0D0D0D",
        transform: "rotate(-2deg)",
      }}
    >
      {s.text}
    </span>
  );
}
