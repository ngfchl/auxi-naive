<script lang="ts" setup>
import type { SignInfo } from '~/api/website'

withDefaults(defineProps<{
  signList: SignInfo
}>(), {

})
</script>

<template>
  <n-timeline>
    <n-timeline-item
      v-for="(sign, index) in signList"
      :key="index"
      :time="sign.updated"
      center
      class="sign-info"
      color="#0bbd87" placement="top"
    >
      <n-card>
        <h4>{{ sign.sign_in_info }}</h4>
      </n-card>
    </n-timeline-item>
  </n-timeline>
  <!--  <el-pagination :hide-on-single-page="true" layout="prev, pager, next"/> -->
</template>
