import { Link } from '@inertiajs/react';
import { ProductCardMedia } from './product-image';
import { useTracking } from '@/hooks/use-tracking';
import { useEffect } from 'react';

export interface Product {
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
    price?: number;
    created_at?: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { trackProductClick, trackProductImpression, trackAmazonClick } = useTracking();

    useEffect(() => {
        // Track product impression when component mounts
        trackProductImpression(product.title);
    }, [product.title, trackProductImpression]);

    const handleAmazonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        trackAmazonClick(product.title);
    };

    return (
        <div
            key={product.id}
            className="group box-border min-w-0 rounded-2xl border bg-white shadow-md"
            onClick={() => trackProductClick(product.title)}
        >
            <Link href={`/products/${product.slug}`}>
                <ProductCardMedia
                    src={
                        product.image
                            ? `${product.image}`
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
                    onClick={handleAmazonClick}
                >
                    Amazon
                </Link>
            </div>
        </div>
    );
}
