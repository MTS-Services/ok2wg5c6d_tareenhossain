import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { AdminSidebar } from '@/layouts/partials/admin/sidebar';

export default function Category() {
    const [modalOpen, setModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const [categories, setCategories] = useState<string[]>([
        'Electronics',
        'Home Decor',
        'Life style',
        'Office',
        'Apparel',
        'Furniture',
        'Footwear',
    ]);

    const canAdd = useMemo(() => newCategory.trim().length > 0, [newCategory]);

    const removeCategory = (name: string) => {
        setCategories((prev) => prev.filter((item) => item !== name));
    };

    const addCategory = () => {
        const trimmed = newCategory.trim();
        if (!trimmed) return;
        setCategories((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
        setNewCategory('');
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Category" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="category" />
                <div className="flex-1">
                    {/* Top Search Bar */}
                    <div className="bg-white  border-gray-200 px-8 py-3">
                        <div className="container mx-auto flex justify-center">
                            <div className="relative w-full max-w-4xl">
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search products, visitors..."
                                    className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-600 placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="container mx-auto px-8 py-8">
                        {/* Header Row */}
                        <div className="flex items-center justify-between mb-5">
                            <h1 className="text-xl font-semibold text-gray-800">Category</h1>
                            <button
                                type="button"
                                onClick={() => setModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Add New Category
                            </button>
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((name) => (
                                <span
                                    key={name}
                                    className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-800 text-white text-sm rounded-full"
                                >
                                    {name}
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(name)}
                                        className="ml-1 text-gray-400 hover:text-white text-xs leading-none"
                                        aria-label={`Remove ${name}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Add Category Modal */}
                    {modalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
                                <h2 className="text-base font-semibold text-gray-800 mb-4">Category</h2>
                                <p className="text-sm text-gray-900 mb-4">Add category name.</p>
                                <input
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    type="text"
                                    placeholder="Enter category name"
                                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-800 placeholder-gray-400 mb-4"
                                />
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setModalOpen(false);
                                            setNewCategory('');
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={addCategory}
                                        disabled={!canAdd}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}
