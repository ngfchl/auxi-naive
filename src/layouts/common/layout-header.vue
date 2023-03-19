<script setup lang="ts">
import RightContent from '~/layouts/common/right-content.vue'
</script>

<template>
  <n-layout-header class="pro-admin-layout-header pro-admin-mix-layout-header">
    <slot />
    <RightContent />
  </n-layout-header>
</template>
