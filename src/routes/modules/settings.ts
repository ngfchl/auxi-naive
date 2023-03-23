const HostsSetting = () => () => import('~/pages/settings/hosts/index.vue')
const SystemSetting = () => import('~/pages/settings/system/index.vue')
const SupervisorSetting = () => import('~/pages/settings/supervisor/index.vue')
export default {
  HostsSetting,
  SystemSetting,
  SupervisorSetting,
}
