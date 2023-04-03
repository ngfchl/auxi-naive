<script lang="ts" setup>
const websiteStore = useWebsiteStore()

const {
  pieTotalOption,
} = storeToRefs(websiteStore)
</script>

<template>
  <n-card hoverable embedded>
    <div class="flex justify-center">
      <n-button ghost size="small" color="#FF4500">
        全部数据
      </n-button>
    </div>
    <ECharts :my-option="pieTotalOption ? pieTotalOption : {}" style="width: 100%" />
  </n-card>
</template>

<style scoped>

</style>
