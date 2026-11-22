"use client";

import { Button, Card, Kbd, Separator, TextArea } from "@heroui/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Mic, Plus, Slash } from "lucide-react";
import { useMeetingsDate } from "@/features/dashboard/view-models/use-meetings-date";

function AssistantComposer() {
  return (
    <Card className="mt-5 gap-0 rounded-2xl border border-border p-2.5 shadow-none sm:mt-6 sm:p-3">
      <Card.Content>
        <TextArea
          aria-label="Escribe al asistente"
          aria-describedby="assistant-draft-hint"
          fullWidth
          rows={3}
          variant="secondary"
          placeholder="¿Qué quieres hacer hoy?"
          className="min-h-24 resize-none border-0 bg-transparent px-2.5 text-base shadow-none sm:min-h-28"
        />
      </Card.Content>
      <Card.Footer className="flex items-center justify-between gap-2 pt-1.5">
        <Button isIconOnly isDisabled size="sm" variant="ghost" aria-label="Adjuntar archivo">
          <Plus aria-hidden="true" />
        </Button>
        <p id="assistant-draft-hint" className="hidden items-center gap-2 text-xs text-muted sm:flex">
          <Kbd>
            <Kbd.Abbr keyValue="shift" />
            <Kbd.Content>Enter</Kbd.Content>
          </Kbd>
          para escribir en varias líneas
        </p>
        <div className="flex items-center gap-0.5">
          <Button isIconOnly isDisabled size="sm" variant="ghost" aria-label="Abrir comandos">
            <Slash aria-hidden="true" />
          </Button>
          <Button isIconOnly isDisabled size="sm" variant="ghost" aria-label="Dictar mensaje">
            <Mic aria-hidden="true" />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

function Meetings() {
  const { label, changeDay } = useMeetingsDate();

  return (
    <section aria-labelledby="meetings-heading">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h2 id="meetings-heading" className="text-lg font-semibold tracking-tight text-foreground">
          Reuniones
        </h2>
        <div className="flex flex-wrap items-center gap-1">
          <span className="mr-1 text-sm text-muted first-letter:uppercase" aria-live="polite">{label}</span>
          <Button isIconOnly size="sm" variant="ghost" aria-label="Día anterior" onPress={() => changeDay(-1)}>
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button isIconOnly size="sm" variant="ghost" aria-label="Día siguiente" onPress={() => changeDay(1)}>
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div className="grid min-h-44 place-content-center justify-items-center gap-2 px-2 py-6 text-center sm:min-h-48">
        <h3 className="font-semibold text-foreground">No hay reuniones</h3>
        <p className="text-sm text-muted">Conecta tu agenda para ver las reuniones de cada día.</p>
        <Button isDisabled size="sm" variant="outline" className="mt-2 rounded-lg">
          Conectar agenda
        </Button>
      </div>
    </section>
  );
}

function Tasks() {
  return (
    <section aria-labelledby="tasks-heading">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h2 id="tasks-heading" className="flex items-baseline gap-2 text-lg font-semibold tracking-tight text-foreground">
          Mis tareas <span className="text-sm font-medium text-muted">0</span>
        </h2>
        <div className="flex items-center gap-1">
          <Button isDisabled size="sm" variant="ghost">
            Ver todas <ArrowUpRight aria-hidden="true" />
          </Button>
          <Button isIconOnly isDisabled size="sm" variant="ghost" aria-label="Nueva tarea">
            <Plus aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div className="grid min-h-36 place-content-center justify-items-center gap-2 px-2 py-6 text-center sm:min-h-40">
        <h3 className="font-semibold text-foreground">No tienes tareas</h3>
        <p className="text-sm text-muted">Las tareas asignadas aparecerán aquí, ordenadas por vencimiento.</p>
      </div>
    </section>
  );
}

export function DashboardView() {
  return (
    <div lang="es" className="mx-auto w-full max-w-5xl">
      <section aria-labelledby="assistant-heading">
        <h1 id="assistant-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
          Hola. ¿En qué te ayudo?
        </h1>
        <AssistantComposer />
      </section>

      <div className="mt-7 sm:mt-9">
        <Meetings />
        <Separator className="mb-5" />
        <Tasks />
      </div>
    </div>
  );
}
