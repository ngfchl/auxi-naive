<script lang="ts" setup>
const iframeSrc = ref('http://ptools.fun')
</script>

<template>
  <div>
    <iframe :src="iframeSrc" class="w-100% h-80vh" />
  </div>
</template>

<style scoped>

</style>
