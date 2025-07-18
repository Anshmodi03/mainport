import React from "react";

export function Loading({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`${sizes[size]} border-2 border-accent border-t-transparent rounded-full animate-spin ${className}`}
    />
  );
}

export function LoadingDots({ className = "" }) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-accent rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}
