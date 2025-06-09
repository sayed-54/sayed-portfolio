"use client";
import Image from "next/image";
import Link from "next/link";
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

import pfpcollege from "../public/pfp college.png"// adjust the path if needed

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
      quote:
        "Sayed is a phenomenal developer who always delivers clean and efficient code.",
      author: "Jane Doe, Client",
    },
  ];

  return (
    <main className="min-h-screen px-6 pt-8 pb-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <section aria-label="Introduction" className="max-w-4xl mx-auto text-center space-y-6">
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
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-400"
            aria-label="View Projects"
          >
            View Projects
          </button>
          <button
            onClick={() => router.push("/Contact")}
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-md shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-600"
            aria-label="Contact Me"
          >
            Contact Me
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section aria-label="About Me" className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">About Me</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 text-lg">
          <li>
            Passionate about writing{" "}
            <span className="text-teal-500 font-semibold">
              clean, maintainable code
            </span>{" "}
            that scales.
          </li>
          <li>
            Experienced in creating{" "}
            <span className="text-teal-500 font-semibold">accessible</span> and
            performant web apps.
          </li>
          <li>
            Constant learner who loves exploring{" "}
            <span className="text-teal-500 font-semibold">
              modern web technologies
            </span>
            .
          </li>
          <li>
            Collaborative team player focused on{" "}
            <span className="text-teal-500 font-semibold">great UX/UI</span>.
          </li>
          <li>
            I believe in{" "}
            <span className="text-teal-500 font-semibold">
              building for everyone
            </span>{" "}
            — inclusive design is key.
          </li>
        </ul>
      </section>

      {/* Skills with React Icons */}
      <section aria-label="Skills" className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-lg mx-auto" role="list">
          {skills.map(({ name, icon }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
              role="listitem"
              tabIndex={0}
              aria-label={name}
            >
              {icon}
              <span className="text-lg font-semibold">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Logos - using same icons */}
      <section aria-label="Tech Stack" className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
        <div className="flex justify-center flex-wrap gap-8">
          {skills.map(({ name, icon }) => (
            <div
              key={name}
              className="w-16 h-16 flex flex-col items-center justify-center cursor-default filter grayscale hover:grayscale-0 transition"
              aria-hidden="true"
            >
              {icon}
              <p className="mt-2 text-sm">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section aria-label="Testimonials" className="max-w-3xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Testimonials</h2>
        {testimonials.map(({ quote, author }, i) => (
          <blockquote key={i} className="mb-6 italic text-gray-600 dark:text-gray-400">
            “{quote}”
            <footer className="mt-2 font-semibold text-teal-500">{author}</footer>
          </blockquote>
        ))}
      </section>

      {/* Personal Branding Footer */}
      <footer className="max-w-4xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Sayed Ali. Designed and built with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          using Next.js and Tailwind CSS.
        </p>
      </footer>
    </main>
  );
}
