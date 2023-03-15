<script lang="ts" setup>
const counterStore = useCounter()

// 解构
const { counter } = storeToRefs(counterStore)
</script>

<template>
  <div>
    值：{{ counter }}
    <n-button @click="counterStore.increment">
      增加
    </n-button>
    <n-button @click="counterStore.decrement">
      减少
    </n-button>
  </div>
</template>
