import { Head } from '@inertiajs/react';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';

export default function Analytics() {
    return (
        <>
            <Head title="Analytics" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="analytics" />

                <div className="min-h-screen bg-white p-8 font-inter text-gray-900 mt-12 lg:mt-0">
                <div className="container mx-auto mb-10 flex items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                        <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search analytics data..."
                        className="w-full pl-12 pr-4 py-2.5 bg-gray-100/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all"
                    />
                    </div>
                    <div className="flex items-center gap-2">
                    <button className="p-2.5 text-gray-400 hover:text-gray-600 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                        </svg>
                    </button>
                    <button className="p-2.5 text-gray-400 hover:text-gray-600 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        </svg>
                    </button>
                    </div>
                </div>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 font-inter">Analytics Overview</h1>
                    <p className="text-sm text-gray-400 font-inter">
                    Real-time performance metrics and traffic distribution.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                        </div>
                        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                        📈 +12.5%
                        </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Total Visitors
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">42,850</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        </div>
                        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                        📈 +8.2%
                        </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Unique Visitors
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">31,200</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                            />
                        </svg>
                        </div>
                        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                        📈 +15.4%
                        </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Product Clicks
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">12,450</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11"
                            />
                        </svg>
                        </div>
                        <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-full flex items-center gap-1">
                        📉 -2.1%
                        </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Click-through Rate
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">29.1%</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  {/* Traffic Trend */}
  <div className="bg-white p-4 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-md font-bold text-gray-800">Traffic Trend</h2>
        <p className="text-xs text-gray-400">Daily visitors over the last 7 days</p>
      </div>
      <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 shrink-0 ml-2">
        📈 +5.4%
      </span>
    </div>
    <div className="relative h-48 sm:h-64 w-full">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="blueGradient" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          d="M0,80 Q150,75 250,60 T400,20 T600,45 T800,90 T1000,40 V100 H0 Z"
          fill="url(#blueGradient)"
          fillOpacity="0.1"
        />
        <path
          d="M0,80 Q150,75 250,60 T400,20 T600,45 T800,90 T1000,40"
          fill="none"
          stroke="#2563eb"
          strokeWidth={3}
        />
      </svg>
      <div className="flex justify-between  text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest font-inter">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  </div>

  {/* Product Click Distribution */}
  <div className="bg-white p-4 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-md font-bold text-gray-800 font-inter">
          Product Click Distribution
        </h2>
        <p className="text-xs text-gray-400">Total clicks per product category</p>
      </div>
      <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 shrink-0 ml-2">
        📈 +10.2%
      </span>
    </div>
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-[11px] mb-2 font-bold">
          <span className="text-gray-500">Echo Dot</span>
          <span className="text-gray-400">12%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full w-[12%] rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[11px] mb-2 font-bold">
          <span className="text-gray-500">Kindle Paperwhite</span>
          <span className="text-gray-400">68%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full w-[68%] rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[11px] mb-2 font-bold">
          <span className="text-gray-500">Fire TV Stick 4K</span>
          <span className="text-gray-400">82%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full w-[82%] rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[11px] mb-2 font-bold">
          <span className="text-gray-500">Ring Video Doorbell</span>
          <span className="text-gray-400">35%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full w-[35%] rounded-full" />
        </div>
      </div>
    </div>
  </div>
</div>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-8 font-inter">User Demographics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        Age Groups
                        </h3>
                        <ul className="space-y-3">
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">18-24</span>
                            <span className="font-bold">18%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">25-34</span>
                            <span className="font-bold">42%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">35-44</span>
                            <span className="font-bold">24%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">45+</span>
                            <span className="font-bold">16%</span>
                        </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        Device Type
                        </h3>
                        <ul className="space-y-3">
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">Desktop</span>
                            <span className="font-bold">54%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">Mobile</span>
                            <span className="font-bold">38%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">Tablet</span>
                            <span className="font-bold">8%</span>
                        </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        Top Countries
                        </h3>
                        <ul className="space-y-3">
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">United States</span>
                            <span className="font-bold">48%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">United Kingdom</span>
                            <span className="font-bold">22%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">Canada</span>
                            <span className="font-bold">15%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">Others</span>
                            <span className="font-bold">15%</span>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        </>
    );
}
