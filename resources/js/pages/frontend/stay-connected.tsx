import { Head } from '@inertiajs/react';
import { Phone, ShieldCheck, Lock } from 'lucide-react';
import React, { useState } from 'react';

import FrontendLayout from '@/layouts/frontend-layout';
import { cn } from '@/lib/utils';
export default function StayConnected() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [agreed, setAgreed] = useState(false);

    return (
        <FrontendLayout>
            <Head title="Stay Connected" />
            <section className="bg-white py-20 px-4">
            <div className="max-w-2xl mx-auto bg-gray-50/50 border border-gray-100 rounded-[2.5rem] p-8 md:p-16 text-center shadow-sm">

                {/* Icon Header */}
                <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                </div>

                {/* Title & Description */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Connected</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    Get instant text alerts about exclusive offers, order updates, and important notifications.
                </p>

                {/* Subscription Form */}
                <form className="space-y-6 text-left max-w-md mx-auto">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700 ml-1">Phone Number</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <Phone className="w-4 h-4" />
                            </div>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="(555) 123-4567"
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder:text-gray-300 shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Consent Checkbox */}
                    <label className="flex gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                            className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-[11px] leading-relaxed text-gray-500 select-none">
                            By submitting my phone number, I agree to receive text alerts, promotional messages, and notifications from this company. I understand that message and data rates may apply, and I can opt out at any time by replying STOP.
                        </span>
                    </label>

                    <button
                        type="submit"
                        disabled={!agreed}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold text-sm transition-all shadow-lg",
                            agreed
                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        )}
                    >
                        Get Text Alerts
                    </button>
                </form>

                {/* Privacy/Safety Badges */}
                <div className="mt-12 space-y-6 text-left max-w-md mx-auto border-t border-gray-100 pt-8">
                    <div className="flex gap-4">
                        <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                        <div>
                            <h4 className="text-[12px] font-bold text-gray-800">Your Privacy Matters</h4>
                            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                                We are committed to protecting your privacy and will not share your phone number with third parties for marketing purposes without your consent.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Lock className="w-5 h-5 text-green-500 shrink-0" />
                        <div>
                            <h4 className="text-[12px] font-bold text-gray-800">How We Use Your Information</h4>
                            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                                Your phone number will be used exclusively to send you text alerts about your account activity, promotional offers, and service notifications.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Data Protection Text */}
                <div className="mt-10 p-5 bg-gray-100/50 rounded-2xl text-left">
                    <p className="text-[10px] text-gray-400 leading-relaxed italic">
                        <strong className="text-gray-500">Data Protection:</strong> We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and is only accessible to authorized personnel who need it to provide our services.
                    </p>
                </div>

                <div className="mt-8 text-[10px] text-gray-400 space-y-2">
                    <p>By using this service, you acknowledge that you have read and understood our <a href="#" className="underline hover:text-blue-500 transition-colors">Privacy Policy</a> and <a href="#" className="underline hover:text-blue-500 transition-colors">Terms of Service</a>.</p>
                    <p>Standard message and data rates may apply. Text HELP for help or STOP to cancel.</p>
                </div>
            </div>
        </section>
        </FrontendLayout>
    );
}
