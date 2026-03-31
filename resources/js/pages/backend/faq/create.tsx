import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';

export default function CreateFaq() {
    const { data, setData, post, processing, errors, reset } = useForm({
        question: '',
        answer: '',
        status: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.faqs.store'), {
            onSuccess: () => {
                reset();
                toast.success('FAQ created successfully!');
            },
            onError: (errors) => {
                toast.error('Please check the form for errors.');
                console.error('Validation errors:', errors);
            },
        });
    };

    // Toast messages from URL params
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const error = urlParams.get('error');

        if (success) {
            toast.success(success);
            urlParams.delete('success');
            window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
        }
        if (error) {
            toast.error(error);
            urlParams.delete('error');
            window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
        }
    }, []);

    return (
        <div className="flex">
            <Head title="Create FAQ" />
            <AdminSidebar isCollapsed={false} activeSlug="faqs" />

            <div className="flex-1 p-8">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-8 font-inter">Create FAQ</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Question Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Question <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.question}
                                onChange={(e) => setData('question', e.target.value)}
                                placeholder="Enter your question"
                                className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.question ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            />
                            {errors.question && (
                                <p className="mt-1 text-sm text-red-500">{errors.question}</p>
                            )}
                        </div>

                        {/* Answer Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Answer <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.answer}
                                onChange={(e) => setData('answer', e.target.value)}
                                placeholder="Enter the answer to the question"
                                rows={6}
                                className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                                    errors.answer ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            />
                            {errors.answer && (
                                <p className="mt-1 text-sm text-red-500">{errors.answer}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Creating...' : 'Create FAQ'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}