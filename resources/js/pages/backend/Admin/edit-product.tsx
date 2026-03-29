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

    // Show toast messages for success/error states
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const error = urlParams.get('error');
        
        if (success) {
            toast.success(success);
            // Clean URL
            urlParams.delete('success');
            window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
        }
        
        if (error) {
            toast.error(error);
            // Clean URL
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
            onSuccess: () => {
                toast.success('Product updated successfully!');
            },
            onError: (errors) => {
                toast.error('Please check the form for errors.');
            },
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
                <h1 className="text-2xl font-semibold text-gray-800 mb-8 font-inter">Edit Product</h1>

                <div className="space-y-6">

                    {/* Product Name + Category */}
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">Product Name</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={handleTitleChange}
                                className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">Category</label>
                            <div className="relative">
                                <select 
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', Number(e.target.value))}
                                    className="w-full appearance-none px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 pr-10"
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </div>
                            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                        </div>
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1.5">Slug</label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                        {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1.5">Short Description</label>
                        <textarea
                            rows={4}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Briefly describe product..."
                            className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Product Image + Right Column */}
                    <div className="grid grid-cols-2 gap-5">

                        {/* Product Image Upload */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">Product Image</label>
                            <label className="flex flex-col items-center justify-center gap-3 min-h-48 border-2 border-dashed border-gray-200 rounded-xl bg-white cursor-pointer hover:border-blue-400 hover:bg-blue-50">
                                <div className="w-20 h-20 bg-amber-100 rounded-xl flex items-center justify-center overflow-hidden" id="preview-wrapper">
                                    {previewUrl ? (
                                        <img src={previewUrl} className="w-full h-full object-cover rounded-xl" alt="Preview" />
                                    ) : (
                                        <svg className="w-10 h-10 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zm-10-3l-3-4-2 2.5L4 19h16l-5-6.5-4 3.5z"/>
                                        </svg>
                                    )}
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-700">Click to upload or drag & drop</p>
                                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
                                </div>
                                <input type="file" className="hidden" accept=".png,.jpg,.jpeg" onChange={previewImage} />
                            </label>
                        </div>

                        {/* Display Order + Product Status */}
                        <div className="flex flex-col gap-5">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Display Order</label>
                                <input
                                    type="number"
                                    value={data.display_order}
                                    onChange={(e) => setData('display_order', Number(e.target.value))}
                                    min="1"
                                    className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                                {errors.display_order && <p className="text-red-500 text-xs mt-1">{errors.display_order}</p>}
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Product Status</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Visible on public website</p>
                                </div>
                                {/* Toggle */}
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                    type="checkbox" 
                                    checked={data.status}
                                    onChange={(e) => setData('status', e.target.checked)}
                                    className="sr-only peer" 
                                />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200"></div>
                                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5"></div>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
                    <Link href={route('admin.products.index')} className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        Cancel
                    </Link>
                    <Button 
                        type="submit" 
                        disabled={processing}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Save Product
                    </Button>
                </div>
                </form>

            </div>
        </div>
    );
}
