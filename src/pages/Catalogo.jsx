import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SIZES, sizeLabel } from "../data/products";
import { fetchActiveProducts } from "../data/productsApi";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["Todos", "Remeras", "Buzos", "Pantalones", "Accesorios"];

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-xs uppercase tracking-wide border border-ink transition-colors font-heading"
      style={{ background: active ? "#0D0D0D" : "transparent", color: active ? "#F6F5F1" : "#0D0D0D" }}
    >
      {label}
    </button>
  );
}

export default function Catalogo() {
  const [searchParams] = useSearchParams();
  const categoriaFromUrl = searchParams.get("categoria");

  const [category, setCategory] = useState(categoriaFromUrl && CATEGORIES.includes(categoriaFromUrl) ? categoriaFromUrl : "Todos");
  const [sizeFilter, setSizeFilter] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoriaFromUrl && CATEGORIES.includes(categoriaFromUrl)) {
      setCategory(categoriaFromUrl);
    }
  }, [categoriaFromUrl]);

  useEffect(() => {
    fetchActiveProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const showSizeFilter = category !== "Accesorios";

  useEffect(() => {
    if (!showSizeFilter) setSizeFilter(null);
  }, [showSizeFilter]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "Todos" && p.category !== category) return false;
      if (sizeFilter && p.stock[sizeFilter] === 0) return false;
      return true;
    });
  }, [products, category, sizeFilter]);

  return (
    <main className="max-w-6xl mx-auto w-full px-5 md:px-8 py-10 md:py-14 flex-1">
      <p className="text-xs tracking-[0.3em] uppercase mb-2 text-stone font-mono">Catalogo</p>
      <h1 className="text-4xl md:text-5xl mb-8 text-ink font-display">Elegi tu proximo look</h1>

      <div className="flex flex-col gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <FilterChip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
          ))}
        </div>
        {showSizeFilter && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wide mr-2 text-stone font-mono">Talle:</span>
            <FilterChip label="Todos" active={sizeFilter === null} onClick={() => setSizeFilter(null)} />
            {SIZES.map((s) => (
              <FilterChip
                key={s}
                label={sizeLabel(category, s)}
                active={sizeFilter === s}
                onClick={() => setSizeFilter(s)}
              />
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <p className="text-center py-20 text-stone font-body">Cargando catálogo...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-20 text-stone font-body">
          No hay productos que coincidan con estos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </main>
  );
}
