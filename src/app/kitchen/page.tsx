"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AssignStaff } from "@/components/orders/assign-staff";
import { mockOrders } from "@/data/mock-orders";
import { mockStaff, getKitchenStaff } from "@/data/mock-staff";
import { formatCurrency, cn } from "@/lib/utils";
import type { Order, Staff } from "@/types";
import { STAFF_STATUS_COLORS, STAFF_STATUS_LABELS } from "@/types";
import {
  Clock,
  ChefHat,
  CheckCircle2,
  XCircle,
  UserPlus,
  UserCheck,
  AlertCircle,
} from "lucide-react";

export default function KitchenPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [assigningOrder, setAssigningOrder] = useState<Order | null>(null);

  const activeOrders = orders.filter(
    (o) => o.status === "new" || o.status === "processing"
  );

  const kitchenStaff = getKitchenStaff();

  const handleAssign = (orderId: string, staff: Staff) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, assignedStaff: staff, assignedTo: staff.name } : o
      )
    );
  };

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date() } : o
      )
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-64">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 animate-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold text-text-primary">Kitchen Display</h1>
              <p className="text-sm text-text-muted mt-0.5">
                {activeOrders.length} orders to prepare
              </p>
            </div>

            {/* Kitchen Staff Status */}
            <div className="flex items-center gap-3">
              {kitchenStaff.map((staff) => (
                <div key={staff.id} className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      STAFF_STATUS_COLORS[staff.status]
                    )}
                  />
                  <span className="text-xs text-text-secondary">{staff.name}</span>
                  <span className="text-[10px] text-text-muted">
                    ({staff.activeOrders})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {activeOrders.map((order) => (
              <Card key={order.id} className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-text-primary">
                        {order.orderNumber}
                      </p>
                      {order.priority === "urgent" && (
                        <AlertCircle className="w-4 h-4 text-status-cancelled" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{order.customer.name}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Timer */}
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {Math.floor(
                      (Date.now() - order.createdAt.getTime()) / 60000
                    )}{" "}
                    min ago
                  </span>
                </div>

                {/* Assigned Staff */}
                <div className="flex items-center justify-between">
                  {order.assignedStaff ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent-light flex items-center justify-center">
                        <span className="text-[9px] font-semibold text-accent">
                          {order.assignedStaff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-text-primary">
                          {order.assignedStaff.name}
                        </p>
                        <p className="text-[10px] text-text-muted">Assigned</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Unassigned</span>
                    </div>
                  )}
                  <button
                    onClick={() => setAssigningOrder(order)}
                    className="text-xs font-medium text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
                  >
                    <UserCheck className="w-3 h-3" />
                    {order.assignedStaff ? "Change" : "Assign"}
                  </button>
                </div>

                {/* Items */}
                <div className="border-t border-border/50 pt-3 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-text-muted w-5">
                          {item.quantity}x
                        </span>
                        <span className="text-xs text-text-primary">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="p-2.5 rounded-lg bg-status-processing-bg/50 border border-status-processing/20">
                    <p className="text-[11px] text-status-processing font-medium">
                      Note: {order.notes}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handleStatusChange(order.id, "ready")}
                    className="flex-1 px-3 py-2 text-xs font-medium rounded-lg bg-status-ready-bg text-status-ready hover:opacity-80 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mark Ready
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(
                        order.id,
                        order.status === "new" ? "processing" : "new"
                      )
                    }
                    className="px-3 py-2 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-surface-hover transition-colors"
                  >
                    {order.status === "new" ? "Start" : "Undo"}
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {activeOrders.length === 0 && (
            <div className="text-center py-16">
              <ChefHat className="w-10 h-10 text-text-muted mx-auto mb-3" />
              <p className="text-sm text-text-muted">All caught up! No orders to prepare.</p>
            </div>
          )}
        </main>
      </div>

      {/* Assign Staff Modal */}
      {assigningOrder && (
        <AssignStaff
          order={assigningOrder}
          onAssign={handleAssign}
          onClose={() => setAssigningOrder(null)}
        />
      )}
    </div>
  );
}