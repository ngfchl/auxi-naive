import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import '~/assets/styles/index.css'
import 'uno.css'
import router from '~/routes'
import '~/routes/router-guard'

import i18n from '~/locales'

const pinia = createPinia()
/**
 * 解决tailwind的样式冲突
 */
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
