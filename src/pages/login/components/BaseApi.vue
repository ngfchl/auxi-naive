<script setup lang="ts">
import { useRouter } from 'vue-router'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

const router = useRouter()
const { message } = useGlobalConfig()
const editFlag = ref<Boolean>(true)
const baseApi = ref<string>('')
const saveApi = () => {
  if (baseApi.value.startsWith('http') && baseApi.value.endsWith('/api/')) { /* empty */ }
  else if (baseApi.value.length === 0) {
    localStorage.removeItem('baseApi')
  }
  else {
    if ((baseApi.value.length > 0 && baseApi.value.length < 10) || !baseApi.value.startsWith('http')) {
      message?.error('请输入正确的 API 地址！！')
      return
    }
    if (!baseApi.value.endsWith('/'))
      baseApi.value = `${baseApi.value}/`

    localStorage.setItem('baseApi', baseApi.value)
    editFlag.value = false
  }
  router.go(0)
}

const clearLocalStorage = () => {
  localStorage.clear()
  sessionStorage.clear()
}
onMounted(() => {
  const baseUrl = localStorage.getItem('baseApi')
  if (!baseUrl)
    baseApi.value = `${location.origin}/`
  else baseApi.value = baseUrl
  if (!baseApi.value || baseApi.value.length < 10 || !baseApi.value.startsWith('http')) {
    message?.error('请输入正确的 API 地址！！')
    editFlag.value = true
  }
  else {
    editFlag.value = false
  }
})
</script>

<template>
  <n-space v-if="editFlag" class="w-380px mx-auto" justify="space-between">
    <n-input
      v-model:value="baseApi"
      placeholder="请输入 PTools 容器访问地址"
      status="error"
      minlength="10"
      style="width: 380px;"
    >
      <template #prefix>
        <!--        容器地址 -->
        <MenuIcon icon="Link" />
      </template>
      <template #suffix>
        <n-space>
          <n-button class="mx-auto" ghost type="warning" size="small" @click="editFlag = false">
            取消
          </n-button>
          <n-button type="error" ghost size="small" @click="saveApi">
            保存
          </n-button>
        </n-space>
      </template>
    </n-input>
  </n-space>
  <n-space v-else class="mx-auto w-380px" justify="end">
    <n-button secondary block type="tertiary" size="small" @click="editFlag = true">
      修改
    </n-button>

    <n-button secondary block type="warning" size="small" @click="clearLocalStorage">
      清除缓存
    </n-button>
  </n-space>
</template>

<style scoped>

</style>
