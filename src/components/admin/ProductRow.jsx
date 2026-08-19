import React, { useRef, useState } from "react";
import { Check, ToggleLeft, ToggleRight, UploadCloud, Loader2, X } from "lucide-react";
import ProductImage from "../ProductImage";
import { SIZES, CATEGORIES, sizeLabel } from "../../data/products";
import { toggleActive, updateProduct, addProductImage, removeProductImage } from "../../data/productsApi";

const MAX_IMAGES = 6;

export default function ProductRow({ product, onUpdated }) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState({ ...product.stock });
  const [images, setImages] = useState(product.images || []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removingUrl, setRemovingUrl] = useState(null);
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
    if (!file || !file.type.startsWith("image/") || images.length >= MAX_IMAGES) return;
    setUploading(true);
    try {
      const updatedImages = await addProductImage(product.id, file, images);
      setImages(updatedImages);
      onUpdated({ ...product, images: updatedImages, image: updatedImages[0] });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleRemoveImage = async (url) => {
    setRemovingUrl(url);
    try {
      const updatedImages = await removeProductImage(product.id, url, images);
      setImages(updatedImages);
      onUpdated({ ...product, images: updatedImages, image: updatedImages[0] ?? null });
    } finally {
      setRemovingUrl(null);
    }
  };

  return (
    <tr className="border-b border-line align-middle">
      <td className="p-3">
        <div className="flex flex-wrap gap-1.5 max-w-[9rem]">
          {images.map((url) => (
            <div key={url} className="relative w-12 h-12 border border-ink bg-paper overflow-hidden shrink-0 group">
              <img src={url} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveImage(url)}
                disabled={removingUrl === url}
                aria-label="Quitar foto"
                className="absolute inset-0 flex items-center justify-center bg-ink/0 hover:bg-ink/60 transition-colors"
              >
                {removingUrl === url ? (
                  <Loader2 size={13} className="text-paper animate-spin" />
                ) : (
                  <X size={13} className="text-paper opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
          ))}

          {images.length === 0 && (
            <div className="relative w-12 h-12 border border-ink bg-paper overflow-hidden shrink-0">
              <ProductImage image={null} pattern={product.pattern} alt={product.name} />
            </div>
          )}

          {images.length < MAX_IMAGES && (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className="relative w-12 h-12 flex items-center justify-center border border-dashed border-ink bg-paper shrink-0 cursor-pointer"
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
              {uploading ? (
                <Loader2 size={14} className="text-ink animate-spin" />
              ) : (
                <UploadCloud size={14} className="text-ink" />
              )}
            </div>
          )}
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
              <span className="text-[9px] uppercase text-stone font-mono whitespace-nowrap">
                {sizeLabel(category, s)}
              </span>
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
