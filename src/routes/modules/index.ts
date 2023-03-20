import dashboard from '~/routes/modules/dashboard'
const Home = () => import('~/pages/index.vue')

export default {
  Home,
  ...dashboard,
}
