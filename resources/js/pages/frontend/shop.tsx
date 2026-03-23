import { Head } from '@inertiajs/react';

import FrontendLayout from '@/layouts/frontend-layout';

export default function Home() {
    return (
        <FrontendLayout>
            <Head title="Shop Page" />

            <div className="bg-white text-gray-900 container mx-auto">

            <section className="container mx-auto px-4 py-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="flex-1">
                        <span className="mb-3 block text-xs font-medium text-gray-900">
                            Category
                        </span>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="rounded-lg bg-bg-background-dark px-5 py-2.5 text-md font-medium text-white transition-colors"
                            >
                                All Products
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-gray-100 px-5 py-2.5 text-md font-medium text-gray-900 transition-colors hover:bg-gray-200"
                            >
                                Electronics
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-gray-100 px-5 py-2.5 text-md font-medium text-gray-900 transition-colors hover:bg-gray-200"
                            >
                                Accessories
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-gray-100 px-5 py-2.5 text-md font-medium text-gray-900 transition-colors hover:bg-gray-200"
                            >
                                Home
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-gray-100 px-5 py-2.5 text-md font-medium text-gray-900 transition-colors hover:bg-gray-200"
                            >
                                Furniture
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-gray-100 px-5 py-2.5 text-md font-medium text-gray-900 transition-colors hover:bg-gray-200"
                            >
                                Lifestyle
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-gray-100 px-5 py-2.5 text-md font-medium text-gray-900 transition-colors hover:bg-gray-200"
                            >
                                Footwear
                            </button>
                        </div>
                    </div>

                    <div className="min-w-[200px]">
                        <span className="mb-3 block text-xs font-medium text-gray-400 md:text-right">
                            Sort By
                        </span>
                        <div className="group relative">
                            <div className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-100 px-4 py-2.5 transition-colors hover:bg-gray-200">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="h-4 w-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">Newest</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                <section className="container mx-auto lg:px-20 p-4">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 py-6">

                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img.png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Electronics</span>
                            <h3 className=" text-lg font-bold font-inter">Premium Wireless Headphones</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Studio-quality sound with active noise cancellation.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (1).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Accessories</span>
                            <h3 className=" text-lg font-bold font-inter">Minimalist Leather Wallet</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Handcrafted full-grain leather with RFID protection.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (2).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Accessories</span>
                            <h3 className=" text-lg font-bold font-inter">Designer Sunglasses</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">UV400 protection with polarized lenses.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    </div>


                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (3).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Electronics</span>
                            <h3 className=" text-lg font-bold font-inter">Mechanical Keyboard</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Custom switches with RGB backlighting.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (4).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Home</span>
                            <h3 className=" text-lg font-bold font-inter">Premium Coffee Maker</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Programmable brewing system with thermal carafe.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (5).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Electronics</span>
                            <h3 className=" text-lg font-bold font-inter">Wireless Charging Pad</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Fast charging for all Qi-enabled devices.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    </div>


                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 py-6">

                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (6).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Lifestyle</span>
                            <h3 className=" text-lg font-bold font-inter">Stainless Steel Water Bottle</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Double-wall insulated, keeps drinks cold for 24 hours.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (7).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Electronics</span>
                            <h3 className=" text-lg font-bold font-inter">Smart Watch Pro</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Advanced health tracking with 7-day battery life.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (8).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Accessories</span>
                            <h3 className=" text-lg font-bold font-inter">Leather Messenger Bag</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Professional laptop bag with multiple compartments.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (9).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Home</span>
                            <h3 className=" text-lg font-bold font-inter">Studio Desk Lamp</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Adjustable LED with touch controls and USB charging.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (10).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Furniture</span>
                            <h3 className=" text-lg font-bold font-inter">Ergonomic Office Chair</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Full lumbar support with adjustable armrests.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>


                    <div className="group border rounded-2xl bg-white box-border shadow-md">
                            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]">
                                <img src="/assets/images/Home/img (11).png" alt="Wireless Headphones" className="w-120 h-120" />
                            </div>
                            <div className='p-4'>
                            <span className="text-[12px] tracking-widest text-gray-400 uppercase">Footwear</span>
                            <h3 className=" text-lg font-bold font-inter">Running Sneakers</h3>
                            <p className="border-b pb-2 border-gray-200 mt-2 mb-4 text-md text-gray-500">Lightweight mesh design with responsive cushioning.</p>
                            <button className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">Up Coming</button>
                            </div>
                    </div>

                    </div>
                    <p className="mt-12 text-center text-lg text-gray-400">Showing 12 products</p>
                </section>


            </div>
        </FrontendLayout>
    );
}
