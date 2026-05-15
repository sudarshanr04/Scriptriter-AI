import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function StadiumBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Floodlights */}
      <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-[var(--color-tech)]/15 blur-[120px]" />
      <div className="absolute -top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-drama)]/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--color-alert)]/10 blur-[140px]" />

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), oklch(0.7 0.2 240 / 0.18), transparent 60%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/60"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            boxShadow: "0 0 8px white",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: 6 + (i % 5),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
