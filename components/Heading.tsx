import { ReactNode } from "react";

type HeadingLevel = "h0" | "h1" | "h2" | "h3" | "h4" | "h5";

interface HeadingProps {
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
  styled?: boolean;
}

export default function Heading({
  level = "h2",
  children,
  className = "",
  styled = false,
}: HeadingProps) {
  // Map sizes to appropriate Tailwind classes
  const sizeClasses = {
    h5: "text-md md:text-lg",
    h4: "text-lg md:text-xl",
    h3: "text-xl md:text-2xl",
    h2: "text-2xl md:text-3xl",
    h1: "text-3xl md:text-4xl",
    h0: "text-4xl sm:text-5xl md:text-6xl",
  };

  const classes = `font-semibold ${sizeClasses[level]} ${className}`;

  if (styled) {
    return (
      <div className="inline-block relative">
        <h1 className={`relative z-10 text-primary-100 p-1 ${classes}`}>
          {children}
        </h1>
        <div className="z-0 absolute left-0 right-0 top-1/2 h-2 bg-accent-500 rounded-full"></div>
      </div>
    );
  }
  return <h1 className={classes}>{children}</h1>;
}
