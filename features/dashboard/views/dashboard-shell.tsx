"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { Suspense, useState, type ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";

type DashboardShellProps = {
  children: ReactNode;
  accountControl?: ReactNode;
  isPreview?: boolean;
};

export function DashboardShell({ children, accountControl, isPreview }: DashboardShellProps) {
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
        <header className="flex min-h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-8">
          <p className="text-sm font-medium text-slate-600">Dashboard</p>
          {isPreview ? (
            <Link
              href="/auth"
              className="inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-sm font-medium text-blue-800 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <LogIn aria-hidden="true" className="size-4" />
              Back to sign in
            </Link>
          ) : (
            accountControl
          )}
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
