<script lang="ts" setup>
import NotifyContainer from './notify-container.vue'
import MessageItem from '~/layouts/common/notify/item/message-item.vue'
import NotifyItem from '~/layouts/common/notify/item/notify-item.vue'
import UpcomingItem from '~/layouts/common/notify/item/upcoming-item.vue'
</script>

<template>
  <n-tabs default-value="notify" justify-content="center" type="line">
    <n-tab-pane name="notify" tab="通知">
      <NotifyContainer>
        <NotifyItem />
      </NotifyContainer>
    </n-tab-pane>
    <n-tab-pane name="message" tab="消息">
      <NotifyContainer>
        <MessageItem />
      </NotifyContainer>
    </n-tab-pane>
    <n-tab-pane name="upcoming" tab="待办">
      <NotifyContainer>
        <UpcomingItem />
      </NotifyContainer>
    </n-tab-pane>
  </n-tabs>
</template>
