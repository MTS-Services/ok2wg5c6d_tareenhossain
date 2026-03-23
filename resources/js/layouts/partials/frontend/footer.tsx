export function FrontendFooter() {
    return (

            <footer className="w-full border-t border-gray-200">
                {/* Main Footer Content */}
                <div className="mx-auto grid max-w-6xl grid-cols-4 gap-10 px-8 py-12">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <img src="/assets/images/Home/Container.png" alt="" />
                            <span className="text-sm font-bold tracking-widest text-gray-900 uppercase font-inter">
                                Nexus
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-500">
                            Redefining the digital shopping experience through minimal
                            aesthetics and high-performance product curation.
                        </p>
                    </div>

                    {/* Shop Column */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase font-inter">
                            Shop
                        </h4>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900 "
                                >
                                    Electronics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                                >
                                    Home Decor
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                                >
                                    Apparel
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                                >
                                    Office
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase font-inter">
                            Support
                        </h4>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                                >
                                    Shipping
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                                >
                                    Returns
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase font-inter">
                            Social
                        </h4>
                        <div className="flex items-center gap-2">
                            {/* Globe / Web */}
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-900 transition-colors hover:border-gray-400 hover:text-gray-900"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-900 transition-colors hover:border-gray-400 hover:text-gray-900"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            {/* YouTube */}
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-900 transition-colors hover:border-gray-400 hover:text-gray-900"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                                    <polyline points="17 2 12 7 7 2" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
                        <p className="text-xs text-gray-400">
                            © 2026 Nexus Storefront Inc. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="text-xs text-gray-500 transition-colors hover:text-gray-900"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-xs text-gray-500 transition-colors hover:text-gray-900"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

    );
}
