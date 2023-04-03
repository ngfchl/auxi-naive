<script lang="ts" setup>
const websiteStore = useWebsiteStore()

const {
  barOption, dataLength, days,
} = storeToRefs(websiteStore)

const {
  getPerDayData, getTodayDataList,
} = websiteStore
</script>

<template>
  <n-card hoverable embedded>
    <n-radio-group
      v-model:value="dataLength" size="small"
      default-value="-7"
      @change="getPerDayData(dataLength)"
    >
      <n-radio-button
        v-for="day in days"
        :key="day.value"
        :value="day.value"
      >
        {{ day.label }}
      </n-radio-button>
    </n-radio-group>
    <ECharts :my-option="barOption ? barOption : {}" style="width: 100%" />
  </n-card>
</template>

<style scoped>

</style>
