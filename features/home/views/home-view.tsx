import { HeroUIDemo } from "./hero-ui-demo";

export function HomeView() {
  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-5 text-sm font-semibold sm:px-10">
          JetOrganizer
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 sm:px-10 sm:pt-24">
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            HeroUI en JetOrganizer
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-muted">
            Prueba los primeros componentes de HeroUI v3 en el proyecto.
          </p>
          <HeroUIDemo />
        </div>
      </main>
    </>
  );
}
