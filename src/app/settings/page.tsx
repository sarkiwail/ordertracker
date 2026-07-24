"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { BusinessProfile } from "@/components/settings/business-profile";
import { Notifications } from "@/components/settings/notifications";
import { TeamPermissions } from "@/components/settings/team";
import { Appearance } from "@/components/settings/appearance";
import { Integrations } from "@/components/settings/integrations";
import { cn } from "@/lib/utils";
import { Store, Bell, Shield, Palette, Globe } from "lucide-react";

const tabs = [
  { id: "profile", label: "Business Profile", icon: Store },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "team", label: "Team & Permissions", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Globe },
];

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold text-text-primary">Settings</h1>
              <p className="text-sm text-text-muted mt-0.5">
                Manage your system preferences and configurations
              </p>
            </div>
            {saved && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-status-ready-bg text-status-ready animate-in">
                <span>Changes saved successfully</span>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-border/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl">
            {activeTab === "profile" && <BusinessProfile />}
            {activeTab === "notifications" && <Notifications />}
            {activeTab === "team" && <TeamPermissions />}
            {activeTab === "appearance" && <Appearance />}
            {activeTab === "integrations" && <Integrations />}
          </div>
        </main>
      </div>
    </div>
  );
}