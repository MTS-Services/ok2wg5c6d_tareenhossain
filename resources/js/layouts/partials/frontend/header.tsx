export function FrontendHeader() {
    return (
        <header>
            <div className="container mx-auto flex items-center justify-center bg-gray-100 rounded-xl p-0.5 border border-gray-100  m-2">
            <nav className="flex w-full  items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-3 shadow-sm">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="/assets/images/Home/Container.png" alt="" />
                    <span className="text-sm font-bold tracking-widest text-gray-900 uppercase">
                        Nexus
                    </span>
                </div>

                {/* Nav Links */}
                <div className="flex items-center gap-7">
                    <a
                        href="#"
                        className="text-sm font-medium text-blue-600 underline decoration-blue-600 underline-offset-4"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                        Shop
                    </a>
                    <a
                        href="#"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                        Contact
                    </a>
                </div>


                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        Search
                    </button>
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
        </header>
    );
}
