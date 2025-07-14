import React from "react";
import { cn } from "../../lib/utils.js";

const Badge = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors";

    const variants = {
      default: "bg-background-tertiary text-text-primary border border-border",
      secondary: "bg-accent/10 text-accent border border-accent/20",
      accent: "bg-accent text-white",
      outline:
        "border border-border text-text-secondary bg-transparent hover:bg-background-secondary",
      success: "bg-success/10 text-success border border-success/20",
      warning: "bg-warning/10 text-warning border border-warning/20",
      error: "bg-error/10 text-error border border-error/20",
    };

    const classes = cn(baseClasses, variants[variant], className);

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
