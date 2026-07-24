import { cn } from "@/lib/utils";
import { type OrderStatus, type Platform, STATUS_LABELS, PLATFORM_LABELS } from "@/types";

interface BadgeProps {
  variant?: "default" | "outline" | "subtle";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", size = "md", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium leading-none",
        size === "sm" ? "text-[11px] px-1.5 py-0.5 rounded-sm" : "text-xs px-2 py-1 rounded-md",
        variant === "default" && "bg-surface-secondary text-text-secondary",
        variant === "outline" && "border border-border text-text-secondary",
        variant === "subtle" && "text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<OrderStatus, string> = {
  new: "bg-status-new-bg text-status-new",
  processing: "bg-status-processing-bg text-status-processing",
  ready: "bg-status-ready-bg text-status-ready",
  delivered: "bg-status-delivered-bg text-status-delivered",
  cancelled: "bg-status-cancelled-bg text-status-cancelled",
  "on-hold": "bg-status-hold-bg text-status-hold",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md",
        statusStyles[status]
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "new" && "bg-status-new",
          status === "processing" && "bg-status-processing",
          status === "ready" && "bg-status-ready",
          status === "delivered" && "bg-status-delivered",
          status === "cancelled" && "bg-status-cancelled",
          status === "on-hold" && "bg-status-hold"
        )}
      />
      {STATUS_LABELS[status]}
    </span>
  );
}

const platformStyles: Record<Platform, string> = {
  whatsapp: "bg-whatsapp-bg text-whatsapp",
  instagram: "bg-instagram-bg text-instagram",
  website: "bg-website-bg text-website",
};

export function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md",
        platformStyles[platform]
      )}
    >
      {PLATFORM_LABELS[platform]}
    </span>
  );
}