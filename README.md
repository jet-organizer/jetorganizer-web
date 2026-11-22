This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Acceso al dashboard

`/` dirige a `/auth`. Para habilitar el inicio de sesión con Clerk, configura `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY` en `.env.local`. El flujo de acceso dirige a `/dashboard` tras iniciar sesión.

En desarrollo, si faltan las claves, `/auth` muestra un enlace para previsualizar el dashboard vacío. En producción, el dashboard requiere una sesión de Clerk. La demo de HeroUI está disponible en `/demo`.

## Base de datos de Supabase

Configura `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY` en `.env.local` siguiendo [`.env.example`](.env.example). El cliente de servidor en `shared/supabase/server.ts` usa la sesión de Clerk para las consultas de cada usuario. Para habilitarlas, configura la integración de Clerk como proveedor externo en el proyecto de Supabase. [Guía de integración de Clerk](https://supabase.com/docs/guides/auth/third-party/clerk)

Con la CLI autenticada, usa `supabase link --project-ref <ref>` para enlazar el proyecto y `supabase migration new <nombre>` para crear cada migración en `supabase/migrations/`. Versiona las migraciones con el código. Habilita RLS en las tablas expuestas y concede acceso explícitamente a los roles que lo necesiten. [Guía de migraciones](https://supabase.com/docs/guides/local-development/database-migrations)

## Arquitectura MVVM

`app/` contiene las rutas y archivos especiales de Next.js. Cada ruta compone la vista de su funcionalidad y puede cargar sus datos iniciales en el servidor. El código de cada funcionalidad vive en `features/`.

```text
app/
  page.tsx                          # Redirección a /auth
  layout.tsx                        # Layout raíz
features/
  home/
    views/
      home-view.tsx                 # Pantalla de la demo
      hero-ui-demo.tsx              # Componente interactivo de HeroUI
```

Dentro de cada funcionalidad se crean las capas que necesite:

| Carpeta | Responsabilidad |
| --- | --- |
| `views/` | Renderiza la interfaz y conecta los eventos de los componentes con el ViewModel. |
| `view-models/` | Prepara los datos para la vista y reúne el estado y las acciones de pantalla. Cuando requiere estado interactivo, se implementa como un hook de React, por ejemplo `use-aircraft-list-view-model.ts`. |
| `models/` | Define las entidades, reglas de negocio y operaciones de datos de la funcionalidad. Los módulos que requieren credenciales o acceso privado a datos se ejecutan en el servidor. |

Por ejemplo, al migrar el listado de aviones, su ruta puede cargar los datos iniciales en el servidor. La vista los recibe por props y el ViewModel gestiona los filtros y sus resultados. Las reglas de negocio de los aviones viven en `features/aircraft/models/`.

En `home`, la demo usa el estado de apertura que ya ofrece el diálogo de HeroUI, por lo que solo necesita `views/`.

## Git Flow

`main` contiene las versiones de producción y `develop` integra los cambios para la próxima versión.

Al clonar el repositorio, con el comando `git flow` instalado, ejecuta `git flow init` y elige `main` para producción, `develop` para integración y los prefijos indicados abajo. Repite la inicialización en cada clon porque la configuración se guarda en `.git/config`.

| Rama | Parte de | Uso |
| --- | --- | --- |
| `feature/` | `develop` | Desarrollar cambios que se integran en `develop`. |
| `release/` | `develop` | Preparar una versión para `main` e incorporar los ajustes en `develop`. |
| `hotfix/` | `main` | Corregir producción e incorporar la corrección en `develop`. |
| `support/` | `main` o un tag de versión | Mantener una versión anterior. |

Para empezar una funcionalidad, usa `git flow feature start <nombre>`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
