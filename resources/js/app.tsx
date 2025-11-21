import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { initializeTheme } from './hooks/use-appearance';
import { persistor, store } from './redux/store';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Intercept fetch requests to log API responses (excluding browser-logs)
const originalFetch = window.fetch;
window.fetch = async (...args) => {
    const [resource, config] = args;
    const url = typeof resource === 'string' ? resource : resource.url;

    // Skip logging for browser-logs endpoint to reduce noise
    if (url.includes('/_boost/browser-logs')) {
        return originalFetch(...args);
    }

    console.log('🌐 API Request:', {
        url: url,
        method: config?.method || 'GET',
        headers: config?.headers,
    });

    const response = await originalFetch(...args);

    // Only log response details for non-successful responses or specific routes
    if (!response.ok || url.includes('/login') || url.includes('/api/')) {
        const clonedResponse = response.clone();
        let responseBody;
        try {
            const text = await clonedResponse.text();
            try {
                responseBody = JSON.parse(text);
            } catch {
                responseBody = text;
            }
        } catch {
            responseBody = 'Unable to read response body';
        }

        console.log('📥 API Response:', {
            url: url,
            status: response.status,
            statusText: response.statusText,
            body: responseBody,
        });
    }

    return response;
};

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');

        // Try direct file first (e.g., ./pages/dashboard.tsx)
        const directPath = `./pages/${name}.tsx`;
        if (pages[directPath]) {
            return resolvePageComponent(directPath, pages);
        }

        // Try index file (e.g., ./pages/cotizador/index.tsx)
        const indexPath = `./pages/${name}/index.tsx`;
        if (pages[indexPath]) {
            return resolvePageComponent(indexPath, pages);
        }

        // Fallback to original behavior
        return resolvePageComponent(`./pages/${name}.tsx`, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App {...props} />
                    </PersistGate>
                </Provider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
