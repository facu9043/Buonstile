import React from "react";
import { MapPin, Sparkles, Users, Wind, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, STORE_ADDRESS } from "../data/brand";
import { patternBg } from "../components/patterns";

const VALUES = [
  {
    icon: Sparkles,
    title: "Estilo propio",
    text: "No vendemos un uniforme. Elegimos prendas que te dejan armar tu propia combinacion, tu propio flow.",
  },
  {
    icon: Wind,
    title: "Calle con elegancia",
    text: "Cortes urbanos, materiales nobles y esa actitud rustica que no pasa de moda porque nunca busco estar de moda.",
  },
  {
    icon: Users,
    title: "Comunidad, no vidriera",
    text: "Escuchamos a quien nos compra. La tienda crece con lo que ustedes se ponen, no al reves.",
  },
];

export default function Nosotros() {
  const waMessage = encodeURIComponent("Hola! Quiero hacer una consulta sobre un producto de Buonstile.");

  return (
    <>
      <section className="w-full px-5 md:px-8 py-16 md:py-24 bg-ink">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5">
          <p className="text-xs tracking-[0.35em] uppercase text-stone font-mono">Quienes somos</p>
          <h1 className="text-5xl md:text-7xl leading-[0.95] text-paper font-display">Somos Buonstile</h1>
          <p className="max-w-xl text-base md:text-lg text-[#C8C6BE] font-body">
            Un local de ropa urbana pensado para chicos y chicas de 18 a 30
            años, aunque nuestro estilo cruza generaciones. Te ayudamos a
            lucir tu propio estilo con elegancia y flow rustico de calle.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto w-full px-5 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 text-stone font-mono">Nuestra forma de vestir</p>
          <h2 className="text-4xl md:text-5xl mb-5 text-ink font-display">
            El estilo no se compra, se lleva puesto
          </h2>
          <p className="leading-relaxed mb-4 text-[#3A3A3A] font-body">
            En Buonstile elegimos cada prenda pensando en como se usa en la
            calle de verdad: remeras, buzos y pantalones con cortes urbanos,
            un toque rustico en las texturas y esa elegancia informal que
            no necesita gritar para notarse.
          </p>
          <p className="leading-relaxed text-[#3A3A3A] font-body">
            No buscamos vestirte igual a todos. Buscamos darte las piezas
            para que armes tu propia combinacion y salgas con tu propio flow.
          </p>
        </div>
        <div className="relative h-72 md:h-96 border border-ink flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: patternBg("stripes") }} />
          <img src="/logo.png" alt="Buonstile" className="relative h-32 w-32 md:h-40 md:w-40 object-contain" />
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-papershade">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="text-2xl md:text-3xl uppercase mb-10 text-ink font-heading">Lo que nos define</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-6 border border-ink bg-paper flex flex-col gap-4">
                  <Icon size={24} className="text-ink" />
                  <h3 className="text-base uppercase tracking-wide text-ink font-heading">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-[#3A3A3A] font-body">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto w-full px-5 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative h-64 md:h-80 border border-ink overflow-hidden">
          <iframe
            title="Ubicacion Buonstile Indumentaria"
            src={`https://www.google.com/maps?q=${encodeURIComponent(STORE_ADDRESS)}&output=embed`}
            className="absolute inset-0 w-full h-full grayscale"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 text-stone font-mono">Visitanos</p>
          <h2 className="text-4xl md:text-5xl mb-5 text-ink font-display">Nuestra sucursal</h2>
          <p className="text-lg mb-2 flex items-center gap-2 text-ink font-mono">
            <MapPin size={18} /> {STORE_ADDRESS}
          </p>
          <p className="mb-6 text-[#3A3A3A] font-body">
            Aca podes retirar en persona los pedidos que reserves por
            WhatsApp, probarte las prendas y conocer las novedades antes
            que nadie.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-wide bg-whatsapp text-ink font-heading"
          >
            <MessageCircle size={16} /> Consultar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
