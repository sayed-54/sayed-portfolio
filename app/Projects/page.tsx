"use client";
import Image from 'next/image';
import Link from 'next/link';
import projects from '../../content/project.json';

export default function Projects() {
    return (
        <div className="divide-y divide-teal-300 dark:divide-gray-700">
            <div className="space-y-2 pt-5 pb-8 md:space-x-5">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-10">
                    Projects
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2 xl:gap-8 mb-12">
                {projects.map((project, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col overflow-hidden rounded-lg shadow-lg shadow-gray-300 dark:shadow-teal-800 bg-white dark:bg-gray-800 mt-12 hover:shadow-gray-400 dark:hover:shadow-teal-800  transform transition-transform duration-300 hover:scale-105 hover:shadow-xl "
                    >
                        <div className="relative w-full h-48">
                            <Image
                                alt={project.name}
                                src={project.image[0]}
                                className="object-cover"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="p-4 flex flex-col items-center">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
                                {project.name}
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
                                {project.description}
                            </p>

                            <div className="mt-4 flex space-x-4">
                                <Link 
                                    href={project.url} 
                                    passHref
                                    className="inline-block px-6 py-2 text-white bg-teal-500 dark:bg-teal-600 rounded-lg hover:bg-teal-600 dark:hover:bg-teal-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Website
                                </Link>
                                
                                {project.github && (
                                    <Link 
                                        href={project.github} 
                                        passHref
                                        className="inline-block px-6 py-2 text-white bg-gray-600 dark:bg-gray-700 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View GitHub
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
