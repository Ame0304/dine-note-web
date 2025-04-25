import React from "react";
import Link from "next/link";

interface FallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
      <h1 className="text-3xl font-bold text-accent-200">
        Something went wrong
      </h1>
      <p className="mt-4 text-primary-100">{error.message}</p>

      <div className="mt-6 flex gap-4">
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-colors"
          >
            Try again
          </button>
        )}

        <Link
          href="/"
          className="px-4 py-2 border border-accent-500 text-accent-500 rounded hover:bg-accent-500/10 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
