import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path"
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '/@': path.resolve("src")
        },
    },
    base: "./",
    server: {
        host: "0.0.0.0",
        port: 8080,
        open: true
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/assets/common/common.scss";`
            }
        }
    }
})
