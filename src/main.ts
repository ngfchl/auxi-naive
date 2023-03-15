import { createApp } from 'vue'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import router from '~/routes'

/**
 * 解决tailwind的样式冲突
 */
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)

app.use(router)
createApp(App).mount('#app')
