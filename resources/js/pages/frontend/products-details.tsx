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

    const tabs = ['DESCRIPTION', 'REVIEW'];
    const features = [
        'Free 1 Year Warranty',
        'Free Shipping & Fastest Delivery',
        '100% Money-back guarantee',
        '24/7 Customer support',
        'Secure payment method',
    ];
    const shippingDetails = [
        { label: 'Courier', value: '2-4 days, free shipping' },
        { label: 'Local Shipping', value: 'up to one week, $19.00' },
        { label: 'UPS Ground Shipping', value: '4-6 days, $29.00' },
        { label: 'Unishop Global Export', value: '3-4 days, $39.00' },
    ];
    const reviews = [
        {
            id: 1,
            name: 'Darrell Steward',
            time: 'Just now',
            avatar: 'https://i.pravatar.cc/40?img=11',
            text: 'This was my very first 3D printer and honestly, the setup was way easier than I expected. The automatic bed leveling saved me a lot of time, and my first print came out perfectly. Highly recommended for anyone starting out!',
        },
        {
            id: 2,
            name: 'Brooklyn Simmons',
            time: '2 mins ago',
            avatar: 'https://i.pravatar.cc/40?img=32',
            text: "For this price, the print quality is incredible. The details are clean, the layers are smooth, and it works consistently. I've used it for cosplay parts and miniatures - no complaints at all!",
        },
        {
            id: 3,
            name: 'Kathryn Murphy',
            time: '21 mins ago',
            avatar: 'https://i.pravatar.cc/40?img=45',
            text: 'I was able to assemble the printer in under 25 minutes. The instructions were clear and all tools were included. It has been running almost daily for two months now without a single issue.',
        },
        {
            id: 4,
            name: 'Guy Hawkins',
            time: '1 hour ago',
            avatar: 'https://i.pravatar.cc/40?img=57',
            text: "I use the Kobra Go for small mechanical prototypes in my workshop. The accuracy and speed are surprisingly good for a budget machine. It's a real workhorse once you get the settings dialed in.",
        },
    ];



    return (
        <FrontendLayout>
            <Head title="Product Details" />
            <section className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Top Section: Product Info */}
            <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                <div className="min-w-0">
                    <ProductDetailMedia
                        src={
                            product.image
                                ? `/storage/${product.image}`
                                : ''
                        }
                        alt={product.title}
                    />
                </div>

                <div className="flex flex-col justify-start pt-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 font-inter">{product.title}</h1>
                    <p className="text-gray-500 text-sm mb-4">{product.subtitle}</p>
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-xs text-gray-400 uppercase font-medium">Category:</span>
                        <span className="text-xs font-bold text-gray-900">{product.category?.title}</span>
                    </div>

                    <Link
                       href={route('stayconnected.index', product.slug)}  
                        className="flex items-center justify-center rounded-xl bg-blue-50 py-3! font-semibold text-blue-600 transition hover:bg-blue-100">
                        Amazon
                    </Link>
                </div>
            </div>

            {/* Bottom Section: Dynamic Tabs */}
            <div className="max-w-6xl mx-auto px-6 py-8 border border-b border-gray-200">
                <div className="flex justify-center gap-10  border-b  border-gray-200 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                'pb-3 text-sm font-semibold tracking-widest uppercase border-b-2 transition-colors whitespace-nowrap',
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

                {activeTab === 'REVIEW' && (
                    <div className="bg-white text-gray-800 max-w-6xl mx-auto px-6 py-8">
                        <h2 className="font-semibold text-base mb-6 text-gray-900">Customer Feedback</h2>
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-8 mb-2">
                                <div className="bg-amber-50 rounded-xl flex flex-col items-center justify-center px-12 py-8 min-w-[200px]">
                                    <span className="text-6xl font-bold text-gray-900 leading-none">4.7</span>
                                    <div className="flex gap-1 mt-3 text-orange-400 text-xl">
                                        ★★★★<span className="text-orange-300">★</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 text-center">
                                        Customer Rating <span className="text-gray-500">(934,516)</span>
                                    </p>
                                </div>
                                <div className="flex-1 flex flex-col justify-center gap-3">
                                    {[
                                        { stars: '★★★★★', percent: '63%', count: '(94,532)' },
                                        { stars: '★★★★', starsOff: '★', percent: '24%', count: '(6,717)' },
                                        { stars: '★★★', starsOff: '★★', percent: '9%', count: '(714)' },
                                        { stars: '★★', starsOff: '★★★', percent: '1%', count: '(152)' },
                                        { stars: '★', starsOff: '★★★★', percent: '7%', count: '(643)' },
                                    ].map((item) => (
                                        <div key={`${item.stars}-${item.percent}`} className="flex items-center gap-3">
                                            <div className="flex text-orange-400 text-sm gap-0.5">
                                                {item.stars}
                                                {item.starsOff ? (
                                                    <span className="text-gray-300">{item.starsOff}</span>
                                                ) : null}
                                            </div>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-orange-400 rounded-full" style={{ width: item.percent }} />
                                            </div>
                                            <span className="text-sm text-gray-700 w-8 text-right">{item.percent}</span>
                                            <span className="text-sm text-gray-400">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-0 max-w-3xl">
                                {reviews.map((review, index) => (
                                    <div
                                        key={review.id}
                                        className={cn('py-6', index < reviews.length - 1 && 'border-b border-gray-100')}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-sm text-gray-900">{review.name}</span>
                                                    <span className="text-gray-400 text-xs">·</span>
                                                    <span className="text-gray-400 text-xs">{review.time}</span>
                                                </div>
                                                <div className="text-orange-400 text-sm mt-0.5">★★★★★</div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <p className="text-sm text-gray-500 font-inter text-center mt-10">Showing 12 products</p>
        </section>
            </FrontendLayout>

    );
}
