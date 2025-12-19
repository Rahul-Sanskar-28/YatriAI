import React, { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ShimmerButtonProps {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.1em",
  shimmerDuration = "2s",
  borderRadius = "12px",
  background = "linear-gradient(135deg, #16a34a 0%, #ea580c 100%)",
  className,
  children,
  onClick,
  type = "button",
  disabled = false,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--shimmer-duration": shimmerDuration,
          "--border-radius": borderRadius,
          "--bg": background,
        } as CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-8 py-4 text-white font-medium",
        "transform-gpu transition-all duration-300 ease-in-out hover:scale-105 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        "before:absolute before:inset-0 before:-z-10 before:block",
        "before:[background:var(--bg)]",
        "after:absolute after:inset-0 after:-z-10 after:block",
        "after:animate-shimmer after:[background:linear-gradient(90deg,transparent_0%,var(--shimmer-color)_50%,transparent_100%)]",
        "after:[background-size:200%_100%]",
        "after:opacity-0 hover:after:opacity-30",
        className
      )}
      style={{
        borderRadius: borderRadius,
        background: background,
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div
        className="absolute inset-0 -z-20 overflow-hidden rounded-[inherit]"
        style={{ borderRadius }}
      >
        <div className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      </div>
    </button>
  );
}

export default ShimmerButton;

