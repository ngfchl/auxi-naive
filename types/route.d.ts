import 'vue-router'

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
    keepAlive?: boolean
  }
}
