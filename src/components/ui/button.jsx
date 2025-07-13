import React from 'react';
import { cn } from '../../lib/utils.js';

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  asChild = false,
  children,
  ...props 
}, ref) => {
  const baseClasses = "btn";
  
  const variants = {
    default: "btn-primary",
    outline: "btn-outline",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "text-blue-600 underline-offset-4 hover:underline"
  };

  const sizes = {
    default: "",
    sm: "btn-sm",
    lg: "btn-lg",
    icon: "h-10 w-10"
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  if (asChild) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ref,
      ...props
    });
  }

  return (
    <button
      className={classes}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };