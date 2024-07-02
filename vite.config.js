import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import progress from 'vite-plugin-progress';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            vue(),
            vueJsx(),
            Components({
                resolvers: [VantResolver()],
            }),
            progress(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        build: {
            outDir: 'shop',
        },
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_REQUEST_URL,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ''),
                    logLevel: 'debug', // 启用详细日志
                    secure: false, //忽略安全证书
                },
            },
        },
    };
});
