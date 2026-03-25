import { useEffect, useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { useActiveUrl } from '@/hooks/use-active-url';
import { cn } from '@/lib/utils';
import { contact, dashboard, home, logout, shop } from '@/routes';
import { type SharedData } from '@/types';

const navItems: { label: string; href: string }[] = [
    { label: 'Home', href: home.url() },
    { label: 'Shop', href: shop.url() },
    { label: 'Contact', href: contact.url() },
];

export function FrontendHeader() {
    const { auth } = usePage<SharedData>().props;
    const { urlIsActive } = useActiveUrl();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const isLoggedIn = Boolean(auth?.user);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="relative">
            <div className="container mx-auto m-2">
                <div className="bg-gray-100 rounded-lg p-0.5 border border-gray-50/30">
                    <nav className="flex w-full items-center justify-between rounded-lg  border-rounded-md bg-white px-4 md:px-6 py-3 shadow">

                        {/* Logo */}
                        <div onClick={() => router.visit(home.url())} className="flex items-center gap-2 z-20">
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
                            {/* Search */}
                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-2 md:px-4 md:py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    placeholder="Search"
                                    className="w-20 bg-transparent text-sm text-gray-700 placeholder:text-gray-500 outline-none sm:w-28 md:w-36"
                                />
                            </div>

                            {/* User/Login Icon */}
                            {isLoggedIn ? (
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsUserMenuOpen((prev) => !prev)
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 z-30 mt-2 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    router.visit(dashboard.url());
                                                }}
                                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
                                            >
                                                Dashboard
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    router.post(logout.url());
                                                }}
                                                className="block w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => router.visit(route('admin.login'))}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
                                    aria-label="Login"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9l3 3m0 0l-3 3m3-3H8.25" />
                                    </svg>
                                </button>
                            )}

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
