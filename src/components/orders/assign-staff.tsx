"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockStaff, getAvailableStaff, updateStaffActiveOrders } from "@/data/mock-staff";
import type { Staff, Order } from "@/types";
import { ROLE_LABELS, ROLE_COLORS, STAFF_STATUS_COLORS, STAFF_STATUS_LABELS } from "@/types";
import { cn } from "@/lib/utils";
import { UserCheck, ChefHat, X, CheckCircle2, Clock } from "lucide-react";

interface AssignStaffProps {
  order: Order;
  onAssign: (orderId: string, staff: Staff) => void;
  onClose: () => void;
}

export function AssignStaff({ order, onAssign, onClose }: AssignStaffProps) {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(
    order.assignedStaff?.id || null
  );
  const [filter, setFilter] = useState<string>("all");

  const availableStaff = mockStaff.filter((s) => s.role !== "admin");

  const filteredStaff =
    filter === "all"
      ? availableStaff
      : availableStaff.filter((s) => s.role === filter);

  const handleAssign = () => {
    if (!selectedStaff) return;
    const staff = mockStaff.find((s) => s.id === selectedStaff);
    if (staff) {
      // If reassigning, decrement old staff's count
      if (order.assignedStaff) {
        updateStaffActiveOrders(order.assignedStaff.id, -1);
      }
      updateStaffActiveOrders(staff.id, 1);
      onAssign(order.id, staff);
      onClose();
    }
  };

  const handleUnassign = () => {
    if (order.assignedStaff) {
      updateStaffActiveOrders(order.assignedStaff.id, -1);
      onAssign(order.id, null as any);
    }
    setSelectedStaff(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[80vh] overflow-hidden animate-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-accent-light">
              <UserCheck className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Assign Staff</h3>
              <p className="text-xs text-text-muted">
                {order.orderNumber} &mdash; {order.customer.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Currently assigned */}
        {order.assignedStaff && (
          <div className="px-5 py-3 bg-accent-light/50 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-status-ready" />
                <span className="text-xs text-text-secondary">
                  Currently assigned to{" "}
                  <span className="font-medium text-text-primary">
                    {order.assignedStaff.name}
                  </span>
                </span>
              </div>
              <button
                onClick={handleUnassign}
                className="text-xs text-status-cancelled hover:underline"
              >
                Unassign
              </button>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex items-center gap-1 px-5 py-3 border-b border-border/50 overflow-x-auto">
          {[
            { value: "all", label: "All" },
            { value: "kitchen", label: "Kitchen" },
            { value: "cashier", label: "Cashier" },
            { value: "staff", label: "Staff" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-md transition-colors",
                filter === tab.value
                  ? "bg-accent text-accent-foreground"
                  : "text-text-secondary hover:bg-surface-hover"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Staff list */}
        <div className="overflow-y-auto max-h-[50vh] p-2">
          {filteredStaff.map((staff) => (
            <button
              key={staff.id}
              onClick={() => setSelectedStaff(staff.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                selectedStaff === staff.id
                  ? "bg-accent-light ring-1 ring-accent"
                  : "hover:bg-surface-hover"
              )}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-surface-secondary flex items-center justify-center">
                  <span className="text-xs font-semibold text-text-secondary">
                    {staff.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-surface",
                    STAFF_STATUS_COLORS[staff.status]
                  )}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-text-primary">{staff.name}</p>
                  <span
                    className={cn(
                      "text-[10px] font-medium px-1.5 py-0.5 rounded-sm",
                      ROLE_COLORS[staff.role]
                    )}
                  >
                    {ROLE_LABELS[staff.role]}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                  <span className="flex items-center gap-1">
                    <ChefHat className="w-3 h-3" />
                    {staff.activeOrders} active
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {STAFF_STATUS_LABELS[staff.status]}
                  </span>
                </div>
              </div>

              {/* Select indicator */}
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  selectedStaff === staff.id
                    ? "border-accent bg-accent"
                    : "border-border"
                )}
              >
                {selectedStaff === staff.id && (
                  <CheckCircle2 className="w-3 h-3 text-accent-foreground" />
                )}
              </div>
            </button>
          ))}

          {filteredStaff.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-text-muted">No staff available</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border/50">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleAssign} disabled={!selectedStaff}>
            {order.assignedStaff ? "Reassign" : "Assign"}
          </Button>
        </div>
      </Card>
    </div>
  );
}