import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';

interface AnalyticsData {
    total_visitors: number;
    unique_visitors: number;
    product_clicks: number;
    ctr: number;
    top_products: Array<{
        product_clicked: string;
        clicks: number;
    }>;
    by_device: Array<{
        device: string;
        count: number;
    }>;
    by_country: Array<{
        country: string;
        count: number;
    }>;
    daily_stats?: Array<{
        date: string;
        visitors: number;
        clicks: number;
    }>;
}

interface Props {
    analytics: AnalyticsData;
}

type GaChartRow = { label: string; value: number };

type GoogleAnalyticsReport =
    | {
          enabled: true;
          period: string;
          age: GaChartRow[];
          gender: GaChartRow[];
          interests: GaChartRow[];
          new_vs_returning: GaChartRow[];
          traffic_source: GaChartRow[];
          engagement: {
              activeUsers: number;
              sessions: number;
              engagedSessions: number;
              engagementRate: number;
              averageEngagementTime: number;
          };
      }
    | {
          enabled: false;
          error?: string;
      };

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Analytics({ analytics }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('7days');
    const analyticsData = analytics || {
        total_visitors: 0,
        unique_visitors: 0,
        product_clicks: 0,
        ctr: 0,
        top_products: [],
        by_device: [],
        by_country: [],
        daily_stats: [],
    };
    const [isLoading, setIsLoading] = useState(false);
    const [gaReport, setGaReport] = useState<GoogleAnalyticsReport | null>(null);
    const [gaLoading, setGaLoading] = useState(false);

    const handleRefresh = async () => {
        setIsLoading(true);
        try {
            const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
            await fetch(route('admin.analytics.refresh', { period: selectedPeriod }), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                body: JSON.stringify({ period: selectedPeriod }),
            });
            router.get(route('admin.analytics'), { period: selectedPeriod }, { preserveState: true, replace: true });
        } catch (error) {
            console.error('Failed to refresh analytics:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        router.get(route('admin.analytics'), { period: selectedPeriod }, { preserveState: true, replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPeriod]);

    useEffect(() => {
        let cancelled = false;

        async function loadGa() {
            setGaLoading(true);
            try {
                const res = await fetch(route('admin.analytics.google-report', { period: selectedPeriod }));
                const json = (await res.json()) as GoogleAnalyticsReport;
                if (!cancelled) setGaReport(json);
            } catch (e) {
                if (!cancelled) setGaReport({ enabled: false, error: 'Failed to load Google Analytics report.' });
            } finally {
                if (!cancelled) setGaLoading(false);
            }
        }

        loadGa();
        return () => {
            cancelled = true;
        };
    }, [selectedPeriod]);

    const filteredData = analyticsData.top_products?.filter((product: any) =>
        product.product_clicked?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const deviceData = analyticsData.by_device?.map((item: any) => ({
        name: item.device || 'Unknown',
        value: item.count || 0,
        percent: analyticsData.total_visitors > 0 ? ((item.count || 0) / analyticsData.total_visitors * 100) : 0
    })) || [];

    const countryData = analyticsData.by_country?.map(item => ({
        name: item.country || 'Unknown',
        value: item.count || 0,
        percent: analyticsData.total_visitors > 0 ? ((item.count || 0) / analyticsData.total_visitors * 100) : 0
    })) || [];

    const chartData = analyticsData.daily_stats?.map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        visitors: item.visitors,
        clicks: item.clicks
    })) || [];

    return (
        <>
            <Head title="Analytics" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="analytics" />

                <div className="flex-1 min-h-screen bg-white p-8 font-inter text-gray-900 mt-12 lg:mt-0">
                    <div className="w-full mb-10 flex items-center justify-between gap-4">
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-2.5 bg-gray-100/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition-colors hover:border-gray-300"
                            >
                                <option value="24hours">Last 24 Hours</option>
                                <option value="7days">Last 7 Days</option>
                                <option value="30days">Last 30 Days</option>
                                <option value="90days">Last 90 Days</option>
                            </select>
                            <button
                                onClick={handleRefresh}
                                disabled={isLoading}
                                className="p-2.5 text-gray-400 hover:text-gray-600 bg-white border border-gray-200 rounded-xl shadow-sm disabled:opacity-50"
                            >
                                <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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

                    {/* Stats Cards */}
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
                                    📈 +{((analytics.total_visitors || 0) * 0.125).toFixed(0)}%
                                </span>
                            </div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Total Visitors
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800">{analytics.total_visitors?.toLocaleString() || '0'}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
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
                                    📈 +{((analytics.unique_visitors || 0) * 0.082).toFixed(0)}%
                                </span>
                            </div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Unique Visitors
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800">{analytics.unique_visitors?.toLocaleString() || '0'}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
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
                                    📈 +{((analytics.product_clicks || 0) * 0.154).toFixed(0)}%
                                </span>
                            </div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Product Clicks
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800">{analytics.product_clicks?.toLocaleString() || '0'}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
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
                                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0V-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0V1m0 0V11"
                                        />
                                    </svg>
                                </div>
                                <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-full flex items-center gap-1">
                                    📉 {analytics.ctr > 25 ? '-' : '+'}{Math.abs(analytics.ctr - 25).toFixed(1)}%
                                </span>
                            </div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Click-through Rate
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800">{analytics.ctr?.toFixed(1) || '0'}%</h3>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Traffic Trend Chart */}
                        <div className="bg-white p-4 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-md font-bold text-gray-800">Traffic Trend</h2>
                                    <p className="text-xs text-gray-400">Daily visitors over last {selectedPeriod === '24hours' ? '24 hours' : selectedPeriod === '7days' ? '7 days' : selectedPeriod === '30days' ? '30 days' : '90 days'}</p>
                                </div>
                            </div>
                            <div className="h-64 sm:h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                            labelStyle={{ color: '#f3f4f6' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="visitors"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: '#3b82f6', r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Device Distribution Chart */}
                        <div className="bg-white p-4 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-md font-bold text-gray-800">Device Distribution</h2>
                                    <p className="text-xs text-gray-400">Visitors by device type</p>
                                </div>
                            </div>
                            <div className="h-64 sm:h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={deviceData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={(entry) => `${entry.name}: ${entry.percent}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {deviceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                            labelStyle={{ color: '#f3f4f6' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Product Click Distribution */}
                    <div className="bg-white p-4 sm:p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-md font-bold text-gray-800 font-inter">
                                    Product Click Distribution
                                </h2>
                                <p className="text-xs text-gray-400">Total clicks per product</p>
                            </div>
                            <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 shrink-0 ml-2">
                                📈 +10.2%
                            </span>
                        </div>
                        <div className="space-y-4">
                            {filteredData.slice(0, 5).map((product, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-[11px] mb-2 font-bold">
                                        <span className="text-gray-500">{product.product_clicked || 'Unknown Product'}</span>
                                        <span className="text-gray-400">{product.clicks} clicks</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="bg-blue-600 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${analytics.product_clicks > 0 ? (product.clicks / analytics.product_clicks * 100) : 0}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Demographics */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-8 font-inter">User Demographics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    Top Countries
                                </h3>
                                <ul className="space-y-3">
                                    {countryData.slice(0, 5).map((country, index) => (
                                        <li key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-600 font-medium">{country.name}</span>
                                            <span className="font-bold">{country.percent}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    Device Types
                                </h3>
                                <ul className="space-y-3">
                                    {deviceData.map((device, index) => (
                                        <li key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-600 font-medium">{device.name}</span>
                                            <span className="font-bold">{device.percent}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    Performance Metrics
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex justify-between text-sm">
                                        <span className="text-gray-600 font-medium">Avg. Session Duration</span>
                                        <span className="font-bold">3m 24s</span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-gray-600 font-medium">Bounce Rate</span>
                                        <span className="font-bold">32.1%</span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-gray-600 font-medium">Pages per Session</span>
                                        <span className="font-bold">4.2</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Google Analytics Report */}
                    <div className="mt-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 font-inter">
                                    Google Analytics Report (GA4)
                                </h2>
                                <p className="text-xs text-gray-400">
                                    Audience demographics, traffic sources, and engagement.
                                </p>
                            </div>
                            <div className="text-xs text-gray-400">
                                {gaLoading ? 'Loading…' : null}
                            </div>
                        </div>

                        {!gaReport ? (
                            <p className="text-sm text-gray-500">Loading Google Analytics report…</p>
                        ) : gaReport.enabled === false ? (
                            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                                <p className="text-sm font-semibold text-amber-800">Google Analytics is not configured.</p>
                                <p className="mt-1 text-xs text-amber-800/80">
                                    Set <span className="font-mono">ANALYTICS_PROPERTY_ID</span> and provide a service account JSON at{' '}
                                    <span className="font-mono">storage/app/analytics/service-account-credentials.json</span> (or set{' '}
                                    <span className="font-mono">ANALYTICS_CREDENTIALS_PATH</span>).
                                </p>
                                {gaReport.error ? (
                                    <p className="mt-2 text-[11px] text-amber-900/80 break-words">{gaReport.error}</p>
                                ) : null}
                            </div>
                        ) : (
                            <>
                                {/* Engagement cards */}
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                                    {[
                                        { label: 'Active Users', value: gaReport.engagement.activeUsers.toLocaleString() },
                                        { label: 'Sessions', value: gaReport.engagement.sessions.toLocaleString() },
                                        { label: 'Engaged Sessions', value: gaReport.engagement.engagedSessions.toLocaleString() },
                                        { label: 'Engagement Rate', value: `${(gaReport.engagement.engagementRate * 100).toFixed(1)}%` },
                                        { label: 'Avg Engagement Time (s)', value: gaReport.engagement.averageEngagementTime.toFixed(0) },
                                    ].map((item) => (
                                        <div key={item.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{item.label}</p>
                                            <p className="mt-1 text-xl font-bold text-gray-800">{item.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Age */}
                                    <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                                        <h3 className="text-sm font-bold text-gray-800 mb-4">Age range</h3>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={gaReport.age}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                                    <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                                                    <YAxis tick={{ fontSize: 11 }} />
                                                    <Tooltip />
                                                    <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* Gender */}
                                    <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                                        <h3 className="text-sm font-bold text-gray-800 mb-4">Gender</h3>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={gaReport.gender} dataKey="value" nameKey="label" outerRadius={90} label>
                                                        {gaReport.gender.map((_, idx) => (
                                                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* Interests */}
                                    <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                                        <h3 className="text-sm font-bold text-gray-800 mb-4">Top interests</h3>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={gaReport.interests} layout="vertical" margin={{ left: 24 }}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                                    <XAxis type="number" tick={{ fontSize: 11 }} />
                                                    <YAxis type="category" dataKey="label" tick={{ fontSize: 10 }} width={140} />
                                                    <Tooltip />
                                                    <Bar dataKey="value" fill="#10b981" radius={[0, 6, 6, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* New vs returning + Traffic source */}
                                    <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                                        <h3 className="text-sm font-bold text-gray-800 mb-4">New vs returning</h3>
                                        <div className="h-56">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={gaReport.new_vs_returning} dataKey="value" nameKey="label" outerRadius={80} label>
                                                        {gaReport.new_vs_returning.map((_, idx) => (
                                                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="mt-6">
                                            <h3 className="text-sm font-bold text-gray-800 mb-3">Traffic source (channel)</h3>
                                            <div className="space-y-2">
                                                {gaReport.traffic_source.slice(0, 6).map((row) => (
                                                    <div key={row.label} className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600 truncate pr-3">{row.label}</span>
                                                        <span className="font-bold text-gray-800">{row.value.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
