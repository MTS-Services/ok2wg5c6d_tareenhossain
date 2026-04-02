import { Head, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { SquarePen, Trash2 } from 'lucide-react';

type CategoryRow = {
    id: string;
    title: string;
    slug: string;
};

type CategoryPageProps = {
    categories: CategoryRow[];
    errors?: Record<string, string>;
};

function slugPreviewFromTitle(title: string): string {
    const base = title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return base === '' ? 'category' : base;
}

export default function Category() {
    const { categories: initialCategories, errors } =
        usePage<CategoryPageProps>().props;

    const [modalOpen, setModalOpen] = useState(false);
    const [categoryFormBusy, setCategoryFormBusy] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState<CategoryRow[]>(
        initialCategories ?? [],
    );
    const [categorySearch, setCategorySearch] = useState('');

    useEffect(() => {
        if (initialCategories) {
            setCategories(initialCategories);
        }
    }, [initialCategories]);

    const filteredCategories = useMemo(() => {
        const q = categorySearch.trim().toLowerCase();
        if (q === '') return categories;
        return categories.filter((row) =>
            row.title.toLowerCase().includes(q),
        );
    }, [categories, categorySearch]);

    const canSave = newCategory.trim().length > 0 && !categoryFormBusy;

    const categorySlugPreview = useMemo(
        () => slugPreviewFromTitle(newCategory),
        [newCategory],
    );

    const removeCategory = (id: string) => {
        router.delete(route('admin.categories.destroy', id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Category deleted successfully.'),
            onError: () => toast.error('Failed to delete category.'),
        });
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
        setNewCategory(row.title);
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

        const isEdit = modalMode === 'edit';

        const opts = {
            preserveScroll: true,
            onStart: () => setCategoryFormBusy(true),
            onFinish: () => setCategoryFormBusy(false),
            onSuccess: () => {
                closeModal();
                toast.success(
                    isEdit
                        ? 'Category updated successfully.'
                        : 'Category added successfully.',
                );
            },
            onError: () =>
                toast.error(
                    isEdit
                        ? 'Failed to update category.'
                        : 'Failed to add category.',
                ),
        };

        if (isEdit && editingId) {
            router.put(
                route('admin.categories.update', editingId),
                { title: trimmed },
                opts,
            );
            return;
        }

        router.post(route('admin.categories.store'), { title: trimmed }, opts);
    }, [newCategory, modalMode, editingId, closeModal]);

    return (
        <>
            <Head title="Category" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="category" />

                <div className="container mt-12 bg-white p-8 font-inter text-gray-900 lg:mt-0">

                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="font-inter text-xl font-bold text-gray-800">Category</h1>
                        <Button
                            onClick={openAddModal}
                            variant="default"
                            className="flex items-center gap-2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Add New Category
                        </Button>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-start md:justify-between">
                            <div className="w-full space-y-3 md:w-auto">
                                <div>
                                    <h2 className="font-inter text-lg font-bold">Top Performing Products</h2>
                                    <p className="text-xs text-gray-400">Products with the most engagement</p>
                                </div>
                                <div className="relative w-full md:max-w-md">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="search"
                                        value={categorySearch}
                                        onChange={(e) => setCategorySearch(e.target.value)}
                                        placeholder="Search categories by name..."
                                        autoComplete="off"
                                        aria-label="Search categories"
                                        className="w-full rounded-lg border border-gray-200 bg-gray-100/50 py-2 pr-4 pl-10 text-sm transition-all focus:bg-white focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="hidden overflow-x-auto px-6 pb-6 md:block">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-50 bg-gray-100 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                    <tr>
                                        <th className="py-4">SL. No.</th>
                                        <th className="py-4 text-center">Category Name</th>
                                        <th className="py-4 text-center font-bold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredCategories.map((row, index) => (
                                        <tr key={row.id} className="group transition-colors hover:bg-slate-50/50">
                                            <td className="py-5 text-sm text-gray-700">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="py-5 text-center text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline">
                                                {row.title}
                                            </td>
                                            <td className="py-5">
                                                <div className="flex items-center justify-center gap-5">
                                                    <button
                                                        type="button"
                                                        title="Edit"
                                                        aria-label="Edit category"
                                                        onClick={() => openEditModal(row)}
                                                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                                    >
                                                        <SquarePen />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        title="Delete"
                                                        aria-label="Delete category"
                                                        onClick={() => removeCategory(row.id)}
                                                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md transition hover:bg-red-50"
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
                            <div className="text-sm italic text-gray-400">
                                {filteredCategories.length === 0 ? (
                                    categories.length === 0 ? (
                                        <>No categories yet.</>
                                    ) : (
                                        <>No categories match your search.</>
                                    )
                                ) : (
                                    <>
                                        Showing 1 to {filteredCategories.length} of {categories.length}{' '}
                                        {categories.length === 1 ? 'category' : 'categories'}
                                        {categorySearch.trim() !== '' ? ' (filtered)' : ''}
                                    </>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <button className="cursor-not-allowed rounded border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-400">Previous</button>
                                <button className="cursor-not-allowed rounded border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-400">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={modalOpen} onOpenChange={(open) => { if (!open) closeModal(); }}>
                <DialogContent className="sm:max-w-md">
                    <DialogTitle className="text-base font-semibold text-gray-800">
                        {modalMode === 'edit' ? 'Edit category' : 'Category'}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-900">
                        {modalMode === 'edit' ? 'Update the category name.' : 'Add category name.'}
                    </DialogDescription>

                    <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        type="text"
                        placeholder="Enter category name"
                        className="mb-1"
                    />
                    <div className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
                        <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">Slug</p>
                        <p className="mt-0.5 break-all font-mono text-sm text-gray-800" aria-live="polite">
                            {categorySlugPreview}
                        </p>
                    </div>
                    <InputError message={errors?.title} className="mb-4" />

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={closeModal}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={saveCategory}
                            disabled={!canSave}
                            variant="default"
                            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 cursor-pointer"
                        >
                            {categoryFormBusy ? 'Saving…' : modalMode === 'edit' ? 'Save' : 'Add'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}