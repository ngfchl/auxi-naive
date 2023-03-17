<script setup lang="ts">
import { ArrowRightOutlined, SettingOutlined } from '@vicons/antd'
import CheckBoxLayout from './checkbox-layout.vue'
import Container from './container.vue'
const props = withDefaults(defineProps<{
  floatTop: number | string
  drawerWidth: number | string
  layout?: 'side' | 'mix' | 'top'
}>(), {
  floatTop: 240,
  drawerWidth: 300,
  layout: 'top',
})
let show = $ref(false)
const cssVar = computed(() => {
  return {
    '--pro-admin-float-top': `${props.floatTop}px`,
    '--pro-admin-drawer-width': `${props.drawerWidth}px`,
  }
})
const layouts = ref([{
  layout: 'mix',
  title: '混合布局',
}, {
  layout: 'top',
  title: '顶栏布局',
}, {
  layout: 'side',
  title: '侧边布局',
}])
const onShow = (value: boolean) => {
  show = value
}
</script>

<template>
  <teleport to="body">
    <div :style="cssVar" class="fixed top-[var(--pro-admin-float-top)] right-0">
      <n-button
        text
        size="large" type="tertiary"
        class="b-rd-tr-0! b-rd-br-0!"
        @click="onShow(true)"
      >
        <template #icon>
          <n-icon size="24">
            <SettingOutlined />
          </n-icon>
        </template>
      </n-button>
    </div>
  </teleport>
  <n-drawer v-model:show="show" :width="drawerWidth">
    <n-drawer-content title="主题">
      <n-space>
        <Container title="导航模式">
          <template v-for="item in layouts" :key="item.layout">
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <CheckBoxLayout :layout="item.layout" :checked="item.layout === layout" />
              </template>
              <span>{{ item.title }}</span>
            </n-tooltip>
          </template>
        </Container>
      </n-space>
    </n-drawer-content>
    <div
      :style="cssVar"
      class="absolute top-[var(--pro-admin-float-top)] right-[var(--pro-admin-drawer-width)] "
    >
      <n-button
        ghost
        size="large" type="error"
        class="b-rd-tr-0! b-rd-br-0! right-0"
        @click="onShow(false)"
      >
        <template #icon>
          <n-icon size="24">
            <ArrowRightOutlined />
          </n-icon>
        </template>
      </n-button>
    </div>
  </n-drawer>
</template>

<style scoped>

</style>
