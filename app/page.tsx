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

export default function Home() {
  const router = useRouter();

  const skills = [
    { name: "React", icon: <FaReact size={36} className="text-teal-500" /> },
    { name: "Next.js", icon: <SiNextdotjs size={36} className="text-black" /> },
    { name: "JavaScript", icon: <FaJsSquare size={36} className="text-yellow-400" /> },
    { name: "Node.js", icon: <FaNodeJs size={36} className="text-green-600" /> },
    { name: "CSS3", icon: <FaCss3Alt size={36} className="text-blue-600" /> },
    { name: "HTML5", icon: <FaHtml5 size={36} className="text-orange-600" /> },
    { name: "GitHub", icon: <FaGithub size={36} className="text-gray-800 dark:text-gray-300" /> },
    { name: "NPM", icon: <FaNpm size={36} className="text-red-600" /> },
  ];

  const testimonials = [
    {
      quote: "Sayed is a phenomenal developer who always delivers clean and efficient code.",
      author: "Jane Doe, Client",
    },
    {
      quote: "His attention to detail and creative mindset are truly remarkable.",
      author: "John Smith, Designer",
    },
    {
      quote: "Always a pleasure to work with, and consistently exceeds expectations.",
      author: "Sara Lee, Project Manager",
    },
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
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
    <main className="min-h-screen px-6 pt-8 pb-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <ProfileWithBorder />
        <h1 className="text-5xl font-extrabold tracking-tight">
          Hi, I’m <span className="text-teal-500">Sayed Ali</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          I’m a{" "}
          <strong className="text-teal-500">Front-End Developer</strong>{" "}
          specializing in{" "}
          <span className="text-teal-500 font-semibold">Next.js</span>,{" "}
          <span className="text-teal-500 font-semibold">React</span>, and{" "}
          <span className="text-teal-500 font-semibold">Tailwind CSS</span>. I
          build fast, accessible, and visually stunning web applications.
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

      {/* About Me */}
      <section className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">About Me</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 text-lg">
          <li>Passionate about writing <span className="text-teal-500 font-semibold">clean, maintainable code</span> that scales.</li>
          <li>Experienced in creating <span className="text-teal-500 font-semibold">accessible</span> and performant web apps.</li>
          <li>Constant learner who loves exploring <span className="text-teal-500 font-semibold">modern web technologies</span>.</li>
          <li>Collaborative team player focused on <span className="text-teal-500 font-semibold">great UX/UI</span>.</li>
          <li>I believe in <span className="text-teal-500 font-semibold">building for everyone</span> — inclusive design is key.</li>
        </ul>
      </section>

      {/* Skills */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-lg mx-auto">
          {skills.map(({ name, icon }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
              tabIndex={0}
              aria-label={name}
            >
              {icon}
              <span className="text-lg font-semibold">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
        <div className="flex justify-center flex-wrap gap-8">
          {skills.map(({ name, icon }) => (
            <div
              key={name}
              className="w-16 h-16 flex flex-col items-center justify-center filter grayscale hover:grayscale-0 transition"
              aria-hidden="true"
            >
              {icon}
              <p className="mt-2 text-sm">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials with animation */}
      <section className="max-w-3xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-lg  pt-8 shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Testimonials</h2>
        <div className="relative h-40 overflow-hidden">
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
