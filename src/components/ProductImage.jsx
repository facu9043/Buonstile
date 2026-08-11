import React from "react";
import { patternBg, patternSize } from "./patterns";

// Muestra la foto real del producto si "image" esta cargado en products.js.
// Si no, muestra un patron geometrico de relleno para no dejar el catalogo
// vacio mientras se cargan las fotos reales.
export default function ProductImage({ image, pattern, alt, className = "" }) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: patternBg(pattern),
        backgroundSize: patternSize(pattern),
        opacity: 0.1,
      }}
    />
  );
}
