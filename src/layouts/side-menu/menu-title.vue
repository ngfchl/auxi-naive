<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps<{ route: RouteRecordRaw }>()
const path = computed(() => props.route.path)
const title = computed(() => props.route?.meta?.title)
const hasChildren = computed(() => props?.route?.children && props.route.children?.length > 0)
const isFullPath = computed(() => path.value.startsWith('http'))
const target = computed(() => props?.route?.meta?.target ?? '_top')
</script>

<template>
  <template v-if="hasChildren">
    {{ $t(title) }}
  </template>
  <template v-else-if="isFullPath">
    <a :href="path" :target="target"> {{ $t(title) }}</a>
  </template>
  <template v-else>
    <router-link :to="path">
      {{ $t(title) }}
    </router-link>
  </template>
</template>
