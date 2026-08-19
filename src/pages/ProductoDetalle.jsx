import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Check } from "lucide-react";
import { SIZES, productStatus, sizeLabel } from "../data/products";
import { fetchProductById } from "../data/productsApi";
import StockBadge from "../components/StockBadge";
import ProductImage from "../components/ProductImage";
import { BrushCircle } from "../components/Brush";
import { useCart } from "../context/CartContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(undefined);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setProduct(undefined);
    setActiveImage(0);
    fetchProductById(id)
      .then(setProduct)
      .catch(() => setProduct(null));
  }, [id]);

  if (product === undefined) {
    return (
      <div className="max-w-6xl mx-auto w-full px-5 md:px-8 py-10 flex-1">
        <p className="text-sm text-stone font-mono">Cargando producto...</p>
      </div>
    );
  }

  if (!product) return <Navigate to="/catalogo" replace />;

  const status = productStatus(product);
  const sizeStock = size ? product.stock[size] : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-5 md:px-8 py-10 flex-1">
      <Link to="/catalogo" className="flex items-center gap-2 text-sm mb-8 text-stone font-mono">
        <ArrowLeft size={15} /> Volver al catalogo
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="relative h-80 md:h-[28rem] border border-ink bg-paper overflow-hidden">
            <ProductImage
              image={product.images?.[activeImage] ?? product.image}
              pattern={product.pattern}
              alt={product.name}
            />
            <span className="absolute top-4 left-4">
              <StockBadge type={status} />
            </span>
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((url, i) => (
                <button
                  key={url}
                  onClick={() => setActiveImage(i)}
                  className="relative w-16 h-16 border overflow-hidden shrink-0"
                  style={{ borderColor: activeImage === i ? "#0D0D0D" : "#DCDAD3", borderWidth: activeImage === i ? 2 : 1 }}
                >
                  <img src={url} alt={`${product.name} - foto ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase mb-2 text-stone font-mono">{product.category}</p>
          <h1 className="text-4xl mb-3 text-ink font-display">{product.name}</h1>
          <p className="text-2xl mb-6 text-ink font-mono">$ {product.price.toLocaleString("es-AR")}</p>

          <p className="text-xs uppercase tracking-wide mb-3 text-ink font-heading">Talle</p>
          <div className="flex gap-3 mb-2">
            {SIZES.map((s) => {
              const stock = product.stock[s];
              const disabled = stock === 0;
              return (
                <button
                  key={s}
                  disabled={disabled}
                  onClick={() => {
                    setSize(s);
                    setQty(1);
                  }}
                  className="relative min-w-12 h-12 px-2 flex items-center justify-center text-sm font-bold border font-mono whitespace-nowrap"
                  style={{
                    color: disabled ? "#C7C5BD" : "#0D0D0D",
                    borderColor: disabled ? "#DCDAD3" : "#0D0D0D",
                    textDecoration: disabled ? "line-through" : "none",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  {sizeLabel(product.category, s)}
                  <BrushCircle active={size === s} />
                </button>
              );
            })}
          </div>
          {size && (
            <p className="text-xs mb-6 text-stone font-mono">
              {sizeStock === 0 ? "Sin stock en este talle" : sizeStock <= 2 ? `Quedan ${sizeStock} unidades` : "Disponible"}
            </p>
          )}

          <p className="text-xs uppercase tracking-wide mb-3 text-ink font-heading">Cantidad</p>
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center border border-ink text-ink"
            >
              <Minus size={14} />
            </button>
            <span className="text-ink font-mono">{qty}</span>
            <button
              onClick={() => setQty((q) => (sizeStock ? Math.min(sizeStock, q + 1) : q + 1))}
              className="w-9 h-9 flex items-center justify-center border border-ink text-ink"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            disabled={!size}
            onClick={handleAdd}
            className="w-full md:w-auto px-8 py-3 text-sm uppercase tracking-wide flex items-center justify-center gap-2 font-heading"
            style={{
              background: size ? "#0D0D0D" : "#DCDAD3",
              color: size ? "#F6F5F1" : "#8A877E",
              cursor: size ? "pointer" : "not-allowed",
            }}
          >
            {added ? <><Check size={16} /> Agregado</> : size ? <><Check size={16} /> Agregar al carrito</> : "Elegi un talle"}
          </button>
        </div>
      </div>
    </div>
  );
}
