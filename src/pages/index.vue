<script lang="ts" setup>
import CheckBoxLayout from '~/layouts/setting-drawer/checkbox-layout.vue'
</script>

<template>
  <div class="flex gap-0 justify-center">
    <CheckBoxLayout layout="top" />
    <CheckBoxLayout layout="mix" />
    <CheckBoxLayout layout="side" />
    <CheckBoxLayout layout="side" inverted />
  </div>
</template>
