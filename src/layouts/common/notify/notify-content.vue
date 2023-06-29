<script lang="ts" setup>
import NotifyContainer from './notify-container.vue'
import type { GitLog } from '~/api/user'
import MessageItem from '~/layouts/common/notify/item/message-item.vue'

defineProps<{
  local_logs: GitLog
  update_notes: GitLog[]
}>()
</script>

<template>
  <n-tabs default-value="message" justify-content="center" type="line">
    <n-tab-pane name="message" tab="更新日志">
      <NotifyContainer>
        <!--        <MessageItem :desc="local_logs.hex" :title="local_logs.data" :timer="local_logs.date" /> -->
        <!--        <n-divider> -->
        <!--          <div class="text-13px"> -->
        <!--            <span class="text-#2E8B57">↑当前版本</span> &#45;&#45; <span class="text-#FF4500">远程版本↓</span> -->
        <!--          </div> -->
        <!--        </n-divider> -->
        <MessageItem
          v-for="(log, index) in update_notes" :key="index" :desc="log.hex" :title="log.data"
          :timer="log.date" :current="log.hex === local_logs.hex"
        />
      </NotifyContainer>
    </n-tab-pane>
    <!--    <n-tab-pane name="notify" tab="通知"> -->
    <!--      <NotifyContainer> -->
    <!--        <NotifyItem/> -->
    <!--      </NotifyContainer> -->
    <!--    </n-tab-pane> -->

    <!--    <n-tab-pane name="upcoming" tab="待办"> -->
    <!--      <NotifyContainer> -->
    <!--        <UpcomingItem/> -->
    <!--      </NotifyContainer> -->
    <!--    </n-tab-pane> -->
  </n-tabs>
</template>

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
