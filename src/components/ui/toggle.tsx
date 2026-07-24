"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ToggleProps {
  label?: string;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ label, description, checked = false, onChange, disabled }: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(checked);
  const isChecked = onChange ? checked : internalChecked;

  const handleToggle = () => {
    const newValue = !isChecked;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalChecked(newValue);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        {label && (
          <p className="text-sm font-medium text-text-primary">{label}</p>
        )}
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1",
          isChecked ? "bg-accent" : "bg-surface-secondary",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out transform",
            isChecked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}