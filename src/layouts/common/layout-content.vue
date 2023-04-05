<script setup lang="ts">
import MultiTab from '../multi-tab/index.vue'
const attrs = useAttrs()
</script>

<template>
  <n-layout-content
    v-bind="attrs"
    style="--n-color:var(--pro-admin-layout-content-bg)"
    class="px-1 pt-47px"
    position="absolute"
  >
    <MultiTab />
    <div class="px-2 mt-48px">
      <router-view />
    </div>
  </n-layout-content>
</template>

<style scoped>

</style>
