import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminPaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    from?: number;
    to?: number;
    total?: number;
    perPage?: number;
    onPerPageChange?: (perPage: number) => void;
}

export default function AdminPagination({ 
    links, 
    from, 
    to, 
    total, 
    perPage = 10,
    onPerPageChange 
}: AdminPaginationProps) {
    const perPageOptions = [10, 25, 50, 100];

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {/* Mobile pagination */}
                <Link
                    href={links[0]?.url || '#'}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        links[0]?.url
                            ? 'bg-white text-gray-700 hover:bg-gray-50'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    preserveScroll
                >
                    Previous
                </Link>
                <Link
                    href={links[links.length - 1]?.url || '#'}
                    className={`relative ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        links[links.length - 1]?.url
                            ? 'bg-white text-gray-700 hover:bg-gray-50'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    preserveScroll
                >
                    Next
                </Link>
            </div>
            
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        {from && to && total && (
                            <span>
                                Showing <span className="font-medium">{from}</span> to{' '}
                                <span className="font-medium">{to}</span> of{' '}
                                <span className="font-medium">{total}</span> results
                            </span>
                        )}
                    </p>
                </div>
                
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <Link
                            href={links[0]?.url || '#'}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                                links[0]?.url ? '' : 'cursor-not-allowed opacity-50'
                            }`}
                            preserveScroll
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        
                        {/* Current page */}
                        {links.slice(1, -1).map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                aria-current={link.active ? 'page' : undefined}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                    link.active
                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                        : link.url
                                        ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                                preserveScroll
                            >
                                {link.label.replace(/[^0-9]/g, '')}
                            </Link>
                        ))}
                        
                        <Link
                            href={links[links.length - 1]?.url || '#'}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                                links[links.length - 1]?.url ? '' : 'cursor-not-allowed opacity-50'
                            }`}
                            preserveScroll
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
