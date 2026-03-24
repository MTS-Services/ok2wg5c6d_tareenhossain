import { Head } from '@inertiajs/react';
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

                <div className="container bg-white p-8 font-inter text-gray-900">
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
                        <Dialog open={addOpen} onOpenChange={handleAddOpenChange}>
                            <button
                                type="button"
                                onClick={() => setAddOpen(true)}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                >
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                                Add New Product
                            </button>
                            <DialogContent className="max-h-[92vh] gap-0 overflow-hidden rounded-2xl border-gray-100 bg-white p-0 shadow-xl sm:max-w-2xl">
                                <div className="border-b border-gray-100 px-6 pt-6 pb-4 pr-14">
                                    <DialogTitle className="font-inter text-lg font-bold text-gray-800">
                                        Edit Product
                                    </DialogTitle>
                                    <DialogDescription className="sr-only">
                                        Add a new product with name, category,
                                        description, image, display order, and
                                        public visibility.
                                    </DialogDescription>
                                </div>

                                <div className="max-h-[min(60vh,520px)] space-y-5 overflow-y-auto px-6 py-5">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="add-product-name"
                                                className="text-xs font-medium text-gray-500"
                                            >
                                                Product Name
                                            </Label>
                                            <Input
                                                id="add-product-name"
                                                value={productName}
                                                onChange={(e) =>
                                                    setProductName(e.target.value)
                                                }
                                                placeholder="Echo Dot (5th Gen)"
                                                className="h-11 rounded-xl border-gray-200 bg-gray-50 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="add-product-category"
                                                className="text-xs font-medium text-gray-500"
                                            >
                                                Category
                                            </Label>
                                            <div className="relative">
                                                <select
                                                    id="add-product-category"
                                                    value={category}
                                                    onChange={(e) =>
                                                        setCategory(e.target.value)
                                                    }
                                                    className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2 pr-10 pl-3 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500/15 focus:outline-none"
                                                >
                                                    <option value="electronics">
                                                        Electronics
                                                    </option>
                                                    <option value="books">
                                                        Books
                                                    </option>
                                                    <option value="home">
                                                        Home
                                                    </option>
                                                </select>
                                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
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
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="add-product-description"
                                            className="text-xs font-medium text-gray-500"
                                        >
                                            Short Description
                                        </Label>
                                        <textarea
                                            id="add-product-description"
                                            value={shortDescription}
                                            onChange={(e) =>
                                                setShortDescription(
                                                    e.target.value,
                                                )
                                            }
                                            rows={4}
                                            placeholder="Briefly describe the product..."
                                            className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/15 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-medium text-gray-500">
                                                Product Image
                                            </Label>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg"
                                                className="sr-only"
                                                onChange={onFileInputChange}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                                onDrop={onDrop}
                                                onDragOver={onDragOver}
                                                className="flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-300/80 bg-blue-50/40 px-4 py-6 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/60"
                                            >
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        alt=""
                                                        className="max-h-28 max-w-full rounded-lg object-contain"
                                                    />
                                                ) : (
                                                    <div className="rounded-lg bg-white/80 p-3 text-blue-500">
                                                        <svg
                                                            className="mx-auto h-10 w-10 opacity-60"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                                <span className="text-sm font-medium text-blue-600">
                                                    Click to upload or drag &
                                                    drop
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    PNG, JPG up to 5MB
                                                </span>
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="add-display-order"
                                                    className="text-xs font-medium text-gray-500"
                                                >
                                                    Display Order
                                                </Label>
                                                <Input
                                                    id="add-display-order"
                                                    type="number"
                                                    min={1}
                                                    value={displayOrder}
                                                    onChange={(e) =>
                                                        setDisplayOrder(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-11 max-w-[120px] rounded-xl border-gray-200 bg-gray-50 text-sm"
                                                />
                                            </div>
                                            <div className="rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            Product Status
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Visible on public
                                                            website
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={
                                                            productVisible
                                                        }
                                                        onClick={() =>
                                                            setProductVisible(
                                                                (v) => !v,
                                                            )
                                                        }
                                                        className={cn(
                                                            'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 focus:outline-none',
                                                            productVisible
                                                                ? 'bg-blue-600'
                                                                : 'bg-gray-200',
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition-transform',
                                                                productVisible
                                                                    ? 'translate-x-5'
                                                                    : 'translate-x-0.5',
                                                            )}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3 border-t border-gray-50 px-6 py-4">
                                    <DialogClose asChild>
                                        <button
                                            type="button"
                                            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                                        >
                                            Cancel
                                        </button>
                                    </DialogClose>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleAddOpenChange(false)
                                        }
                                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-colors hover:bg-blue-700"
                                    >
                                        Save Product
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="flex flex-wrap items-start justify-between gap-6 p-6">
                            <div className="w-full space-y-4 md:w-auto">
                                <div className="relative w-full max-w-md">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
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
                                        placeholder="Search products by name or category..."
                                        className="w-full rounded-lg border border-gray-200 bg-gray-100/50 py-2 pr-4 pl-10 text-sm transition-all focus:bg-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-inter text-lg font-bold">
                                        Top Performing Products
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        Products with the most engagement
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <select className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-600 outline-none transition-colors hover:bg-slate-50">
                                    <option>All Category</option>
                                </select>
                                <select className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-600 outline-none transition-colors hover:bg-slate-50">
                                    <option>All Status</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto px-6 pb-6">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-50 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                    <tr>
                                        <th className="py-4">Product</th>
                                        <th className="py-4">Category</th>
                                        <th className="py-4">Total Clicks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="group transition-colors hover:bg-slate-50/50">
                                        <td className="flex items-center gap-4 py-5">
                                            <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                                                <img
                                                    src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                                                    className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">
                                                Echo Dot (5th Gen)
                                            </span>
                                        </td>
                                        <td className="py-5 text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline">
                                            Electronics
                                        </td>
                                        <td className="py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                                                    <div className="h-full w-[60%] rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                                </div>
                                                <span className="text-sm font-bold tracking-tight text-gray-600">
                                                    1,240
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="group transition-colors hover:bg-slate-50/50">
                                        <td className="flex items-center gap-4 py-5">
                                            <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-100 bg-slate-100">
                                                <img
                                                    src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                                                    className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">
                                                Kindle Paperwhite
                                            </span>
                                        </td>
                                        <td className="py-5 text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline">
                                            Electronics
                                        </td>
                                        <td className="py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                                                    <div className="h-full w-[45%] rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                                </div>
                                                <span className="text-sm font-bold tracking-tight text-gray-600">
                                                    850
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="group transition-colors hover:bg-slate-50/50">
                                        <td className="flex items-center gap-4 py-5">
                                            <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                                                <img
                                                    src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
                                                    className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">
                                                Fire TV Stick 4K
                                            </span>
                                        </td>
                                        <td className="py-5 text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline">
                                            Electronics
                                        </td>
                                        <td className="py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                                                    <div className="h-full w-full rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                                </div>
                                                <span className="text-sm font-bold tracking-tight text-gray-600">
                                                    2,100
                                                </span>
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
