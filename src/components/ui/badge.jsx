import React from 'react';
import { cn } from '../../lib/utils.js';

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'badge-default',
    secondary: 'badge-secondary',
    outline: 'badge-outline',
    destructive: 'bg-red-500 text-white'
  };

  return (
    <div
      ref={ref}
      className={cn('badge', variants[variant], className)}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export { Badge };