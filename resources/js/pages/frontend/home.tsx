import { Head, Link, router, usePage } from '@inertiajs/react';

import { ProductCard, Product } from '@/components/frontend/product-card';
import Pagination from '@/components/pagination';
import FrontendLayout from '@/layouts/frontend-layout';

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
}

export default function Home({ products }: Props) {
    const handlePerPageChange = (perPage: number) => {
        router.get(
            window.location.pathname,
            { per_page: perPage },
            { preserveScroll: true }
        );
    };
    return (
        <FrontendLayout>
            <Head title="Home Page" />

            <div className="container mx-auto bg-white text-gray-900">
                <header className="relative mx-4 mt-4 overflow-hidden rounded-3xl bg-bg-background-dark text-white">
                    {/* Enhanced responsive header with better mobile spacing */}
                    <div className="relative z-10 container mx-auto grid items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 md:grid-cols-2 md:gap-12 md:px-8 lg:px-16">
                        {/* Content Column */}
                        <div className="flex flex-col items-center text-center md:items-start md:text-left order-2 md:order-1">
                            <span className="mb-4 inline-block rounded bg-blue-600 px-3 py-2 text-[10px] tracking-widest uppercase sm:px-4 sm:py-2">
                                New Arrival 2026
                            </span>
                            <h1 className="mb-4 font-inter text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                                The Future of <br className="hidden sm:block" />{' '}
                                Smart Living.
                            </h1>
                            <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-400 sm:max-w-sm md:max-w-md lg:mb-8">
                                Experience unparalleled design and performance
                                with our latest collection of premium essentials
                                curated for the modern minimalist.
                            </p>
                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                                <button
                                    onClick={() => {
                                        window.location.href = '/shop';
                                    }}
                                    className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95 sm:w-auto sm:px-8"
                                >
                                    Shop Collection
                                </button>
                                <Link
                                    href={route('contact')}
                                    className="w-full rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95 sm:w-auto sm:px-8"
                                >
                                    Stay Connected
                                </Link>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div
                            className="flex justify-center md:justify-end order-1 md:order-2"
                            style={{ perspective: '520px' }}
                        >
                            <img
                                src="/assets/images/Home/Container (2).png"
                                alt="Headphones"
                                className="animate-headphone-sway w-full max-w-[200px] object-contain drop-shadow-2xl sm:max-w-[280px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-full"
                            />
                        </div>
                    </div>

                    {/* Background Glow - Adjusted for mobile visibility */}
                    <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-b from-blue-500/20 to-transparent md:w-1/2 md:bg-gradient-to-l md:from-blue-500/10"></div>
                </header>

                <section className="container mx-auto px-4 py-8 lg:px-20" id="up-coming-products">
                    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <h2 className="mb-4 font-inter text-2xl font-bold lg:text-3xl xl:text-4xl">
                            Up Coming Products
                        </h2>
                        <p className="mx-auto text-sm text-gray-500 max-w-2xl">
                            Discover our latest collection of premium products designed for modern living
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                        {products.data.map((product: Product) => (
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

                <section className="container mx-auto mb-4 px-4">
                    <div className="relative my-4 overflow-hidden rounded-3xl bg-bg-background-dark px-4 py-20 text-center text-white sm:py-28 md:py-32 lg:py-40">
                        <div className="pointer-events-none absolute inset-0 opacity-100">
                            <img
                                src="/assets/images/Home/Frame(1).png"
                                className="w-full h-full object-cover"
                                alt=""
                            />
                        </div>

                        <div className="relative z-10">
                            <h2 className="mb-4 font-inter text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">Get in Touch</h2>
                            <p className="mx-auto mb-6 text-sm text-gray-400 max-w-md sm:mb-8 lg:mb-10">
                                Have a specific inquiry or just want to say hello? Our team is ready to assist you with your professional needs.
                            </p>
                            <button
                                onClick={() => {
                                    window.location.href = '/contact';
                                }}
                                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95 sm:px-8 sm:py-3"
                            >
                                CONTACT US
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </FrontendLayout>
    );
}
