"use client";
import { useState, useRef, useEffect } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null); // Explicitly typing the ref as HTMLDivElement

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await fetch('https://formspree.io/f/xovawbpy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus('Thank you for your message. I will reply to you soon.');
                setFormData({ name: '', email: '', phone: '', message: '' }); // Clear the form
            } else {
                setFormStatus('Oops! There was a problem submitting your form.');
            }
        } catch (error) {
            setFormStatus('Oops! There was a problem submitting your form.');
        }

        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle clicks outside the modal
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        }

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);

    return (
        <div className="relative divide-y divide-teal-300 dark:divide-gray-700">
            <div className="space-y-2 pt-5 pb-8 md:space-x-5">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-10">
                    Contact
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2 xl:gap-8 mb-12">
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Get in Touch</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        If you have any questions or you wanna order, feel free to reach out by filling out this form .
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Name"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100"
                            placeholder="Phone number"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Type Your Enquiry here"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100"
                        ></textarea>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ease-in-out"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        ref={modalRef}
                        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 scale-95 sm:scale-100"
                    >
                        <p className={`text-lg font-medium ${formStatus.includes('Thank you') ? 'text-green-500' : 'text-red-500'} mb-4`}>
                            {formStatus}
                        </p>
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 text-white bg-teal-500 hover:bg-teal-600 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
