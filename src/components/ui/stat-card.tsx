"use client";

import { cn } from "@/lib/utils";
import { Card } from "./card";
import { type LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  className?: string;
  accent?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, className, accent }: StatCardProps) {
  return (
    <Card className={cn("p-4 sm:p-5 group", className)} hover>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-semibold text-text-primary tracking-tight">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium flex items-center gap-1",
                trend.positive ? "text-status-ready" : "text-status-cancelled"
              )}
            >
              {trend.positive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-text-muted font-normal">vs yesterday</span>
            </p>
          )}
        </div>
        <div className={cn(
          "p-2.5 rounded-lg transition-colors",
          accent ? "bg-accent text-accent-foreground" : "bg-accent-light text-accent"
        )}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </Card>
  );
}