import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "./cn";

const veltzLogo = "/logo.png";

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/* Decorative background                                               */
/* ------------------------------------------------------------------ */
export function SceneBackground({
  variant = "default",
}: {
  variant?: "default" | "blueprint" | "title";
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-ink" />
      {/* texture */}
      {variant === "blueprint" ? (
        <div className="absolute inset-0 blueprint-grid opacity-60" />
      ) : (
        <div className="absolute inset-0 dot-grid opacity-70" />
      )}
      {/* orange glow orbs */}
      <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-brand/20 blur-[140px] animate-float-slow" />
      <div className="absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-[150px] animate-float-slow [animation-delay:-6s]" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      {/* top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Slide shell                                                         */
/* ------------------------------------------------------------------ */
export function SlideShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative h-[100dvh] w-full overflow-y-auto no-scrollbar",
        className,
      )}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Slide content container (centered, padded, max-width)               */
/* ------------------------------------------------------------------ */
export function SlideContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className={cn(
        "relative z-10 mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center px-6 py-20 md:px-12 md:py-20 lg:px-16",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow / kicker label                                              */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.32em] text-muted",
        className,
      )}
    >
      <span className="h-px w-7 bg-brand" />
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Glass card                                                          */
/* ------------------------------------------------------------------ */
export function GlassCard({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl",
        glow && "glow-brand",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Connector arrow between flow items                                  */
/* ------------------------------------------------------------------ */
export function Connector({
  orientation = "down",
  className,
  animated = true,
}: {
  orientation?: "down" | "right";
  className?: string;
  animated?: boolean;
}) {
  const isDown = orientation === "down";
  return (
    <div
      className={cn(
        "flex items-center justify-center text-muted",
        isDown ? "h-6 py-0.5" : "w-6 px-0.5",
        className,
      )}
    >
      <svg
        width={isDown ? "14" : "22"}
        height={isDown ? "22" : "14"}
        viewBox="0 0 14 22"
        fill="none"
        className={cn(animated && "animate-pulse-soft")}
      >
        <path
          d={
            isDown
              ? "M7 0 V18 M1.5 12.5 L7 18 L12.5 12.5"
              : "M22 7 H4 M9.5 1.5 L4 7 L9.5 12.5"
          }
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Brand mark                                                          */
/* ------------------------------------------------------------------ */
export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-soft to-brand glow-brand",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2 text-ink">
        <path
          d="M4 6 L9 16 L12 10 L15 16 L20 6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function VeltzLogo({ className }: { className?: string }) {
  return (
    <img src={veltzLogo} alt="VELTZ" className={cn("h-auto object-contain", className)} />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-semibold tracking-tight", className)}>
      VELTZ{" "}
      <span className="text-brand-gradient">
        OS<sup className="text-[0.5em] align-super">™</sup>
      </span>
    </span>
  );
}
