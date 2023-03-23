import { dateEnUS, enUS } from 'naive-ui'
import global from './global/en-US'
import pages from './pages/en-US'
import route from './route/en-US'
export default {
  ...global,
  ...pages,
  ...route,
  naiveUI: {
    locale: enUS,
    dateLocale: dateEnUS,
  },
}
