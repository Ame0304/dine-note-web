import { ReactNode } from "react";

type HeadingLevel = "h0" | "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
}

export default function Heading({
  level = "h2",
  children,
  className = "",
}: HeadingProps) {
  // Map sizes to appropriate Tailwind classes
  const sizeClasses = {
    h4: "text-lg md:text-xl",
    h3: "text-xl md:text-2xl",
    h2: "text-2xl md:text-3xl",
    h1: "text-3xl md:text-4xl",
    h0: "text-4xl sm:text-5xl md:text-6xl",
  };

  const classes = `font-semibold mb-2 ${sizeClasses[level]} ${className}`;

  return <h1 className={classes}>{children}</h1>;
}
