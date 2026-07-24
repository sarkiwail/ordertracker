"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatusBadge, PlatformBadge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { OrderCard } from "@/components/orders/order-card";
import { mockOrders } from "@/data/mock-orders";
import { formatCurrency } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";
import { Search, Filter, ArrowDownUp } from "lucide-react";

const statusFilters: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Processing", value: "processing" },
  { label: "Ready", value: "ready" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "On Hold", value: "on-hold" },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const filteredOrders =
    statusFilter === "all"
      ? mockOrders
      : mockOrders.filter((o) => o.status === statusFilter);

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold text-text-primary">Orders</h1>
              <p className="text-sm text-text-muted mt-0.5">
                {filteredOrders.length} total orders
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-48 sm:w-56 pl-9 pr-3 py-2 text-xs bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                />
              </div>
              <button className="p-2 rounded-lg border border-border text-text-secondary hover:bg-surface-hover transition-colors">
                <ArrowDownUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  statusFilter === filter.value
                    ? "bg-accent text-accent-foreground"
                    : "bg-surface text-text-secondary hover:bg-surface-hover border border-border/50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onSelect={setSelectedOrder}
              />
            ))}
          </div>

          {/* If no orders match */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-text-muted">No orders found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}