import React, { useState } from "react";
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductImage from "./ProductImage";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const { items, updateQty, removeItem, total, cartOpen, setCartOpen } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 z-40 transition-opacity"
        style={{
          background: "#0D0D0DCC",
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? "auto" : "none",
        }}
      />
      <aside
        className="fixed top-0 right-0 h-full z-50 flex flex-col w-full max-w-sm bg-paper transition-transform duration-300"
        style={{ transform: cartOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink">
          <span className="uppercase text-sm tracking-wide text-ink font-heading">
            Tu carrito ({items.reduce((a, i) => a + i.qty, 0)})
          </span>
          <button aria-label="Cerrar carrito" onClick={() => setCartOpen(false)} className="text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {items.length === 0 && (
            <p className="text-sm text-center mt-10 text-stone font-body">
              Todavia no agregaste productos.
            </p>
          )}
          {items.map((item) => (
            <div key={item.key} className="flex gap-3 border-b border-line pb-4">
              <div className="relative w-16 h-16 shrink-0 bg-papershade overflow-hidden">
                <ProductImage image={item.image} pattern={item.pattern} alt={item.name} className="opacity-20" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm leading-tight text-ink font-body">{item.name}</p>
                <p className="text-xs text-stone font-mono">Talle {item.size}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.key, -1)}
                      className="w-6 h-6 flex items-center justify-center border border-ink"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-xs text-ink font-mono">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.key, 1)}
                      className="w-6 h-6 flex items-center justify-center border border-ink"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                  <span className="text-sm text-ink font-mono">
                    $ {(item.price * item.qty).toLocaleString("es-AR")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.key)}
                aria-label="Quitar"
                className="self-start text-stone hover:text-black transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        <div className="px-5 py-5 border-t border-ink">
          <div className="flex justify-between mb-4">
            <span className="text-sm uppercase text-ink font-heading">Total</span>
            <span className="text-lg text-ink font-mono">$ {total.toLocaleString("es-AR")}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={() => setCheckoutOpen(true)}
            className="w-full py-3 text-sm uppercase tracking-wide flex items-center justify-center gap-2 font-heading"
            style={{
              background: items.length ? "#25D366" : "#DCDAD3",
              color: items.length ? "#0D0D0D" : "#8A877E",
              cursor: items.length ? "pointer" : "not-allowed",
            }}
          >
            <MessageCircle size={16} /> Finalizar pedido
          </button>
        </div>
      </aside>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
