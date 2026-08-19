-- ============================================================
-- Migracion: varias fotos por producto (ej: frente/dorso)
-- ============================================================
-- Correr una sola vez en el SQL Editor de Supabase. Es segura de
-- correr sobre la base ya en uso: no borra nada, solo agrega la
-- columna "images" y migra la foto que ya tenia cada producto
-- (columna "image_url") como la primera foto de su galeria.
-- ============================================================

alter table products add column if not exists images jsonb not null default '[]';

update products
set images = jsonb_build_array(image_url)
where image_url is not null and images = '[]'::jsonb;
