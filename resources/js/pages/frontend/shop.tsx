import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState, useEffect } from 'react';

import { ProductCard, Product } from '@/components/frontend/product-card';
import Pagination from '@/components/pagination';
import FrontendLayout from '@/layouts/frontend-layout';

interface Category {
    id: number;
    title: string;
    slug: string;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    products: PaginatedProducts;
    categories: Category[];
}

const sortOptions = [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Highest Rated',
    'Newest',
];

export default function Shop({ products, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [selectedSort, setSelectedSort] = useState('Featured');

    // Read category from URL parameter on component mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categorySlug = urlParams.get('category');

        if (categorySlug) {
            const category = categories.find(cat => cat.slug === categorySlug);
            if (category) {
                setSelectedCategory(category.title);
            }
        }
    }, [categories]);

    // Create categories list with "All Products" option
    const categoryOptions = useMemo(
        () => ['All Products', ...categories.map((cat) => cat.title)],
        [categories],
    );

    const visibleProducts = useMemo(() => {
        let filteredProducts =
            selectedCategory === 'All Products'
                ? [...products.data]
                : products.data.filter(
                    (product: Product) => product.category?.title === selectedCategory,
                );

        // Sort products
        if (selectedSort === 'Price: Low to High') {
            filteredProducts.sort((a: Product, b: Product) => (a.price || 0) - (b.price || 0));
        } else if (selectedSort === 'Price: High to Low') {
            filteredProducts.sort((a: Product, b: Product) => (b.price || 0) - (a.price || 0));
        } else if (selectedSort === 'Newest') {
            filteredProducts.sort(
                (a: Product, b: Product) =>
                    new Date(b.created_at || '').getTime() -
                    new Date(a.created_at || '').getTime(),
            );
        }

        return filteredProducts;
    }, [selectedCategory, selectedSort, products]);

    const handlePerPageChange = (perPage: number) => {
        router.get(
            window.location.pathname,
            { per_page: perPage },
            { preserveScroll: true }
        );
    };

    return (
        <FrontendLayout>
            <Head title="Shop Page" />

            <div className="container mx-auto bg-white text-gray-900">
                <section className="container mx-auto px-4 py-6 sm:px-6 md:py-8">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
                        <div className="flex-1">
                            <span className="mb-2 block text-xs font-medium text-gray-900">Category</span>
                            <div className="flex flex-wrap gap-2">
                                {categoryOptions.map((category: string) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                        className={`text-sm rounded-lg px-3 py-2.5 font-medium transition-colors cursor-pointer sm:px-4 sm:py-3 ${selectedCategory === category
                                                ? 'bg-bg-background-dark text-white'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* <div className="min-w-[240px]">
                            <span className="mb-3 block text-xs font-medium text-gray-400 md:text-right">
                                Sort By
                            </span>
                            <div className="flex items-center justify-end">
                                <select
                                    value={selectedSort}
                                    onChange={(event) =>
                                        setSelectedSort(event.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700 transition-colors cursor-pointer outline-none hover:bg-gray-200 focus:border-gray-300 md:w-[240px]"
                                >
                                    {sortOptions.map((option: string) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div> */}
                    </div>
                </section>

                <section className="container mx-auto px-4 py-6 sm:px-6 md:px-8 lg:px-20">
                    <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                        {visibleProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <Pagination
                        links={products.links}
                        from={products.from}
                        to={products.to}
                        total={products.total}
                        perPage={products.per_page}
                        onPerPageChange={handlePerPageChange}
                    />
                </section>
                <p className="text-sm text-gray-500 font-inter text-center mt-8 mb-4">Showing {products.data.length} of {products.total} products</p>
            </div>
        </FrontendLayout>
    );
}
