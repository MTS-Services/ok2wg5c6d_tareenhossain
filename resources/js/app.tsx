import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';
import ReactGA from 'react-ga4';

import ErrorFallback from './components/error-fallback';
import { ErrorBadge, ErrorOverlay } from './components/error-overlay';
import { initializeTheme } from './hooks/use-appearance';
import { ErrorObservabilityProvider } from './lib/errors/error-context';
import { startDurationTracking } from './components/tracking';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize GA4 only if ID exists
if (gaMeasurementId) {
    ReactGA.initialize(gaMeasurementId);

    // Initial page load tracking
    ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname + window.location.search,
    });

    // Inertia navigation tracking
    router.on('navigate', () => {
        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname + window.location.search,
        });
    });
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        startDurationTracking();
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <ErrorObservabilityProvider>
                    <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onReset={() => {
                            window.location.href = '/';
                        }}
                    >
                        <App {...props} />
                        <Toaster
                            position="top-right"
                            richColors
                            closeButton
                            expand={true}
                        />
                        <ErrorOverlay />
                        <ErrorBadge />
                    </ErrorBoundary>
                </ErrorObservabilityProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
    defaults: {
        future: {
            useDialogForErrorModal: true,
        },
    },
});

// This will set light / dark mode on load...
initializeTheme();
