"use client";

import { useRouter } from "next/navigation";
import {
  FaReact,
  FaJsSquare,
  FaNodeJs,
  FaCss3Alt,
  FaHtml5,
  FaGithub,
  FaNpm,
} from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ProfileWithBorder from "./ProfileWithBorder";
import { client } from "../lib/sanity.client";
import { skillsQuery, testimonialsQuery, profileQuery } from "../lib/sanity.queries";
import { getDynamicIcon } from "../lib/icons";

export default function Home() {
  const router = useRouter();
  const [skills, setSkills] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

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

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <main className="min-h-screen py-8 sm:py-10 text-slate-900 dark:text-slate-100">
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <ProfileWithBorder />
        <h1 className="text-5xl font-extrabold tracking-tight">
          Hi, I’m <span className="text-teal-500">{profile?.name || "Sayed Ali"}</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          I’m a{" "}
          <strong className="text-teal-500">{profile?.role || "Front-End Developer"}</strong>{" "}
          {profile?.bio || (
            <>
              specializing in{" "}
              <span className="text-teal-500 font-semibold">Next.js</span>,{" "}
              <span className="text-teal-500 font-semibold">React</span>, and{" "}
              <span className="text-teal-500 font-semibold">Tailwind CSS</span>. I
              build fast, accessible, and visually stunning web applications.
            </>
          )}
        </p>
        <div className="flex justify-center gap-6 flex-wrap pb-4">
          <button
            onClick={() => router.push("/Projects")}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition transform hover:scale-105"
          >
            View Projects
          </button>
          <button
            onClick={() => router.push("/Contact")}
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-md shadow-md transition transform hover:scale-105"
          >
            Contact Me
          </button>
        </div>
      </section>

      <section className="max-w-3xl mx-auto rounded-2xl border border-white/20 bg-white/50 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20 mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">About Me</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-800 dark:text-gray-300 text-lg">
          {profile?.aboutMe ? (
            profile.aboutMe.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))
          ) : (
            <>
              <li>Passionate about writing <span className="text-teal-500 font-semibold">clean, maintainable code</span> that scales.</li>
              <li>Experienced in creating <span className="text-teal-500 font-semibold">accessible</span> and performant web apps.</li>
              <li>Constant learner who loves exploring <span className="text-teal-500 font-semibold">modern web technologies</span>.</li>
              <li>Collaborative team player focused on <span className="text-teal-500 font-semibold">great UX/UI</span>.</li>
              <li>I believe in <span className="text-teal-500 font-semibold">building for everyone</span> — inclusive design is key.</li>
            </>
          )}
        </ul>
      </section>

      {/* Skills */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg mx-auto">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/20 bg-white/40 p-4 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-black/20"
              tabIndex={0}
              aria-label={skill.name}
            >
              {getDynamicIcon(skill.iconName, skill.color)}
              <span className="text-lg font-semibold">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
        <div className="flex justify-center flex-wrap gap-8">
          {skills.map((skill) => (
            <SkillIcon key={skill._id} skill={skill} getDynamicIcon={getDynamicIcon} />
          ))}
        </div>
      </section>

      {/* Testimonials with animation */}
      <section className="max-w-3xl mx-auto mb-12 rounded-2xl border border-white/20 bg-white/40 pt-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
        <h2 className="text-3xl font-bold mb-6 text-center">Testimonials</h2>
        <div className="relative h-40 overflow-hidden">
          {testimonials.length > 0 ? (
            <AnimatePresence initial={false} custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full italic text-gray-600 dark:text-gray-400 text-center px-4"
              >
                “{testimonials[index].quote}”
                <footer className="mt-4 font-semibold text-teal-500">
                  {testimonials[index].author}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          ) : (
            <p className="text-center text-gray-500">No testimonials yet.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="max-w-4xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Sayed Ali. Designed and built with{" "}
          <span role="img" aria-label="heart">❤️</span> using Next.js and Tailwind CSS.
        </p>
      </footer> */}
    </main>
  );
}

function SkillIcon({ skill, getDynamicIcon }: { skill: any; getDynamicIcon: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-16 h-16 flex flex-col items-center justify-center transition-all duration-300"
      aria-hidden="true"
    >
      <div className={`tech-stack-icon transition-all duration-300 ${isHovered ? "scale-110" : "grayscale opacity-70"}`}>
        {getDynamicIcon(skill.iconName, isHovered ? skill.color : undefined)}
      </div>
      <p
        className={`mt-2 text-sm transition-colors duration-300 tech-stack-label ${isHovered ? "font-medium text-opacity-100" : "text-gray-500"
          }`}
        style={isHovered ? { color: skill.color || "#14b8a6" } : {}}
      >
        {skill.name}
      </p>
    </div>
  );
}
