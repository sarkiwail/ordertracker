"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  ChefHat,
  TrendingUp,
  Settings,
  Store,
} from "lucide-react";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ClipboardList },
  { name: "Kitchen", href: "/kitchen", icon: ChefHat },
  { name: "Reports", href: "/reports", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 h-screen bg-surface border-r border-border/50 fixed left-0 top-0">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
          <Store className="w-4 h-4 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-text-primary">ShawarmaKing</h1>
          <p className="text-[11px] text-text-muted">Order Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-border/50">
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-accent-light flex items-center justify-center">
            <span className="text-xs font-semibold text-accent">AK</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">Admin</p>
            <p className="text-xs text-text-muted truncate">admin@shawarma.com</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}