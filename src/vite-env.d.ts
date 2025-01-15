/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PRODUCTS_API_URL: string
    readonly VITE_CATEGORIES_API_URL: string
    readonly VITE_BANNERS_API_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }