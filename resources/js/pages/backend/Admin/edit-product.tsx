import { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';

interface Category {
    id: number;
    title: string;
}

interface Product {
    id: number;
    title: string;
    subtitle?: string;
    slug: string;
    category_id: number;
    description: string | null;
    image: string | null;
    status: boolean;
    display_order: number | null;
}

interface Props {
    product: Product;
    categories: Category[];
}

export default function EditProduct() {
    const { product, categories } = usePage().props as unknown as Props;
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: product.title,
        subtitle: product.subtitle || '',
        slug: product.slug,
        category_id: product.category_id,
        description: product.description || '',
        image: null as File | null,
        status: product.status,
        display_order: product.display_order || 1,
    });

    useEffect(() => {
        if (product.image) {
            setPreviewUrl(`/storage/${product.image}`);
        }
    }, [product.image]);

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

    const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setData('image', file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setData('title', title);
        setData('slug', generateSlug(title));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.update', product.slug), {
            onSuccess: () => toast.success('Product updated successfully!'),
            onError: () => toast.error('Please check the form for errors.'),
        });
    };

    return (
        <div className="flex">
            <Head title="Edit Product" />
            <AdminSidebar isCollapsed={false} activeSlug="edit-product" />

            <div className="container bg-white p-8 font-inter text-gray-900 mt-12 lg:mt-0">
                <div className="mx-auto mb-10 max-w-2xl">
                    <SearchBar />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-8">
                        Edit Product
                    </h1>

                    <div className="space-y-6">

                        {/* Name + Subtitle */}
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm mb-1.5">Product Name</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    className="w-full px-3 py-2.5 border rounded-lg"
                                />
                                {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm mb-1.5">Product Subtitle</label>
                                <input
                                    type="text"
                                    value={data.subtitle}
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                    className="w-full px-3 py-2.5 border rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm mb-1.5">Category</label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', Number(e.target.value))}
                                className="w-full px-3 py-2.5 border rounded-lg"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.title}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && <p className="text-red-500 text-xs">{errors.category_id}</p>}
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm mb-1.5">Slug</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                className="w-full px-3 py-2.5 border rounded-lg"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm mb-1.5">Short Description</label>
                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full px-3 py-2.5 border rounded-lg"
                            />
                        </div>

                        {/* Image + Right */}
                        <div className="grid grid-cols-2 gap-5">

                            {/* Image */}
                            <div>
                                <label className="block text-sm mb-1.5">Product Image</label>
                                <input type="file" onChange={previewImage} />
                                {previewUrl && (
                                    <img src={previewUrl} className="mt-2 w-32 h-32 object-cover" />
                                )}
                            </div>

                            {/* Right */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-1.5">Display Order</label>
                                    <input
                                        type="number"
                                        value={data.display_order}
                                        onChange={(e) => setData('display_order', Number(e.target.value))}
                                        className="w-full px-3 py-2.5 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.status}
                                            onChange={(e) => setData('status', e.target.checked)}
                                        />
                                        Active
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-10">
                        <Link href={route('admin.products.index')}>
                            Cancel
                        </Link>

                        <Button type="submit" disabled={processing}>
                            Save Product
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}