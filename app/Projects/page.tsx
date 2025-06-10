"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import projects from "../../content/project.json";

import {
  FaReact,
  FaGithub,
  FaStripe,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiFormspree,
  SiSanity,
} from "react-icons/si";

const techIcons: Record<string, JSX.Element> = {
  react: <FaReact className="text-sky-500" />,
  tailwind: <SiTailwindcss className="text-cyan-500" />,
  nextjs: <SiNextdotjs className="dark:text-white text-black" />,
  typescript: <SiTypescript className="text-blue-500" />,
  stripe: <FaStripe className="text-indigo-500" />,
  github: <FaGithub />,
  html: <FaHtml5 className="text-orange-500" />,
  css: <FaCss3Alt className="text-blue-600" />,
  nodejs: <FaNodeJs className="text-green-600" />,
  formspree: <SiFormspree className="text-red-500" />,
  sanity: <SiSanity className="text-red-600" />,
};

export default function Projects() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-20 bg-white dark:bg-black">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
      >
        Featured Projects
      </motion.h2>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ boxShadow: "0 0 0 rgba(0, 255, 255, 0)" }}
            whileHover={{
              scale: 1.05,
              y: -8,
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
            }}
            animate={{
              transition: {
                duration: 0.6,
                ease: "easeInOut",
              },
            }}
            className="relative group rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-lg transition-all duration-300"
          >
            {/* Animated glowing gradient border */}
            <div className="absolute inset-0 z-0 rounded-3xl before:absolute before:inset-0 before:rounded-3xl before:bg-[conic-gradient(at_top_left,_#00f0ff,transparent,_#00f0ff)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 before:animate-spin-slow pointer-events-none" />

            <div className="relative z-10 w-full h-56 sm:h-64 md:h-72 overflow-hidden">
              <Image
                src={project.image[0]}
                alt={project.name}
                layout="fill"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-6 flex flex-col gap-4 relative z-10">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {project.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {project.description}
              </p>

              {project.tools && (
                <div className="flex gap-3 flex-wrap mt-2">
                  {project.tools.map((tool: string) => {
                    const key = tool.toLowerCase();
                    return (
                      <div
                        key={tool}
                        className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-sm text-gray-600 dark:text-gray-300"
                      >
                        {techIcons[key]}
                        <span>{tool}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-teal-500 hover:bg-teal-600 text-white transition-transform hover:scale-105"
                >
                  View Website
                </Link>

                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium rounded-md bg-gray-700 hover:bg-gray-800 text-white transition-transform hover:scale-105"
                  >
                    GitHub
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
