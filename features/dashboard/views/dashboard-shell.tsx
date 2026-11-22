"use client";

import { Button, Popover } from "@heroui/react";
import { CircleHelp, House } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useState, type ReactNode } from "react";
import { dashboardLinks } from "@/features/dashboard/navigation";
import { DashboardSidebar } from "./dashboard-sidebar";

function DashboardTopbarTitle() {
  const pathname = usePathname();
  const section = dashboardLinks.find(({ href }) => href === pathname);
  const Icon = section?.icon ?? House;

  return (
    <p className="flex min-w-0 items-center gap-2.5 text-[15px] font-medium text-neutral-900">
      <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
      <span className="truncate">{section?.title ?? section?.label ?? "Dashboard"}</span>
    </p>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-dvh bg-slate-50 font-sans text-slate-950 md:grid md:grid-cols-[auto_minmax(0,1fr)]">
      <Suspense fallback={null}>
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </Suspense>

      <div className="min-w-0 md:col-start-2">
        <header className="flex h-[48px] items-center gap-3 border-b border-slate-200 bg-white px-4">
          <Suspense fallback={null}>
            <DashboardTopbarTitle />
          </Suspense>
          <Popover>
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Help"
              className="ml-auto shrink-0 text-neutral-700"
            >
              <CircleHelp aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
            </Button>
            <Popover.Content placement="bottom end" className="max-w-64">
              <Popover.Dialog>
                <Popover.Heading>Help</Popover.Heading>
                <p className="mt-2 text-sm text-muted">
                  Use Search to find a dashboard section. Press <kbd>⌘ K</kbd> on Mac or{" "}
                  <kbd>Ctrl K</kbd> on Windows.
                </p>
              </Popover.Dialog>
            </Popover.Content>
          </Popover>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
