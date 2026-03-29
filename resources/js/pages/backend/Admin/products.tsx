import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { Button } from '@/components/ui/button';
import { PenSquare, Trash } from 'lucide-react';

interface Category {
    id: number;
    title: string;
}

interface Product {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    total_clicks?: number;
    category: Category | null;
}

interface Props {
    products: Product[];
    categories: Category[];
    filters: {
        search?: string;
        category_id?: string;
        status?: string;
    };
}

export default function Products({ products, categories, filters }: Props) {
    const maxClicks = Math.max(...products.map((p) => p.total_clicks || 0), 1);

    const barWidth = (clicks: number | undefined) =>
        `${Math.round(((clicks || 0) / maxClicks) * 100)}%`;

    const formatClicks = (n: number | undefined) => (n || 0).toLocaleString();

    // ── search state ──────────────────────────────────────────────────────────
    const [search, setSearch] = useState(filters.search || '');
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = (value: string) => {
        setSearch(value);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            router.get(
                route('admin.products.index'),
                {
                    search: value || undefined,
                    category_id: filters.category_id || undefined,
                    status: filters.status || undefined,
                },
                { preserveState: true, replace: true },
            );
        }, 400);
    };

    // ── filter (category / status) ────────────────────────────────────────────
    const handleFilter = (type: string, value: string) => {
        router.get(
            route('admin.products.index'),
            {
                search: filters.search || undefined,
                [type]: value || undefined,
                ...(type !== 'category_id' ? { category_id: filters.category_id || undefined } : {}),
                ...(type !== 'status' ? { status: filters.status || undefined } : {}),
            },
            { preserveState: true, replace: true },
        );
    };

    // ── toast from URL params ─────────────────────────────────────────────────
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

    useEffect(() => {
        setSearch(filters.search || '');
    }, [filters.search]);

    return (
        <>
            <Head title="Products" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="products" />

                <div className="container mt-12 bg-white p-8 font-inter text-gray-900 lg:mt-0">
                    {/* Top search bar */}
                    <div className="mx-auto mb-10 max-w-2xl">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                value=""
                                placeholder="Search products, visitors..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-sm shadow-sm transition-all focus:ring-2 focus:ring-blue-500/10 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="font-inter text-xl font-bold text-gray-800">Product Management</h1>
                        <Button asChild variant="default" className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600">
                            <Link href={route('admin.products.create')}>
                                Add New Product
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path d="M12 5v14" />
                                    <path d="M5 12h14" />
                                </svg>
                            </Link>
                        </Button>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        {/* Table header / filters */}
                        <div className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-start md:justify-between">
                            <div className="w-full space-y-3 md:w-auto">
                                <div className="relative w-full md:max-w-md">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        placeholder="Search by product title..."
                                        className="w-full rounded-lg border border-gray-200 bg-gray-100/50 py-2 pr-4 pl-10 text-sm transition-all focus:bg-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-inter text-lg font-bold">Top Performing Products</h2>
                                    <p className="text-xs text-gray-400">Products with the most engagement</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <select
                                    value={filters.category_id || ''}
                                    onChange={(e) => handleFilter('category_id', e.target.value)}
                                    className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-600 outline-none transition-colors hover:bg-slate-50 md:flex-none md:px-4"
                                >
                                    <option value="">All Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id.toString()}>
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={filters.status || ''}
                                    onChange={(e) => handleFilter('status', e.target.value)}
                                    className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-600 outline-none transition-colors hover:bg-slate-50 md:flex-none md:px-4"
                                >
                                    <option value="">All Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Mobile card layout */}
                        <div className="divide-y divide-gray-50 px-4 pb-4 md:hidden">
                            {products.map((product) => (
                                <div key={product.id} className="group py-4 transition-colors hover:bg-slate-50/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                                            {product.image ? (
                                                <img src={`/storage/${product.image}`} className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0" alt={product.title} />
                                            ) : (
                                                <div className="h-full w-full bg-gray-200" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-gray-700">{product.title}</p>
                                            <p className="text-xs font-medium text-blue-500">{product.category?.title ?? '—'}</p>
                                        </div>
                                        <span className="shrink-0 text-sm font-bold tracking-tight text-gray-600">
                                            {formatClicks(product.total_clicks)}
                                        </span>
                                    </div>
                                    <div className="mt-2.5 pl-13">
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                            <div className="h-full rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: barWidth(product.total_clicks) }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop table layout */}
                        <div className="hidden overflow-x-auto px-6 pb-6 md:block">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-50 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                    <tr>
                                        <th className="py-4">Product</th>
                                        <th className="py-4">Category</th>
                                        <th className="py-4">Total Clicks</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.map((product) => (
                                        <tr key={product.id} className="group transition-colors hover:bg-slate-50/50">
                                            <td className="flex items-center gap-4 py-5">
                                                <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0" alt={product.title} />
                                                    ) : (
                                                        <div className="h-full w-full bg-gray-200" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700">{product.title}</span>
                                            </td>
                                            <td className="py-5 text-sm font-medium text-blue-500">
                                                {product.category?.title ?? '—'}
                                            </td>
                                            <td className="py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                                                        <div className="h-full rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: barWidth(product.total_clicks) }} />
                                                    </div>
                                                    <span className="text-sm font-bold tracking-tight text-gray-600">
                                                        {formatClicks(product.total_clicks)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-5">
                                                <div className="flex items-center justify-center gap-4">
                                                    <Link
                                                        href={route('admin.products.edit', product.slug)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                                        aria-label="Edit product"
                                                    >
                                                        <PenSquare />
                                                    </Link>
                                                    <Link
                                                        href={route('admin.products.delete', product.slug)}
                                                        onClick={(e) => {
                                                            if (!confirm('Are you sure you want to delete this product?')) {
                                                                e.preventDefault();
                                                                return;
                                                            }
                                                            toast.success('Product deleted successfully!');
                                                        }}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                                        aria-label="Delete product"
                                                    >
                                                        <Trash />
                                                    </Link>
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