<script setup lang="ts">
import { ArrowForward, SettingsSharp } from '@vicons/ionicons5'
import CheckBoxLayout from './checkbox-layout.vue'
import Container from './container.vue'
import ColorLayout from '~/layouts/setting-drawer/color-layout.vue'
import type { ThemeType } from '~/config/theme'

const props = withDefaults(defineProps<{
  floatTop: number | string
  drawerWidth: number | string
  layout?: 'side' | 'mix' | 'top'
  layoutStyle?: 'light' | 'inverted' | 'dark'
  themeList?: ThemeType[]
  theme?: string
}>(), {
  floatTop: 240,
  drawerWidth: 300,
  layout: 'top',
  layoutStyle: 'light',
})
const emit = defineEmits(['update:layout', 'update:layoutStyle', 'update:theme'])
const show = ref(false)

const cssVar = computed(() => {
  return {
    '--pro-admin-float-top': `${props.floatTop}px`,
    '--pro-admin-drawer-width': `${props.drawerWidth}px`,
  }
})

const layouts = ref([
  // {
  //   key: 'mix',
  //   title: 'global.layout.setting.drawer.layout.mix',
  // },
  {
    key: 'side',
    title: 'global.layout.setting.drawer.layout.side',
  },
  // {
  //   key: 'top',
  //   title: 'global.layout.setting.drawer.layout.top',
  // },
])
const layoutStyles = ref([
  {
    id: 'light',
    key: props.layout,
    title: 'global.layout.setting.drawer.style.light',
  },
  {
    id: 'inverted',
    key: props.layout,
    inverted: true,
    title: 'global.layout.setting.drawer.style.inverted',
  },
  {
    id: 'dark',
    key: props.layout,
    dark: true,
    title: 'global.layout.setting.drawer.style.dark',
  },
])
</script>

<template>
  <teleport to="body">
    <div :style="cssVar" class="fixed top-[var(--pro-admin-float-top)] right-0">
      <n-button
        text
        size="large" type="tertiary"
        class="b-rd-tr-0! b-rd-br-0!"
        @click="show = true"
      >
        <template #icon>
          <n-icon size="24">
            <SettingsSharp />
          </n-icon>
        </template>
      </n-button>
    </div>
  </teleport>
  <n-drawer v-model:show="show" :width="drawerWidth">
    <n-drawer-content :title="$t('global.layout.setting.drawer.custom')">
      <n-space>
        <Container :title="$t('global.layout.setting.drawer.style')">
          <template v-for="item in layoutStyles" :key="item.id">
            <CheckBoxLayout
              :layout="layout"
              :checked="item.id === layoutStyle"
              :title="$t(item.title)"
              :inverted="item.inverted"
              :dark="item.dark"
              @click="() => $emit('update:layoutStyle', item.id)"
            />
          </template>
        </Container>
      </n-space>
      <n-space>
        <Container :title="$t('global.layout.setting.drawer.layout')">
          <template v-for="item in layouts" :key="item.key">
            <CheckBoxLayout
              :layout="item.key"
              :checked="item.key === layout"
              :title="$t(item.title)"
              :inverted="layoutStyle === 'inverted'"
              @click="() => $emit('update:layout', item.key)"
            />
          </template>
        </Container>
      </n-space>
      <n-space>
        <Container v-if="themeList" :title="$t('global.layout.setting.drawer.theme')">
          <ColorLayout
            v-for="item in themeList"
            :key="item.key"
            :color="item.color"
            :title="$t(`global.layout.setting.drawer.theme.${item.key}`)"
            :checked="item.key === theme"
            @click="() => $emit('update:theme', item.key)"
          />
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
        @click="show = false"
      >
        <template #icon>
          <n-icon size="24">
            <ArrowForward />
          </n-icon>
        </template>
      </n-button>
    </div>
  </n-drawer>
</template>

<style scoped>

</style>
