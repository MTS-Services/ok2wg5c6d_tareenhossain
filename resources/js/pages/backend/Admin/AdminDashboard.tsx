import { Head } from '@inertiajs/react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';

type DashboardProps = {
    dashboard?: {
        total_visitors: number;
        total_products: number;
        product_clicks: number;
        daily_stats?: Array<{
            date: string;
            visitors: number;
            clicks: number;
        }>;
        top_products?: Array<{
            product_clicked: string;
            clicks: number;
        }>;
    };
};

export default function AdminDashboard({ dashboard }: DashboardProps) {
    const totalVisitors = dashboard?.total_visitors ?? 0;
    const totalProducts = dashboard?.total_products ?? 0;
    const productClicks = dashboard?.product_clicks ?? 0;

    const chartData =
        dashboard?.daily_stats?.map((d) => {
            const dt = new Date(d.date);
            return {
                // Keep a unique x-axis label per day (weekday-only causes duplicates).
                date: dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                visitors: d.visitors ?? 0,
            };
        }) ?? [];

    const topProducts = dashboard?.top_products ?? [];
    const maxClicks = Math.max(...topProducts.map((p) => p.clicks || 0), 1);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="dashboard" />
                <div className="container bg-white  font-inter text-gray-900 p-6">
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
                        <h3 className="text-3xl font-bold mt-1">{totalVisitors.toLocaleString()}</h3>
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
                        <h3 className="text-3xl font-bold mt-1">{totalProducts.toLocaleString()}</h3>
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
                        <h3 className="text-3xl font-bold mt-1">{productClicks.toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 mx-auto mb-8">
                    <div className="relative h-[240px] sm:h-[320px] md:h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1f2937',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#f3f4f6',
                                    }}
                                    labelStyle={{ color: '#f3f4f6' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="visitors"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50">
                            <h2 className="text-lg font-bold font-inter">Top Performing Products</h2>
                            <p className="text-sm text-gray-500">Products with the most engagement</p>
                        </div>

                        {/* Mobile card layout */}
                        <div className="md:hidden divide-y divide-gray-50">
                            {topProducts.slice(0, 5).map((item, i) => (
                            <div key={i} className="p-4 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="min-w-0">
                                    <p className="font-semibold text-sm truncate">{item.product_clicked || 'Unknown Product'}</p>
                                    </div>
                                </div>
                                </div>
                                <div className="mt-3 flex items-center gap-3 pl-13">
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="bg-blue-600 h-full"
                                        style={{
                                            width: `${Math.round(((item.clicks || 0) / maxClicks) * 100)}%`,
                                        }}
                                    />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 shrink-0">{(item.clicks || 0).toLocaleString()}</span>
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
                                <th className="px-6 py-4">Total Clicks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {topProducts.slice(0, 8).map((p, idx) => (
                                    <tr key={`${p.product_clicked}-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-sm">{p.product_clicked || 'Unknown Product'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-blue-600 h-full"
                                                        style={{
                                                            width: `${Math.round(((p.clicks || 0) / maxClicks) * 100)}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm font-semibold">{(p.clicks || 0).toLocaleString()}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>

            </div>
        </>
    );
}
