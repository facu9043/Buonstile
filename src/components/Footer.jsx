import React from "react";
import { Instagram, Facebook, MessageCircle, MapPin } from "lucide-react";
import {
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  STORE_ADDRESS,
  NAV_ITEMS,
} from "../data/brand";

function IconLink({ href, children, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center border border-paper/20 text-paper transition-transform hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const waMessage = encodeURIComponent(
    "Hola! Quiero hacer una consulta sobre un producto de Buonstile."
  );

  return (
    <footer className="w-full mt-auto bg-ink">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <img src="/logo.png" alt="Buonstile Indumentaria" className="h-14 w-14 object-contain mb-4" />
          <p className="text-sm max-w-xs text-stone font-body">
            Indumentaria urbana con identidad propia. Remeras, buzos y
            pantalones pensados para la calle.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase mb-4 text-paper font-heading">
            Navegacion
          </p>
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className="text-sm text-stone hover:text-white transition-colors font-body"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase mb-4 text-paper font-heading">
            Contacto
          </p>
          <p className="text-sm flex items-center gap-2 mb-3 text-stone font-mono">
            <MapPin size={14} /> {STORE_ADDRESS}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center gap-2 mb-5 text-stone hover:text-white transition-colors font-mono"
          >
            <MessageCircle size={15} /> +54 9 3624 63-3933
          </a>
          <div className="flex gap-3">
            <IconLink href={INSTAGRAM_URL} label="Instagram">
              <Instagram size={16} />
            </IconLink>
            <IconLink href={FACEBOOK_URL} label="Facebook">
              <Facebook size={16} />
            </IconLink>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 border-t border-paper/10 flex justify-between text-xs text-stone font-mono">
        <span>&copy; 2026 BUONSTILE INDUMENTARIA</span>
        <span>Resistencia, Chaco</span>
      </div>
    </footer>
  );
}
