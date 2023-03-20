<script setup lang="ts">
import RightContent from '~/layouts/common/header/right-content.vue'
</script>

<template>
  <n-layout-header class="pro-admin-layout-header pro-admin-mix-layout-header flex justify-between items-center">
    <slot name="logo" />
    <slot name="left-content" />
    <RightContent />
  </n-layout-header>
</template>
