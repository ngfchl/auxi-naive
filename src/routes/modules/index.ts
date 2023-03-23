import dashboard from './dashboard'
import website from './website'
import tools from './tools'
import download from './download'
import settings from './settings'
import tasks from './tasks'

const Home = () => import('~/pages/index.vue')

export default {
  Home,
  ...dashboard,
  ...website,
  ...tools,
  ...download,
  ...settings,
  ...tasks,
}
