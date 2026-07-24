import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
  hover?: boolean;
};

export function Card({ className, children, hover, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-xl border border-border/50 card-shadow transition-all duration-200",
        hover && "card-shadow-hover hover:border-border/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("px-5 py-4 border-b border-border/40", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: CardProps) {
  return <div className={cn("p-5", className)} {...props}>{children}</div>;
}