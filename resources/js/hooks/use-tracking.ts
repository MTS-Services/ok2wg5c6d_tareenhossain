import axios from 'axios';

type TrackProductClickPayload = {
    product_name: string;
};

type TrackProductImpressionPayload = {
    product_name: string;
};

type TrackAmazonClickPayload = {
    product_name: string;
};

export const useTracking = () => {
    const trackProductClick = async (productName: string): Promise<void> => {
        try {
            const payload: TrackProductClickPayload = {
                product_name: productName,
            };

            await axios.post('/track/product-click', payload);
        } catch (error) {
            console.error('Tracking failed:', error);
        }
    };

    const trackProductImpression = async (productName: string): Promise<void> => {
        try {
            const payload: TrackProductImpressionPayload = {
                product_name: productName,
            };

            await axios.post('/track/product-impression', payload);
        } catch (error) {
            console.error('Impression tracking failed:', error);
        }
    };

    const trackAmazonClick = async (productName: string): Promise<void> => {
        try {
            const payload: TrackAmazonClickPayload = {
                product_name: productName,
            };

            await axios.post('/track/amazon-click', payload);
        } catch (error) {
            console.error('Amazon click tracking failed:', error);
        }
    };

    return {
        trackProductClick,
        trackProductImpression,
        trackAmazonClick
    };
};
