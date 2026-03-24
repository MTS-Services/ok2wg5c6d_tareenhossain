import { Head } from '@inertiajs/react';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';

export default function Settings() {
    return (
        <>
            <Head title="Settings" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="settings" />

                <div className="flex container mx-auto  bg-white mt-12 lg:mt-0">

                <main className="mx-auto w-full bg-white lg:py-8 py-4 px-4 font-inter text-gray-900">
                    <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 font-inter">Settings</h1>
                    <button className="bg-blue-600 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all">
                        Save All Changes
                    </button>
                    </div>
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-2 mb-6 text-blue-600">
                        <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        >
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h2 className="text-lg font-bold text-gray-800 font-inter">General Settings</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600 font-inter">
                            Website Name
                        </label>
                        <input
                            type="text"
                            defaultValue="Product Showcase"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        />
                        </div>
                        <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600 font-inter">
                            Contact Email
                        </label>
                        <input
                            type="email"
                            defaultValue="contact@showcase.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600 font-inter">
                        Website Logo
                        </label>
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex items-center gap-6">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl uppercase">
                            PS
                        </div>
                        <div className="space-y-1">
                            <button className="text-blue-600 font-bold text-sm hover:underline">
                            Upload new file
                            </button>
                            <p className="text-xs text-gray-400 font-inter">
                            JPG, PNG or SVG. Recommended size 400x400px.
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    <div className="flex items-center gap-2 mb-6 text-blue-600">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        >
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h2 className="text-lg font-bold text-gray-800 font-inter">
                        Tracking Integration
                        </h2>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3 mb-6">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white bg-green-500 rounded-full p-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                        </div>
                        <span className="text-green-700 font-bold text-sm">
                        Google Analytics Connected
                        </span>
                    </div>
                    <div className="space-y-2 mb-8">
                        <label className="text-sm font-semibold text-gray-600 font-inter">
                        Google Analytics Tracking ID
                        </label>
                        <div className="relative max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 font-inter">
                            <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            >
                            <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            defaultValue="G-XXXXXXXXXX"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm"
                        />
                        </div>
                        <p className="text-xs text-gray-400 font-inter">
                        Data collection is currently active for this tracking ID.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                        Disconnect
                        </button>
                        <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all">
                        Test Connection
                        </button>
                    </div>
                    </div>
                    <footer className="mt-12 flex justify-between text-xs text-gray-400 font-medium font-inter">
                    <p>© 2026 Product Showcase Admin. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-600 font-inter">
                        Privacy Policy
                        </a>
                        <a href="#" className="hover:text-gray-600 font-inter">
                        Terms of Service
                        </a>
                    </div>
                    </footer>
                </main>
                </div>

            </div>
        </>
    );
}
