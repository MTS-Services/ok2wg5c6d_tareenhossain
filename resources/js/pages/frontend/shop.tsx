import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import FrontendLayout from '@/layouts/frontend-layout';

type Product = {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
    rating: number;
    price: number;
    createdAt: string;
};

const shopData = {
    categories: [
        'All Products',
        'Electronics',
        'Accessories',
        'Home',
        'Furniture',
        'Lifestyle',
        'Footwear',
    ],
    sortOptions: [
        'Featured',
        'Price: Low to High',
        'Price: High to Low',
        'Highest Rated',
        'Newest',
    ],
    products: [
        {
            id: 1,
            category: 'Electronics',
            name: 'Premium Wireless Headphones',
            description: 'Studio-quality sound with active noise cancellation.',
            image: '/assets/images/Home/img.png',
            rating: 4.7,
            price: 199,
            createdAt: '2026-01-10',
        },
        {
            id: 2,
            category: 'Accessories',
            name: 'Minimalist Leather Wallet',
            description: 'Handcrafted full-grain leather with RFID protection.',
            image: '/assets/images/Home/img (1).png',
            rating: 4.5,
            price: 79,
            createdAt: '2025-09-15',
        },
        {
            id: 3,
            category: 'Accessories',
            name: 'Designer Sunglasses',
            description: 'UV400 protection with polarized lenses.',
            image: '/assets/images/Home/img (2).png',
            rating: 4.6,
            price: 129,
            createdAt: '2026-02-04',
        },
        {
            id: 4,
            category: 'Electronics',
            name: 'Mechanical Keyboard',
            description: 'Custom switches with RGB backlighting.',
            image: '/assets/images/Home/img (3).png',
            rating: 4.8,
            price: 159,
            createdAt: '2025-12-20',
        },
        {
            id: 5,
            category: 'Home',
            name: 'Premium Coffee Maker',
            description: 'Programmable brewing system with thermal carafe.',
            image: '/assets/images/Home/img (4).png',
            rating: 4.4,
            price: 149,
            createdAt: '2025-10-30',
        },
        {
            id: 6,
            category: 'Electronics',
            name: 'Wireless Charging Pad',
            description: 'Fast charging for all Qi-enabled devices.',
            image: '/assets/images/Home/img (5).png',
            rating: 4.3,
            price: 49,
            createdAt: '2025-08-11',
        },
        {
            id: 7,
            category: 'Lifestyle',
            name: 'Stainless Steel Water Bottle',
            description:
                'Double-wall insulated, keeps drinks cold for 24 hours.',
            image: '/assets/images/Home/img (6).png',
            rating: 4.2,
            price: 39,
            createdAt: '2025-07-03',
        },
        {
            id: 8,
            category: 'Electronics',
            name: 'Smart Watch Pro',
            description: 'Advanced health tracking with 7-day battery life.',
            image: '/assets/images/Home/img (7).png',
            rating: 4.9,
            price: 249,
            createdAt: '2026-03-01',
        },
        {
            id: 9,
            category: 'Accessories',
            name: 'Leather Messenger Bag',
            description: 'Professional laptop bag with multiple compartments.',
            image: '/assets/images/Home/img (8).png',
            rating: 4.6,
            price: 169,
            createdAt: '2026-01-22',
        },
        {
            id: 10,
            category: 'Home',
            name: 'Studio Desk Lamp',
            description: 'Adjustable LED with touch controls and USB charging.',
            image: '/assets/images/Home/img (9).png',
            rating: 4.1,
            price: 59,
            createdAt: '2025-11-09',
        },
        {
            id: 11,
            category: 'Furniture',
            name: 'Ergonomic Office Chair',
            description: 'Full lumbar support with adjustable armrests.',
            image: '/assets/images/Home/img (10).png',
            rating: 4.8,
            price: 299,
            createdAt: '2026-02-15',
        },
        {
            id: 12,
            category: 'Footwear',
            name: 'Running Sneakers',
            description: 'Lightweight mesh design with responsive cushioning.',
            image: '/assets/images/Home/img (11).png',
            rating: 4.5,
            price: 139,
            createdAt: '2025-12-01',
        },
    ] satisfies Product[],
};

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [selectedSort, setSelectedSort] = useState('Featured');

    const visibleProducts = useMemo(() => {
        let products =
            selectedCategory === 'All Products'
                ? [...shopData.products]
                : shopData.products.filter(
                      (product) => product.category === selectedCategory,
                  );

        if (selectedSort === 'Price: Low to High') {
            products.sort((a, b) => a.price - b.price);
        } else if (selectedSort === 'Price: High to Low') {
            products.sort((a, b) => b.price - a.price);
        } else if (selectedSort === 'Highest Rated') {
            products.sort((a, b) => b.rating - a.rating);
        } else if (selectedSort === 'Newest') {
            products.sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            );
        }

        return products;
    }, [selectedCategory, selectedSort]);

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
                                {shopData.categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                        className={`rounded-lg px-5 py-2.5 text-md font-medium transition-colors ${
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

                        <div className="min-w-[240px]">
                            <span className="mb-3 block text-xs font-medium text-gray-400 md:text-right">
                                Sort By
                            </span>
                            <div className="flex items-center justify-end">
                                <select
                                    value={selectedSort}
                                    onChange={(event) =>
                                        setSelectedSort(event.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors hover:bg-gray-200 focus:border-gray-300 md:w-[240px]"
                                >
                                    {shopData.sortOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto p-4 lg:px-20">
                    <div className="grid grid-cols-1 gap-8 py-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => {
                                    window.location.href = '/products-details';
                                }}
                                className="group box-border rounded-2xl border bg-white shadow-md"
                            >
                                <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-120 w-120"
                                    />
                                </div>
                                <div className="p-4">
                                    <span className="text-[12px] tracking-widest text-gray-400 uppercase">
                                        {product.category}
                                    </span>
                                    <h3 className="font-inter text-lg font-bold">
                                        {product.name}
                                    </h3>
                                    <p className="mt-2 mb-4 border-b border-gray-200 pb-2 text-md text-gray-500">
                                        {product.description}
                                    </p>
                                    <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
                                        Up Coming
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-12 text-center text-lg text-gray-400">
                        Showing {visibleProducts.length} product
                        {visibleProducts.length === 1 ? '' : 's'}
                    </p>
                </section>
            </div>
        </FrontendLayout>
    );
}
