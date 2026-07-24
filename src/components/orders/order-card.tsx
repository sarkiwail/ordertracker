"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ClientTime } from "@/components/ui/client-time";
import { type Order } from "@/types";
import { Clock, MessageCircle, Instagram, Globe, ChefHat } from "lucide-react";

const platformIcons = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  website: Globe,
};

const platformBgColors = {
  whatsapp: "bg-whatsapp-bg text-whatsapp",
  instagram: "bg-instagram-bg text-instagram",
  website: "bg-website-bg text-website",
};

interface OrderCardProps {
  order: Order;
  onSelect?: (order: Order) => void;
}

export function OrderCard({ order, onSelect }: OrderCardProps) {
  const PlatformIcon = platformIcons[order.platform];

  return (
    <Card hover className="p-4 cursor-pointer card-shadow-active" onClick={() => onSelect?.(order)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
            platformBgColors[order.platform]
          )}>
            <PlatformIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary leading-tight">
              {order.customer.name}
            </p>
            <p className="text-[11px] text-text-muted font-medium">{order.orderNumber}</p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="space-y-1 mb-3">
        {order.items.slice(0, 2).map((item) => (
          <p key={item.id} className="text-xs text-text-secondary leading-relaxed flex items-center gap-1.5">
            <span className="text-text-muted font-medium">{item.quantity}x</span>
            <span>{item.name}</span>
          </p>
        ))}
        {order.items.length > 2 && (
          <p className="text-xs text-text-muted">+{order.items.length - 2} more items</p>
        )}
      </div>

      {order.assignedStaff && (
        <div className="flex items-center gap-1.5 mb-2.5 text-[11px] text-text-muted">
          <ChefHat className="w-3 h-3" />
          <span>Assigned to <span className="font-medium text-text-secondary">{order.assignedStaff.name}</span></span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-border/30">
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock className="w-3 h-3" />
          <ClientTime date={order.createdAt} format="relative" />
        </div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-sm font-medium",
              order.paid
                ? "bg-status-ready-bg text-status-ready"
                : "bg-status-processing-bg text-status-processing"
            )}
          >
            {order.paid ? "Paid" : "Unpaid"}
          </span>
          <span className="text-text-primary font-semibold">{formatCurrency(order.total)}</span>
        </div>
      </div>
    </Card>
  );
}