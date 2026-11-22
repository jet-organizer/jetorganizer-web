import { CardContent, CardRoot } from "@heroui/react";

export function DashboardSectionView({ title }: { title: string }) {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <CardRoot className="mt-6 border border-dashed border-slate-300 bg-white shadow-none">
        <CardContent className="min-h-28 justify-center px-4 py-6">
          <p className="text-sm text-slate-600">This section is awaiting migration from Bubble.</p>
        </CardContent>
      </CardRoot>
    </>
  );
}
