"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity.client";
import { projectsQuery } from "../../lib/sanity.queries";
import { urlFor } from "../../lib/sanity.image";
import { getDynamicIcon } from "../../lib/icons";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(projectsQuery);
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center text-slate-900 dark:text-slate-100 mb-12"
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
            className="group rounded-2xl border border-white/20 bg-white/10 p-5 shadow-sm backdrop-blur-xl transition hover:shadow-xl dark:border-white/10 dark:bg-black/20 overflow-hidden"
          >
            <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
              {project.image && (
                <Image
                  src={urlFor(project.image).url()}
                  alt={project.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              )}
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-teal-500 transition-colors">
              {project.name}
            </h3>
            
            <p className="text-black dark:text-slate-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {project.techStack && (
              <div className="flex gap-2 flex-wrap mb-4">
                {project.techStack
                  ?.filter((tool: any) => typeof tool === 'object' && tool !== null && tool.name)
                  .map((tool: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-white/10 border border-white/10 px-2.5 py-1 rounded-full text-xs text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-md transition hover:bg-white/20"
                    >
                      {getDynamicIcon(tool.iconName, tool.color, 14)}
                      <span className="font-medium">{tool.name}</span>
                    </div>
                  ))}
              </div>
            )}

            <div className="flex gap-3 mt-auto">
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
