const Website = () => import('~/pages/website/website/index.vue')
const MyData = () => import('~/pages/website/mydata/index.vue')
const MySite = () => import('~/pages/website/mysite/index.vue')
const WebsiteTorrents = () => import('~/pages/website/torrents/index.vue')
export default {
  Website,
  MySite,
  MyData,
  WebsiteTorrents,
}
