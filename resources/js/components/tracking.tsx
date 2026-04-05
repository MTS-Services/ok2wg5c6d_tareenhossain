// Duration tracking
export function startDurationTracking(): void {
    const startTime: number = Date.now();

    window.addEventListener('beforeunload', () => {
        const duration: number = Math.floor((Date.now() - startTime) / 1000);

        navigator.sendBeacon(
            '/track/duration',
            new Blob([JSON.stringify({ duration })], {
                type: 'application/json',
            }),
        );
    });
}

// Product click tracking
export function trackProductClick(productName: string): void {
    const token = document.querySelector<HTMLMetaElement>(
        'meta[name="csrf-token"]',
    )?.content;

    fetch('/track/product-click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token ?? '',
        },
        body: JSON.stringify({ product_name: productName }),
    });
}
