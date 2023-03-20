<script setup lang="ts">
import MultiTab from '../multi-tab/index.vue'
const attrs = useAttrs()
</script>

<template>
  <n-layout-content
    v-bind="attrs"
    style="--n-color:var(--pro-admin-layout-content-bg)"
    class="px-1"
  >
    <MultiTab />
    <div class="p-2">
      <router-view />
    </div>
  </n-layout-content>
</template>

<style scoped>

</style>
