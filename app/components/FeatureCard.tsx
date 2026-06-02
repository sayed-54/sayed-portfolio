"use client";

/**
 * FeatureCard — Bento-style card for About Me section
 *
 * Each "about me" bullet point becomes a feature card with
 * an icon, title, and description. Uses SpotlightCard for
 * the cursor-reactive border effect.
 */

import SpotlightCard from "./SpotlightCard";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpotlightCard className="h-full rounded-2xl border border-white/20 bg-white/40 dark:border-white/10 dark:bg-black/20 backdrop-blur-xl p-5 shadow-brand-sm hover:-translate-y-1 transition-transform duration-300 feature-card">
        {/* Content sits above the ::before spotlight overlay */}
        <div className="relative z-10 flex flex-col gap-3 h-full">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/15 flex items-center justify-center text-brand-primary shrink-0">
            {icon}
          </div>
          <h3 className="font-display font-semibold text-base text-slate-900 dark:text-slate-100 leading-snug">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
