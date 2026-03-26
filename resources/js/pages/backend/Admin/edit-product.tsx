import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { SearchBar } from '@/components/search-bar';

export default function EditProduct() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex">
            <Head title="Edit Product" />
            <AdminSidebar isCollapsed={false} activeSlug="edit-product" />




            <div className="container bg-white p-8 font-inter text-gray-900 mt-12 lg:mt-0">
                <div className="mx-auto mb-10 max-w-2xl">
                    <SearchBar />
                </div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-8 font-inter">Edit Product</h1>

                <div className="space-y-6">

                    {/* Product Name + Category */}
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">Product Name</label>
                            <input
                                type="text"
                                defaultValue="Echo Dot (5th Gen)"
                                className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">Category</label>
                            <div className="relative">
                                <select className="w-full appearance-none px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 pr-10">
                                    <option>Electronics</option>
                                    <option>Clothing</option>
                                    <option>Home & Garden</option>
                                    <option>Sports</option>
                                    <option>Books</option>
                                </select>
                                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1.5">Short Description</label>
                        <textarea
                            rows={4}
                            placeholder="Briefly describe the product..."
                            className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                        ></textarea>
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
                                    defaultValue="1"
                                    min="1"
                                    className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Product Status</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Visible on public website</p>
                                </div>
                                {/* Toggle */}
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200"></div>
                                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5"></div>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
                    <button className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        Save Product
                    </button>
                </div>

            </div>
        </div>
    );
}
