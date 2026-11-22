import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AccountSettings } from "@/features/auth/views/account-settings";
import { dashboardSections, dashboardSettings } from "@/features/dashboard/navigation";
import { DashboardSectionView } from "@/features/dashboard/views/dashboard-section-view";

type SectionPageProps = { params: Promise<{ section: string[] }> };

export function generateStaticParams() {
  return dashboardSections.map(({ href }) => ({ section: href.split("/").slice(2) }));
}

async function SectionContent({ params }: SectionPageProps) {
  const { section } = await params;
  const href = `/dashboard/${section.join("/")}`;
  const item = dashboardSections.find((entry) => entry.href === href);

  if (!item) {
    notFound();
  }

  return (
    <DashboardSectionView title={item.title ?? item.label}>
      {href === dashboardSettings.href ? <AccountSettings /> : undefined}
    </DashboardSectionView>
  );
}

export default function DashboardSectionPage({ params }: SectionPageProps) {
  return (
    <Suspense fallback={null}>
      <SectionContent params={params} />
    </Suspense>
  );
}
