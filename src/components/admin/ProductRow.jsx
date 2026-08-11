import React, { useRef, useState } from "react";
import { Check, ToggleLeft, ToggleRight, UploadCloud, Loader2 } from "lucide-react";
import ProductImage from "../ProductImage";
import { SIZES, CATEGORIES } from "../../data/products";
import { updateProduct, toggleActive, uploadProductImage } from "../../data/productsApi";

export default function ProductRow({ product, onUpdated }) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState({ ...product.stock });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [togglingActive, setTogglingActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      const numericStock = Object.fromEntries(
        SIZES.map((s) => [s, Math.max(0, parseInt(stock[s], 10) || 0)])
      );
      const trimmedName = name.trim() || product.name;
      const fields = { name: trimmedName, category, price: Number(price) || 0, stock: numericStock };
      await updateProduct(product.id, fields);
      setName(trimmedName);
      setStock(numericStock);
      onUpdated({ ...product, ...fields });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async () => {
    setTogglingActive(true);
    try {
      const next = !product.active;
      await toggleActive(product.id, next);
      onUpdated({ ...product, active: next });
    } finally {
      setTogglingActive(false);
    }
  };

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(product.id, file);
      onUpdated({ ...product, image: url });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <tr className="border-b border-line align-middle">
      <td className="p-3">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className="relative w-16 h-16 border border-ink bg-paper overflow-hidden shrink-0 cursor-pointer"
          style={{ outline: dragOver ? "2px dashed #0D0D0D" : "none" }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <ProductImage image={product.image} pattern={product.pattern} alt={product.name} />
          <div className="absolute inset-0 flex items-center justify-center bg-ink/0 hover:bg-ink/60 transition-colors group">
            {uploading ? (
              <Loader2 size={16} className="text-paper animate-spin" />
            ) : (
              <UploadCloud size={14} className="text-paper opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        </div>
      </td>

      <td className="p-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-40 border border-ink bg-paper px-2 py-1 text-sm text-ink font-body focus:outline-none"
        />
      </td>
      <td className="p-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-ink bg-paper px-2 py-1 text-xs text-ink font-mono focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </td>

      <td className="p-3">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-24 border border-ink bg-paper px-2 py-1 text-sm text-ink font-mono focus:outline-none"
        />
      </td>

      <td className="p-3">
        <div className="flex gap-1.5">
          {SIZES.map((s) => (
            <label key={s} className="flex flex-col items-center gap-0.5">
              <span className="text-[9px] uppercase text-stone font-mono">{s}</span>
              <input
                type="number"
                min="0"
                value={stock[s]}
                onChange={(e) => setStock((prev) => ({ ...prev, [s]: e.target.value }))}
                className="w-12 border border-ink bg-paper px-1 py-1 text-xs text-ink font-mono focus:outline-none"
              />
            </label>
          ))}
        </div>
      </td>

      <td className="p-3">
        <button
          onClick={handleToggleActive}
          disabled={togglingActive}
          className="flex items-center gap-1.5 text-xs font-mono"
          style={{ color: product.active ? "#0D0D0D" : "#8A877E" }}
        >
          {product.active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
          {product.active ? "Activo" : "Inactivo"}
        </button>
      </td>

      <td className="p-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-3 py-2 text-xs uppercase tracking-wide bg-ink text-paper font-heading flex items-center gap-1.5 disabled:opacity-50"
        >
          {saving ? <Loader2 size={13} className="animate-spin" /> : saved ? <Check size={13} /> : null}
          {saving ? "Guardando" : saved ? "Guardado" : "Guardar"}
        </button>
      </td>
    </tr>
  );
}
