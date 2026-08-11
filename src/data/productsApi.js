import { supabase } from "../lib/supabase";

// Convierte una fila de la tabla "products" a la forma que ya usan
// ProductCard/ProductImage/ProductoDetalle/CartContext (image, no image_url).
function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    image: row.image_url,
    pattern: row.pattern,
    stock: row.stock,
    active: row.active,
  };
}

// Paginas publicas: solo productos activos.
export async function fetchActiveProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("id", { ascending: true });
  if (error) throw error;
  return data.map(mapRow);
}

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

// Panel de administracion: todos los productos, activos e inactivos.
export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });
  if (error) throw error;
  return data.map(mapRow);
}

export async function updateProduct(id, fields) {
  const { error } = await supabase.from("products").update(fields).eq("id", id);
  if (error) throw error;
}

export async function toggleActive(id, active) {
  await updateProduct(id, { active });
}

export async function uploadProductImage(id, file) {
  const ext = file.name.split(".").pop();
  const path = `${id}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, file, { upsert: false });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  await updateProduct(id, { image_url: data.publicUrl });
  return data.publicUrl;
}
