<script lang="ts" setup>
const userStore = useUserStore()
</script>

<template>
  <n-card class="h-371px border border-green">
    <template #header>
      <n-h2 class="text-center">
        每日福利
        <n-button
          text
          target="_blank"
          type="primary"
          @click="userStore.logout"
        >
          退出
        </n-button>
      </n-h2>
    </template>
    <n-image-group>
      <n-space justify="center" class="-mt-6 text-13px text-center" vertical>
        <n-image
          class="b-rounded-5 h-240px"
          src="https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=%E7%8C%AB%E5%A8%981"
          placeholder=""
        />
        <p class="text-center">
          <n-image
            class="b-rounded-1"
            src="https://v2.jinrishici.com/one.svg?font-size=20&spacing=2&color=darkgreen"
            placeholder=""
          />
        </p>
      </n-space>
    </n-image-group>
  </n-card>
</template>

<style scoped>

</style>
