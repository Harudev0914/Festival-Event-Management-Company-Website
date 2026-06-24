import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
    base: '/admin/',
    plugins: [react()],
    resolve: {
        alias: {
            '@repo/common': path.resolve(__dirname, '../../packages/common/src/index.ts'),
            '@repo/ui': path.resolve(__dirname, '../../packages/ui/src/index.tsx'),
        },
    },
    server: {
        port: 4000,
    },
});
