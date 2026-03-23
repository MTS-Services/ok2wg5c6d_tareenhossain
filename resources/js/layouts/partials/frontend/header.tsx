import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { useActiveUrl } from '@/hooks/use-active-url';
import { cn } from '@/lib/utils';
import { home, shop, contact } from '@/routes';

const navItems: { label: string; href: string }[] = [
    { label: 'Home', href: home.url() },
    { label: 'Shop', href: shop.url() },
    { label: 'Contact', href: contact.url() },
];

export function FrontendHeader() {
    const { urlIsActive } = useActiveUrl();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="relative">
            <div className="container mx-auto m-2">
                <div className="bg-gray-100 rounded-lg p-0.5 border border-gray-50/30">
                    <nav className="flex w-full items-center justify-between rounded-lg  border-rounded-md bg-white px-4 md:px-6 py-3 shadow">

                        {/* Logo */}
                        <div className="flex items-center gap-2 z-20">
                            <img src="/assets/images/Home/Container.png" alt="Logo" className="h-6 w-6" />
                            <span className="text-sm font-bold tracking-widest text-gray-900 uppercase">
                                Nexus
                            </span>
                        </div>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-7">
                            {navItems.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className={cn(
                                        'text-sm font-medium transition-colors',
                                        urlIsActive(href)
                                            ? 'text-blue-600 underline decoration-blue-600 underline-offset-4'
                                            : 'text-gray-600 hover:text-gray-900',
                                    )}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Actions & Mobile Toggle */}
                        <div className="flex items-center gap-2 md:gap-3 z-20">
                            {/* Search - Text hidden on small screens */}
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-lg bg-gray-100 p-2 md:px-4 md:py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                            >
                                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                </svg>
                                <span className="hidden sm:inline">Search</span>
                            </button>

                            {/* User Profile */}
                            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                </svg>
                            </button>

                            {/* Mobile Hamburger Toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={cn(
                "absolute top-full left-0 right-0 px-4 pt-2 pb-6 bg-white border-b border-gray-100 shadow-xl transition-all duration-300 md:hidden z-10",
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
            )}>
                <div className="flex flex-col gap-4">
                    {navItems.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                'text-lg font-medium py-2 transition-colors border-b border-gray-50',
                                urlIsActive(href) ? 'text-blue-600' : 'text-gray-600'
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
