import { Head } from '@inertiajs/react';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { Check, CircleX, Pencil, Settings, Trash2 } from 'lucide-react';

type CategoryRow = {
    id: string;
    name: string;
    active: boolean;
};

export default function Category() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newCategory, setNewCategory] = useState('');

    const [categories, setCategories] = useState<CategoryRow[]>([
        { id: '1', name: 'Electronics', active: true },
        { id: '2', name: 'Home Decor', active: true },
        { id: '3', name: 'Life style', active: true },
        { id: '4', name: 'Office', active: true },
        { id: '5', name: 'Apparel', active: true },
        { id: '6', name: 'Furniture', active: true },
        { id: '7', name: 'Footwear', active: true },
    ]);

    const canSave = newCategory.trim().length > 0;

    const removeCategory = (id: string) => {
        setCategories((prev) => prev.filter((item) => item.id !== id));
    };

    const setCategoryActive = (id: string, active: boolean) => {
        setCategories((prev) =>
            prev.map((c) => (c.id === id ? { ...c, active } : c)),
        );
    };

    const openAddModal = () => {
        setModalMode('add');
        setEditingId(null);
        setNewCategory('');
        setModalOpen(true);
    };

    const openEditModal = (row: CategoryRow) => {
        setModalMode('edit');
        setEditingId(row.id);
        setNewCategory(row.name);
        setModalOpen(true);
    };

    const closeModal = useCallback(() => {
        setModalOpen(false);
        setNewCategory('');
        setEditingId(null);
        setModalMode('add');
    }, []);

    const saveCategory = useCallback(() => {
        const trimmed = newCategory.trim();
        if (!trimmed) return;

        if (modalMode === 'edit' && editingId) {
            setCategories((prev) =>
                prev.map((c) =>
                    c.id === editingId ? { ...c, name: trimmed } : c,
                ),
            );
            closeModal();
            return;
        }

        setCategories((prev) => {
            const exists = prev.some(
                (c) => c.name.toLowerCase() === trimmed.toLowerCase(),
            );
            if (exists) return prev;
            return [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    name: trimmed,
                    active: true,
                },
            ];
        });
        closeModal();
    }, [newCategory, modalMode, editingId, closeModal]);

    return (
        <>
            <Head title="Category" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="category" />

                <div className="container mt-12 bg-white p-8 font-inter text-gray-900 lg:mt-0">
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
                            Category
                        </h1>
                        <Button
                            onClick={openAddModal}
                            variant="default"
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600"
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
                            Add New Category
                        </Button>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-start md:justify-between">
                            <div className="w-full space-y-3 md:w-auto">
                                <div className="relative w-full md:max-w-md">
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
                                <select className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-600 transition-colors outline-none hover:bg-slate-50 md:flex-none md:px-4">
                                    <option>All Category</option>
                                </select>
                                <select className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-600 transition-colors outline-none hover:bg-slate-50 md:flex-none md:px-4">
                                    <option>All Status</option>
                                </select>
                            </div>
                        </div>

                        <div className="hidden overflow-x-auto px-6 pb-6 md:block">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-50 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                    <tr>
                                        <th className="py-4">SL. No.</th>
                                        <th className="py-4">Category Name</th>
                                        <th className="py-4 pr-12 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {categories.map((row, index) => (
                                        <tr
                                            key={row.id}
                                            className="group transition-colors hover:bg-slate-50/50"
                                        >
                                            <td className="py-5 text-sm text-gray-700">
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </td>
                                            <td className="py-5 text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline">
                                                {row.name}
                                            </td>
                                            <td className="py-5 pr-12 text-right">
                                                <div className="flex items-center justify-end gap-4">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            type="button"
                                                            className="rounded-lg p-1.5 text-gray-500 outline-none transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500/30"
                                                            aria-label="Category actions"
                                                        >
                                                            <Settings className="h-4 w-4" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align="end"
                                                            sideOffset={6}
                                                            className="min-w-42 rounded-lg border border-gray-200 bg-white p-1 shadow-md"
                                                        >
                                                            <DropdownMenuItem
                                                                className="cursor-pointer gap-2.5 rounded-md px-2.5 py-2 text-sm text-gray-600 focus:bg-gray-50 focus:text-gray-900"
                                                                onSelect={() =>
                                                                    openEditModal(
                                                                        row,
                                                                    )
                                                                }
                                                            >
                                                                <Pencil className="h-4 w-4 text-gray-500" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="my-1 bg-gray-100" />
                                                            <DropdownMenuItem
                                                                className="cursor-pointer gap-2.5 rounded-md px-2.5 py-2 text-sm text-gray-600 focus:bg-gray-50 focus:text-gray-900"
                                                                disabled={
                                                                    row.active
                                                                }
                                                                onSelect={() =>
                                                                    setCategoryActive(
                                                                        row.id,
                                                                        true,
                                                                    )
                                                                }
                                                            >
                                                                <Check className="h-4 w-4 text-gray-900" />
                                                                Active
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="cursor-pointer gap-2.5 rounded-md px-2.5 py-2 text-sm text-gray-900 focus:bg-gray-50 focus:text-gray-900"
                                                                disabled={
                                                                    !row.active
                                                                }
                                                                onSelect={() =>
                                                                    setCategoryActive(
                                                                        row.id,
                                                                        false,
                                                                    )
                                                                }
                                                            >
                                                                <CircleX className="h-4 w-4 text-gray-900" />
                                                                Deactivate
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="my-1 bg-gray-100" />
                                                            <DropdownMenuItem
                                                                variant="destructive"
                                                                className="cursor-pointer gap-2.5 rounded-md px-2.5 py-2 text-sm focus:bg-red-50! text-gray-900!"
                                                                onSelect={() =>
                                                                    removeCategory(
                                                                        row.id,
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
                            <div className="text-sm text-gray-400 italic">
                                Showing 1 to {categories.length} of{' '}
                                {categories.length} results
                            </div>
                            <div className="flex space-x-2">
                                <button className="cursor-not-allowed rounded border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-400">
                                    Previous
                                </button>
                                <button className="cursor-not-allowed rounded border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-400">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={modalOpen}
                onOpenChange={(open) => {
                    if (!open) closeModal();
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogTitle className="text-base font-semibold text-gray-800">
                        {modalMode === 'edit'
                            ? 'Edit category'
                            : 'Category'}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-900">
                        {modalMode === 'edit'
                            ? 'Update the category name.'
                            : 'Add category name.'}
                    </DialogDescription>
                    <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        type="text"
                        placeholder="Enter category name"
                        className="mb-4"
                    />
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={closeModal}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={saveCategory}
                            disabled={!canSave}
                            variant="default"
                            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500"
                        >
                            {modalMode === 'edit' ? 'Save' : 'Add'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
