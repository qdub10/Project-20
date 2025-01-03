import { defineConfig } from 'cypress';

export default defineConfig({
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
    e2e: {
        setupNodeEvents(on, config) {
            // Implement Node event listeners if needed
        },
    },
});
