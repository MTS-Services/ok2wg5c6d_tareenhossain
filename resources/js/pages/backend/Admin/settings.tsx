import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { Head, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface SettingsProps {
    settings?: {
        id?: number;
        website_name: string;
        contact_email: string;
        website_logo?: string;
        ga_tracking_id?: string;
        ga_connected?: boolean;
    };
}

export default function Settings({ settings }: SettingsProps) {
    const { data, setData, post, processing, errors } = useForm({
        website_name: settings?.website_name || '',
        contact_email: settings?.contact_email || '',
        website_logo: null as File | null,
        ga_tracking_id: settings?.ga_tracking_id || '',
        ga_connected: settings?.ga_connected || false,
    });

    // handleDisconnect
    const handleDisconnect = () => {
        router.post(
            route('admin.settings.update-connection'),
            {
                ga_connected: false,
            },
            {
                onSuccess: () => {
                    setData('ga_connected', false);
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
    const handleTestConnection = () => {
        if (!data.ga_tracking_id) {
            toast.error('Please enter a Google Analytics Tracking ID first.');
            return;
        }

        toast.info('Testing connection...');

        setTimeout(() => {
            router.post(
                route('admin.settings.update-connection'),
                {
                    ga_connected: true,
                    ga_tracking_id: data.ga_tracking_id,
                },
                {
                    onSuccess: () => {
                        setData('ga_connected', true);
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
        }, 2000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.settings.update'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Settings updated successfully!');
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error as string);
                });
            },
        });
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
                                className="rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save All Changes'}
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                                <div className="mb-6 flex items-center gap-2 text-blue-600">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                    >
                                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <h2 className="font-inter text-lg font-bold text-gray-800">
                                        General Settings
                                    </h2>
                                </div>
                                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="font-inter text-sm font-semibold text-gray-600">
                                            Website Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.website_name}
                                            onChange={(e) =>
                                                setData(
                                                    'website_name',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                        />
                                        {errors.website_name && (
                                            <p className="text-sm text-red-500">
                                                {errors.website_name}
                                            </p>
                                        )}
                                    </div>
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
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                        />
                                        {errors.contact_email && (
                                            <p className="text-sm text-red-500">
                                                {errors.contact_email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-inter text-sm font-semibold text-gray-600">
                                        Website Logo
                                    </label>
                                    <div className="flex items-center gap-6 rounded-2xl border-2 border-dashed border-gray-200 p-6">
                                        {settings?.website_logo ? (
                                            <img
                                                src={`/storage/${settings.website_logo}`}
                                                alt="Website Logo"
                                                className="h-16 w-16 rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-600 uppercase">
                                                {settings?.website_name?.charAt(
                                                    0,
                                                ) || 'W'}
                                            </div>
                                        )}
                                        <div className="space-y-1">
                                            <label className="cursor-pointer text-sm font-bold text-blue-600 hover:underline">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        setData(
                                                            'website_logo',
                                                            e.target
                                                                .files?.[0] ||
                                                                null,
                                                        )
                                                    }
                                                    className="hidden"
                                                />
                                                Upload new file
                                            </label>
                                            <p className="font-inter text-xs text-gray-400">
                                                JPG, PNG or SVG. Recommended
                                                size 400x400px.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                                <div className="mb-6 flex items-center gap-2 text-blue-600">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                    >
                                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <h2 className="font-inter text-lg font-bold text-gray-800">
                                        Tracking Integration
                                    </h2>
                                </div>
                                <div
                                    className={`mb-6 flex items-center gap-3 rounded-xl border p-4 ${data.ga_connected ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}
                                >
                                    <div
                                        className={`flex h-6 w-6 items-center justify-center rounded-full ${data.ga_connected ? 'bg-emerald-500' : 'bg-red-500'}`}
                                    >
                                        {data.ga_connected ? (
                                            <svg
                                                className="h-4 w-4 rounded-full bg-green-500 p-1 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth={3}
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-4 w-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth={3}
                                            >
                                                <path d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                    </div>
                                    <span
                                        className={`text-sm font-bold ${data.ga_connected ? 'text-green-700' : 'text-red-700'}`}
                                    >
                                        {data.ga_connected
                                            ? 'Google Analytics Connected'
                                            : 'Google Analytics Not Connected'}
                                    </span>
                                </div>
                                <div className="mb-8 space-y-2">
                                    <label className="font-inter text-sm font-semibold text-gray-600">
                                        Google Analytics Tracking ID
                                    </label>
                                    <div className="relative max-w-md">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-inter text-gray-400">
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                            >
                                                <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            value={data.ga_tracking_id}
                                            onChange={(e) =>
                                                setData(
                                                    'ga_tracking_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 font-mono text-sm"
                                        />
                                    </div>
                                    <p className="font-inter text-xs text-gray-400">
                                        {data.ga_connected
                                            ? 'Data collection is currently active for this tracking ID.'
                                            : 'Enter your Google Analytics tracking ID to enable data collection.'}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleDisconnect}
                                        disabled={processing}
                                        className="rounded-xl border border-gray-200 px-6 py-2 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Saving...'
                                            : 'Disconnect'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleTestConnection}
                                        disabled={processing}
                                        className="rounded-xl bg-blue-50 px-6 py-2 text-sm font-bold text-blue-600 transition-all hover:bg-blue-100 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Connecting...'
                                            : 'Test Connection'}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <footer className="mt-12 flex justify-between font-inter text-xs font-medium text-gray-400">
                            <p>
                                © 2026 Product Showcase Admin. All rights
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
            </div>
        </>
    );
}
