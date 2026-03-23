import { Head } from '@inertiajs/react';

import FrontendLayout from '@/layouts/frontend-layout';

export default function Home() {
    return (
        <FrontendLayout>
            <Head title="Home Page" />

            <div className="bg-white text-gray-900 container mx-auto">

                <header className="relative mx-4 mt-4 flex items-center overflow-hidden rounded-3xl bg-bg-background-dark text-white">
                    <div className="container relative z-10 mx-auto grid items-center px-24 px-8 md:grid-cols-2 md:px-16">
                        <div>
                            <span className="mb-4 inline-block rounded bg-blue-600 px-2 py-1 text-[10px] tracking-widest uppercase">New Arrival 2026</span>
                            <h1 className="mb-4 text-4xl leading-tight font-bold md:text-6xl font-inter">The Future of Smart Living.</h1>
                            <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-400">
                                Experience unparalleled design and performance with our latest collection of premium essentials curated for the modern minimalist.
                            </p>
                            <div className="flex space-x-4">
                                <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Shop Collection</button>
                                <button className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Watch Film</button>
                            </div>
                        </div>
                        <div className="hidden justify-center md:flex ">
                            <img src="/assets/images/Home/Container (2).png" alt="Headphones" className="h-150 w-200 object-contain drop-shadow-2xl" />
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-blue-500/10 to-transparent"></div>
                </header>

                <section className="container mx-auto px-4 py-16">
                    <h2 className="mb-12 text-center text-5xl font-bold font-inter">Up Coming Products</h2>

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

                <footer className="mx-4 mb-4 ">
                    <div className=" relative overflow-hidden rounded-3xl bg-bg-background-dark px-4 py-40 text-center text-white">
                        <div className="pointer-events-none absolute inset-0 opacity-100">
                            <img src="/assets/images/Home/Frame(1).png" className='w-full h-full ' alt="" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="mb-6 text-5xl font-bold">Get in Touch</h2>
                            <p className="mx-auto mb-10 max-w-lg text-sm text-gray-400">
                                Have a specific inquiry or just want to say hello? Our team is ready to assist you with your professional needs.
                            </p>
                            <button className="rounded-lg bg-blue-600 px-10 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">CONTACT US</button>
                        </div>
                    </div>
                </footer>
            </div>
        </FrontendLayout>
    );
}
