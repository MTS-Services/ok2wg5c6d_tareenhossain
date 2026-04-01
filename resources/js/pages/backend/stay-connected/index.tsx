import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { Button } from '@/components/ui/button';
import { PenSquare, Trash } from 'lucide-react';

interface Product {
    id: number;
    title: string;
    slug: string;
}

interface StayConnected {
    id: number;
    product_id: number;
    number: string;
    agree: boolean;
    created_at: string;
    product?: Product;
}

interface Props {
    stayConnected: StayConnected[];
}

export default function Index({ stayConnected }: Props) {
    return (
        <>
            <Head title="Stay Connected Management" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="stay-connected" />
                
                <div className="container mt-12 bg-white p-8 font-inter text-gray-900 lg:mt-0">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="font-inter text-xl font-bold text-gray-800">Stay Connected Management</h1>
                        <div className="text-sm text-gray-500">
                            Total Subscriptions: {stayConnected.length}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full table-fixed">
                                <thead className="border-b border-gray-200 bg-gray-50">
                                    <tr>
                                        <th className="w-1/6 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Serial No
                                        </th>
                                        <th className="w-1/4 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phone Number
                                        </th>
                                        <th className="w-1/4 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="w-1/6 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="w-1/6 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stayConnected.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="w-1/6 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="w-1/4 px-6 py-4 text-sm text-gray-900">
                                                {item.number}
                                            </td>
                                            <td className="w-1/4 px-6 py-4 text-sm text-gray-900">
                                                {item.product?.title || 'N/A'}
                                            </td>
                                            <td className="w-1/6 px-6 py-4 text-sm">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                    item.agree 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {item.agree ? 'Agreed' : 'Not Agreed'}
                                                </span>
                                            </td>
                                            <td className="w-1/6 px-6 py-4 text-sm text-gray-600">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {stayConnected.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No stay connected subscriptions found.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}