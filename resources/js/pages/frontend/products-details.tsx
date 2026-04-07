import { Head, Link } from '@inertiajs/react';

import { ProductDetailMedia } from '@/components/frontend/product-image';
import { useTracking } from '@/hooks/use-tracking';
import FrontendLayout from '@/layouts/frontend-layout';

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
    const { trackAmazonClick } = useTracking();
    const contactHref = `${route('contact')}?product=${encodeURIComponent(product.title)}`;

    return (
        <FrontendLayout>
            <Head title="Product Details" />
            <section className="container mx-auto px-4 py-6 sm:px-6 md:px-0 lg:py-8">
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
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs text-gray-400 uppercase font-medium">Category:</span>
                            <span className="text-xs font-bold text-gray-900">{product.category?.title}</span>
                        </div>

                        <div
                            role="status"
                            className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
                        >
                            Interested in this item? Use the contact form to submit an inquiry and tell us which product you
                            would like — we will follow up with you from there.
                        </div>

                        <Link
                            href={contactHref}
                            onClick={() => trackAmazonClick(product.title)}
                            className="flex items-center justify-center rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 sm:px-6"
                        >
                            Contact us to inquire
                        </Link>
                    </div>
                </div>
            </section>
        </FrontendLayout>

    );
}
