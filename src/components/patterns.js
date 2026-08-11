// Patrones geometricos usados como placeholder de foto de producto.
// Cuando tengas la foto real, no hace falta esto: se muestra la <img>
// directamente en vez del patron (ver ProductImage.jsx).
export function patternBg(type) {
  switch (type) {
    case "stripes":
      return "repeating-linear-gradient(45deg, #0D0D0D 0 2px, transparent 2px 14px)";
    case "dots":
      return "radial-gradient(#0D0D0D 2px, transparent 2px)";
    case "grid":
      return "linear-gradient(#0D0D0D 1px, transparent 1px), linear-gradient(90deg, #0D0D0D 1px, transparent 1px)";
    case "cross":
      return "repeating-linear-gradient(45deg, #0D0D0D 0 2px, transparent 2px 16px), repeating-linear-gradient(-45deg, #0D0D0D 0 2px, transparent 2px 16px)";
    default:
      return "none";
  }
}

export function patternSize(type) {
  if (type === "dots") return "16px 16px";
  if (type === "grid") return "18px 18px";
  return "auto";
}
