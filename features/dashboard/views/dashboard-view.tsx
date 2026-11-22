import { CardContent, CardDescription, CardHeader, CardRoot } from "@heroui/react";
import { CalendarDays, Plane } from "lucide-react";

export function DashboardView() {
  return (
    <>
      <div className="rounded-2xl bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-8 text-white sm:px-8 sm:py-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Operations overview
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
          See your aircraft and upcoming activity in one place.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section id="fleet" aria-labelledby="fleet-heading" className="scroll-mt-4">
          <CardRoot className="h-full gap-5 rounded-2xl border border-slate-200 p-5 shadow-none sm:p-6">
            <CardHeader className="flex-row items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-800">
                <Plane aria-hidden="true" className="size-[18px]" />
              </div>
              <div>
                <h2 id="fleet-heading" className="font-semibold text-slate-950">Fleet</h2>
                <CardDescription className="text-slate-600">Your aircraft</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex min-h-28 justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-600">No aircraft connected</p>
            </CardContent>
          </CardRoot>
        </section>

        <section id="schedule" aria-labelledby="schedule-heading" className="scroll-mt-4">
          <CardRoot className="h-full gap-5 rounded-2xl border border-slate-200 p-5 shadow-none sm:p-6">
            <CardHeader className="flex-row items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-800">
                <CalendarDays aria-hidden="true" className="size-[18px]" />
              </div>
              <div>
                <h2 id="schedule-heading" className="font-semibold text-slate-950">Schedule</h2>
                <CardDescription className="text-slate-600">Upcoming activity</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex min-h-28 justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-600">No schedule connected</p>
            </CardContent>
          </CardRoot>
        </section>
      </div>
    </>
  );
}
