import React from "react";
import { Link } from "react-router-dom";
import StockBadge from "./StockBadge";
import ProductImage from "./ProductImage";
import { productStatus } from "../data/products";

export default function ProductCard({ p }) {
  const status = productStatus(p);
  return (
    <Link to={`/catalogo/${p.id}`} className="flex flex-col border border-ink text-left">
      <div className="relative h-56 bg-paper overflow-hidden">
        <ProductImage image={p.image} pattern={p.pattern} alt={p.name} className={status === "sinstock" ? "opacity-40" : ""} />
        {status === "sinstock" && !p.image && <div className="absolute inset-0 bg-paper/70" />}
        <span className="absolute top-3 left-3">
          <StockBadge type={status} />
        </span>
      </div>
      <div className="p-4 flex flex-col gap-1 bg-ink">
        <p className="text-sm text-paper font-body">{p.name}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-whatsapp font-mono">$ {p.price.toLocaleString("es-AR")}</p>
          <p className="text-[10px] text-stone font-mono">{p.category}</p>
        </div>
      </div>
    </Link>
  );
}
