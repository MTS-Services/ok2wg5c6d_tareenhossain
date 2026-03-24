import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

import FrontendLayout from '@/layouts/frontend-layout';

export default function FAQ() {
    const faqItems = [
        {
            question: 'How does delivery work?',
            answer:
                "We offer flexible delivery slots throughout the day. Choose your preferred time during checkout, and we'll deliver your groceries right to your doorstep. Same-day delivery is available for orders placed before 2 PM.",
        },
        {
            question: 'What is your return policy?',
            answer:
                "We accept returns within 30 days of purchase. Items must be unused and in their original packaging. Contact our support team to initiate a return and we'll guide you through the process.",
        },
        {
            question: 'Do you have minimum order requirements?',
            answer:
                'Yes, we have a minimum order of $20 for standard delivery. However, there is no minimum order for in-store pickup. Orders above $50 qualify for free delivery.',
        },
        {
            question: 'How fresh are your products?',
            answer:
                'All our produce is sourced daily from local farms and suppliers. We prioritize freshness and quality, ensuring that perishables are restocked every morning before deliveries begin.',
        },
        {
            question: 'Can I modify my order after placing it?',
            answer:
                'You can modify your order up to 1 hour before the scheduled delivery time. Log in to your account, navigate to your active orders, and make the changes needed.',
        },
        {
            question: 'What payment methods do you accept?',
            answer:
                'We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and cash on delivery. All online transactions are secured with 256-bit encryption.',
        },
        {
            question: 'Do you offer subscription plans?',
            answer:
                'Yes! Our subscription plans offer weekly or monthly deliveries at a discounted rate. Subscribers also get early access to new products and exclusive deals.',
        },
        {
            question: 'How do I track my order?',
            answer:
                "Once your order is dispatched, you'll receive an SMS and email with a tracking link. You can also track your order in real time through your account dashboard.",
        },
    ];
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
                        {faqItems.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={item.question} className="border border-gray-300 rounded-xl overflow-hidden font-inter ">
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
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                            Contact Support
                        </button>
                    </div>

                    <p className="text-center text-sm font-inter text-gray-500 mt-6">Showing 12 products</p>
                </div>
            </div>

        </FrontendLayout>
    );
}
