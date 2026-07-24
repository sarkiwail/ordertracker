"use client";

import { cn, formatCurrency, timeAgo } from "@/lib/utils";
import { StatusBadge, PlatformBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type Order } from "@/types";
import { Clock, MessageCircle, Instagram, Globe } from "lucide-react";

const platformIcons = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  website: Globe,
};

interface OrderCardProps {
  order: Order;
  onSelect?: (order: Order) => void;
}

export function OrderCard({ order, onSelect }: OrderCardProps) {
  const PlatformIcon = platformIcons[order.platform];

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all duration-200",
        "hover:shadow-md hover:border-border",
        "active:scale-[0.99]"
      )}
      onClick={() => onSelect?.(order)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center flex-shrink-0">
            <PlatformIcon className="w-3.5 h-3.5 text-text-tertiary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              {order.customer.name}
            </p>
            <p className="text-xs text-text-muted">{order.orderNumber}</p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Items preview */}
      <div className="space-y-1 mb-3">
        {order.items.slice(0, 2).map((item) => (
          <p key={item.id} className="text-xs text-text-secondary leading-relaxed">
            <span className="text-text-muted">{item.quantity}x</span> {item.name}
          </p>
        ))}
        {order.items.length > 2 && (
          <p className="text-xs text-text-muted">+{order.items.length - 2} more items</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock className="w-3 h-3" />
          <span>{timeAgo(order.createdAt)}</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-sm",
              order.paid
                ? "bg-status-ready-bg text-status-ready"
                : "bg-status-processing-bg text-status-processing"
            )}
          >
            {order.paid ? "Paid" : "Unpaid"}
          </span>
          <span className="text-text-primary">{formatCurrency(order.total)}</span>
        </div>
      </div>
    </Card>
  );
}