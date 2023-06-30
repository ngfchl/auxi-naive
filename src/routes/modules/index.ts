import dashboard from './dashboard'
import download from './download'
import help from './help'
import settings from './settings'
import tasks from './tasks'
import tools from './tools'
import website from './website'

const Home = () => import('~/pages/index.vue')

export default {
  Home,
  ...dashboard,
  ...website,
  ...tools,
  ...download,
  ...settings,
  ...tasks,
  ...help,
}
