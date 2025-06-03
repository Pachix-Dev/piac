"use client";
import { cn } from "../../lib/utlis.ts";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-auto flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            "--aurora":
              "repeating-linear-gradient(100deg,#2f9e44_10%,#38a169_15%,#6b8e23_20%,#a3d9a5_25%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#1a1a1a_0%,#1a1a1a_7%,transparent_10%,transparent_12%,#1a1a1a_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#f0fdf4_0%,#f0fdf4_7%,transparent_10%,transparent_12%,#f0fdf4_16%)",
          
            "--green-1": "#2f9e44",
            "--green-2": "#38a169",
            "--green-3": "#6b8e23",
            "--green-4": "#a3d9a5",
            "--black": "#1a1a1a",
            "--white": "#f0fdf4",
            "--transparent": "transparent"
          }}
        >
          <div
        className={cn(
          `after:animate-aurora pointer-events-none absolute -inset-[10px]
          [background-image:var(--white-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          opacity-50 blur-[10px] invert filter will-change-transform

          [--aurora:repeating-linear-gradient(100deg,var(--green-1)_10%,var(--green-2)_15%,var(--green-3)_20%,var(--green-4)_25%)]
          [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
          [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]

          after:absolute after:inset-0
          after:[background-image:var(--white-gradient),var(--aurora)]
          after:[background-size:200%,_100%]
          after:[background-attachment:fixed]
          after:mix-blend-difference after:content-[""]
          dark:[background-image:var(--dark-gradient),var(--aurora)]
          dark:invert-0
          after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
          showRadialGradient &&
            `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
        )}
      ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
