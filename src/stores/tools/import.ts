import type { Import } from '~/api/tools/import'
import { useGlobalConfig } from '~/composables/gobal-config'
import { $import } from '~/api/tools/import'

export const useImportStore = defineStore('import', () => {
  const { message } = useGlobalConfig()
  const userinfo = ref<Import>({
    info: '',
    cookies: '',
    userdata: '',
  })
  const importWebsite = async () => {
    if (userinfo.value.info === '' || userinfo.value.cookies === '') {
      message?.warning('请检查压缩包内文件是否齐全？至少要包含cookies.json和options.json两个文件')
      return
    }
    await $import(userinfo.value)
  }
  return {
    userinfo,
    importWebsite,
  }
})
