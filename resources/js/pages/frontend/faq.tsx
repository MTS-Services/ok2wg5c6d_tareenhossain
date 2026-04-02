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
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-inter">Frequently Asked Questions</h1>
                        <p className="text-sm text-gray-500">Everything you need to know about our service</p>
                    </div>

                    <div className="space-y-2 mb-8">
                        {faqs.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={item.id} className="border border-gray-300 rounded-xl overflow-hidden font-inter ">
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className="w-full flex justify-between items-center px-5 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors font-inter"
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
                                        <div className="px-5 pb-4">
                                            <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-8 text-center">
                        <h3 className="font-bold text-gray-900 mb-1">Still have questions?</h3>
                        <p className="text-sm text-gray-500 mb-4">Our support team is here to help you 24/7</p>
                        <Link
                            href={route('contact')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                        >
                            Contact Support
                        </Link>
                    </div>

                    <p className="text-center text-sm font-inter text-gray-500 mt-6">Showing {faqs.length} FAQs</p>
                </div>
            </div>

        </FrontendLayout>
    );
}
