/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SECRET_0: string
    readonly VITE_SECRET_1: string
    readonly VITE_SECRET_2: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
