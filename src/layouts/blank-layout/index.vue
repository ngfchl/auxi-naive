<script setup lang="ts">
import SelectLang from '../select-lang/index.vue'
const appLocale = useAppLocale()
const appStore = useAppStore()
</script>

<template>
  <n-el tag="div" flex="~ col" class="pro-admin-login-container h-screen">
    <div class="flex flex-shrink-0 h-48px px-24px items-center justify-end">
      <n-space>
        <SelectLang v-model:value="appLocale" :options="appStore.localeOptions" />
      </n-space>
    </div>
    <slot name="prefix" />
    <div class="flex-1">
      <slot />
    </div>
    <slot name="suffix">
      <div flex="~ shrink-0 basis-auto col" class="items-center">
        <div class="my-2">
          <span>Naive Admin Pro</span>
          &copy; 2022 后台管理系统模板
        </div>
      </div>
    </slot>
  </n-el>
</template>

<style scoped>
.pro-admin-login-container{
  background-image: url("@/assets/images/login-bg.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
}
</style>
