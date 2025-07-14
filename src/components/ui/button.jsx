import React from "react";
import { cn } from "../../lib/utils.js";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = "btn";

    const variants = {
      default: "btn-primary",
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-outline",
      ghost: "btn-ghost",
      link: "text-accent underline-offset-4 hover:underline p-0 h-auto font-medium",
    };

    const sizes = {
      default: "",
      sm: "px-3 py-1.5 text-sm",
      lg: "px-8 py-3 text-base",
      icon: "h-10 w-10 p-0",
    };

    const classes = cn(baseClasses, variants[variant], sizes[size], className);

    if (asChild) {
      return React.cloneElement(children, {
        className: cn(classes, children.props.className),
        ref,
        ...props,
      });
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
