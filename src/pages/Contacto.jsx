import React from "react";
import { MessageCircle, Instagram, Facebook, MapPin, Clock, ArrowRight } from "lucide-react";
import { WHATSAPP_NUMBER, INSTAGRAM_URL, FACEBOOK_URL, STORE_ADDRESS, STORE_HOURS } from "../data/brand";

const QUICK_MESSAGES = [
  { label: "Preguntar por un producto", text: "Hola! Queria consultar por la disponibilidad de un producto." },
  { label: "Consultar por mi pedido", text: "Hola! Queria consultar por el estado de un pedido que hice." },
  { label: "Coordinar un retiro", text: `Hola! Queria coordinar el retiro de un pedido en la sucursal de ${STORE_ADDRESS}.` },
];

function ContactCard({ icon: Icon, title, subtitle, href, cta }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-4 p-6 border border-ink bg-paper transition-transform hover:-translate-y-1"
    >
      <Icon size={26} className="text-ink" />
      <div>
        <p className="text-sm uppercase mb-1 text-ink font-heading">{title}</p>
        <p className="text-sm text-stone font-body">{subtitle}</p>
      </div>
      <span className="flex items-center gap-1 text-xs uppercase tracking-wide mt-auto text-ink font-mono">
        {cta} <ArrowRight size={13} />
      </span>
    </a>
  );
}

export default function Contacto() {
  const mapQuery = encodeURIComponent(STORE_ADDRESS);

  return (
    <>
      <section className="w-full px-5 md:px-8 py-16 md:py-20 bg-ink">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <p className="text-xs tracking-[0.35em] uppercase text-stone font-mono">Contacto</p>
          <h1 className="text-5xl md:text-7xl leading-[0.95] text-paper font-display">Hablemos</h1>
          <p className="max-w-lg text-[#C8C6BE] font-body">
            Consultas, pedidos o dudas sobre talles: elegi el medio que mas te
            guste, siempre te vamos a responder por WhatsApp.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto w-full px-5 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp"
            subtitle="+54 9 3624 63-3933"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Queria hacer una consulta.")}`}
            cta="Escribir ahora"
          />
          <ContactCard icon={Instagram} title="Instagram" subtitle="@buonstile.indumentaria" href={INSTAGRAM_URL} cta="Ver perfil" />
          <ContactCard icon={Facebook} title="Facebook" subtitle="Buonstile Indumentaria" href={FACEBOOK_URL} cta="Ver pagina" />
        </div>

        <div className="mb-16">
          <h2 className="text-xl uppercase mb-5 text-ink font-heading">O elegi directamente que necesitas</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            {QUICK_MESSAGES.map((m) => (
              <a
                key={m.label}
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-between px-5 py-4 border border-ink text-sm text-ink font-body"
              >
                {m.label}
                <ArrowRight size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 text-stone font-mono">Nuestra sucursal</p>
            <h2 className="text-4xl mb-5 text-ink font-display">Vení a conocernos</h2>
            <p className="flex items-center gap-2 mb-3 text-ink font-mono">
              <MapPin size={17} /> {STORE_ADDRESS}
            </p>
            <p className="flex items-center gap-2 text-sm mb-6 text-stone font-mono">
              <Clock size={15} /> Horario: {STORE_HOURS}
            </p>
            <p className="text-sm text-[#3A3A3A] font-body">
              Aca retiras los pedidos reservados por WhatsApp y te probas las
              prendas en persona.
            </p>
          </div>
          <div className="relative h-72 md:h-full min-h-[280px] border border-ink overflow-hidden">
            <iframe
              title="Ubicacion Buonstile Indumentaria"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="absolute inset-0 w-full h-full grayscale"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
