import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState, useEffect } from 'react';

import { ProductCardMedia } from '@/components/frontend/product-image';
import Pagination from '@/components/pagination';
import FrontendLayout from '@/layouts/frontend-layout';

interface Product {
    id: number;
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    image: string | null;
    category: {
        id: number;
        title: string;
    } | null;
    price: number;
    created_at: string;
}

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
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
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
                <section className="container mx-auto px-4 py-8">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div className="flex-1">
                            <span className="mb-3 block text-xs font-medium text-gray-900">
                                Category
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {categoryOptions.map((category: string) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                        className={`text-md rounded-lg px-5 py-2.5 font-medium transition-colors cursor-pointer ${
                                            selectedCategory === category
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

                <section className="container mx-auto p-4 lg:px-20">
                    <div className="grid grid-cols-1 gap-8 py-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group box-border min-w-0 rounded-2xl border bg-white shadow-md"
                            >
                                <Link
                                    className="cursor-pointer"
                                    href={`/products/${product.slug}`}
                                >
                                    <ProductCardMedia
                                        src={
                                            product.image
                                                ? `/storage/${product.image}`
                                                : ''
                                        }
                                        alt={product.title}
                                    />
                                </Link>
                                <div className="p-4">
                                    <span className="text-[12px] tracking-widest text-gray-400 uppercase">
                                        {product.category?.title || 'General'}
                                    </span>
                                    <Link
                                        className="cursor-pointer"
                                        href={`/products/${product.slug}`}
                                    >
                                        <h3 className="font-inter text-lg font-bold">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <Link
                                        className="cursor-pointer"
                                        href={`/products/${product.slug}`}
                                    >
                                        <p className="text-md mt-2 mb-4 border-b border-gray-200 pb-2 text-gray-500 truncate">
                                            {product.subtitle || 'N/A'}
                                        </p>
                                    </Link>
                                    <Link
                                        href={route('stayconnected.index', product.slug)}
                                        className="flex items-center justify-center rounded-xl bg-blue-50 py-3! text-sm font-semibold text-blue-600 transition hover:bg-blue-100 cursor-pointer"
                                    >
                                        Amazon
                                    </Link>
                                </div>
                            </div>
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
            </div>
        </FrontendLayout>
    );
}
