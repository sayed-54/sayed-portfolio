"use client";

/**
 * StatsBar — Animated counter stats section
 *
 * Shows key numbers (years experience, projects built, happy clients)
 * with animated count-up on scroll entry using Framer Motion.
 *
 * All stats are Sanity-driven. If Sanity returns no values,
 * defaults are used so the section always looks complete.
 */

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface StatsBarProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: 3,  suffix: "+", label: "Years Experience"  },
  { value: 15, suffix: "+", label: "Projects Built"    },
  { value: 5,  suffix: "+", label: "Happy Clients"     },
];

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return <span ref={ref} className="stat-number">{count}</span>;
}

export default function StatsBar({ stats = defaultStats }: StatsBarProps) {
  return (
    <section className="max-w-3xl mx-auto mb-12">
      <div className="rounded-2xl border border-white/20 bg-white/30 dark:border-white/10 dark:bg-black/20 backdrop-blur-xl shadow-brand-sm">
        <div className="grid grid-cols-3 divide-x divide-white/20 dark:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: i * 0.12,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center justify-center py-6 px-4 gap-1"
            >
              <p className="text-3xl sm:text-4xl font-display font-bold text-brand-primary tracking-tight">
                <CountUp target={stat.value} />
                <span>{stat.suffix ?? ""}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium text-center leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
