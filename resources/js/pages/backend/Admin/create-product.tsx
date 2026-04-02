import TiptapEditor from '@/components/tiptap-editor';
import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CreateProduct() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        slug: '',
        category_id: '',
        description: '',
        status: true,
        display_order: '1',
    });

    const { errors, categories } = usePage().props;

    const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // Convert checkbox to boolean
        const statusValue = formData.get('status') === 'on' ? '1' : '0';
        formData.set('status', statusValue);

        router.post(route('admin.products.store'), formData, {
            onSuccess: () => {
                toast.success('Product created successfully!');
                form.reset();
                setPreviewUrl(null);
                setFormData({
                    title: '',
                    subtitle: '',
                    slug: '',
                    category_id: '',
                    description: '',
                    status: true,
                    display_order: '1',
                });
            },
            onError: (errors) => {
                toast.error('Please check the form for errors.');
                console.error('Validation errors:', errors);
            },
        });
    };

    // Show toast messages for success/error states
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const error = urlParams.get('error');

        if (success) {
            toast.success(success);
            // Clean URL
            urlParams.delete('success');
            window.history.replaceState(
                {},
                '',
                `${window.location.pathname}?${urlParams.toString()}`,
            );
        }

        if (error) {
            toast.error(error);
            // Clean URL
            urlParams.delete('error');
            window.history.replaceState(
                {},
                '',
                `${window.location.pathname}?${urlParams.toString()}`,
            );
        }
    }, []);

    const generateSlug = (title: string): string => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Auto-generate slug when title changes
        if (field === 'title' && typeof value === 'string') {
            setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
        }
    };

    return (
        <div className="flex">
            <Head title="Create Product" />
            <AdminSidebar isCollapsed={false} activeSlug="products" />

            <div className="container mt-12 bg-white p-8 font-inter text-gray-900 lg:mt-0">
                <div className="flex items-center justify-between">
                    <h1 className="mb-8 font-inter text-2xl font-semibold text-gray-800">
                        Create Product
                    </h1>
                    <Link 
                        href="/admin/products"
                        className="rounded-lg border border-gray-200 bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-black/80"
                    >
                        Back
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Name + Category */}
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="mb-1.5 block text-sm text-gray-600">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) =>
                                    handleInputChange('title', e.target.value)
                                }
                                placeholder="Enter product name"
                                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none ${
                                    errors.title
                                        ? 'border-red-500'
                                        : 'border-gray-200'
                                }`}
                                required
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm text-gray-600">
                                Product Subtitle
                            </label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={(e) =>
                                    handleInputChange(
                                        'subtitle',
                                        e.target.value,
                                    )
                                }
                                placeholder="Enter product subtitle"
                                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none ${
                                    errors.subtitle
                                        ? 'border-red-500'
                                        : 'border-gray-200'
                                }`}
                                required
                            />
                            {errors.subtitle && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.subtitle}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm text-gray-600">
                                Slug
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={(e) =>
                                    handleInputChange('slug', e.target.value)
                                }
                                placeholder="Product slug (auto-generated)"
                                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none ${
                                    errors.slug
                                        ? 'border-red-500'
                                        : 'border-gray-200'
                                }`}
                                required
                            />
                            {errors.slug && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.slug}
                                </p>
                            )}
                            <p className="mt-1 text-xs text-gray-400">
                                URL-friendly version of the product name.
                                Auto-generated from title.
                            </p>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm text-gray-600">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'category_id',
                                            e.target.value,
                                        )
                                    }
                                    className={`w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-10 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none ${
                                        errors.category_id
                                            ? 'border-red-500'
                                            : 'border-gray-200'
                                    }`}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {Array.isArray(categories) &&
                                        categories.map((category: any) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.title}
                                            </option>
                                        ))}
                                </select>
                                <svg
                                    className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                                {errors.category_id && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Slug Field */}

                    {/* Short Description */}
                    <div>
                        <label className="mb-1.5 block text-sm text-gray-600">
                            Short Description
                        </label>
                        <TiptapEditor
                            value={formData.description}
                            onChange={(value) =>
                                handleInputChange('description', value)
                            }
                            placeholder="Briefly describe product..."
                            className="w-full"
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Product Image + Right Column */}
                    <div className="grid grid-cols-2 gap-5">
                        {/* Product Image Upload */}
                        <div>
                            <label className="mb-1.5 block text-sm text-gray-600">
                                Product Image
                            </label>
                            <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50">
                                <div
                                    className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-amber-100"
                                    id="preview-wrapper"
                                >
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            className="h-full w-full rounded-xl object-cover"
                                            alt="Preview"
                                        />
                                    ) : (
                                        <svg
                                            className="h-10 w-10 text-amber-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zm-10-3l-3-4-2 2.5L4 19h16l-5-6.5-4 3.5z" />
                                        </svg>
                                    )}
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-700">
                                        Click to upload or drag & drop
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        PNG, JPG up to 5MB
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    name="image"
                                    className="hidden"
                                    accept=".png,.jpg,.jpeg"
                                    onChange={previewImage}
                                />
                                {errors.image && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.image}
                                    </p>
                                )}
                            </label>
                        </div>

                        {/* Display Order + Product Status */}
                        <div className="flex flex-col gap-5">
                            <div>
                                <label className="mb-1.5 block text-sm text-gray-600">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    name="display_order"
                                    value={formData.display_order}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'display_order',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="1"
                                    min="1"
                                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none ${
                                        errors.display_order
                                            ? 'border-red-500'
                                            : 'border-gray-200'
                                    }`}
                                />
                                {errors.display_order && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.display_order}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        Product Status
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        Visible on public website
                                    </p>
                                </div>
                                {/* Toggle */}
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        name="status"
                                        checked={formData.status}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'status',
                                                e.target.checked,
                                            )
                                        }
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 peer-checked:bg-blue-500"></div>
                                    <div className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-5"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex justify-end gap-3 border-t border-gray-100 pt-6">
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-600 cursor-pointer"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
