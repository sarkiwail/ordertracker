"use client";

import { useState, useEffect } from "react";

interface ClientTimeProps {
  date: Date | string;
  format?: "relative" | "full" | "time";
  className?: string;
}

export function ClientTime({ date, format = "relative", className }: ClientTimeProps) {
  const [display, setDisplay] = useState<string>("");

  useEffect(() => {
    const d = typeof date === "string" ? new Date(date) : date;
    const now = Date.now();
    const diffMs = now - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);

    if (format === "relative") {
      if (mins < 1) setDisplay("Just now");
      else if (mins < 60) setDisplay(`${mins}m ago`);
      else if (hours < 24) setDisplay(`${hours}h ago`);
      else if (days < 7) setDisplay(`${days}d ago`);
      else setDisplay(
        new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(d)
      );
    } else if (format === "full") {
      setDisplay(
        new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(d)
      );
    } else {
      setDisplay(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(d)
      );
    }
  }, [date, format]);

  if (!display) return <span className={className}>--</span>;

  return <span className={className}>{display}</span>;
}

export function ClientDate({ className }: { className?: string }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay(
      new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(new Date())
    );
  }, []);

  if (!display) return <span className={className} />;
  return <span className={className}>{display}</span>;
}