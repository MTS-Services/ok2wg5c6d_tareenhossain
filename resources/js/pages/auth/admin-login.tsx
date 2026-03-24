import { Head, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.login.store'));
    };

    return (
        <AuthLayout
            title="NexusFlow"
            description="Enter your credentials to access the console"
        >
            <Head title="Admin Login" />

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoFocus
                        placeholder="name@company.com"
                        className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-3 text-gray-200 outline-none transition-all placeholder:text-gray-600 focus:border-transparent focus:ring-2 focus:ring-gray-500"
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <div className="mb-2 flex justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <a href="#" className="text-xs text-gray-500 transition-colors hover:text-gray-400">
                            Forgot password?
                        </a>
                    </div>
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-3 text-gray-200 outline-none transition-all placeholder:text-gray-600 focus:border-transparent focus:ring-2 focus:ring-gray-500"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-gray-500 focus:ring-gray-500 focus:ring-offset-gray-900"
                    />
                    <label htmlFor="remember" className="ml-2 select-none text-sm text-gray-500">
                        Stay logged in for 30 days
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white shadow-lg shadow-gray-500/20 transition-all active:scale-[0.98] hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Signing In...' : 'Sign In to Dashboard'}
                </button>
            </form>

            <div className="mt-8 border-t border-gray-500/5 pt-6 text-center">
                <p className="text-sm text-gray-500">
                    Don&apos;t have an account?
                    <a href="#" className="ml-1 font-medium text-gray-500 hover:text-gray-400">
                        Request Access
                    </a>
                </p>
            </div>
        </AuthLayout>
    );
}
