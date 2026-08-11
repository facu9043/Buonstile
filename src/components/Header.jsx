import React, { useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { BrushUnderline } from "./Brush";
import { NAV_ITEMS } from "../data/brand";
import { useCart } from "../context/CartContext";

function NavLink({ to, label }) {
  const [hover, setHover] = useState(false);
  return (
    <RouterNavLink
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative px-1 py-2 text-sm tracking-wide uppercase text-paper font-heading"
    >
      {({ isActive }) => (
        <>
          {label}
          <BrushUnderline active={isActive || hover} />
        </>
      )}
    </RouterNavLink>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, setCartOpen } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-ink">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="Buonstile Indumentaria" className="h-9 w-9 object-contain" />
            <span className="hidden sm:block text-sm tracking-widest text-paper font-heading">
              BUONSTILE
            </span>
          </Link>

          <nav className="hidden md:flex gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} to={item.path} label={item.label} />
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5 text-paper">
            <button aria-label="Buscar" className="hover:opacity-70 transition-opacity">
              <Search size={19} />
            </button>
            <button
              aria-label="Carrito"
              className="relative hover:opacity-70 transition-opacity"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center rounded-full text-[10px] bg-whatsapp text-ink font-mono">
                  {count}
                </span>
              )}
            </button>
            <button aria-label="Menu" className="md:hidden" onClick={() => setMobileOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink">
          <div className="flex items-center justify-between px-5 py-4">
            <img src="/logo.png" alt="Buonstile" className="h-9 w-9 object-contain" />
            <button aria-label="Cerrar menu" onClick={() => setMobileOpen(false)} className="text-paper">
              <X size={26} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-8 px-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="text-left text-4xl text-paper font-display"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
