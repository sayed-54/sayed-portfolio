"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProfileWithBorder from "./ProfileWithBorder";
import { client, urlFor } from "../lib/sanity.client";
import { skillsQuery, testimonialsQuery, profileQuery } from "../lib/sanity.queries";
import { getDynamicIcon } from "../lib/icons";
import FeatureCard from "./components/FeatureCard";
import StatsBar from "./components/StatsBar";
import RevealOnScroll from "./components/RevealOnScroll";
import SpotlightCard from "./components/SpotlightCard";

// 3D scene — dynamic import keeps Three.js off the server bundle
const HeroScene3D = dynamic(() => import("./components/HeroScene3D"), {
  ssr: false,
  loading: () => null,
});

// ─── Icon imports for FeatureCards ───────────────────────────────────────────
import {
  Code2,
  Accessibility,
  Lightbulb,
  Users,
  Globe,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  TYPE: react-typed — loaded dynamically to avoid SSR issues
// ─────────────────────────────────────────────────────────────────────────────
import { ReactTyped } from "react-typed";

// ─────────────────────────────────────────────────────────────────────────────
//  ABOUT ME — default bento cards (shown when Sanity returns nothing)
// ─────────────────────────────────────────────────────────────────────────────
const defaultAboutCards = [
  {
    icon: <Code2 size={20} strokeWidth={1.5} />,
    title: "Clean, maintainable code",
    description: "Passionate about writing readable, well-structured code that scales — always thinking about the next developer.",
  },
  {
    icon: <Accessibility size={20} strokeWidth={1.5} />,
    title: "Accessible by default",
    description: "Experienced in building WCAG-compliant, keyboard-navigable web apps that work for everyone.",
  },
  {
    icon: <Lightbulb size={20} strokeWidth={1.5} />,
    title: "Constant learner",
    description: "Loves exploring modern web technologies — from React Server Components to WebGL — and applying what I learn.",
  },
  {
    icon: <Users size={20} strokeWidth={1.5} />,
    title: "Collaborative team player",
    description: "Focused on great UX/UI and open communication. I thrive in teams where feedback is welcomed.",
  },
  {
    icon: <Globe size={20} strokeWidth={1.5} />,
    title: "Building for everyone",
    description: "Inclusive design isn't optional. Every interface I build considers users of all abilities and contexts.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  TESTIMONIALS — variants for AnimatePresence
// ─────────────────────────────────────────────────────────────────────────────
const testimonialVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0, transition: { duration: 0.3 } }),
};

// ─────────────────────────────────────────────────────────────────────────────
//  HERO SECTION STAGGER
// ─────────────────────────────────────────────────────────────────────────────
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const [skills, setSkills]             = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [profile, setProfile]           = useState<any>(null);
  const [loading, setLoading]           = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [direction, setDirection]       = useState(1);

  // ── Data fetching ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsData, testimonialsData, profileData] = await Promise.all([
          client.fetch(skillsQuery),
          client.fetch(testimonialsQuery),
          client.fetch(profileQuery),
        ]);
        setSkills(skillsData || []);
        setTestimonials(testimonialsData || []);
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching Sanity data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Auto-advance testimonials ──────────────────────────────────────────────
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen py-8 sm:py-10 text-slate-900 dark:text-slate-100">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative max-w-4xl mx-auto text-center min-h-[480px] flex flex-col items-center justify-center overflow-hidden">
        {/* 3D Canvas — absolute, behind content */}
        <HeroScene3D />

        {/* Hero content — z-10 sits above canvas */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center gap-5 py-8"
        >
          {/* Status badge */}
          <motion.div variants={heroItem}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-black/30 border border-white/30 dark:border-white/10 backdrop-blur-md text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot" aria-hidden="true" />
              Available for work
            </span>
          </motion.div>

          {/* Profile image */}
          <motion.div variants={heroItem}>
            <ProfileWithBorder
              imageUrl={profile?.image ? urlFor(profile.image).url() : undefined}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={heroItem}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none"
          >
            Hi, I&apos;m{" "}
            <span className="text-teal-500 dark:text-teal-400">
              {profile?.name ?? "Sayed Ali"}
            </span>
          </motion.h1>

          {/* Animated role tag */}
          <motion.p variants={heroItem} className="text-xl sm:text-2xl font-display font-semibold text-slate-600 dark:text-slate-300">
            <span className="text-teal-500 dark:text-teal-400">
              <ReactTyped
                strings={[
                  profile?.role ?? "Front-End Developer",
                  "React Specialist",
                  "UI Craftsman",
                  "Next.js Builder",
                ]}
                typeSpeed={55}
                backSpeed={30}
                backDelay={1800}
                loop
              />
            </span>
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={heroItem}
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {profile?.bio ??
              "Specializing in Next.js, React, and Tailwind CSS — building fast, accessible, and visually stunning web applications."}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={heroItem} className="flex justify-center gap-4 flex-wrap">
            {/* Primary — teal fill with glow */}
            <button
              onClick={() => router.push("/Projects")}
              className="group relative px-7 py-3 rounded-xl font-display font-semibold text-white bg-teal-500 hover:bg-teal-400 active:scale-95 transition-all duration-200 shadow-glow-teal hover:shadow-brand-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50"
            >
              View Projects
            </button>

            {/* Secondary — outlined glass button */}
            <button
              onClick={() => router.push("/Contact")}
              className="px-7 py-3 rounded-xl font-display font-semibold border-2 border-teal-500/60 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 active:scale-95 transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/30"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════════════════════════════════ */}
      <RevealOnScroll delay={0.05} className="mt-10">
        <StatsBar
          stats={
            profile?.stats ?? [
              { value: 3,  suffix: "+", label: "Years Experience"  },
              { value: 15, suffix: "+", label: "Projects Built"    },
              { value: 5,  suffix: "+", label: "Happy Clients"     },
            ]
          }
        />
      </RevealOnScroll>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT ME — bento feature cards
          ═══════════════════════════════════════════════════════════════════ */}
      <RevealOnScroll className="max-w-3xl mx-auto mb-14">
        <h2 className="font-display text-3xl font-bold mb-7 text-center">About Me</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(profile?.aboutCards ?? defaultAboutCards).map(
            (card: typeof defaultAboutCards[0], i: number) => (
              <FeatureCard
                key={i}
                icon={card.icon ?? <Code2 size={20} strokeWidth={1.5} />}
                title={card.title}
                description={card.description}
                delay={i * 0.07}
              />
            )
          )}
        </div>
      </RevealOnScroll>

      {/* ═══════════════════════════════════════════════════════════════════
          TECH STACK
          Merged Skills + Tech Stack into a single enhanced section.
          Desktop: hover grid. Mobile: auto-scrolling marquee.
          ═══════════════════════════════════════════════════════════════════ */}
      <RevealOnScroll className="max-w-4xl mx-auto mb-14">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Tech Stack</h2>

        {/* ─── Desktop grid ─── */}
        <div className="hidden sm:grid grid-cols-4 md:grid-cols-6 gap-5 max-w-2xl mx-auto">
          {skills.map((skill, i) => (
            <SkillIcon key={skill._id} skill={skill} delay={i * 0.04} />
          ))}
        </div>

        {/* ─── Mobile marquee ─── */}
        <div className="sm:hidden overflow-hidden">
          <div className="flex gap-6 marquee-track" aria-hidden="true">
            {[...skills, ...skills].map((skill, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 w-16">
                <div className="text-3xl">{getDynamicIcon(skill.iconName, skill.color)}</div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS — only shown when Sanity has data
          ═══════════════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <RevealOnScroll className="max-w-3xl mx-auto mb-14">
          <SpotlightCard className="rounded-2xl border border-white/20 bg-white/40 dark:border-white/10 dark:bg-black/20 pt-8 shadow-brand-sm backdrop-blur-xl">
            <div className="relative z-10 pb-6">
              <h2 className="font-display text-3xl font-bold mb-6 text-center">Testimonials</h2>
              <div className="relative h-40 overflow-hidden px-4">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.blockquote
                    key={testimonialIndex}
                    custom={direction}
                    variants={testimonialVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute w-full italic text-slate-600 dark:text-slate-400 text-center px-4"
                  >
                    &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
                    <footer className="mt-4 font-display font-semibold text-teal-500 not-italic">
                      — {testimonials[testimonialIndex].author}
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>
          </SpotlightCard>
        </RevealOnScroll>
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SKILL ICON — Desktop hover card
// ─────────────────────────────────────────────────────────────────────────────
function SkillIcon({ skill, delay = 0 }: { skill: any; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.18, rotate: 4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col items-center gap-2 cursor-pointer"
      aria-label={skill.name}
    >
      <div
        className={`tech-stack-icon w-12 h-12 flex items-center justify-center rounded-xl border border-white/20 dark:border-white/10 backdrop-blur-sm transition-all duration-300 ${
          isHovered
            ? "bg-white/60 dark:bg-black/40 shadow-brand-sm scale-110"
            : "grayscale opacity-60 bg-white/20 dark:bg-black/10"
        }`}
      >
        {getDynamicIcon(skill.iconName, isHovered ? skill.color : undefined)}
      </div>
      <p
        className={`tech-stack-label text-xs font-semibold text-center transition-colors duration-300 ${
          isHovered ? "opacity-100" : "opacity-50 text-gray-500"
        }`}
        style={isHovered ? { color: skill.color ?? "#14b8a6" } : {}}
      >
        {skill.name}
      </p>
    </motion.div>
  );
}
