import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, Instagram } from "lucide-react";
import { CATEGORIES } from "../data/products";
import { fetchActiveProducts } from "../data/productsApi";
import { INSTAGRAM_URL } from "../data/brand";
import ProductCard from "../components/ProductCard";
import { patternBg, patternSize } from "../components/patterns";

const CATEGORY_PATTERNS = { Remeras: "stripes", Buzos: "dots", Pantalones: "grid", Accesorios: "cross" };

function CategoryCard({ name }) {
  return (
    <Link
      to={`/catalogo?categoria=${encodeURIComponent(name)}`}
      className="relative h-56 md:h-64 flex items-end p-5 overflow-hidden border border-ink bg-paper transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: patternBg(CATEGORY_PATTERNS[name]), backgroundSize: patternSize(CATEGORY_PATTERNS[name]) }}
      />
      <div className="relative flex items-center justify-between w-full">
        <span className="text-2xl md:text-3xl text-ink font-display">{name}</span>
        <ArrowRight size={20} className="text-ink" />
      </div>
    </Link>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchActiveProducts()
      .then((products) => setFeatured(products.slice(0, 4)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative w-full flex items-center justify-center overflow-hidden bg-ink" style={{ minHeight: "88vh" }}>
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #F6F5F1 0 1px, transparent 1px 22px)" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-stone font-mono">
            Indumentaria urbana · Resistencia, Chaco
          </p>
          <h1 className="text-6xl md:text-8xl leading-[0.95] text-paper font-display">VESTI TU FLOW</h1>
          <p className="max-w-lg text-base md:text-lg text-[#C8C6BE] font-body">
            Te ayudamos a lucir tu propio estilo con elegancia y flow rustico
            de calle. Ropa urbana para los que arman su propia forma de vestir.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link to="/catalogo" className="px-7 py-3 text-sm uppercase tracking-wide bg-paper text-ink font-heading">
              Ver catalogo
            </Link>
            <Link to="/nosotros" className="px-7 py-3 text-sm uppercase tracking-wide border-2 border-paper text-paper font-heading">
              Nuestra historia
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 flex flex-col items-center gap-1 text-stone">
          <span className="text-[10px] tracking-widest font-mono">SCROLL</span>
          <ArrowDown size={16} />
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="max-w-6xl mx-auto w-full px-5 md:px-8 py-16 md:py-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl uppercase text-ink font-heading">Categorias</h2>
          <span className="text-xs hidden sm:block text-stone font-mono">Elegi tu terreno</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat} name={cat} />
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="w-full py-16 md:py-24 bg-papershade">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl uppercase text-ink font-heading">Destacados</h2>
            <Link to="/catalogo" className="text-sm flex items-center gap-1 hover:gap-2 transition-all text-ink font-mono">
              Ver todo <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* QUIENES SOMOS teaser */}
      <section className="max-w-6xl mx-auto w-full px-5 md:px-8 py-16 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative h-72 md:h-96 border border-ink flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: patternBg("cross") }} />
          <img src="/logo.png" alt="Buonstile" className="relative h-28 w-28 md:h-36 md:w-36 object-contain" />
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 text-stone font-mono">Quienes somos</p>
          <h3 className="text-4xl md:text-5xl mb-5 text-ink font-display">Tu estilo, tu calle</h3>
          <p className="mb-6 leading-relaxed text-[#3A3A3A] font-body">
            Somos un local pensado para chicos y chicas de 18 a 30 anos, aunque
            nuestro estilo cruza generaciones. Creemos que la ropa es una forma
            de expresarte, por eso elegimos prendas con actitud urbana, un
            toque rustico y esa elegancia informal que se lleva en la calle.
          </p>
          <Link to="/nosotros" className="inline-block px-6 py-3 text-sm uppercase tracking-wide bg-ink text-paper font-heading">
            Conoce la marca
          </Link>
        </div>
      </section>

      {/* INSTAGRAM STRIP */}
      <section className="w-full py-16 bg-ink">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between mb-6">
          <span className="uppercase text-lg text-paper font-heading">@buonstile.indumentaria</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 text-stone font-mono">
            Seguinos <Instagram size={14} />
          </a>
        </div>
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-3 md:grid-cols-6 gap-2">
          {["stripes", "dots", "grid", "cross", "stripes", "dots"].map((pat, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square flex items-center justify-center border border-paper/10 hover:opacity-70 transition-opacity"
              style={{ backgroundImage: patternBg(pat), backgroundSize: patternSize(pat), backgroundColor: "#161616" }}
            >
              <Instagram size={18} className="text-paper/30" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
