"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/data/mock-orders";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
  Download,
} from "lucide-react";

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = dashboardStats;

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-text-primary">Reports</h1>
              <p className="text-sm text-text-muted mt-0.5">
                Analytics and insights for your business
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-accent-light">
                  <DollarSign className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Total Revenue</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {formatCurrency(
                      stats.totalOrders * stats.averageOrderValue
                    )}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-status-processing-bg">
                  <ShoppingBag className="w-4 h-4 text-status-processing" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Total Orders</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {stats.totalOrders}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-status-ready-bg">
                  <TrendingUp className="w-4 h-4 text-status-ready" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Avg. Order Value</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {formatCurrency(stats.averageOrderValue)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-status-new-bg">
                  <Users className="w-4 h-4 text-status-new" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Unique Customers</p>
                  <p className="text-lg font-semibold text-text-primary">12</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Status Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-sm font-semibold text-text-primary">
                  Order Status Distribution
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(stats.ordersByStatus).map(([status, count]) => {
                  const percent = Math.round(
                    (count / stats.totalOrders) * 100
                  );
                  const colorMap: Record<string, string> = {
                    new: "bg-status-new",
                    processing: "bg-status-processing",
                    ready: "bg-status-ready",
                    delivered: "bg-status-delivered",
                    cancelled: "bg-status-cancelled",
                    "on-hold": "bg-status-hold",
                  };
                  const labelMap: Record<string, string> = {
                    new: "New",
                    processing: "Processing",
                    ready: "Ready",
                    delivered: "Delivered",
                    cancelled: "Cancelled",
                    "on-hold": "On Hold",
                  };
                  return (
                    <div key={status} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">
                          {labelMap[status] || status}
                        </span>
                        <span className="text-text-primary font-medium">
                          {count} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            colorMap[status] || "bg-accent"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-sm font-semibold text-text-primary">
                  Platform Performance
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(stats.ordersByPlatform).map(
                  ([platform, count]) => {
                    const percent = Math.round(
                      (count / stats.totalOrders) * 100
                    );
                    const colorMap: Record<string, string> = {
                      whatsapp: "bg-whatsapp",
                      instagram: "bg-instagram",
                      website: "bg-website",
                    };
                    const labelMap: Record<string, string> = {
                      whatsapp: "WhatsApp",
                      instagram: "Instagram",
                      website: "Website",
                    };
                    const revenue =
                      count * stats.averageOrderValue;
                    return (
                      <div key={platform} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">
                            {labelMap[platform] || platform}
                          </span>
                          <span className="text-text-primary font-medium">
                            {count} orders · {formatCurrency(revenue)}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              colorMap[platform] || "bg-accent"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}