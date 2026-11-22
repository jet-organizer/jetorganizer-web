import { PlaneTakeoff } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-semibold tracking-tight ${compact ? "text-[15px] text-neutral-800" : "text-lg text-slate-950"}`}>
      <span className={`grid shrink-0 place-items-center bg-slate-950 text-white ${compact ? "size-7 rounded-lg" : "size-9 rounded-xl"}`}>
        <PlaneTakeoff aria-hidden="true" className={compact ? "size-4" : "size-[18px]"} />
      </span>
      JetOrganizer
    </span>
  );
}
