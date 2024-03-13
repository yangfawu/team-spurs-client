import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@/assets": path.resolve(__dirname, "./src/assets"),
            "@/components": path.resolve(__dirname, "./src/components"),
            "@/constants": path.resolve(__dirname, "./src/constants"),
            "@/hooks": path.resolve(__dirname, "./src/hooks"),
        },
    },
})
