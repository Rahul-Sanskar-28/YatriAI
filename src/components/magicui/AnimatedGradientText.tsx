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
        "inline-flex animate-gradient bg-gradient-to-r from-[#22c55e] via-[#f97316] via-[#eab308] to-[#22c55e] bg-[length:300%_100%] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}

export default AnimatedGradientText;

