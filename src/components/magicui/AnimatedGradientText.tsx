import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-flex animate-gradient bg-gradient-to-r from-[#FFB800] via-[#C45C26] via-[#E23D28] to-[#FFB800] bg-[length:300%_100%] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}

export default AnimatedGradientText;

