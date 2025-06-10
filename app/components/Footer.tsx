'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FaXTwitter ,FaWhatsapp } from "react-icons/fa6";


const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 py-8 px-4 text-center text-sm text-gray-500 dark:text-gray-400 animate-fade-in">
      {/* Social Icons */}
      <div className="flex justify-center mb-4 space-x-6">
        <a
          href="https://github.com/sayed-54"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 dark:hover:text-white transition"
        >
          <FaGithub size={22} />
        </a>
        <a
          href="https://www.linkedin.com/in/sayed-ali-03bb2a326/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#0077B5]  transition"
        >
          <FaLinkedin size={22} />
        </a>
        <a
          href="https://x.com/Urfav1Slayer"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition dark:hover:text-white"
        >
          <FaXTwitter size={22} />
        </a>
        <a
          href="https://wa.me/+201018102365"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500 transition"
        >
          <FaWhatsapp size={22} />
        </a>
      </div>

      {/* Copyright */}
      <p className="tracking-wide mb-4">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          Sayed Ali
        </span>
        . Built with{" "}
        <span className="font-medium text-teal-500 dark:text-teal-400">
          Next.js
        </span>{" "}
        and{" "}
        <span className="font-medium text-teal-500 dark:text-teal-400">
          Tailwind CSS
        </span>
        .
      </p>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="mx-auto mt-2 flex items-center space-x-2 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-600 transition-all duration-300"
      >
        <ArrowUp className="w-4 h-4" />
        <span>Back to top</span>
      </button>
    </footer>
  );
};

export default Footer;
