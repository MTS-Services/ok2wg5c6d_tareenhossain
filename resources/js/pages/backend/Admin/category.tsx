import { Head, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
import { cn } from '@/lib/utils';
import { SquarePen, Trash2 } from 'lucide-react';

type CategoryRow = {
    id: string;
    name: string;
    active: boolean;
};

type CategoryRowActionDef = {
    key: string;
    label: string;
    icon: string;
    dividerBefore: boolean;
    variant: string | null;
};

type CategoryPageProps = {
    categories: CategoryRow[];
    categoryRowActions: CategoryRowActionDef[];
    errors?: Record<string, string>;
};

/** Rough preview of Laravel `Str::slug($title)` for ASCII names; server is authoritative. */
function slugPreviewFromTitle(title: string): string {
    const base = title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return base === '' ? 'category' : base;
}

export default function Category() {
    const {
        categories: initialCategories,
        categoryRowActions = [],
        errors,
    } = usePage<CategoryPageProps>().props;

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
        if (q === '') {
            return categories;
        }
        return categories.filter((row) =>
            row.name.toLowerCase().includes(q),
        );
    }, [categories, categorySearch]);

    const actionLabels = useMemo(() => {
        const map: Record<string, string> = {};
        for (const a of categoryRowActions) {
            map[a.key] = a.label;
        }
        return map;
    }, [categoryRowActions]);

    const canSave = newCategory.trim().length > 0 && !categoryFormBusy;

    const categorySlugPreview = useMemo(
        () => slugPreviewFromTitle(newCategory),
        [newCategory],
    );

    const removeCategory = (id: string) => {
        router.delete(route('admin.categories.destroy', id), {
            preserveScroll: true,
        });
    };

    const setCategoryActive = (id: string, active: boolean) => {
        router.patch(
            route('admin.categories.status', id),
            { active },
            { preserveScroll: true },
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

    const runRowAction = (key: string, row: CategoryRow) => {
        switch (key) {
            case 'edit':
                openEditModal(row);
                break;
            case 'activate':
                setCategoryActive(row.id, true);
                break;
            case 'deactivate':
                setCategoryActive(row.id, false);
                break;
            case 'delete':
                removeCategory(row.id);
                break;
            default:
                break;
        }
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

        const opts = {
            preserveScroll: true,
            onStart: () => setCategoryFormBusy(true),
            onFinish: () => setCategoryFormBusy(false),
            onSuccess: () => closeModal(),
        };

        if (modalMode === 'edit' && editingId) {
            router.put(
                route('admin.categories.update', editingId),
                { title: trimmed },
                opts,
            );
            return;
        }

        router.post(
            route('admin.categories.store'),
            { title: trimmed },
            opts,
        );
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
                            <div>
                                    <h2 className="font-inter text-lg font-bold">
                                        Top Performing Products
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        Products with the most engagement
                                    </p>
                                </div>
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
                                        type="search"
                                        value={categorySearch}
                                        onChange={(e) =>
                                            setCategorySearch(e.target.value)
                                        }
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
                                <thead className="border-b border-gray-50 text-[10px] font-bold tracking-widest text-gray-400 uppercase bg-gray-100">
                                    <tr>
                                        <th className="py-4">SL. No.</th>
                                        <th className="py-4 text-center">
                                            Category Name
                                        </th>
                                        {/* <th className="py-4">Status</th> */}
                                        <th className="bg-gray-100 py-4 text-center font-bold text-gray-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredCategories.map((row, index) => (
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
                                            <td className="py-5 text-center text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline">
                                                {row.name}
                                            </td>
                                            {/* <td className="py-5 text-sm">
                                                <button
                                                    type="button"
                                                    title={
                                                        row.active
                                                            ? `${actionLabels.deactivate ?? 'Inactive'} — click to deactivate`
                                                            : `${actionLabels.activate ?? 'Active'} — click to activate`
                                                    }
                                                    onClick={() =>
                                                        setCategoryActive(
                                                            row.id,
                                                            !row.active,
                                                        )
                                                    }
                                                    className={cn(
                                                        'inline-flex cursor-pointer rounded-full px-2.5 py-0.5 text-xs font-semibold transition-opacity hover:opacity-90',
                                                        row.active
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : 'bg-gray-100 text-gray-500',
                                                    )}
                                                >
                                                    {row.active
                                                        ? actionLabels.activate ??
                                                          'Active'
                                                        : actionLabels.deactivate ??
                                                          'Inactive'}
                                                </button>
                                            </td> */}
                                            <td className="py-5">
                                                <div className="flex items-center justify-center gap-5">
                                                    <button
                                                        type="button"
                                                        title={
                                                            actionLabels.edit ??
                                                            'Edit'
                                                        }
                                                        aria-label={
                                                            actionLabels.edit ??
                                                            'Edit category'
                                                        }
                                                        onClick={() =>
                                                            runRowAction(
                                                                'edit',
                                                                row,
                                                            )
                                                        }
                                                        className="rounded-md p-1.5 text-gray-900 outline-none transition-colors hover:bg-gray-200/80 focus-visible:ring-2 focus-visible:ring-gray-400/40"
                                                    >
                                                        <SquarePen
                                                            className="h-[18px] w-[18px]"
                                                            strokeWidth={1.75}
                                                        />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        title={
                                                            actionLabels.delete ??
                                                            'Delete'
                                                        }
                                                        aria-label={
                                                            actionLabels.delete ??
                                                            'Delete category'
                                                        }
                                                        onClick={() =>
                                                            runRowAction(
                                                                'delete',
                                                                row,
                                                            )
                                                        }
                                                        className="rounded-md p-1.5 text-gray-900 outline-none transition-colors hover:bg-gray-200/80 focus-visible:ring-2 focus-visible:ring-gray-400/40"
                                                    >
                                                        <Trash2
                                                            className="h-[18px] w-[18px]"
                                                            strokeWidth={1.75}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
                            <div className="text-sm text-gray-400 italic">
                                {filteredCategories.length === 0 ? (
                                    categories.length === 0 ? (
                                        <>No categories yet.</>
                                    ) : (
                                        <>No categories match your search.</>
                                    )
                                ) : (
                                    <>
                                        Showing 1 to {filteredCategories.length}{' '}
                                        of {categories.length}{' '}
                                        {categories.length === 1
                                            ? 'category'
                                            : 'categories'}
                                        {categorySearch.trim() !== ''
                                            ? ' (filtered)'
                                            : ''}
                                    </>
                                )}
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
                        className="mb-1"
                    />
                    <div className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
                        <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                            Slug
                        </p>
                        <p
                            className="mt-0.5 font-mono text-sm text-gray-800 break-all"
                            aria-live="polite"
                        >
                            {categorySlugPreview}
                        </p>
                    </div>
                    <InputError
                        message={errors?.title}
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
                            {categoryFormBusy
                                ? 'Saving…'
                                : modalMode === 'edit'
                                  ? 'Save'
                                  : 'Add'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
