import { useActiveUrl } from '@/hooks/use-active-url';
import { cn } from '@/lib/utils';
import { contact, dashboard, home, logout, shop } from '@/routes';
import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

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
            <div className="container m-2 mx-auto">
                <div className="rounded-lg border border-gray-50/30 bg-gray-100 p-0.5">
                    <nav className="border-rounded-md flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 shadow md:px-6">
                        {/* Logo */}
                        <Link href={home.url()}>
                            <div className="z-20 flex items-center gap-2">
                                <img
                                    src="/assets/images/Home/Container.png"
                                    alt="Logo"
                                    className="h-6 w-6"
                                />
                                <span className="text-sm font-bold tracking-widest text-gray-900 uppercase">
                                    Nexus
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden items-center gap-7 md:flex">
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
                        <div className="z-20 flex items-center gap-2 md:gap-3">
                            {/* Search */}
                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 md:px-4 md:py-2">
                                <svg
                                    className="h-4 w-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    placeholder="Search"
                                    className="w-20 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-500 sm:w-28 md:w-36"
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
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 z-30 mt-2 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    router.visit(
                                                        dashboard.url(),
                                                    );
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
                                    onClick={() =>
                                        router.visit(route('admin.login'))
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
                                    aria-label="Login"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-users h-5 w-5 opacity-100"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </button>
                            )}

                            {/* Mobile Hamburger Toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    {isOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={cn(
                    'absolute top-full right-0 left-0 z-10 border-b border-gray-100 bg-white px-4 pt-2 pb-6 shadow-xl transition-all duration-300 md:hidden',
                    isOpen
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-4 opacity-0',
                )}
            >
                <div className="flex flex-col gap-4">
                    {navItems.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                'border-b border-gray-50 py-2 text-lg font-medium transition-colors',
                                urlIsActive(href)
                                    ? 'text-blue-600'
                                    : 'text-gray-600',
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
