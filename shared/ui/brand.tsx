import { PlaneTakeoff } from "lucide-react";

export function Brand() {
  return (
    <span className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-slate-950">
      <span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-white">
        <PlaneTakeoff aria-hidden="true" className="size-[18px]" />
      </span>
      JetOrganizer
    </span>
  );
}
