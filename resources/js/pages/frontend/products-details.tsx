import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import { ProductDetailMedia } from '@/components/frontend/product-image';
import FrontendLayout from '@/layouts/frontend-layout';
import { cn } from '@/lib/utils';

interface Product {
    id: number;
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    price: number;
    image: string | null;
    category: {
        id: number;
        title: string;
    } | null;
}

export default function ProductDetails({ product }: { product: Product }) {
    const [activeTab, setActiveTab] = useState('DESCRIPTION');

    const tabs = ['DESCRIPTION'];


    return (
        <FrontendLayout>
            <Head title="Product Details" />
            <section className="container mx-auto px-4 py-6 sm:px-6 md:px-0 lg:py-8">
                {/* Top Section: Product Info */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-8 lg:gap-12">
                    <div className="min-w-0">
                        <ProductDetailMedia
                            src={
                                product.image
                                    ? `${product.image}`
                                    : ''
                            }
                            alt={product.title}
                        />
                    </div>

                    <div className="flex flex-col justify-start pt-2 md:pt-4">
                        <h1 className="text-xl font-bold text-gray-900 mb-2 font-inter sm:text-2xl md:text-3xl">{product.title}</h1>
                        <p className="text-gray-500 text-sm mb-3 sm:mb-4">{product.subtitle}</p>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xs text-gray-400 uppercase font-medium">Category:</span>
                            <span className="text-xs font-bold text-gray-900">{product.category?.title}</span>
                        </div>

                        <Link
                            href={route('stayconnected.index', product.slug)}
                            className="flex items-center justify-center rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 sm:px-6"
                        >
                            Amazon
                        </Link>
                    </div>
                </div>

                {/* Bottom Section: Dynamic Tabs */}
                <div className="container mx-auto px-4 py-6 px-2 border border-b border-gray-200">
                    <div className="flex justify-center gap-6 border-b border-gray-200 overflow-x-auto no-scrollbar sm:gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    'pb-3 text-xs font-semibold tracking-widest uppercase border-b-2 transition-colors whitespace-nowrap sm:text-sm',
                                    activeTab === tab
                                        ? 'border-orange-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700',
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* {activeTab === 'DESCRIPTION' && (
                    <div className="max-w-7xl mx-auto  font-sans  rounded-sm overflow-hidden">
                    <div className="flex">
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-10 bg-white">
                      <div className="md:col-span-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 font-inter">Description</h3>
                        <div className="space-y-4 text-xs leading-relaxed text-gray-500">
                          <p className="font-inter">
                            The Anycubic Kobra Go is a beginner-friendly and budget 3D printer
                            designed for smooth, accurate, and stable printing. It features a 220
                            × 220 × 250 mm build volume, giving plenty of space for a wide range
                            of models and projects.
                          </p>
                          <p className="font-inter">
                            With its automatic bed leveling, fast assembly, and sturdy frame, this
                            printer ensures consistent results with minimal setup. Its modular
                            design makes maintenance and upgrades easy, making it ideal for
                            hobbyists, students, and makers who want a reliable machine at an
                            affordable price.
                          </p>
                          <p className="font-inter">
                            The Kobra Go stands out for its precision and performance, thanks to
                            its smooth motion system and powerful stepper motors. It supports a
                            wide variety of filament types, allowing users to experiment with
                            different materials for creative projects.
                          </p>
                        </div>
                      </div>
                      <div className="md:col-span-3">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 font-inter">Feature</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-3">
                            <span className="text-orange-500 text-xl">🏆</span>
                            <span className="text-sm font-medium text-gray-700">
                              Free 1 Year Warranty
                            </span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-orange-500 text-xl">🚚</span>
                            <span className="text-sm font-medium text-gray-700">
                              Free Shipping &amp; Fasted Delivery
                            </span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-orange-500 text-xl">🤝</span>
                            <span className="text-sm font-medium text-gray-700">
                              100% Money-back guarantee
                            </span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-orange-500 text-xl">🎧</span>
                            <span className="text-sm font-medium text-gray-700">
                              24/7 Customer support
                            </span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-orange-500 text-xl">💳</span>
                            <span className="text-sm font-medium text-gray-700">
                              Secure payment method
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="md:col-span-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 font-inter">
                          Shipping Information
                        </h3>
                        <div className="space-y-3 text-xs">
                          <div className="flex flex-wrap gap-1">
                            <span className="font-semibold text-gray-800">Courier:</span>
                            <span className="text-gray-500">2 - 4 days, free shipping</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <span className="font-semibold text-gray-800">Local Shipping:</span>
                            <span className="text-gray-500">up to one week, $19.00</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <span className="font-semibold text-gray-800">UPS Ground Shipping:</span>
                            <span className="text-gray-500">4 - 6 days, $29.00</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <span className="font-semibold text-gray-800">
                              Unishop Global Export:
                            </span>
                            <span className="text-gray-500">3 - 4 days, $39.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                )} */}

                    <div
                        className="prose prose-sm mb-4 max-w-none font-aktiv-grotesk text-base font-normal text-text-body"
                        dangerouslySetInnerHTML={{
                            __html: product.description ?? '',
                        }}
                    />

                </div>
            </section>
        </FrontendLayout>

    );
}
