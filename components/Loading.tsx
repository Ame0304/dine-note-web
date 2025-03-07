import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  fullPage?: boolean;
  message?: string;
}

export default function Loading({
  size = "medium",
  fullPage = false,
  message = "Loading...",
}: LoadingProps) {
  // Size configurations
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-3",
    large: "w-16 h-16 border-4",
  };

  // Container classes based on whether it should take full page
  const containerClasses = fullPage
    ? "fixed inset-0 flex items-center justify-center bg-primary-950/70 z-50"
    : "flex flex-col items-center justify-center py-8";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-3">
        {/* Spinner with accent color border */}
        <div
          className={`${sizeClasses[size]} rounded-full border-accent-500 border-t-transparent animate-spin`}
          role="status"
          aria-label="Loading"
        />

        {/* Optional loading message */}
        {message && (
          <p className="text-primary-50 font-medium mt-2">{message}</p>
        )}
      </div>
    </div>
  );
}
