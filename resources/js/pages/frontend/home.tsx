import { Head, Link, router, usePage } from '@inertiajs/react';

import { ProductCardMedia } from '@/components/frontend/product-image';
import Pagination from '@/components/pagination';
import FrontendLayout from '@/layouts/frontend-layout';
import { trackProductClick } from '@/components/tracking';

interface Product {
    id: number;
    title: string;
    slug: string;
    subtitle: string | null;
    description: string | null;
    image: string | null;
    category: {
        id: number;
        title: string;
    } | null;
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
                    {/* Changes:
                    1. Removed fixed 'flex items-center' from header to let grid handle it.
                    2. Adjusted padding: px-6 on mobile, px-16 on desktop.
                    3. Text alignment: centered on mobile (text-center), left-aligned on md (md:text-left).
                */}
                    <div className="relative z-10 container mx-auto grid items-center gap-10 px-8 md:grid-cols-2">
                        {/* Content Column */}
                        <div className="flex flex-col items-center text-center md:items-start md:text-left">
                            <span className="mb-4 inline-block rounded bg-blue-600 px-2 py-1 text-[10px] tracking-widest uppercase">
                                New Arrival 2026
                            </span>
                            <h1 className="mb-4 font-inter text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
                                The Future of <br className="hidden sm:block" />{' '}
                                Smart Living.
                            </h1>
                            <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-400">
                                Experience unparalleled design and performance
                                with our latest collection of premium essentials
                                curated for the modern minimalist.
                            </p>
                            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                                <button
                                    onClick={() => {
                                        window.location.href = '/shop';
                                    }}
                                    className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                                >
                                    Shop Collection
                                </button>
                                <Link 
                                    href="#up-coming-products"
                                    className="rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('up-coming-products')?.scrollIntoView({ 
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }}
                                >
                                    Stay Connected
                                </Link>
                            </div>
                        </div>

                        {/* Image Column */}
                        {/* Changes:
                        1. Removed 'hidden' so it shows on mobile.
                        2. Added 'order-first md:order-last' if you want the image above text on mobile.
                        3. Used max-h to keep it contained on mobile screens.
                    */}
                        <div className="flex justify-center md:justify-end">
                            <img
                                src="/assets/images/Home/Container (2).png"
                                alt="Headphones"
                                className="w-full max-w-[280px] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105 sm:max-w-[350px] md:max-w-full"
                            />
                        </div>
                    </div>

                    {/* Background Glow - Adjusted for mobile visibility */}
                    <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-b from-blue-500/20 to-transparent md:w-1/2 md:bg-gradient-to-l md:from-blue-500/10"></div>
                </header>

                <section className="container mx-auto p-4 lg:p-20" id="up-coming-products">
                    <h2 className="mb-12 text-center font-inter text-3xl font-bold lg:text-5xl">
                        Up Coming Products
                    </h2>

                    <div className="grid grid-cols-1 gap-8 py-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.data.map((product: Product) => (
                            <div
                                key={product.id}
                                className="group box-border min-w-0 rounded-2xl border bg-white shadow-md"
                                onClick={() => trackProductClick(product.title)}
                            >
                                <Link href={`/products/${product.slug}`}>
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
                                    <Link href={`/products/${product.slug}`}>
                                        <h3 className="font-inter text-lg font-bold">
                                            {product.title}
                                        </h3>
                                    </Link>

                                    <Link href={`/products/${product.slug}`}>
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

                <section className="container mx-auto mb-4">
                    <div className="relative m-4 overflow-hidden rounded-3xl bg-bg-background-dark px-4 py-40 text-center text-white">
                        <div className="pointer-events-none absolute inset-0 opacity-100">
                            <img
                                src="/assets/images/Home/Frame(1).png"
                                className="h-full w-full"
                                alt=""
                            />
                        </div>

                        <div className="relative z-10">
                            <h2 className="mb-6 text-2xl font-bold lg:text-5xl">
                                Get in Touch
                            </h2>
                            <p className="mx-auto mb-10 max-w-lg text-sm text-gray-400">
                                Have a specific inquiry or just want to say
                                hello? Our team is ready to assist you with your
                                professional needs.
                            </p>
                            <button
                                onClick={() => {
                                    window.location.href = '/contact';
                                }}
                                className="rounded-lg bg-blue-600 px-10 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
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
