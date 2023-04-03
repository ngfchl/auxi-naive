<script lang="ts" setup>
const websiteStore = useWebsiteStore()

const {
  pieOption,
} = storeToRefs(websiteStore)
</script>

<template>
  <n-card hoverable embedded>
    <div class="flex justify-center">
      <n-button ghost size="small" color="#FF4500">
        今日数据
      </n-button>
    </div>
    <ECharts :my-option="pieOption ? pieOption : {}" style="width: 100%" />
  </n-card>
</template>

<style scoped>

</style>
