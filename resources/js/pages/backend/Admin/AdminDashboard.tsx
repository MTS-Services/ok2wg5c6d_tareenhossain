import { Head } from '@inertiajs/react';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="dashboard" />
                <div className="container bg-white  font-inter text-gray-900 p-8">
                    <header className="mb-8 lg:mt-0 mt-12">
                        <h1 className="text-3xl font-bold tracking-tight font-inter text-gray-900">Dashboard Overview</h1>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
                        <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                            <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            >
                            <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <span className="absolute top-6 right-6 text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full">
                            +23.1%
                        </span>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Visitors
                        </p>
                        <h3 className="text-3xl font-bold mt-1">8,234</h3>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
                        <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                            <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            >
                            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <span className="absolute top-6 right-6 text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full">
                            +8.2%
                        </span>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Products
                        </p>
                        <h3 className="text-3xl font-bold mt-1">1,429</h3>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
                        <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                            <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            >
                            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                            </svg>
                        </div>
                        <span className="absolute top-6 right-6 text-[10px] font-bold bg-red-50 text-red-500 px-2 py-1 rounded-full">
                            -2.4%
                        </span>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product Clicks
                        </p>
                        <h3 className="text-3xl font-bold mt-1">3250</h3>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 mx-auto mb-8">
                    <div className="relative h-[240px] sm:h-[320px] md:h-[400px] w-full">
                        <div className="absolute inset-0 flex flex-col justify-between text-[10px] sm:text-[11px] text-gray-400 font-medium">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="w-6 sm:w-8 text-right shrink-0">1000</span>
                            <div className="flex-1 border-t border-dashed border-gray-100" />
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="w-6 sm:w-8 text-right shrink-0">750</span>
                            <div className="flex-1 border-t border-dashed border-gray-100" />
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="w-6 sm:w-8 text-right shrink-0">500</span>
                            <div className="flex-1 border-t border-dashed border-gray-100" />
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="w-6 sm:w-8 text-right shrink-0">250</span>
                            <div className="flex-1 border-t border-dashed border-gray-100" />
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="w-6 sm:w-8 text-right shrink-0">0</span>
                            <div className="flex-1 border-t border-dashed border-gray-100" />
                        </div>
                        </div>

                        <div className="absolute inset-0 left-8 sm:left-12 right-0 overflow-hidden">
                        <svg
                            className="w-full h-full"
                            viewBox="0 0 1000 400"
                            preserveAspectRatio="none"
                        >
                            <defs>
                            <linearGradient id="chartGradient" x1={0} y1={0} x2={0} y2={1}>
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                            </linearGradient>
                            </defs>
                            <path
                            d="M0,300
                            C150,290 200,240 333,80
                            C450,40 550,110 666,160
                            C750,190 850,50 1000,100
                            V400 H0 Z"
                            fill="url(#chartGradient)"
                            />
                            <path
                            d="M0,300
                            C150,290 200,240 333,80
                            C450,40 550,110 666,160
                            C750,190 850,50 1000,100"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        </svg>
                        </div>

                        <div className="absolute p-2 -bottom-6 sm:-bottom-8 left-8 sm:left-12 right-0 flex justify-between text-[10px] sm:text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
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

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
  <div className="p-6 border-b border-gray-50">
    <h2 className="text-lg font-bold font-inter">Top Performing Products</h2>
    <p className="text-sm text-gray-500">Products with the most engagement</p>
  </div>

  {/* Mobile card layout */}
  <div className="md:hidden divide-y divide-gray-50">
    {[
      { name: "Echo Dot (5th Gen)", category: "Electronics", clicks: "1,240", bar: "60%" },
      { name: "Kindle Paperwhite", category: "Electronics", clicks: "850", bar: "40%" },
      { name: "Kindle Paperwhite", category: "Electronics", clicks: "850", bar: "40%" },
    ].map((item, i) => (
      <div key={i} className="p-4 hover:bg-gray-50/50 transition-colors">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{item.name}</p>
              <p className="text-xs text-blue-500 font-medium">{item.category}</p>
            </div>
          </div>
          <a href="#" className="text-xs font-semibold text-blue-500 hover:underline shrink-0">
            Active ↗
          </a>
        </div>
        <div className="mt-3 flex items-center gap-3 pl-13">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full" style={{ width: item.bar }} />
          </div>
          <span className="text-sm font-semibold text-gray-700 shrink-0">{item.clicks}</span>
        </div>
      </div>
    ))}
  </div>

  {/* Desktop table layout */}
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
        <tr>
          <th className="px-6 py-4">Product</th>
          <th className="px-6 py-4">Category</th>
          <th className="px-6 py-4">Total Clicks</th>
          <th className="px-6 py-4 text-right">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        <tr className="hover:bg-gray-50/50 transition-colors">
          <td className="px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-sm">Echo Dot (5th Gen)</span>
          </td>
          <td className="px-6 py-4 text-sm text-blue-500 font-medium">Electronics</td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[60%]" />
              </div>
              <span className="text-sm font-semibold">1,240</span>
            </div>
          </td>
          <td className="px-6 py-4 text-right">
            <a href="#" className="text-xs font-semibold text-blue-500 hover:underline">Active ↗</a>
          </td>
        </tr>
        <tr className="hover:bg-gray-50/50 transition-colors">
          <td className="px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-lg overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-sm">Kindle Paperwhite</span>
          </td>
          <td className="px-6 py-4 text-sm text-blue-500 font-medium">Electronics</td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[40%]" />
              </div>
              <span className="text-sm font-semibold">850</span>
            </div>
          </td>
          <td className="px-6 py-4 text-right">
            <a href="#" className="text-xs font-semibold text-blue-500 hover:underline">Active ↗</a>
          </td>
        </tr>
        <tr className="hover:bg-gray-50/50 transition-colors">
          <td className="px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-lg overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-sm">Kindle Paperwhite</span>
          </td>
          <td className="px-6 py-4 text-sm text-blue-500 font-medium">Electronics</td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[40%]" />
              </div>
              <span className="text-sm font-semibold">850</span>
            </div>
          </td>
          <td className="px-6 py-4 text-right">
            <a href="#" className="text-xs font-semibold text-blue-500 hover:underline">Active ↗</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
                    </div>

            </div>
        </>
    );
}
