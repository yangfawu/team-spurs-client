/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string
    readonly VITE_ENABLE_TANSTACK_ROUTER_DEVTOOLS: "true" | "false"
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
