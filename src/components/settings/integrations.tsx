"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, MessageCircle, Instagram, Link, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    icon: MessageCircle,
    color: "text-whatsapp",
    bg: "bg-whatsapp-bg",
    description: "Receive and manage orders from WhatsApp",
    fields: [
      { key: "number", label: "Business Phone Number", placeholder: "+234 800 XXX XXXX", value: "+234 800 123 4567" },
      { key: "apiKey", label: "WhatsApp API Key", placeholder: "Enter your API key", value: "wa-sk-••••••••" },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "text-instagram",
    bg: "bg-instagram-bg",
    description: "Connect Instagram DMs and shopping",
    fields: [
      { key: "username", label: "Instagram Username", placeholder: "@yourbusiness", value: "@shawarmaking" },
      { key: "accessToken", label: "Access Token", placeholder: "Enter access token", value: "••••••••" },
    ],
  },
  {
    id: "website",
    name: "Website",
    icon: Globe,
    color: "text-website",
    bg: "bg-website-bg",
    description: "Embed order forms on your website",
    fields: [
      { key: "url", label: "Website URL", placeholder: "https://yourwebsite.com", value: "https://shawarmaking.com" },
      { key: "apiKey", label: "API Key", placeholder: "Generated API key", value: "sk-live-••••••••" },
    ],
  },
];

export function Integrations() {
  const [connected, setConnected] = useState<Record<string, boolean>>({
    whatsapp: true,
    instagram: false,
    website: true,
  });
  const [syncing, setSyncing] = useState<string | null>(null);

  const toggleConnection = (id: string) => {
    setConnected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">Integrations</h3>
        <p className="text-xs text-text-muted mt-0.5">
          Connect your social platforms and website to receive orders
        </p>
      </div>

      {platforms.map((platform) => (
        <Card key={platform.id} className={cn(connected[platform.id] && "border-status-ready/30")}>
          <CardContent className="p-5 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2.5 rounded-lg", platform.bg)}>
                  <platform.icon className={cn("w-5 h-5", platform.color)} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{platform.name}</p>
                  <p className="text-xs text-text-muted">{platform.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {connected[platform.id] ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-status-ready">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-medium text-text-muted">
                    <XCircle className="w-3.5 h-3.5" />
                    Disconnected
                  </span>
                )}
                <button
                  onClick={() => handleSync(platform.id)}
                  disabled={syncing === platform.id}
                  className={cn(
                    "p-1.5 rounded-md text-text-muted hover:text-text-secondary hover:bg-surface-hover transition-colors",
                    syncing === platform.id && "animate-spin"
                  )}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Connection Toggle */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-secondary">
              <span className="text-xs text-text-secondary">Connection Status</span>
              <button
                onClick={() => toggleConnection(platform.id)}
                className={cn(
                  "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                  connected[platform.id] ? "bg-status-ready" : "bg-surface-secondary"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    connected[platform.id] ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Fields */}
            {connected[platform.id] && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {platform.fields.map((field) => (
                  <Input
                    key={field.key}
                    label={field.label}
                    defaultValue={field.value}
                    placeholder={field.placeholder}
                  />
                ))}
              </div>
            )}

            {/* Webhook / Embed Info */}
            {connected[platform.id] && platform.id === "website" && (
              <div className="p-3 rounded-lg bg-accent-light border border-accent/20">
                <p className="text-xs font-medium text-accent mb-1">Embed Code</p>
                <code className="text-[11px] text-text-secondary break-all">
                  {`<script src="https://orders.shawarmaking.com/widget.js" data-store="shawarmaking"></script>`}
                </code>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
        <Button variant="secondary">Test Connections</Button>
        <Button>Save Integration Settings</Button>
      </div>
    </div>
  );
}