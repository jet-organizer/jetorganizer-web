"use client";

import { Focusable, Tooltip } from "@heroui/react";
import type { ComponentProps } from "react";

export function SidebarTooltip({
  enabled,
  label,
  children,
  nativeTrigger = true,
}: {
  enabled: boolean;
  label: string;
  children: ComponentProps<typeof Focusable>["children"];
  nativeTrigger?: boolean;
}) {
  return (
    <Tooltip isDisabled={!enabled} delay={250} closeDelay={100}>
      {nativeTrigger ? <Focusable>{children}</Focusable> : children}
      <Tooltip.Content
        placement="right"
        offset={10}
        className="hidden rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground shadow-sm md:block"
      >
        {label}
      </Tooltip.Content>
    </Tooltip>
  );
}
