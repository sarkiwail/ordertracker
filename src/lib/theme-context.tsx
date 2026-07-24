"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "system";
type Accent = "blue" | "green" | "orange" | "purple" | "red" | "teal";

interface ThemeContextType {
  theme: Theme;
  accent: Accent;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  isCompact: boolean;
  setCompact: (compact: boolean) => void;
  showAnimations: boolean;
  setShowAnimations: (show: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ACCENT_COLORS: Record<Accent, { hue: number; saturation: number }> = {
  blue: { hue: 220, saturation: 70 },
  green: { hue: 142, saturation: 70 },
  orange: { hue: 35, saturation: 92 },
  purple: { hue: 260, saturation: 60 },
  red: { hue: 0, saturation: 70 },
  teal: { hue: 180, saturation: 60 },
};

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("theme") as Theme) || "system";
}

function getStoredAccent(): Accent {
  if (typeof window === "undefined") return "blue";
  return (localStorage.getItem("accent") as Accent) || "blue";
}

function getStoredCompact(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("compact") === "true";
}

function getStoredAnimations(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("animations") !== "false";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [accent, setAccentState] = useState<Accent>(getStoredAccent);
  const [isCompact, setCompactState] = useState(getStoredCompact);
  const [showAnimations, setAnimationsState] = useState(getStoredAnimations);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const applyTheme = useCallback((currentTheme: Theme) => {
    const resolved = currentTheme === "system" ? getSystemTheme() : currentTheme;
    setResolvedTheme(resolved);

    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const applyAccent = useCallback((currentAccent: Accent) => {
    const { hue, saturation } = ACCENT_COLORS[currentAccent];
    const root = document.documentElement;
    root.style.setProperty("--accent-hue", String(hue));
    root.style.setProperty("--accent-saturation", `${saturation}%`);
  }, []);

  const applyCompact = useCallback((compact: boolean) => {
    const root = document.documentElement;
    if (compact) {
      root.style.setProperty("--spacing-scale", "0.85");
    } else {
      root.style.setProperty("--spacing-scale", "1");
    }
  }, []);

  const applyAnimations = useCallback((show: boolean) => {
    const root = document.documentElement;
    if (!show) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  // Apply on mount and when values change
  useEffect(() => {
    applyTheme(theme);
    applyAccent(accent);
    applyCompact(isCompact);
    applyAnimations(showAnimations);
  }, [theme, accent, isCompact, showAnimations, applyTheme, applyAccent, applyCompact, applyAnimations]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  const setAccent = useCallback((newAccent: Accent) => {
    setAccentState(newAccent);
    localStorage.setItem("accent", newAccent);
  }, []);

  const setCompact = useCallback((compact: boolean) => {
    setCompactState(compact);
    localStorage.setItem("compact", String(compact));
  }, []);

  const setShowAnimations = useCallback((show: boolean) => {
    setAnimationsState(show);
    localStorage.setItem("animations", String(show));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accent,
        resolvedTheme,
        setTheme,
        setAccent,
        isCompact,
        setCompact,
        showAnimations,
        setShowAnimations,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}