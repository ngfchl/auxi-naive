<script setup lang="ts">
import SelectLang from '../select-lang/index.vue'

const appStore = useAppStore()
const appLocale = useAppLocale()
</script>

<template>
  <SelectLang v-model:value="appLocale" :options="appStore.localeOptions" />
</template>

<style scoped>

</style>
