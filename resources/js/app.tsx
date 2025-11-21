import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingComponent from './components/LoadingComponent';
import { initializeTheme } from './hooks/use-appearance';
import { persistor, store } from './redux/store';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

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
                    <PersistGate
                        loading={<LoadingComponent />}
                        persistor={persistor}
                    >
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
