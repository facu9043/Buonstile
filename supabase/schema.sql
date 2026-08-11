-- ============================================================
-- Buonstile Indumentaria - esquema del panel de administracion
-- ============================================================
-- Como usarlo: en tu proyecto de Supabase, entra a "SQL Editor",
-- pega todo este archivo y ejecutalo una sola vez.
-- ============================================================

-- 1. Tabla de productos
create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null,
  price numeric not null,
  image_url text,
  pattern text,
  stock jsonb not null default '{"S":0,"M":0,"L":0,"XL":0}',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

-- Los visitantes del sitio solo ven productos activos
create policy "public puede leer productos activos"
  on products for select
  to anon
  using (active = true);

-- El admin logueado puede leer y editar todo
create policy "admin logueado puede leer todo"
  on products for select
  to authenticated
  using (true);

create policy "admin logueado puede insertar"
  on products for insert
  to authenticated
  with check (true);

create policy "admin logueado puede actualizar"
  on products for update
  to authenticated
  using (true)
  with check (true);

create policy "admin logueado puede borrar"
  on products for delete
  to authenticated
  using (true);

-- 2. Bucket de imagenes de productos
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "cualquiera puede ver las fotos de productos"
  on storage.objects for select
  to public
  using (bucket_id = 'product-images');

create policy "admin logueado puede subir fotos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "admin logueado puede reemplazar fotos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "admin logueado puede borrar fotos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- 3. Carga de los 12 productos actuales (mismos datos que tenia
--    src/data/products.js) para no perder la carga ya hecha.
insert into products (name, category, price, image_url, pattern, stock, active) values
  ('Remera Oversize Tag',        'Remeras',    32000, null, 'stripes', '{"S":4,"M":6,"L":2,"XL":0}',   true),
  ('Remera Boxy Stencil',        'Remeras',    34500, null, 'cross',   '{"S":0,"M":0,"L":0,"XL":0}',   true),
  ('Remera Manga Larga Street',  'Remeras',    38900, null, 'dots',    '{"S":3,"M":5,"L":4,"XL":2}',   true),
  ('Buzo Canguro Calle',         'Buzos',      54600, null, 'dots',    '{"S":1,"M":2,"L":0,"XL":3}',   true),
  ('Buzo Zip Corderoy',          'Buzos',      61200, null, 'grid',    '{"S":5,"M":4,"L":3,"XL":2}',   true),
  ('Hoodie Legacy Negro',        'Buzos',      58000, null, 'stripes', '{"S":0,"M":1,"L":2,"XL":0}',   true),
  ('Pantalon Cargo Baggy',       'Pantalones', 61800, null, 'grid',    '{"S":3,"M":6,"L":5,"XL":1}',   true),
  ('Jean Baggy Shadow',          'Pantalones', 51800, null, 'cross',   '{"S":2,"M":0,"L":4,"XL":0}',   true),
  ('Jogger Retro Sport',         'Pantalones', 47500, null, 'stripes', '{"S":4,"M":3,"L":2,"XL":5}',   true),
  ('Gorra Bordada Buonstile',    'Accesorios', 18500, null, 'dots',    '{"S":8,"M":8,"L":8,"XL":8}',   true),
  ('Riñonera Urban',             'Accesorios', 22000, null, 'cross',   '{"S":0,"M":0,"L":0,"XL":0}',   true),
  ('Medias Pack x3',             'Accesorios',  9800, null, 'grid',    '{"S":10,"M":10,"L":10,"XL":10}', true);
