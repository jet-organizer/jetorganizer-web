<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Contexto de JetOrganizer

- JetOrganizer es una aplicación web para gestionar aviones privados, dirigida principalmente al mercado de Estados Unidos.
- La versión actual está operativa en Bubble.io y sus datos residen en la base de datos de Bubble.
- El proyecto consiste en migrar la aplicación de Bubble a Next.js y crear una base de datos para la nueva versión. Supabase es una opción por evaluar.
- El plan contempla usar Clerk para la autenticación de usuarios.
- La dirección del producto es convertir JetOrganizer en una aplicación agéntica. La pantalla de Inicio será el punto de entrada al asistente para gestionar las operaciones.

## Regla de interfaz

- Usa siempre componentes de HeroUI v3 (`@heroui/react`) para la interfaz. Consulta su documentación v3 antes de implementarlos.
