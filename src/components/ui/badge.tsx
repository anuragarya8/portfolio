import * as React from "react";
import { cn } from "@/lib/cn";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "outline" | "success" | "muted";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-accent/15 text-accent",
        variant === "outline" && "border border-border text-muted-foreground",
        variant === "success" && "bg-success/15 text-success",
        variant === "muted" && "bg-muted text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
