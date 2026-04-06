import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { Head, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { useState } from 'react';

interface SettingsProps {
    settings?: {
        id?: number;
        website_name: string;
        contact_email: string;
        website_logo?: string;
        ga_tracking_id?: string;
        ga_connected?: boolean;
        timezone?: string;
        date_format?: string;
        currency?: string;
        maintenance_mode?: boolean;
        email_notifications?: boolean;
        analytics_enabled?: boolean;
        tracking_enabled?: boolean;
    };
}

export default function Settings({ settings }: SettingsProps) {
    const [isTestingConnection, setIsTestingConnection] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    const { data, setData, post, processing, errors } = useForm({
        website_name: settings?.website_name || '',
        contact_email: settings?.contact_email || '',
        website_logo: null as File | null,
        ga_tracking_id: settings?.ga_tracking_id || '',
        ga_connected: settings?.ga_connected ?? false,
        timezone: settings?.timezone ?? 'UTC',
        date_format: settings?.date_format ?? 'Y-m-d',
        currency: settings?.currency ?? 'USD',
        maintenance_mode: settings?.maintenance_mode ?? false,
        email_notifications: settings?.email_notifications ?? true,
        analytics_enabled: settings?.analytics_enabled ?? true,
        tracking_enabled: settings?.tracking_enabled ?? true,
        data_retention_days: (settings as any)?.data_retention_days ?? 30,
        cache_duration_minutes: (settings as any)?.cache_duration_minutes ?? 60,
        session_timeout_minutes: (settings as any)?.session_timeout_minutes ?? 30,
        max_upload_size_mb: (settings as any)?.max_upload_size_mb ?? 10,
    });

    // handleDisconnect
    const handleDisconnect = () => {
        router.post(
            route('admin.settings.update-connection'),
            {
                ga_connected: false,
                analytics_enabled: false,
            },
            {
                onSuccess: () => {
                    setData('ga_connected', false);
                    setData('analytics_enabled', false);
                    toast.success('Google Analytics disconnected.');
                },
                onError: (errors) => {
                    Object.values(errors).forEach((error) =>
                        toast.error(error as string),
                    );
                },
            },
        );
    };

    // handleTestConnection
    const handleTestConnection = async () => {
        if (!data.ga_tracking_id) {
            toast.error('Please enter a Google Analytics Tracking ID first.');
            return;
        }

        setIsTestingConnection(true);

        try {
            // Basic GA4 Measurement ID validation: G-XXXXXXXXXX (allow UA- for legacy)
            const ga4Regex = /^G-[A-Z0-9]{6,}$/i;
            const uaRegex = /^UA-\d{4,}-\d+$/i;
            if (!ga4Regex.test(data.ga_tracking_id) && !uaRegex.test(data.ga_tracking_id)) {
                toast.error('Invalid Analytics ID. For GA4 use: G-XXXXXXXXXX');
                return;
            }

            router.post(
                route('admin.settings.update-connection'),
                {
                    ga_connected: true,
                    analytics_enabled: true,
                    ga_tracking_id: data.ga_tracking_id,
                },
                {
                    onSuccess: () => {
                        setData('ga_connected', true);
                        setData('analytics_enabled', true);
                        toast.success(
                            'Google Analytics connected successfully!',
                        );
                    },
                    onError: (errors) => {
                        Object.values(errors).forEach((error) =>
                            toast.error(error as string),
                        );
                    },
                },
            );
        } catch (error) {
            toast.error('Connection test failed. Please try again.');
        } finally {
            setIsTestingConnection(false);
        }
    };

    const handleSaveGeneral = () => {
        post(route('admin.settings.update'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('General settings updated successfully!');
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error as string);
                });
            },
        });
    };

    const handleSaveAnalytics = () => {
        post(route('admin.settings.update'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Analytics settings updated successfully!');
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error as string);
                });
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab === 'general') {
            handleSaveGeneral();
        } else if (activeTab === 'analytics') {
            handleSaveAnalytics();
        } else {
            handleSaveGeneral();
        }
    };

    return (
        <>
            <Head title="Settings" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="settings" />

                <div className="container mx-auto mt-12 flex bg-white lg:mt-0">
                    <main className="mx-auto w-full bg-white px-4 py-4 font-inter text-gray-900 lg:py-8">
                        <div className="mb-8 flex items-center justify-between">
                            <h1 className="font-inter text-3xl font-bold text-gray-900">
                                Settings
                            </h1>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="rounded-xl bg-blue-600 px-6 py-2.5 cursor-pointer font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save All Changes'}
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="mb-6 border-b border-gray-200">
                            <nav className="flex space-x-8">
                                {['general', 'analytics', 'advanced'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-sm font-semibold tracking-widest uppercase border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <form onSubmit={handleSubmit}>
                            {/* General Settings Tab */}
                            {activeTab === 'general' && (
                                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                                    <div className="mb-6 flex items-center gap-2 text-blue-600">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                        >
                                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <h2 className="font-inter text-lg font-bold text-gray-800 ml-2">
                                            General Settings
                                        </h2>
                                    </div>

                                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                       
                                   
                                        <div className="space-y-2">
                                            <label className="font-inter text-sm font-semibold text-gray-600">
                                                Contact Email
                                            </label>
                                            <input
                                                type="email"
                                                value={data.contact_email}
                                                onChange={(e) =>
                                                    setData(
                                                        'contact_email',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition-colors hover:border-gray-300"
                                            />
                                            {errors.contact_email && (
                                                <p className="text-sm text-red-500">
                                                    {errors.contact_email}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-inter text-sm font-semibold text-gray-600">
                                                Timezone
                                            </label>
                                            <select
                                                value={data.timezone}
                                                onChange={(e) =>
                                                    setData('timezone', e.target.value)
                                                }
                                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition-colors hover:border-gray-300"
                                            >
                                                <option value="UTC">UTC</option>
                                                <option value="America/New_York">America/New York</option>
                                                <option value="Europe/London">Europe/London</option>
                                                <option value="Asia/Tokyo">Asia/Tokyo</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-inter text-sm font-semibold text-gray-600">
                                                Date Format
                                            </label>
                                            <select
                                                value={data.date_format}
                                                onChange={(e) =>
                                                    setData('date_format', e.target.value)
                                                }
                                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition-colors hover:border-gray-300"
                                            >
                                                <option value="Y-m-d">YYYY-MM-DD</option>
                                                <option value="d/m/Y">DD/MM/YYYY</option>
                                                <option value="m/d/Y">MM/DD/YYYY</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-inter text-sm font-semibold text-gray-600">
                                                Currency
                                            </label>
                                            <select
                                                value={data.currency}
                                                onChange={(e) =>
                                                    setData('currency', e.target.value)
                                                }
                                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition-colors hover:border-gray-300"
                                            >
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                            </select>
                                        </div>
                                    </div>



                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="maintenance_mode"
                                                checked={data.maintenance_mode}
                                                onChange={(e) =>
                                                    setData('maintenance_mode', e.target.checked as boolean)
                                                }
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor="maintenance_mode" className="font-inter text-sm font-medium text-gray-700">
                                                Enable Maintenance Mode
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            When enabled, visitors will see a maintenance page
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="email_notifications"
                                                checked={data.email_notifications}
                                                onChange={(e) =>
                                                    setData('email_notifications', e.target.checked as boolean)
                                                }
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor="email_notifications" className="font-inter text-sm font-medium text-gray-700">
                                                Email Notifications
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Receive email alerts for important system events
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Analytics Settings Tab */}
                            {activeTab === 'analytics' && (
                                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                                    <div className="mb-6 flex items-center gap-2 text-blue-600">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                        >
                                            <path d="M9 19v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h5M9 7h1m-1 4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <h2 className="font-inter text-lg font-bold text-gray-800 ml-2">
                                            Analytics Settings
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="analytics_enabled"
                                                checked={data.analytics_enabled}
                                                onChange={(e) =>
                                                    setData('analytics_enabled', e.target.checked as boolean)
                                                }
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor="analytics_enabled" className="font-inter text-sm font-medium text-gray-700">
                                                Enable Analytics Tracking
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Track user behavior, page views, and conversions
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Monitor user sessions, clicks, and interactions
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-inter text-sm font-semibold text-gray-600">
                                            Data Retention Period
                                        </label>
                                        <select
                                            value={String(data.data_retention_days)}
                                            onChange={(e) => setData('data_retention_days', Number(e.target.value))}
                                            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition-colors hover:border-gray-300"
                                        >
                                            <option value="30">30 Days</option>
                                            <option value="90">90 Days</option>
                                            <option value="365">1 Year</option>
                                        </select>
                                    </div>
                                </div>
                            )}


                            {/* Advanced Settings Tab */}
                            {activeTab === 'advanced' && (
                                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                                    <div className="mb-6 flex items-center gap-2 text-blue-600">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                                        </svg>

                                        <h2 className="font-inter text-lg font-bold text-gray-800 ml-2">
                                            Advanced Settings
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="font-inter text-sm font-semibold text-gray-600">
                                                Cache Duration (minutes)
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="1440"
                                                value={data.cache_duration_minutes}
                                                onChange={(e) => setData('cache_duration_minutes', Number(e.target.value))}
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
                                            />
                                            <p className="text-xs text-gray-500">
                                                How long to cache static assets
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="font-inter text-sm font-semibold text-gray-600">
                                                Session Timeout (minutes)
                                            </label>
                                            <input
                                                type="number"
                                                min="5"
                                                max="120"
                                                value={data.session_timeout_minutes}
                                                onChange={(e) => setData('session_timeout_minutes', Number(e.target.value))}
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
                                            />
                                            <p className="text-xs text-gray-500">
                                                Auto-logout inactive users after this period
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="font-inter text-sm font-semibold text-gray-600">
                                                Max Upload Size (MB)
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="100"
                                                value={data.max_upload_size_mb}
                                                onChange={(e) => setData('max_upload_size_mb', Number(e.target.value))}
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
                                            />
                                            <p className="text-xs text-gray-500">
                                                Maximum file upload size limit
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                        <footer className="mt-12 flex justify-between font-inter text-xs font-medium text-gray-400">
                            <p>
                                2026 Product Showcase Admin. All rights
                                reserved.
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="font-inter hover:text-gray-600"
                                >
                                    Privacy Policy
                                </a>

                                <a
                                    href="#"
                                    className="font-inter hover:text-gray-600"
                                >
                                    Terms of Service
                                </a>
                            </div>
                        </footer>
                    </main>
                </div>
            </div >
        </>
    );
}
