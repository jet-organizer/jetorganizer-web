"use client";

import { Button } from "@heroui/react";
import { ChevronRight, Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { dashboardNavigation, dashboardSettings } from "@/features/dashboard/navigation";
import { Brand } from "@/shared/ui/brand";
import { DashboardSearch } from "./dashboard-search";
import { SidebarTooltip } from "./sidebar-tooltip";

const menuItemClass =
  "flex min-h-10 items-center gap-2.5 overflow-hidden rounded-lg px-2.5 text-[15px] leading-5 font-medium text-neutral-900 transition-colors hover:bg-neutral-200/45 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neutral-600 aria-[current=page]:bg-[#EDEDED] md:min-h-8 md:px-[13px]";

const menuIconClass = "size-[17px] shrink-0 text-neutral-600";
const sidebarLabelClass = "shrink-0 md:group-data-[collapsed=true]/sidebar:opacity-0 motion-safe:md:transition-opacity motion-safe:md:duration-150";

function SidebarSubmenu({
  label,
  icon,
  children,
  sidebarCollapsed,
  onExpandSidebar,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  sidebarCollapsed: boolean;
  onExpandSidebar: () => void;
}) {
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(true);
  const [contentHeight, setContentHeight] = useState<number>();
  const itemsRef = useRef<HTMLUListElement>(null);
  const isExpanded = isOpen && !sidebarCollapsed;

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
      <SidebarTooltip enabled={sidebarCollapsed} label={label}>
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          className={`${menuItemClass} group w-full cursor-pointer text-left`}
          onClick={() => {
            if (sidebarCollapsed) {
              onExpandSidebar();
              setIsOpen(true);
            } else {
              setIsOpen((open) => !open);
            }
          }}
        >
          {icon}
          <span className={sidebarLabelClass}>{label}</span>
          <ChevronRight
            aria-hidden="true"
            className="ml-auto size-3.5 shrink-0 text-neutral-500 group-aria-expanded:rotate-90 md:group-data-[collapsed=true]/sidebar:opacity-0 motion-safe:transition-[rotate,opacity] motion-safe:duration-[220ms] motion-safe:ease-in-out"
            strokeWidth={1.75}
          />
        </button>
      </SidebarTooltip>

      <div
        id={panelId}
        inert={!isExpanded}
        style={{ height: isExpanded ? (contentHeight ?? "auto") : 0, overflow: "hidden" }}
        className="motion-safe:transition-[height] motion-safe:duration-[220ms] motion-safe:ease-in-out"
      >
        <ul
          ref={itemsRef}
          className={`ml-6 space-y-0.5 border-l border-neutral-200 pl-3 motion-safe:transition-transform motion-safe:duration-[220ms] motion-safe:ease-in-out ${isExpanded ? "translate-y-0" : "motion-safe:-translate-y-3"}`}
        >
          {children}
        </ul>
      </div>
    </>
  );
}

export function DashboardSidebar({
  collapsed,
  onCollapsedChange,
}: {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const CollapseIcon = collapsed ? PanelLeftOpen : PanelLeftClose;
  const collapseLabel = collapsed ? "Expand sidebar" : "Collapse sidebar";
  const { href: settingsHref, label: settingsLabel, icon: SettingsIcon } = dashboardSettings;

  return (
    <aside
      data-collapsed={collapsed}
      className={`group/sidebar border-b border-neutral-200 bg-[#FAFAFA] px-3 py-3 md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:self-start md:overflow-hidden md:border-r md:border-b-0 md:px-2.5 md:pt-4 md:pb-2.5 md:whitespace-nowrap motion-safe:md:transition-[width] motion-safe:md:duration-[220ms] motion-safe:md:ease-in-out ${collapsed ? "md:w-16" : "md:w-[275px]"}`}
    >
      <div className="relative flex items-center justify-between md:mb-2.5 md:shrink-0 md:justify-end md:pe-1.5">
        <div className={`${sidebarLabelClass} md:pointer-events-none md:absolute md:left-1.5`}>
          <Brand compact />
        </div>
        <SidebarTooltip enabled={collapsed} label={collapseLabel} nativeTrigger={false}>
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            aria-label={collapseLabel}
            aria-expanded={!collapsed}
            aria-controls="dashboard-navigation"
            className="relative hidden shrink-0 text-neutral-600 md:inline-flex"
            onPress={() => onCollapsedChange(!collapsed)}
          >
            <CollapseIcon aria-hidden="true" className="size-[17px]" strokeWidth={1.75} />
          </Button>
        </SidebarTooltip>
        <Button
          isIconOnly
          variant="ghost"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="dashboard-navigation"
          className="md:hidden"
          onPress={() => {
            if (!menuOpen && collapsed) onCollapsedChange(false);
            setMenuOpen(!menuOpen);
          }}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      <nav
        id="dashboard-navigation"
        aria-label="Dashboard navigation"
        className={`${menuOpen ? "flex" : "hidden"} flex-col pt-4 md:flex md:min-h-0 md:flex-1 md:pt-0`}
      >
        <div className="space-y-4 md:min-h-0 md:flex-1 md:overflow-x-hidden md:overflow-y-auto md:pb-3">
          <DashboardSearch compact={collapsed} onNavigate={() => setMenuOpen(false)} />
          {dashboardNavigation.map(({ label, items }) => (
            <div key={label}>
              <p className="mb-1 h-4 overflow-hidden px-2.5 text-[11px] leading-4 font-semibold tracking-wide text-neutral-500 uppercase md:group-data-[collapsed=true]/sidebar:h-0 md:group-data-[collapsed=true]/sidebar:opacity-0 motion-safe:md:transition-[height,opacity] motion-safe:md:duration-[220ms] motion-safe:md:ease-in-out">
                {label}
              </p>
              <ul className="space-y-0.5">
                {items.map(({ icon: Icon, ...item }) => (
                  <li key={item.label}>
                    {"children" in item ? (
                      <SidebarSubmenu
                        label={item.label}
                        icon={Icon && <Icon aria-hidden="true" className={menuIconClass} strokeWidth={1.75} />}
                        sidebarCollapsed={collapsed}
                        onExpandSidebar={() => onCollapsedChange(false)}
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
                      <SidebarTooltip enabled={collapsed} label={item.label}>
                        <Link
                          href={item.href}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className={menuItemClass}
                          onNavigate={() => setMenuOpen(false)}
                        >
                          {Icon && <Icon aria-hidden="true" className={menuIconClass} strokeWidth={1.75} />}
                          <span className={sidebarLabelClass}>{item.label}</span>
                        </Link>
                      </SidebarTooltip>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="-mx-3 mt-4 shrink-0 border-t border-neutral-200 px-3 pt-2 md:-mx-2.5 md:mt-0 md:px-2.5">
          <SidebarTooltip enabled={collapsed} label={settingsLabel}>
            <Link
              href={settingsHref}
              aria-current={pathname === settingsHref ? "page" : undefined}
              className={menuItemClass}
              onNavigate={() => setMenuOpen(false)}
            >
              <SettingsIcon aria-hidden="true" className={menuIconClass} strokeWidth={1.75} />
              <span className={sidebarLabelClass}>{settingsLabel}</span>
            </Link>
          </SidebarTooltip>
        </div>
      </nav>
    </aside>
  );
}
