import React, { useState } from "react";
import { X, ArrowLeft, Truck, Store, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, STORE_ADDRESS, TRANSPORTES } from "../data/brand";
import { useCart } from "../context/CartContext";

function buildMessage({ items, total, method, form }) {
  const lines = [];
  lines.push("Hola! Quiero hacer este pedido a Buonstile Indumentaria 🛍️");
  lines.push("");
  lines.push("*PRODUCTOS*");
  items.forEach((it) => {
    lines.push(
      `- ${it.name} (Talle ${it.size}) x${it.qty} - $${(it.price * it.qty).toLocaleString("es-AR")}`
    );
  });
  lines.push("");
  lines.push(`*TOTAL: $${total.toLocaleString("es-AR")}*`);
  lines.push("");
  if (method === "envio") {
    lines.push("DATOS PARA EL ENVIO 🚚");
    lines.push(`Nombre y apellido: ${form.nombre}`);
    lines.push(`DNI: ${form.dni}`);
    lines.push(`Telefono: ${form.telefono}`);
    lines.push(`Transporte: ${form.transporte}`);
    lines.push(`CP: ${form.cp}`);
    lines.push(`Provincia: ${form.provincia}`);
    lines.push(`Localidad: ${form.localidad}`);
    lines.push(
      `Direccion del domicilio o sucursal donde queres retirar (aclarar si es domicilio o sucursal): ${form.direccion}`
    );
  } else {
    lines.push("Quiero RETIRAR este pedido en sucursal 🏪");
    lines.push(`Direccion: ${STORE_ADDRESS}`);
    lines.push("Paso a coordinar dia y horario de retiro por este medio.");
  }
  return lines.join("\n");
}

function Field({ label, value, onChange, full }) {
  return (
    <div className={`flex flex-col gap-1 ${full ? "sm:col-span-2" : ""}`}>
      <label className="text-[11px] uppercase tracking-wide text-stone font-mono">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-ink text-sm bg-transparent text-ink font-body"
      />
    </div>
  );
}

function Stepper({ step }) {
  const steps = ["Carrito", "Metodo de entrega", "Datos", "WhatsApp"];
  const currentIndex = steps.indexOf(step);
  return (
    <div className="flex items-center gap-2 mb-6 flex-wrap">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <span
            className="text-[10px] md:text-xs uppercase tracking-wide font-mono"
            style={{
              color: i <= currentIndex ? "#0D0D0D" : "#C7C5BD",
              fontWeight: i === currentIndex ? 700 : 400,
            }}
          >
            {s}
          </span>
          {i < steps.length - 1 && <span className="text-line">&rarr;</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function CheckoutModal({ open, onClose }) {
  const { items, total, clearCart, setCartOpen } = useCart();
  const [step, setStep] = useState("metodo");
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    transporte: "",
    cp: "",
    provincia: "",
    localidad: "",
    direccion: "",
  });

  if (!open) return null;

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const formComplete = Object.values(form).every((v) => v.trim() !== "");

  const finish = () => {
    onClose();
    setCartOpen(false);
    clearCart();
    setStep("metodo");
    setForm({
      nombre: "",
      dni: "",
      telefono: "",
      transporte: "",
      cp: "",
      provincia: "",
      localidad: "",
      direccion: "",
    });
  };

  const handlePickup = () => {
    const msg = buildMessage({ items, total, method: "retiro", form });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    finish();
  };

  const handleShippingSubmit = () => {
    const msg = buildMessage({ items, total, method: "envio", form });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    finish();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-ink/80">
      <div className="w-full md:max-w-lg max-h-[90vh] overflow-y-auto bg-paper">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink">
          <button
            onClick={() => (step === "form" ? setStep("metodo") : onClose())}
            className="flex items-center gap-2 text-xs uppercase text-stone font-mono"
          >
            <ArrowLeft size={14} /> {step === "form" ? "Volver" : "Cerrar"}
          </button>
          <button onClick={onClose} aria-label="Cerrar" className="text-ink">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          <Stepper step={step === "metodo" ? "Metodo de entrega" : "Datos"} />

          {step === "metodo" && (
            <>
              <h2 className="text-3xl mb-6 text-ink font-display">Como queres recibirlo?</h2>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setStep("form")}
                  className="flex items-center gap-4 p-5 border border-ink text-left transition-transform hover:-translate-y-0.5"
                >
                  <Truck size={26} className="text-ink" />
                  <div>
                    <p className="text-sm uppercase mb-1 text-ink font-heading">Envio a domicilio</p>
                    <p className="text-xs text-stone font-body">
                      Completas tus datos y coordinamos el envio por WhatsApp.
                    </p>
                  </div>
                </button>
                <button
                  onClick={handlePickup}
                  className="flex items-center gap-4 p-5 border border-ink text-left transition-transform hover:-translate-y-0.5"
                >
                  <Store size={26} className="text-ink" />
                  <div>
                    <p className="text-sm uppercase mb-1 text-ink font-heading">Retiro en sucursal</p>
                    <p className="text-xs text-stone font-body">
                      {STORE_ADDRESS}. Vas directo a WhatsApp a coordinar el retiro.
                    </p>
                  </div>
                </button>
              </div>
            </>
          )}

          {step === "form" && (
            <>
              <h2 className="text-3xl mb-1 text-ink font-display">Datos para el envio</h2>
              <p className="text-sm mb-6 text-stone font-body">
                Completa todos los campos para continuar a WhatsApp.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Field label="Nombre y apellido" value={form.nombre} onChange={(v) => setField("nombre", v)} full />
                <Field label="DNI" value={form.dni} onChange={(v) => setField("dni", v)} />
                <Field label="Telefono" value={form.telefono} onChange={(v) => setField("telefono", v)} />
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase tracking-wide text-stone font-mono">
                    Transporte
                  </label>
                  <select
                    value={form.transporte}
                    onChange={(e) => setField("transporte", e.target.value)}
                    className="px-3 py-2 border border-ink text-sm bg-transparent text-ink font-body"
                  >
                    <option value="">Elegi una opcion</option>
                    {TRANSPORTES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <Field label="CP" value={form.cp} onChange={(v) => setField("cp", v)} />
                <Field label="Provincia" value={form.provincia} onChange={(v) => setField("provincia", v)} />
                <Field label="Localidad" value={form.localidad} onChange={(v) => setField("localidad", v)} />
                <Field
                  label="Direccion (domicilio o sucursal, aclarar cual)"
                  value={form.direccion}
                  onChange={(v) => setField("direccion", v)}
                  full
                />
              </div>
              <button
                disabled={!formComplete}
                onClick={handleShippingSubmit}
                className="w-full py-3 text-sm uppercase tracking-wide flex items-center justify-center gap-2 font-heading"
                style={{
                  background: formComplete ? "#25D366" : "#DCDAD3",
                  color: formComplete ? "#0D0D0D" : "#8A877E",
                  cursor: formComplete ? "pointer" : "not-allowed",
                }}
              >
                <MessageCircle size={16} /> Enviar pedido por WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
