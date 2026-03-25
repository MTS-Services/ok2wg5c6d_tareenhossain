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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAptJREFUeAHdVt1t2zAQPkqJHQMFwg2qEZwJom7gTmD7KTX6EHcCOxskD02TJysTtBtUnaDuBHY3YIGiiVVI7HciZf0mVRr3JR8g8CiS9x2PxzsSPXeITHgvf/Zd6pzGFF28VS+W1Ykf5K2nSQwccjx0D+3vH5pinhtOVG9NLbCXCQ7tT9EMQcrdcU4UjWDVEKIvqMliN22vZBSC/AbEAbUhrIJ3vEedhSbqZ/8gK5B+16R5VxJ0Ev1jOwyDXB/ExyA+u2/HjYTXMhomROc6VZoSfYHy+QHtLcdKqOp864UZRA8fZMfHEbxqIhX5ok0gSMB1GpOEl+0I8uuJ2g+pBaBjDh0z09PrLnWOqgY69WWGzBDHR23JGBPVncOd40zPhqJFdY5z32Kdno/7GWeygou/8plSK9IePJW8s6QDuNZvRSjM+Xn8ceAgigfUEifq4BxNaPS4s+JYIWgSuMNZNylAVKoedQN6BBA4F5oSHyIHkJcFkKD/hIXU8o5+r9hT8NB4ojoB/y+5lC2hHYGjE8rXLIvCXXZyMg5pd8Ut7QgJ6W9WPKwRkgkQWCNe0o5gA68EJx/cXtBW4d+Scpvka4Q42KVtPT5w2g18ozNe1giRVcLUJrjhliKfngjOr4VuWCO09yQ0P8UpPRE2maeJv5jES9eCy4oV/Uv5a0r/iGu5ySoHEAcVQ8q4kpuPnAPt4OhEdW7oUWTRELsKbDd4ozrj4ngtl6Kk8IQ1y7zQWtsKl/JumpPpdcFjWzSmNs44XClo6xZenJw1PR84oiMEmTbn7hfmP1yAm0jhgLkpyiWEUMiFmZ8bfbwMvPIF15/YS00vgwcJc+I0vEeFt0sjsmfI3wp262phduzyy62PciXNYqFMwohbPxOfP/4A/Zf9dxmbyE8AAAAASUVORK5CYII=" width="28" height="28"/>
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
                <div className="bg-white/50 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAptJREFUeAHdVt1t2zAQPkqJHQMFwg2qEZwJom7gTmD7KTX6EHcCOxskD02TJysTtBtUnaDuBHY3YIGiiVVI7HciZf0mVRr3JR8g8CiS9x2PxzsSPXeITHgvf/Zd6pzGFF28VS+W1Ykf5K2nSQwccjx0D+3vH5pinhtOVG9NLbCXCQ7tT9EMQcrdcU4UjWDVEKIvqMliN22vZBSC/AbEAbUhrIJ3vEedhSbqZ/8gK5B+16R5VxJ0Ev1jOwyDXB/ExyA+u2/HjYTXMhomROc6VZoSfYHy+QHtLcdKqOp864UZRA8fZMfHEbxqIhX5ok0gSMB1GpOEl+0I8uuJ2g+pBaBjDh0z09PrLnWOqgY69WWGzBDHR23JGBPVncOd40zPhqJFdY5z32Kdno/7GWeygou/8plSK9IePJW8s6QDuNZvRSjM+Xn8ceAgigfUEifq4BxNaPS4s+JYIWgSuMNZNylAVKoedQN6BBA4F5oSHyIHkJcFkKD/hIXU8o5+r9hT8NB4ojoB/y+5lC2hHYGjE8rXLIvCXXZyMg5pd8Ut7QgJ6W9WPKwRkgkQWCNe0o5gA68EJx/cXtBW4d+Scpvka4Q42KVtPT5w2g18ozNe1giRVcLUJrjhliKfngjOr4VuWCO09yQ0P8UpPRE2maeJv5jES9eCy4oV/Uv5a0r/iGu5ySoHEAcVQ8q4kpuPnAPt4OhEdW7oUWTRELsKbDd4ozrj4ngtl6Kk8IQ1y7zQWtsKl/JumpPpdcFjWzSmNs44XClo6xZenJw1PR84oiMEmTbn7hfmP1yAm0jhgLkpyiWEUMiFmZ8bfbwMvPIF15/YS00vgwcJc+I0vEeFt0sjsmfI3wp262phduzyy62PciXNYqFMwohbPxOfP/4A/Zf9dxmbyE8AAAAASUVORK5CYII=" width="28" height="28"/>
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
