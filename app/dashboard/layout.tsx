import { auth } from "@clerk/nextjs/server";
import { Spinner } from "@heroui/react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { hasClerkCredentials } from "@/features/auth/models/clerk-config";
import { DashboardShell } from "@/features/dashboard/views/dashboard-shell";

export const metadata: Metadata = { title: "Dashboard | JetOrganizer" };

async function AuthenticatedDashboard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/auth");
  }

  return <DashboardShell>{children}</DashboardShell>;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  if (!hasClerkCredentials()) {
    if (process.env.NODE_ENV === "development") {
      return <DashboardShell>{children}</DashboardShell>;
    }

    redirect("/auth");
  }

  return (
    <Suspense
      fallback={
        <main className="grid min-h-dvh place-items-center" aria-label="Loading dashboard">
          <Spinner aria-label="Loading dashboard" />
        </main>
      }
    >
      <AuthenticatedDashboard>{children}</AuthenticatedDashboard>
    </Suspense>
  );
}
