"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Bell, MessageCircle, Mail, Smartphone } from "lucide-react";
import { Select } from "@/components/ui/select";

export function Notifications() {
  const [settings, setSettings] = useState({
    newOrders: true,
    orderUpdates: true,
    paymentConfirmations: true,
    dailyDigest: false,
    lowStockAlerts: true,
    smsNotifications: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
        <p className="text-xs text-text-muted mt-0.5">
          Configure how you receive order updates and alerts
        </p>
      </div>

      <Card>
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="p-2 rounded-lg bg-accent-light">
              <Bell className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Push Notifications</p>
              <p className="text-xs text-text-muted">In-app and browser notifications</p>
            </div>
          </div>

          <Toggle
            label="New Orders"
            description="Alert when a new order comes in"
            checked={settings.newOrders}
            onChange={() => toggleSetting("newOrders")}
          />
          <Toggle
            label="Order Updates"
            description="Notify when order status changes"
            checked={settings.orderUpdates}
            onChange={() => toggleSetting("orderUpdates")}
          />
          <Toggle
            label="Payment Confirmations"
            description="Alert on successful payment received"
            checked={settings.paymentConfirmations}
            onChange={() => toggleSetting("paymentConfirmations")}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="p-2 rounded-lg bg-status-processing-bg">
              <MessageCircle className="w-4 h-4 text-status-processing" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Email & SMS</p>
              <p className="text-xs text-text-muted">Communication preferences</p>
            </div>
          </div>

          <Toggle
            label="Daily Digest"
            description="Receive a daily summary of orders and revenue"
            checked={settings.dailyDigest}
            onChange={() => toggleSetting("dailyDigest")}
          />
          <Toggle
            label="SMS Alerts"
            description="Get critical alerts via SMS"
            checked={settings.smsNotifications}
            onChange={() => toggleSetting("smsNotifications")}
          />
          <Toggle
            label="Low Stock Alerts"
            description="Notify when inventory is running low"
            checked={settings.lowStockAlerts}
            onChange={() => toggleSetting("lowStockAlerts")}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="space-y-4">
            <p className="text-sm font-medium text-text-primary">Notification Schedule</p>
            <Select
              label="Quiet Hours Start"
              options={[
                { value: "none", label: "No quiet hours" },
                { value: "21:00", label: "9:00 PM" },
                { value: "22:00", label: "10:00 PM" },
                { value: "23:00", label: "11:00 PM" },
              ]}
              defaultValue="none"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
        <button className="px-4 py-2 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-surface-hover transition-colors">
          Reset
        </button>
        <button className="px-4 py-2 text-xs font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
}