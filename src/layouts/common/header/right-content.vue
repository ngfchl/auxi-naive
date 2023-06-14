<script setup lang="ts">
import SelectLang from './select-lang.vue'
import Search from '~/layouts/common/header/search.vue'
import SelectUser from '~/layouts/common/header/select-user.vue'
import Notify from '~/layouts/common/notify/notify.vue'

const appStore = useAppStore()
const appLocale = useAppLocale()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const handleSelect = (value: string) => {
  if (value === 'logout')
    userStore.logout()
}
</script>

<template>
  <n-space class="flex justify-center items-baseline h-30px">
    <Search />
    <SelectLang
      v-model:value="appLocale"
      class="py--3px mt-2px"
      :options="appStore.localeOptions"
    />
    <Notify />
    <SelectUser
      :options="appStore.userOptions"
      :nickname="userInfo.user"
      @select="handleSelect"
    />
  </n-space>
</template>

<style scoped>

</style>
