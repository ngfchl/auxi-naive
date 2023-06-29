<script lang="ts" setup>
defineProps<{
  read?: boolean
  current?: boolean
  title?: string
  timer?: string
  desc?: string
}>()
</script>

<template>
  <n-list-item :class="read ? 'op-40' : ''">
    <n-thing>
      <template v-if="title" #header>
        <span class="text-12px text-#778899">
          <span v-if="current">✅当前版本：</span>{{ title }}
        </span>
      </template>
      <template #description>
        <n-space v-if="desc" justify="space-between">
          <span class="text-8px text-#008000">
            {{ desc }}
          </span>
          <span class="text-8px text-#808000">
            {{ timer }}
          </span>
        </n-space>
      </template>
    </n-thing>
  </n-list-item>
</template>

<style scoped>

</style>
