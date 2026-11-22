"use client";

import { Input, Modal } from "@heroui/react";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dashboardLinks } from "@/features/dashboard/navigation";

const searchLabelClass = "shrink-0 md:group-data-[collapsed=true]/sidebar:opacity-0 motion-safe:md:transition-opacity motion-safe:md:duration-150";

export function DashboardSearch({ onNavigate }: { onNavigate: () => void }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchTerm = query.trim().toLowerCase();
  const results = dashboardLinks.filter(({ label, title }) =>
    (title ?? label).toLowerCase().includes(searchTerm),
  );

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function changeOpen(open: boolean) {
    setIsOpen(open);
    if (!open) setQuery("");
  }

  function finishNavigation() {
    changeOpen(false);
    onNavigate();
  }

  return (
    <>
      <button
        type="button"
        aria-label="Search dashboard"
        aria-keyshortcuts="Meta+K Control+K"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        title="Search dashboard"
        onClick={() => changeOpen(true)}
        className="flex min-h-9 w-full cursor-pointer items-center gap-2.5 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 px-2.5 text-[15px] font-medium text-neutral-700 hover:bg-neutral-200/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neutral-600 md:px-3"
      >
        <Search aria-hidden="true" className="size-[17px] shrink-0" strokeWidth={1.75} />
        <span className={searchLabelClass}>Search</span>
        <kbd aria-hidden="true" className={`${searchLabelClass} ml-auto rounded-md border border-neutral-200 bg-[#FAFAFA] px-1.5 py-0.5 text-xs leading-none`}>
          ⌘ K
        </kbd>
      </button>

      <Modal.Backdrop isOpen={isOpen} onOpenChange={changeOpen}>
        <Modal.Container placement="top">
          <Modal.Dialog className="w-full border border-neutral-200 sm:max-w-md">
            <Modal.CloseTrigger aria-label="Close search" />
            <Modal.Header>
              <Modal.Heading>Search dashboard</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const firstResult = results[0];
                  if (!firstResult) return;
                  finishNavigation();
                  router.push(firstResult.href);
                }}
              >
                <Input
                  autoFocus
                  aria-label="Search dashboard sections"
                  placeholder="Search sections…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full"
                />
              </form>
              {results.length === 0 ? (
                <p className="px-2 py-3 text-sm text-neutral-600" role="status">No sections found.</p>
              ) : (
                <ul className="max-h-[min(55dvh,20rem)] space-y-0.5 overflow-y-auto" aria-label="Search results">
                  {results.map(({ href, icon: Icon, label, title }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onNavigate={finishNavigation}
                        className="flex min-h-10 items-center gap-2.5 rounded-lg px-2 text-sm text-neutral-900 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neutral-600"
                      >
                        {Icon && <Icon aria-hidden="true" className="size-4 shrink-0 text-neutral-600" />}
                        {title ?? label}
                        <ArrowUpRight aria-hidden="true" className="ml-auto size-3.5 shrink-0 text-neutral-500" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}
