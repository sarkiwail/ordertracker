"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge, PlatformBadge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { OrderCard } from "@/components/orders/order-card";
import { ClientTime } from "@/components/ui/client-time";
import { dashboardStats, mockOrders, recentActivity } from "@/data/mock-orders";
import { formatCurrency, cn } from "@/lib/utils";
import type { Order } from "@/types";
import {
  ShoppingBag,
  CookingPot,
  CheckCircle2,
  DollarSign,
  MessageCircle,
  Instagram,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = dashboardStats;

  const activeOrders = mockOrders
    .filter((o) => o.status === "new" || o.status === "processing")
    .slice(0, 6);

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
          <div>
            <h1 className="text-lg font-semibold text-text-primary">Dashboard</h1>
            <p className="text-sm text-text-muted mt-0.5">
              Real-time overview of your orders and operations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Pending Orders"
              value={stats.pendingOrders}
              icon={ShoppingBag}
              trend={{ value: 12, positive: true }}
            />
            <StatCard
              title="In Progress"
              value={stats.processingOrders}
              icon={CookingPot}
              trend={{ value: 8, positive: true }}
            />
            <StatCard
              title="Ready for Pickup"
              value={stats.readyOrders}
              icon={CheckCircle2}
              trend={{ value: 3, positive: false }}
            />
            <StatCard
              title="Today's Revenue"
              value={formatCurrency(stats.todayRevenue)}
              icon={DollarSign}
              trend={{ value: 15, positive: true }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-text-primary">
                  Active Orders
                </h2>
                <button className="text-xs font-medium text-accent hover:text-accent-hover transition-colors flex items-center gap-1">
                  View all
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {activeOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onSelect={setSelectedOrder}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold text-text-primary">
                    Recent Activity
                  </h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    {recentActivity.slice(0, 5).map((activity) => (
                      <div
                        key={activity.id}
                        className="px-5 py-3 flex items-start gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {activity.message}
                          </p>
                          <p className="text-[11px] text-text-muted mt-0.5">
                            <ClientTime date={activity.timestamp} format="relative" />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold text-text-primary">
                    Orders by Platform
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      platform: "whatsapp" as const,
                      label: "WhatsApp",
                      count: stats.ordersByPlatform.whatsapp,
                      icon: MessageCircle,
                      color: "text-whatsapp",
                      bg: "bg-whatsapp-bg",
                      percent: Math.round(
                        (stats.ordersByPlatform.whatsapp / stats.totalOrders) * 100
                      ),
                    },
                    {
                      platform: "instagram" as const,
                      label: "Instagram",
                      count: stats.ordersByPlatform.instagram,
                      icon: Instagram,
                      color: "text-instagram",
                      bg: "bg-instagram-bg",
                      percent: Math.round(
                        (stats.ordersByPlatform.instagram / stats.totalOrders) * 100
                      ),
                    },
                    {
                      platform: "website" as const,
                      label: "Website",
                      count: stats.ordersByPlatform.website,
                      icon: Globe,
                      color: "text-website",
                      bg: "bg-website-bg",
                      percent: Math.round(
                        (stats.ordersByPlatform.website / stats.totalOrders) * 100
                      ),
                    },
                  ].map((item) => (
                    <div key={item.platform} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={cn("p-1.5 rounded-md", item.bg)}>
                            <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                          </div>
                          <span className="text-xs font-medium text-text-secondary">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-text-primary">
                          {item.count}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all", item.color.replace("text-", "bg-"))}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">Recent Orders</h3>
                <button className="text-xs font-medium text-accent hover:text-accent-hover transition-colors">
                  View all
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">Order</th>
                      <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">Customer</th>
                      <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Platform</th>
                      <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">Status</th>
                      <th className="text-right text-xs font-medium text-text-muted uppercase tracking-wider px-5 py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {stats.recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-surface-hover transition-colors cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-medium text-text-primary">{order.orderNumber}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs text-text-primary">{order.customer.name}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <PlatformBadge platform={order.platform} />
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-xs font-semibold text-text-primary">{formatCurrency(order.total)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}