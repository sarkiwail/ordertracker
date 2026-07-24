"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon, Monitor, Check, Save } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";
type Accent = "blue" | "green" | "orange" | "purple" | "red" | "teal";

const themeOptions = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

const accentOptions = [
  { value: "blue" as const, label: "Blue", color: "bg-blue-600" },
  { value: "green" as const, label: "Green", color: "bg-green-600" },
  { value: "orange" as const, label: "Orange", color: "bg-orange-600" },
  { value: "purple" as const, label: "Purple", color: "bg-purple-600" },
  { value: "red" as const, label: "Red", color: "bg-red-600" },
  { value: "teal" as const, label: "Teal", color: "bg-teal-600" },
];

export function Appearance() {
  const {
    theme: savedTheme,
    accent: savedAccent,
    isCompact: savedCompact,
    showAnimations: savedAnimations,
    resolvedTheme,
    setTheme,
    setAccent,
    setCompact,
    setShowAnimations,
  } = useTheme();

  // Pending (unsaved) state
  const [pending, setPending] = useState({
    theme: savedTheme,
    accent: savedAccent,
    compact: savedCompact,
    animations: savedAnimations,
  });
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Sync pending state when saved values change (e.g. after save)
  useEffect(() => {
    setPending({
      theme: savedTheme,
      accent: savedAccent,
      compact: savedCompact,
      animations: savedAnimations,
    });
  }, [savedTheme, savedAccent, savedCompact, savedAnimations]);

  // Preview changes live (visual only, not persisted)
  useEffect(() => {
    // Apply theme preview
    const root = document.documentElement;
    if (pending.theme === "dark") {
      root.classList.add("dark");
    } else if (pending.theme === "light") {
      root.classList.remove("dark");
    } else {
      // system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    // Apply accent preview
    const hueMap: Record<string, number> = {
      blue: 220, green: 142, orange: 35, purple: 260, red: 0, teal: 180,
    };
    root.style.setProperty("--accent-hue", String(hueMap[pending.accent] || 220));
    root.style.setProperty("--accent-saturation", "70%");
  }, [pending.theme, pending.accent]);

  const hasChanges =
    pending.theme !== savedTheme ||
    pending.accent !== savedAccent ||
    pending.compact !== savedCompact ||
    pending.animations !== savedAnimations;

  const handleApplyChanges = () => {
    setTheme(pending.theme);
    setAccent(pending.accent);
    setCompact(pending.compact);
    setShowAnimations(pending.animations);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setPending({
      theme: "system",
      accent: "blue",
      compact: false,
      animations: true,
    });
  };

  const handleCancel = () => {
    setPending({
      theme: savedTheme,
      accent: savedAccent,
      compact: savedCompact,
      animations: savedAnimations,
    });
    // Revert visual preview
    const root = document.documentElement;
    const hueMap: Record<string, number> = {
      blue: 220, green: 142, orange: 35, purple: 260, red: 0, teal: 180,
    };
    root.style.setProperty("--accent-hue", String(hueMap[savedAccent] || 220));
    if (savedTheme === "dark" || (savedTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">Appearance</h3>
        <p className="text-xs text-text-muted mt-0.5">
          Customize the look and feel of your dashboard
        </p>
      </div>

      {/* Current theme indicator */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent-light/50 border border-accent/20">
        <div
          className={cn(
            "w-2 h-2 rounded-full",
            resolvedTheme === "dark" ? "bg-indigo-500" : "bg-amber-500"
          )}
        />
        <span className="text-xs text-text-secondary">
          Currently using{" "}
          <span className="font-medium text-text-primary capitalize">
            {savedTheme === "system" ? "system default" : `${savedTheme} mode`}
          </span>
          {savedTheme === "system" && (
            <span className="text-text-muted">
              {" "}(detected: {resolvedTheme})
            </span>
          )}
        </span>
      </div>

      {/* Unsaved changes warning */}
      {hasChanges && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-status-processing-bg/50 border border-status-processing/20">
          <span className="text-xs text-status-processing font-medium">
            You have unsaved changes. Click "Apply Changes" to save.
          </span>
        </div>
      )}

      {/* Saved success message */}
      {saved && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-status-ready-bg border border-status-ready/20 animate-in">
          <Check className="w-3.5 h-3.5 text-status-ready" />
          <span className="text-xs text-status-ready font-medium">
            Changes saved successfully!
          </span>
        </div>
      )}

      {/* Theme Selection */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <p className="text-sm font-medium text-text-primary">Theme</p>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const isDark = option.value === "dark";
              const isActive = pending.theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setPending({ ...pending, theme: option.value })}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-center space-y-3",
                    isActive
                      ? "border-accent bg-accent-light"
                      : "border-border hover:border-border/80 hover:bg-surface-hover"
                  )}
                >
                  <div
                    className={cn(
                      "w-full h-14 rounded-lg flex items-center justify-center transition-colors",
                      isDark ? "bg-gray-900" : "bg-white",
                      isActive && isDark && "ring-1 ring-gray-700",
                      isActive && !isDark && "border border-border"
                    )}
                  >
                    <option.icon
                      className={cn(
                        "w-5 h-5",
                        isDark ? "text-gray-400" : "text-text-muted"
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <option.icon className="w-3.5 h-3.5 text-text-secondary" />
                    <span className="text-xs font-medium text-text-primary">
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Accent Color */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <p className="text-sm font-medium text-text-primary">Accent Color</p>
          <p className="text-xs text-text-muted -mt-2">
            Changes the primary color across the interface (previewed live)
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {accentOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPending({ ...pending, accent: option.value })}
                className={cn(
                  "w-9 h-9 rounded-full transition-all flex items-center justify-center",
                  option.color,
                  pending.accent === option.value && "ring-2 ring-offset-2 ring-accent scale-110"
                )}
                title={option.label}
              >
                {pending.accent === option.value && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            ))}
          </div>

          {/* Accent preview indicator */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs text-text-muted">Preview:</span>
            <div className="flex items-center gap-1.5">
              {(["bg-accent", "bg-accent-hover", "bg-accent-light"] as const).map((color) => (
                <div key={color} className={`w-6 h-6 rounded-md ${color}`} />
              ))}
            </div>
            <span className="text-xs text-text-muted capitalize">
              {pending.accent} accent
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Display Options */}
      <Card>
        <CardContent className="p-5 space-y-5">
          <p className="text-sm font-medium text-text-primary">Display Preferences</p>
          <Toggle
            label="Compact View"
            description="Show more content with reduced spacing"
            checked={pending.compact}
            onChange={(checked) => setPending({ ...pending, compact: checked })}
          />
          <Toggle
            label="Animations"
            description="Enable smooth transitions and effects"
            checked={pending.animations}
            onChange={(checked) => setPending({ ...pending, animations: checked })}
          />
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <Button variant="ghost" onClick={handleCancel} disabled={!hasChanges}>
          Cancel
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={handleApplyChanges} disabled={!hasChanges}>
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
}