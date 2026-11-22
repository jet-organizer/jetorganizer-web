import {
  BookOpen,
  CalendarDays,
  ChartColumnIncreasing,
  CreditCard,
  Files,
  Fuel,
  House,
  Plane,
  Send,
  Settings,
  Store,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type DashboardLink = {
  label: string;
  href: string;
  icon?: LucideIcon;
  title?: string;
};

type DashboardGroup = {
  label: string;
  items: (DashboardLink | { label: string; icon: LucideIcon; children: DashboardLink[] })[];
};

export const dashboardNavigation: DashboardGroup[] = [
  {
    label: "General",
    items: [
      { label: "Inicio", href: "/dashboard", icon: House },
      { label: "Scheduling", href: "/dashboard/scheduling", icon: CalendarDays },
    ],
  },
  {
    label: "Accounts",
    items: [
      { label: "Aircraft Owners", href: "/dashboard/accounts/aircraft-owners", icon: Send },
      { label: "Users", href: "/dashboard/accounts/users", icon: Users },
    ],
  },
  {
    label: "Flight Ops",
    items: [
      { label: "Aircrafts", href: "/dashboard/aircraft", icon: Plane },
      {
        label: "Logbooks",
        icon: BookOpen,
        children: [
          { label: "Aircraft", href: "/dashboard/logbooks/aircraft", title: "Aircraft Logbooks" },
          {
            label: "Maintenance",
            href: "/dashboard/logbooks/maintenance",
            title: "Maintenance Logbooks",
          },
        ],
      },
      { label: "Documents", href: "/dashboard/documents", icon: Files },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Finance", href: "/dashboard/finance", icon: ChartColumnIncreasing },
      { label: "Payment Methods", href: "/dashboard/finance/payment-methods", icon: CreditCard },
      { label: "Quick Expense", href: "/dashboard/finance/quick-expense", icon: Wallet },
      { label: "Fuel Management", href: "/dashboard/finance/fuel-management", icon: Fuel },
      { label: "Vendor/Beneficiary", href: "/dashboard/finance/vendors", icon: Store },
    ],
  },
];

export const dashboardSettings = { label: "Settings", href: "/dashboard/settings", icon: Settings };

export const dashboardLinks: DashboardLink[] = [
  ...dashboardNavigation.flatMap(({ items }) =>
    items.flatMap((item) =>
      "children" in item
        ? item.children.map((child) => ({ ...child, icon: child.icon ?? item.icon }))
        : [item],
    ),
  ),
  dashboardSettings,
];

export const dashboardSections = dashboardLinks.filter(({ href }) => href !== "/dashboard");
