"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Themebutton from "./Themebutton";
import { useEffect, useRef } from "react";

export default function Navbar() {
    let pathname = usePathname() || "/";
    const disclosurePanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (disclosurePanelRef.current && disclosurePanelRef.current.classList.contains('open')) {
                const handle = () => {
                    disclosurePanelRef.current?.classList.remove('open');
                    disclosurePanelRef.current?.classList.add('close');
                }
                handle();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Disclosure as="nav" className="relative">
            {({ open }) => (
                <>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="justify-between flex w-full">
                                {/* Navbar Title */}
                                <div className="flex items-center md:justify-start justify-center">
                                    <Link href="/">
                                        <h1 className="text-4xl font-bold">
                                            Sayed <span className="text-teal-500">Ali</span>
                                        </h1>
                                    </Link>
                                </div>
                                {/* Navbar Items */}
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                                    <Link
                                        href="/"
                                        prefetch
                                        className={`${pathname === "/"
                                            ? "border-teal-500 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                                            : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium "}`}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/Projects"
                                        prefetch
                                        className={`${pathname === "/Projects"
                                            ? "border-teal-500 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                                            : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium "}`}
                                    >
                                        Projects
                                    </Link>
                                    <Link
                                        href="/Contact"
                                        prefetch
                                        className={`${pathname === "/Contact"
                                            ? "border-teal-500 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                                            : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium "}`}
                                    >
                                        Contact
                                    </Link>
                                    <Themebutton />
                                </div>
                            </div>

                            <div className="-mr-2 flex items-center sm:hidden">
                                <DisclosureButton
                                    className="inline-flex items-center justify-center p-2 rounded-md mx-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none 
                                     focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:hover:bg-gray-800"
                                >
                                    {open ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18 18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                            />
                                        </svg>
                                    )}
                                </DisclosureButton>
                                <Themebutton />
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel
                        ref={disclosurePanelRef}
                        className={`sm:hidden transition-transform duration-500 ease-in-out transform ${
                            open ? "translate-y-0 opacity-100 border border-gray-200 dark:border-gray-700" : "translate-y-[-100%] opacity-0"
                        }`}
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                href="/"
                                prefetch
                                className={`${pathname === "/"
                                    ? 'bg-teal-50 border-teal-500 text-teal-500 block pl-3 pr-4 py-2 border-l-4 text-xl font-medium dark:bg-gray-800'
                                    : 'border-transparent dark:text-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:font-medium hover:text-black block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-lg font-medium hover:dark:text-white'} `}
                            >
                                Home
                            </Link>
                        </div>
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                href="/Projects"
                                prefetch
                                className={`${pathname === "/Projects"
                                    ? 'bg-teal-50 border-teal-500 text-teal-500 block pl-3 pr-4 py-2 border-l-4 text-xl font-medium dark:bg-gray-800'
                                    : 'border-transparent dark:text-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:font-medium hover:text-black block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-lg font-medium hover:dark:text-white'} `}
                            >
                                Projects
                            </Link>
                        </div>
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                href="/Contact"
                                prefetch
                                className={`${pathname === "/Contact"
                                    ? 'bg-teal-50 border-teal-500 text-teal-500 block pl-3 pr-4 py-2 border-l-4 text-xl font-medium dark:bg-gray-800'
                                    : 'border-transparent dark:text-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:font-medium hover:text-black block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-lg font-medium hover:dark:text-white'} `}
                            >
                                Contact
                            </Link>
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
