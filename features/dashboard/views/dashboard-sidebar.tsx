"use client";

import { Button } from "@heroui/react";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { dashboardNavigation } from "@/features/dashboard/navigation";
import { Brand } from "@/shared/ui/brand";

const menuItemClass =
  "flex min-h-10 items-center gap-2.5 rounded-lg px-2.5 text-[15px] leading-5 font-medium text-neutral-900 transition-colors hover:bg-neutral-200/45 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neutral-600 aria-[current=page]:bg-[#EDEDED] md:min-h-8";

const menuIconClass = "size-[17px] shrink-0 text-neutral-600";

function SidebarSubmenu({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(true);
  const [contentHeight, setContentHeight] = useState<number>();
  const itemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const items = itemsRef.current;
    if (!items) return;

    const observer = new ResizeObserver(() => {
      const height = items.offsetHeight;
      if (height > 0) {
        setContentHeight(height);
      }
    });
    observer.observe(items);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`${menuItemClass} group w-full cursor-pointer text-left`}
        onClick={() => setIsOpen((open) => !open)}
      >
        {icon}
        {label}
        <ChevronRight
          aria-hidden="true"
          className="ml-auto size-3.5 shrink-0 text-neutral-500 group-aria-expanded:rotate-90 motion-safe:transition-transform motion-safe:duration-[220ms] motion-safe:ease-in-out"
          strokeWidth={1.75}
        />
      </button>

      <div
        id={panelId}
        inert={!isOpen}
        style={{ height: isOpen ? (contentHeight ?? "auto") : 0, overflow: "hidden" }}
        className="motion-safe:transition-[height] motion-safe:duration-[220ms] motion-safe:ease-in-out"
      >
        <ul
          ref={itemsRef}
          className={`ml-6 space-y-0.5 border-l border-neutral-200 pl-3 motion-safe:transition-transform motion-safe:duration-[220ms] motion-safe:ease-in-out ${isOpen ? "translate-y-0" : "motion-safe:-translate-y-3"}`}
        >
          {children}
        </ul>
      </div>
    </>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="border-b border-neutral-200 bg-[#FAFAFA] px-3 py-3 md:sticky md:top-0 md:h-dvh md:self-start md:overflow-y-auto md:border-r md:border-b-0 md:px-2.5 md:py-6">
      <div className="flex items-center justify-between md:mb-6 md:px-2.5">
        <Brand />
        <Button
          isIconOnly
          variant="ghost"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="dashboard-navigation"
          className="md:hidden"
          onPress={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      <nav
        id="dashboard-navigation"
        aria-label="Dashboard navigation"
        className={`${menuOpen ? "block" : "hidden"} space-y-4 pt-4 md:block md:pt-0`}
      >
        {dashboardNavigation.map(({ label, items }) => (
          <div key={label}>
            <p className="mb-1 px-2.5 text-[11px] font-semibold tracking-wide text-neutral-500 uppercase">
              {label}
            </p>
            <ul className="space-y-0.5">
              {items.map(({ icon: Icon, ...item }) => (
                <li key={item.label}>
                  {"children" in item ? (
                    <SidebarSubmenu
                      label={item.label}
                      icon={Icon && <Icon aria-hidden="true" className={menuIconClass} strokeWidth={1.75} />}
                    >
                      {item.children.map(({ href, label }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            aria-current={pathname === href ? "page" : undefined}
                            className={menuItemClass}
                            onNavigate={() => setMenuOpen(false)}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </SidebarSubmenu>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={menuItemClass}
                      onNavigate={() => setMenuOpen(false)}
                    >
                      {Icon && <Icon aria-hidden="true" className={menuIconClass} strokeWidth={1.75} />}
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
