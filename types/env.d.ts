/// <reference types="vite/client" />
import 'vue-router'
interface ImportMetaEnv {
  readonly VITE_APP_BASE: string

  readonly VITE_APP_BASE_API: string

  readonly VITE_APP_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'vue-router'{
  interface RouteMeta {
    id: number
    pid?: number
    // path?: string
    // name?: string
    title?: string
    // component?: string
    icon?: string
    target?: '_blank' | '_self' | '_parent' | '_top'
  }
}
