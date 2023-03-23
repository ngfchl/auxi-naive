import { dateZhCN, zhCN } from 'naive-ui'
import global from './global/zh-CN'
import pages from './pages/zh-CN'
import route from './route/zh-CN'

export default {
  ...global,
  ...pages,
  ...route,
  naiveUI: {
    locale: zhCN,
    dateLocale: dateZhCN,
  },
}
