// ============================================================
// DATOS DE BUONSTILE INDUMENTARIA
// ============================================================
// Los productos (precio, stock, fotos, activo/inactivo) ya no viven acá:
// se cargan y editan desde el panel de administración (/admin), que los
// guarda en Supabase. Ver src/data/productsApi.js.
// ============================================================

export const CATEGORIES = ["Remeras", "Buzos", "Pantalones", "Accesorios"];
export const SIZES = ["S", "M", "L", "XL"];

// Equivalencia numerica de talles por categoria (hoy solo Pantalones la
// necesita). Categorias sin equivalencia muestran el talle tal cual.
const SIZE_NUMBERS = {
  Pantalones: { S: 38, M: 40, L: 42, XL: 44 },
};

export function sizeLabel(category, size) {
  const number = SIZE_NUMBERS[category]?.[size];
  return number ? `${size} (${number})` : size;
}

export function productStatus(product) {
  const values = Object.values(product.stock);
  const total = values.reduce((a, b) => a + b, 0);
  const max = Math.max(...values);
  if (total === 0) return "sinstock";
  if (max <= 2) return "ultimas";
  return "disponible";
}
