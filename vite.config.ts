import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), TanStackRouterVite({
        quoteStyle: "double",
        semicolons: false,
        generatedRouteTree: "src/route-tree.gen.ts",
    })],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@/assets": path.resolve(__dirname, "./src/assets"),
            "@/components": path.resolve(__dirname, "./src/components"),
            "@/constants": path.resolve(__dirname, "./src/constants"),
            "@/contexts": path.resolve(__dirname, "./src/contexts"),
            "@/hooks": path.resolve(__dirname, "./src/hooks"),
            "@/redux": path.resolve(__dirname, "./src/redux"),
            "@/util": path.resolve(__dirname, "./src/util"),
            "@/router": path.resolve(__dirname, "./src/router"),
        },
    },
})
