import React from "react";

export default function Loading({
  size = "md",
  variant = "spinner",
  text = "Loading...",
  showText = true,
  className = "",
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const SpinnerVariant = () => (
    <div
      className={`${sizeClasses[size]} border-2 border-accent/20 border-t-accent rounded-full animate-spin`}
    />
  );

  const DotsVariant = () => (
    <div className="flex space-x-1">
      <div
        className="w-2 h-2 bg-accent rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-2 h-2 bg-accent rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-2 h-2 bg-accent rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );

  const PulseVariant = () => (
    <div
      className={`${sizeClasses[size]} bg-accent rounded-full animate-pulse opacity-75`}
    />
  );

  const WaveVariant = () => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 h-8 bg-accent rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 100}ms`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case "dots":
        return <DotsVariant />;
      case "pulse":
        return <PulseVariant />;
      case "wave":
        return <WaveVariant />;
      default:
        return <SpinnerVariant />;
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {renderVariant()}
      {showText && (
        <p className="text-muted-foreground text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// Full-screen loading overlay
export function LoadingOverlay({
  isVisible = true,
  text = "Loading...",
  variant = "spinner",
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="glass-effect rounded-2xl p-8">
        <Loading variant={variant} text={text} size="lg" />
      </div>
    </div>
  );
}

// Page loading component
export function PageLoading({ text = "Loading page..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loading variant="spinner" text={text} size="xl" />
        <div className="mt-8">
          <div className="w-64 h-1 bg-accent/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full animate-pulse"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
