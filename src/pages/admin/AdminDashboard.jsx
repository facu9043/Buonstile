import React, { useEffect, useState } from "react";
import { LogOut, Plus, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { fetchAllProducts, createProduct } from "../../data/productsApi";
import { SIZES } from "../../data/products";
import ProductRow from "../../components/admin/ProductRow";

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch(() => setError("No se pudieron cargar los productos."))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdated = (updated) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAdd = async () => {
    setAdding(true);
    try {
      const created = await createProduct();
      setProducts((prev) => [...prev, created]);
    } catch {
      setError("No se pudo crear el producto.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-5 md:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-1 text-stone font-mono">Buonstile</p>
          <h1 className="text-2xl md:text-3xl text-ink font-heading uppercase">Productos</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            disabled={adding}
            className="flex items-center gap-2 text-xs uppercase tracking-wide bg-ink text-paper font-heading px-4 py-2 disabled:opacity-50"
          >
            {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Agregar producto
          </button>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-xs uppercase tracking-wide text-ink font-heading border border-ink px-4 py-2"
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      </div>

      {loading && <p className="text-sm text-stone font-mono">Cargando productos...</p>}
      {error && <p className="text-sm text-red-700 font-mono">{error}</p>}
      {!loading && !error && (
        <p className="text-xs text-stone font-mono mb-4">
          Los productos nuevos arrancan inactivos: completá nombre, precio y stock, subí una foto,
          y despues activalo con el switch de la columna Estado.
        </p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto border border-ink">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-ink text-paper text-left">
                <th className="p-3 text-xs uppercase font-heading">Foto</th>
                <th className="p-3 text-xs uppercase font-heading">Producto</th>
                <th className="p-3 text-xs uppercase font-heading">Categoría</th>
                <th className="p-3 text-xs uppercase font-heading">Precio</th>
                <th className="p-3 text-xs uppercase font-heading">
                  Stock ({SIZES.join(" / ")})
                </th>
                <th className="p-3 text-xs uppercase font-heading">Estado</th>
                <th className="p-3 text-xs uppercase font-heading"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <ProductRow key={p.id} product={p} onUpdated={handleUpdated} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
