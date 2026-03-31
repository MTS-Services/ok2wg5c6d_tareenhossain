import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { Button } from '@/components/ui/button';
import { PenSquare, Trash } from 'lucide-react';

interface Faq {
    id: number;
    question: string;
    answer: string;
    slug?: string;
}

interface Props {
    faqs: Faq[];
}

export default function Faqs({ faqs }: Props) {
    return (
        <>
            <Head title="FAQ Management" />
            <div className="flex">
                <AdminSidebar isCollapsed={false} activeSlug="faqs" />
                
                <div className="container mt-12 bg-white p-8 font-inter text-gray-900 lg:mt-0">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="font-inter text-xl font-bold text-gray-800">FAQ Management</h1>
                        <Button asChild variant="default" className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600">
                            <Link href={route('admin.faqs.create')}>
                                Add New FAQ
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path d="M12 5v14" />
                                    <path d="M5 12h14" />
                                </svg>
                            </Link>
                        </Button>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full table-fixed">
                                <thead className="border-b border-gray-200 bg-gray-50">
                                    <tr>
                                        <th className="w-1/4 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Serial No
                                        </th>
                                        <th className="w-1/4 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Question
                                        </th>
                                        <th className="w-1/4 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Answer
                                        </th>
                                        <th className="w-1/4 px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {faqs.map((faq, index) => (
                                        <tr key={faq.id} className="hover:bg-gray-50">
                                            <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="w-1/4 px-6 py-4 text-sm text-gray-900 truncate">
                                                {faq.question}
                                            </td>
                                            <td className="w-1/4 px-6 py-4 text-sm text-gray-600 truncate">
                                                {faq.answer}
                                            </td>
                                            <td className="w-1/4 px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={route('admin.faqs.edit', faq.id)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                                        aria-label="Edit FAQ"
                                                    >
                                                        <PenSquare/>
                                                    </Link>
                                                    <Link 
                                                        href={route('admin.faqs.delete', faq.id)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-slate-100"
                                                        aria-label="Delete FAQ"
                                                    >
                                                        <Trash/>
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