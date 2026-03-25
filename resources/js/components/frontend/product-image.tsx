import { cn } from '@/lib/utils';

/** 20% shorter than square: height = 80% of width → aspect ratio width/height = 5/4 */
const aspectProduct = 'aspect-[5/4]';

/** Fills parent frame edge-to-edge; parent controls size via aspect + width */
const imgClass = 'absolute inset-0 h-full w-full object-cover';

type ProductCardMediaProps = {
    src: string;
    alt: string;
    className?: string;
};

export function ProductCardMedia({
    src,
    alt,
    className,
}: ProductCardMediaProps) {
    return (
        <div
            className={cn(
                'relative mb-4 w-full overflow-hidden rounded-t-2xl bg-gray-100 transition-transform group-hover:scale-[1.02]',
                aspectProduct,
                className,
            )}
        >
            <img src={src} alt={alt} className={imgClass} />
        </div>
    );
}

type ProductDetailMediaProps = {
    src: string;
    alt: string;
    className?: string;
};

export function ProductDetailMedia({
    src,
    alt,
    className,
}: ProductDetailMediaProps) {
    return (
        <div
            className={cn(
                'relative w-full max-w-full overflow-hidden rounded-2xl bg-gray-100',
                aspectProduct,
                className,
            )}
        >
            <img
                src={src}
                alt={alt}
                className={cn(imgClass, 'mix-blend-multiply')}
            />
        </div>
    );
}
