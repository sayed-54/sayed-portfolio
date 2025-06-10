"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail, Phone, User, MessageSquare } from "lucide-react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/xovawbpy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("Thank you for your message. I will reply to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
        triggerConfetti();
      } else {
        setFormStatus("Oops! There was a problem submitting your form.");
      }
    } catch {
      setFormStatus("Oops! There was a problem submitting your form.");
    }
    setIsModalOpen(true);
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const inputClass =
    "w-full bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white " +
    "placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-teal-500 " +
    "py-3 px-4 pl-11 rounded-lg transition duration-200";

  return (
    <div className="relative divide-y divide-teal-300 dark:divide-gray-700">
      <div className="space-y-2 pt-5 pb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
          Contact
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 pt-5">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions or you wanna order, feel free to reach out by filling out this form.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl group overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 ease-in-out pointer-events-none z-0 before:absolute before:inset-0 before:bg-[conic-gradient(at_top_left,rgba(0,255,255,0.1),transparent)] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15),transparent_70%)] blur-xl rounded-2xl" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            {["name", "email", "phone"].map((field, idx) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.4 }}
                className="space-y-2 relative"
              >
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 peer-focus:text-teal-500 peer-focus:scale-110 pointer-events-none">
                    <Tippy content={`Enter your ${field}`} animation="scale">
                      {{
                        name: <User className="w-5 h-5" />,
                        email: <Mail className="w-5 h-5" />,
                        phone: <Phone className="w-5 h-5" />,
                      }[field as "name" | "email" | "phone"]}
                    </Tippy>
                  </div>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    id={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required={field !== "phone"}
                    className={`${inputClass} peer`}
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2 relative"
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-gray-400 transition-all duration-300 peer-focus:text-teal-500 peer-focus:scale-110 pointer-events-none">
                  <Tippy content="Write your message" animation="scale">
                    <MessageSquare className="w-5 h-5" />
                  </Tippy>
                </div>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={`${inputClass} peer pl-11`}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                type="submit"
                className="w-full relative px-6 py-3 rounded-lg bg-teal-500 text-white font-medium shadow-md overflow-hidden group hover:bg-teal-600 transition"
              >
                <span className="absolute inset-0 w-full h-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0.15),transparent)] group-hover:animate-spin-slow z-0" />
                <span className="relative z-10">Send Message</span>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              ref={modalRef}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl max-w-md w-full"
            >
              <p
                className={`text-lg font-semibold ${
                  formStatus.includes("Thank you") ? "text-green-500" : "text-red-500"
                }`}
              >
                {formStatus}
              </p>
              <button
                onClick={closeModal}
                className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
