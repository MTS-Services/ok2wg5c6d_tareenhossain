import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Product {
    id: number;
    title: string;
    slug: string;
    price: number | string;
    image: string | null;
    subtitle: string | null;
    category?: { id: number; title: string };
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
    if (!query.trim()) return <>{text}</>;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <mark
                        key={i}
                        className="rounded bg-blue-100 px-0.5 font-semibold text-blue-700 not-italic"
                    >
                        {part}
                    </mark>
                ) : (
                    part
                ),
            )}
        </>
    );
}

export function GlobalSearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    /* ─── Fetch ─────────────────────────────────── */
    const fetchSuggestions = useCallback(async (q: string) => {
        if (abortRef.current) abortRef.current.abort();
        abortRef.current = new AbortController();

        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
                signal: abortRef.current.signal,
            });
            if (!res.ok) return;
            const data: Product[] = await res.json();
            setSuggestions(data);
            setIsOpen(data.length > 0);
            setActiveIndex(-1);
        } catch (err: any) {
            if (err.name !== 'AbortError') setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    /* ─── Debounce ──────────────────────────────── */
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (query.trim().length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        debounceRef.current = setTimeout(() => fetchSuggestions(query.trim()), 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query, fetchSuggestions]);

    /* ─── Click outside ─────────────────────────── */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* ─── Actions ───────────────────────────────── */
    const submitSearch = () => {
        if (!query.trim()) return;
        router.get('/shop', { search: query.trim() }, { preserveState: false });
        setQuery('');
        setIsOpen(false);
    };

    const goToProduct = (product: Product) => {
        router.visit(`/products/${product.slug}`);
        setQuery('');
        setIsOpen(false);
    };

    /* ─── Keyboard navigation ───────────────────── */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            activeIndex >= 0 && suggestions[activeIndex]
                ? goToProduct(suggestions[activeIndex])
                : submitSearch();
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    /* ─── Render ────────────────────────────────── */
    return (
        <div ref={containerRef} className="relative">
            {/* Input */}
            <div
                className={cn(
                    'flex items-center rounded-xl border bg-white shadow-sm transition-all duration-200',
                    isOpen
                        ? 'border-blue-400 ring-2 ring-blue-100'
                        : 'border-gray-200 hover:border-gray-300',
                )}
            >
                <span className="ml-3 shrink-0">
                    {isLoading ? (
                        <svg
                            className="h-4 w-4 animate-spin text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    )}
                </span>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => suggestions.length > 0 && setIsOpen(true)}
                    placeholder="Search products..."
                    autoComplete="off"
                    className="w-40 bg-transparent py-2 pl-2 pr-1 text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:w-56 md:w-72"
                />

                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setSuggestions([]);
                            setIsOpen(false);
                            inputRef.current?.focus();
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        aria-label="Clear"
                    >
                        <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                        >
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                )}

                <button
                    onClick={submitSearch}
                    className="mr-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95"
                >
                    Search
                </button>
            </div>

            {/* Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
                    {/* Header */}
                    {/* <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2">
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                            {suggestions.length} result{suggestions.length !== 1 ? 's' : ''}
                        </span>
                        <span className="hidden text-[11px] text-gray-400 sm:block">
                            ↑↓ navigate · Enter select · Esc close
                        </span>
                    </div> */}

                    {/* Results */}
                    <ul role="listbox" className="max-h-72 overflow-y-auto">
                        {suggestions.map((product, i) => (
                            <li key={product.id} role="option" aria-selected={activeIndex === i}>
                                <button
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onClick={() => goToProduct(product)}
                                    className={cn(
                                        'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer',
                                        activeIndex === i ? 'bg-blue-50' : 'hover:bg-gray-50',
                                        i !== suggestions.length - 1 &&
                                            'border-b border-gray-100/80',
                                    )}
                                >
                                    {/* Thumbnail */}
                                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                                        {product.image ? (
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-gray-300">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                >
                                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                                    <path d="M3 9h18M9 21V9" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            <HighlightMatch
                                                text={product.title}
                                                query={query}
                                            />
                                        </p>
                                        <p className="truncate text-xs text-gray-400">
                                            {product.category?.title ?? 'Uncategorized'}
                                            {product.subtitle && (
                                                <> · {product.subtitle}</>
                                            )}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    {/* <span className="shrink-0 text-sm font-bold text-gray-800">
                                        ${Number(product.price).toFixed(2)}
                                    </span> */}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Footer */}
                    <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-2.5">
                        <button
                            onClick={submitSearch}
                            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                        >
                            <svg
                                className="h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            See all results for &ldquo;{query}&rdquo;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}