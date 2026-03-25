import React from 'react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Head } from '@inertiajs/react';

export default function Return() {
    return (
        <FrontendLayout>
            <Head title="Return" />
            <section className="bg-white">
            <div className="max-w-7xl mx-auto p-6 space-y-6 font-sans text-gray-800">

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                <div className="bg-violet-100 p-3 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-lg font-bold">30-Day Returns</h2>
                    <p className="text-gray-500 text-sm">If you are not satisfied with your purchase, you can return it for a full refund.</p>
                </div>
                </div>
                <p className="text-gray-600 text-sm">
                We offer a 30-day return policy for all products. If you are not satisfied with your purchase, you can return it for a full refund.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-violet-600 p-6 flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight ">Return Policy</h1>
                </div>

                <div className="p-6 space-y-4">

                <details className="border border-gray-100 rounded-xl bg-gray-50/50 group" open>
                    <summary className="list-none w-full flex items-center justify-between p-5 text-left cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-bold text-sm">Return Window</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-violet-600 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div className="px-5 pb-6">
                        <p className="text-sm text-gray-500 mb-4">You can return your product within 30 days of purchase for a full refund.</p>
                    </div>
                </details>

                <details className="border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                    <summary className="list-none w-full flex items-center justify-between p-5 text-left cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" />
                            </svg>
                            <span className="font-bold text-sm">Return Eligibility</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-violet-600 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div className="px-5 pb-6">
                        <p className="text-sm text-gray-500">You can return your product within 30 days of purchase for a full refund.</p>
                    </div>
                </details>

                <details className="border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                    <summary className="list-none w-full flex items-center justify-between p-5 text-left cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-bold text-sm">Return Process</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-violet-600 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div className="px-5 pb-6">
                        <p className="text-sm text-gray-500">You can return your product within 30 days of purchase for a full refund.</p>
                    </div>
                </details>

                <details className="border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                    <summary className="list-none w-full flex items-center justify-between p-5 text-left cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="font-bold text-sm">Return Conditions</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-violet-600 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div className="px-5 pb-6">
                        <p className="text-sm text-gray-500">You can return your product within 30 days of purchase for a full refund.</p>
                    </div>
                </details>

                </div>
            </div>
            </div>
            </section>
        </FrontendLayout>
    );
}
