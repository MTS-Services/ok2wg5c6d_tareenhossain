import { Head } from '@inertiajs/react';

import FrontendLayout from '@/layouts/frontend-layout';

export default function Home() {
    return (
        <FrontendLayout>
            <Head title="Contact Page" />

            <div className="bg-white text-gray-900 container mx-auto">

                <section className=" mb-4 container mx-auto">
                    <div className=" relative overflow-hidden rounded-3xl bg-bg-background-dark px-4 py-40 text-center text-white">
                        <div className="pointer-events-none absolute inset-0 opacity-100">
                            <img src="/assets/images/Home/Frame(1).png" className='w-full h-full ' alt="" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="mb-6 text-5xl font-bold font-inter">Get in Touch</h2>
                            <p className="mx-auto mb-10 max-w-lg text-sm text-gray-400">
                                Have a specific inquiry or just want to say hello? Our team is ready to assist you with your professional needs.
                            </p>
                            <button className="rounded-lg bg-blue-600 px-10 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">CONTACT US</button>
                        </div>
                    </div>
                </section>


                <section className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* Left Side: Contact Form */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-10 shadow-sm">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Message</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tell us how we can help..."
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all resize-none"
                                    />
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-600/20 font-inter">
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Right Side: Directory & Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-inter">Business Directory</h2>
                                <p className="text-gray-500">Direct your inquiry to the right department for a faster response.</p>
                            </div>

                            <div className="space-y-4">
                                {/* Directory Item 1 */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">General Inquiries</p>
                                        <p className="font-bold text-gray-900 font-inter">info@supportleeuriy.com</p>
                                    </div>
                                </div>

                                {/* Directory Item 2 */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sales Department</p>
                                        <p className="font-bold text-gray-900 font-inter">info@supportleeuriy.com</p>
                                    </div>
                                </div>

                                {/* Directory Item 3 */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer Support</p>
                                        <p className="font-bold text-gray-900 font-inter">info@supportleeuriy.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="relative rounded-3xl overflow-hidden h-48 bg-blue-100 flex items-center justify-center border border-gray-100 ">
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
                                <img src="/assets/images/Home/Map.png" alt="Map" className="absolute inset-0 w-full h-full object-cover"></img>
                                <div className="relative text-center">
                                    <svg className="w-8 h-8 text-blue-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>

                                    <p className="text-xs font-bold text-gray-600">Headquarters: New York, NY</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="mt-12 text-center text-lg text-gray-400">Showing 12 products</p>
                </section>
            </div>
        </FrontendLayout>
    );
}
