import Workspace from '~/routes/modules/workspace'
const Home = () => import('~/pages/index.vue')

export default {
  Home,
  ...Workspace,
}
