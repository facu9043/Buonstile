import React from "react";

// El gesto de pincel del isologo, reutilizado como micro-interaccion:
// subrayado en la navegacion y circulo en el selector de talle.
export function BrushUnderline({ active, stroke = "#F6F5F1" }) {
  return (
    <svg
      viewBox="0 0 120 14"
      className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none"
      preserveAspectRatio="none"
    >
      <path
        d="M2 8 C 20 12, 35 2, 50 7 S 80 11, 100 4 S 115 9, 118 6"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke={stroke}
        style={{
          strokeDasharray: 220,
          strokeDashoffset: active ? 0 : 220,
          transition: "stroke-dashoffset 0.5s ease",
        }}
      />
    </svg>
  );
}

export function BrushCircle({ active, stroke = "#0D0D0D" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <path
        d="M50 6 C 75 6, 94 25, 94 50 C 94 75, 75 94, 50 94 C 25 94, 6 75, 6 50 C 6 27, 22 9, 45 7"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        stroke={stroke}
        style={{
          strokeDasharray: 300,
          strokeDashoffset: active ? 0 : 300,
          transition: "stroke-dashoffset 0.5s ease",
          opacity: active ? 1 : 0,
        }}
      />
    </svg>
  );
}
