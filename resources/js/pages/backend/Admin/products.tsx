import { Head, Link } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export default function Products() {
    const [addOpen, setAddOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('electronics');
    const [shortDescription, setShortDescription] = useState('');
    const [displayOrder, setDisplayOrder] = useState('1');
    const [productVisible, setProductVisible] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetAddForm = useCallback(() => {
        setProductName('');
        setCategory('electronics');
        setShortDescription('');
        setDisplayOrder('1');
        setProductVisible(true);
        setImagePreview((prev) => {
            if (prev) {
                URL.revokeObjectURL(prev);
            }
            return null;
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const handleAddOpenChange = (open: boolean) => {
        setAddOpen(open);
        if (!open) {
            resetAddForm();
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const applyImageFile = (file: File | undefined) => {
        if (!file) {
            return;
        }
        if (!file.type.startsWith('image/') || file.size > MAX_IMAGE_BYTES) {
            return;
        }
        setImagePreview((prev) => {
            if (prev) {
                URL.revokeObjectURL(prev);
            }
            return URL.createObjectURL(file);
        });
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        applyImageFile(e.target.files?.[0]);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        applyImageFile(e.dataTransfer.files[0]);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <Head title="Products" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="products" />

                <div className="container bg-white p-8 font-inter text-gray-900 mt-12 lg:mt-0">
                    <div className="mx-auto mb-10 max-w-2xl">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                <svg
                                    className="h-5 w-5"
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
                                placeholder="Search products, visitors..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-sm shadow-sm transition-all focus:ring-2 focus:ring-blue-500/10 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="font-inter text-xl font-bold text-gray-800">
                            Product Management
                        </h1>
                            <Button
                                asChild
                            >
                                <Button asChild variant="default" className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600">
                                    <Link href={route('admin.edit-product')}>
                                    Add New Product
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </Link>
                                </Button>
                            </Button>

                    </div>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    {/* Header */}
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
                            placeholder="Search products by name or category..."
                            className="w-full rounded-lg border border-gray-200 bg-gray-100/50 py-2 pr-4 pl-10 text-sm transition-all focus:bg-white focus:outline-none"
                            />
                        </div>
                        <div>
                            <h2 className="font-inter text-lg font-bold">Top Performing Products</h2>
                            <p className="text-xs text-gray-400">Products with the most engagement</p>
                        </div>
                        </div>
                        <div className="flex gap-3">
                        <select className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-600 outline-none transition-colors hover:bg-slate-50 md:flex-none md:px-4">
                            <option>All Category</option>
                        </select>
                        <select className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-600 outline-none transition-colors hover:bg-slate-50 md:flex-none md:px-4">
                            <option>All Status</option>
                        </select>
                        </div>
                    </div>

                    {/* Mobile card layout */}
                    <div className="divide-y divide-gray-50 px-4 pb-4 md:hidden">
                        {[
                        { name: "Echo Dot (5th Gen)",  bar: "60%",  clicks: "1,240", bg: "bg-gray-100"  },
                        { name: "Kindle Paperwhite",   bar: "45%",  clicks: "850",   bg: "bg-slate-100" },
                        { name: "Fire TV Stick 4K",    bar: "100%", clicks: "2,100", bg: "bg-gray-100"  },
                        ].map((item, i) => (
                        <div key={i} className="group py-4 transition-colors hover:bg-slate-50/50">
                            <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-gray-100 ${item.bg}`}>
                                <img
                                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                                className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-gray-700">{item.name}</p>
                                <p className="text-xs font-medium text-blue-500 hover:cursor-pointer hover:underline">Electronics</p>
                            </div>
                            <span className="shrink-0 text-sm font-bold tracking-tight text-gray-600">{item.clicks}</span>
                            </div>
                            <div className="mt-2.5 pl-13">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                <div
                                className="h-full rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                                style={{ width: item.bar }}
                                />
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
                            <tr className="group transition-colors hover:bg-slate-50/50">
                            <td className="flex items-center gap-4 py-5">
                                <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                                    className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">Echo Dot (5th Gen)</span>
                            </td>
                            <td className="py-5 text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline">Electronics</td>
                            <td className="py-5">
                                <div className="flex items-center gap-4">
                                <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                                    <div className="h-full w-[60%] rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                </div>
                                <span className="text-sm font-bold tracking-tight text-gray-600">1,240</span>
                                </div>
                            </td>
                            <td className="py-5">
                                <div className="flex items-center justify-center gap-4">
                                    <Link
                                        href={route('admin.edit-product')}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                        aria-label="Edit product"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                            <path d="M8 16L16.5 7.5L18.5 9.5L10 18H8V16Z" fill="currentColor" />
                                            <path d="M16.5 7.5L17.5 6.5C18 6 19 6 19.5 6.5C20 7 20 8 19.5 8.5L18.5 9.5L16.5 7.5Z" fill="currentColor" />
                                        </svg>
                                    </Link>
                                    <button
                                        type="button"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                        aria-label="Delete product"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <rect x="6" y="7" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                            <path d="M9 4H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            </tr>
                            <tr className="group transition-colors hover:bg-slate-50/50">
                            <td className="flex items-center gap-4 py-5">
                                <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-100 bg-slate-100">
                                <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                                    className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">Kindle Paperwhite</span>
                            </td>
                            <td className="py-5 text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline">Electronics</td>
                            <td className="py-5">
                                <div className="flex items-center gap-4">
                                <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                                    <div className="h-full w-[45%] rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                </div>
                                <span className="text-sm font-bold tracking-tight text-gray-600">850</span>
                                </div>
                            </td>
                            <td className="py-5">
                                <div className="flex items-center justify-center gap-4">
                                    <Link
                                        href={route('admin.edit-product')}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                        aria-label="Edit product"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                            <path d="M8 16L16.5 7.5L18.5 9.5L10 18H8V16Z" fill="currentColor" />
                                            <path d="M16.5 7.5L17.5 6.5C18 6 19 6 19.5 6.5C20 7 20 8 19.5 8.5L18.5 9.5L16.5 7.5Z" fill="currentColor" />
                                        </svg>
                                    </Link>
                                    <button
                                        type="button"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                        aria-label="Delete product"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <rect x="6" y="7" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                            <path d="M9 4H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            </tr>
                            <tr className="group transition-colors hover:bg-slate-50/50">
                            <td className="flex items-center gap-4 py-5">
                                <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                                    className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">Fire TV Stick 4K</span>
                            </td>
                            <td className="py-5 text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline">Electronics</td>
                            <td className="py-5">
                                <div className="flex items-center gap-4">
                                <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                                    <div className="h-full w-full rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                </div>
                                <span className="text-sm font-bold tracking-tight text-gray-600">2,100</span>
                                </div>
                            </td>
                            <td className="py-5">
                                <div className="flex items-center justify-center gap-4">
                                    <Link
                                        href={route('admin.edit-product')}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                        aria-label="Edit product"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                            <path d="M8 16L16.5 7.5L18.5 9.5L10 18H8V16Z" fill="currentColor" />
                                            <path d="M16.5 7.5L17.5 6.5C18 6 19 6 19.5 6.5C20 7 20 8 19.5 8.5L18.5 9.5L16.5 7.5Z" fill="currentColor" />
                                        </svg>
                                    </Link>
                                    <button
                                        type="button"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                        aria-label="Delete product"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <rect x="6" y="7" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                            <path d="M9 4H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            </tr>

                        </tbody>
                        </table>
                    </div>

                    </div>
                </div>
            </div>
        </>
    );
}
