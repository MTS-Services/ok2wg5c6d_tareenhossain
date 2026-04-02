import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
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

export default function Pagination({ 
    links, 
    from, 
    to, 
    total, 
    perPage = 12,
    onPerPageChange 
}: PaginationProps) {
    const perPageOptions = [12, 24, 48, 96];

    return (
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            {/* <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                    {from && to && total && (
                        <span>
                            Showing <span className="font-medium">{from}</span> to{' '}
                            <span className="font-medium">{to}</span> of{' '}
                            <span className="font-medium">{total}</span> results
                        </span>
                    )}
                </div>
                
                {onPerPageChange && (
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Per page:</label>
                        <select
                            value={perPage}
                            onChange={(e) => onPerPageChange(Number(e.target.value))}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none"
                        >
                            {perPageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div> */}

            <div className="flex items-center gap-2">
                <Link
                    href={links[0]?.url || '#'}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        links[0]?.url
                            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    preserveScroll
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Link>

                <div className="flex items-center gap-1">
                    {links.slice(1, -1).map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : link.url
                                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            preserveScroll
                        >
                            {link.label.replace(/[^0-9]/g, '')}
                        </Link>
                    ))}
                </div>

                <Link
                    href={links[links.length - 1]?.url || '#'}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        links[links.length - 1]?.url
                            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    preserveScroll
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
