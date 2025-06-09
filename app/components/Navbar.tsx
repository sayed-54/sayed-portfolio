'use client';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Themebutton from './Themebutton';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -10, pointerEvents: 'none' as const, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: 'auto' as const,
    height: 'auto',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    pointerEvents: 'none' as const,
    height: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function Navbar() {
  const pathname = usePathname() || '/';
  const [isOpen, setIsOpen] = useState(false);
  const disclosureRef = useRef<HTMLDivElement>(null);

  // Close menu on scroll, but ignore scrolls for 200ms after opening
  useEffect(() => {
    if (!isOpen) return;

    let ignoreScroll = true;
    const timeout = setTimeout(() => {
      ignoreScroll = false;
    }, 500); // ignore scroll events for 200ms after open

    const handleScroll = () => {
      if (isOpen && !ignoreScroll) setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        disclosureRef.current &&
        !disclosureRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const navLinkClass = (href: string) =>
    pathname === href
      ? `relative text-teal-500 dark:text-teal-400 inline-flex items-center px-3 pt-1.5 pb-2 text-lg font-semibold transition 
         after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-teal-500 dark:after:bg-teal-400`
      : `relative text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 inline-flex items-center px-3 pt-1.5 pb-2 text-lg font-medium transition
         after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-teal-500 dark:after:bg-teal-400 after:rounded-full after:transition-all hover:after:w-full`;

  const mobileLinkClass = (href: string) =>
    pathname === href
      ? 'block bg-teal-100 dark:bg-gray-800 text-teal-700 dark:text-teal-400 pl-3 pr-4 py-2 text-xl font-semibold rounded-md'
      : 'block text-gray-700 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-700 pl-3 pr-4 py-2 text-lg font-medium transition-colors duration-200 rounded-md';

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 shadow-sm relative"
      ref={disclosureRef}
      defaultOpen={false}
    >
      {() => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <Link href="/">
                <h1 className="text-4xl font-extrabold cursor-pointer select-none tracking-tight">
                  Sayed <span className="text-teal-500">Ali</span>
                </h1>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden sm:flex sm:space-x-8 sm:items-center">
                <Link href="/" prefetch className={navLinkClass('/')}>
                  Home
                </Link>
                <Link href="/Projects" prefetch className={navLinkClass('/Projects')}>
                  Projects
                </Link>
                <Link href="/Contact" prefetch className={navLinkClass('/Contact')}>
                  Contact
                </Link>
                <Themebutton />
              </div>

              {/* Mobile Toggle */}
              <div className="sm:hidden flex items-center gap-2">
                <DisclosureButton
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-teal-600 hover:bg-gray-200
                    dark:text-gray-400 dark:hover:text-teal-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                  }}
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  )}
                </DisclosureButton>
                <Themebutton />
              </div>
            </div>
          </div>

          {/* Mobile Menu with framer-motion animation */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <DisclosurePanel
                as={motion.div}
                static
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                className="sm:hidden px-4 pt-4 pb-6 space-y-4 overflow-visible bg-white dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 rounded-b-md shadow-sm z-50 relative"
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
              >
                {[
                  { href: '/', label: 'Home' },
                  { href: '/Projects', label: 'Projects' },
                  { href: '/Contact', label: 'Contact' },
                ].map(({ href, label }) => (
                  <motion.div key={href} variants={linkVariants} className="w-full">
                    <Link
                      href={href}
                      prefetch
                      onClick={() => setIsOpen(false)}
                      className={mobileLinkClass(href)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </DisclosurePanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}
