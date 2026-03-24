import { Head } from '@inertiajs/react';
import * as React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function AuthLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black p-6">
            <Head title={title} />

            <div className="pointer-events-none absolute left-20 top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-20 right-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-[120px]" />

            <div className="relative flex min-h-screen items-center justify-center">
                <main className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                    <header className="mb-10 text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-500 to-emerald-400 p-0.5">
                            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-900">
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                        <p className="mt-2 text-sm text-gray-500">{description}</p>
                    </header>

                    {children}
                </main>
            </div>
        </div>
    );
}
