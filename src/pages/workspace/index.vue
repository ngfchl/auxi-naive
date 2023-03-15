<script lang="ts" setup>
import { useTestCounter } from '~/stores/counter'

const counterStore = useTestCounter()

// 解构
const { counter } = storeToRefs(counterStore)
</script>

<template>
  <div>
    值：{{ counter + 1 }}
    <n-button @click="counterStore.increment">
      增加
    </n-button>
    <n-button @click="counterStore.decrement">
      减少
    </n-button>
  </div>
</template>
