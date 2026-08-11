# Buonstile Indumentaria

Sitio web de e-commerce para Buonstile Indumentaria: catálogo filtrable,
carrito de compras y checkout que finaliza el pedido por WhatsApp (envío a
domicilio o retiro en sucursal). Los productos (precio, stock, fotos,
activo/inactivo) se administran desde un panel propio en `/admin`.

## Cómo correrlo en tu computadora

Necesitás tener [Node.js](https://nodejs.org/) instalado (versión 18 o superior)
y un proyecto de [Supabase](https://supabase.com) (gratis) ya configurado —
ver la sección "Configurar Supabase" más abajo si todavía no lo hiciste.

```bash
npm install
npm run dev
```

Esto abre el sitio en `http://localhost:5173`.

Para generar la versión final lista para subir a un hosting:

```bash
npm run build
```

Esto genera una carpeta `dist/` con todo el sitio listo para publicar en
Vercel, Netlify, o cualquier hosting de archivos estáticos. El panel de
administración sigue funcionando igual en producción (`/admin`), porque los
datos viven en Supabase, no en el build.

## Configurar Supabase (una sola vez)

1. Creá una cuenta gratis en [supabase.com](https://supabase.com) y un
   proyecto nuevo.
2. Andá a **SQL Editor**, pegá todo el contenido de `supabase/schema.sql`
   de este repo y ejecutalo. Esto crea la tabla de productos, los permisos
   de seguridad, el espacio para las fotos, y carga los 12 productos de
   ejemplo.
3. Andá a **Authentication → Users → Add user** y creá tu propio usuario
   (el email y contraseña con los que vas a entrar a `/admin`).
4. Andá a **Project Settings → API** y copiá el **Project URL** y la
   **anon public key**.
5. Copiá el archivo `.env.example` de este repo a un archivo nuevo llamado
   `.env` (en la raíz del proyecto) y pegá ahí esos dos valores.
6. Reiniciá `npm run dev` si ya lo tenías corriendo.

Si en algún momento desplegás el sitio en Vercel/Netlify, cargá esas mismas
dos variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) en la
configuración de variables de entorno del hosting.

## Cómo administrar tus productos

Entrá a `/admin` (por ejemplo `http://localhost:5173/admin` o
`tusitio.com/admin`) e iniciá sesión con el usuario que creaste en Supabase.
Ahí vas a ver una tabla con todos los productos donde podés:

- Editar precio y stock por talle (S/M/L/XL) y tocar **Guardar**.
- Arrastrar una foto sobre la miniatura del producto para subirla — se
  reemplaza al toque el patrón de relleno por la foto real.
- Activar/desactivar un producto con un click: los productos inactivos
  dejan de verse en el sitio público pero siguen en la tabla del panel.

Para agregar un producto completamente nuevo (no solo editar uno existente)
por ahora se hace con un `insert` en el **SQL Editor** de Supabase, siguiendo
el mismo formato que ves en `supabase/schema.sql`.

## Cómo cambiar datos de contacto

Abrí `src/data/brand.js`: ahí están el número de WhatsApp, los links de
Instagram y Facebook, la dirección de la sucursal y el horario de atención.

## Estructura del proyecto

```
src/
  components/   -> Header, Footer, carrito, checkout, tarjetas de producto
  components/admin/ -> Tabla editable y protección de rutas del panel
  context/      -> Estado global del carrito y de la sesión de admin
  data/         -> Datos de la marca y acceso a los productos (Supabase)
  lib/          -> Cliente de Supabase
  pages/        -> Las páginas públicas (Inicio, Nosotros, Catálogo,
                    Ficha de producto, Contacto) y las de /admin
public/
  logo.png      -> El logo de la marca
supabase/
  schema.sql    -> Script para crear la base de datos en Supabase
```

## Cómo publicarlo (deploy)

La forma más simple es con [Vercel](https://vercel.com) o
[Netlify](https://netlify.com):

1. Subí este proyecto a un repositorio de GitHub.
2. Conectá ese repositorio en Vercel o Netlify.
3. El comando de build es `npm run build` y la carpeta de salida es `dist`.
4. Cargá `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en las variables de
   entorno del hosting (los mismos valores de tu archivo `.env`).

Ambos son gratis para un sitio de este tamaño.
