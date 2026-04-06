import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';

import FrontendLayout from '@/layouts/frontend-layout';

interface Faq {
    id: number;
    question: string;
    answer: string;
}

interface Props {
    faqs: Faq[];
}

export default function FAQ({ faqs }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <FrontendLayout>
            <Head title="FAQ" />
            <div className="bg-white text-gray-800 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 md:py-12">
                    <div className="text-center mb-8 sm:mb-10">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2 font-inter sm:text-3xl md:text-4xl">Frequently Asked Questions</h1>
                        <p className="text-sm text-gray-500 max-w-2xl mx-auto">Everything you need to know about our service</p>
                    </div>

                    <div className="space-y-2 mb-8 sm:mb-10">
                        {faqs.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={item.id} className="border border-gray-300 rounded-xl overflow-hidden font-inter">
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors font-inter sm:px-5 sm:py-4"
                                    >
                                        <span className="font-semibold">{item.question}</span>
                                        <svg
                                            className={`w-4 h-4 text-gray-900 font-bold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isOpen && (
                                        <div className="px-4 pb-4 sm:px-5">
                                            <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-6 text-center sm:px-6 sm:py-8">
                        <h3 className="font-bold text-gray-900 mb-1 text-base sm:text-lg">Still have questions?</h3>
                        <p className="text-sm text-gray-500 mb-4">Our support team is here to help you 24/7</p>
                        <Link
                            href={route('contact')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors sm:px-5 sm:py-3"
                        >
                            Contact Support
                        </Link>
                    </div>

                    <p className="text-center text-sm font-inter text-gray-500 mt-6 mb-4">Showing {faqs.length} FAQs</p>
                </div>
            </div>

        </FrontendLayout>
    );
}
