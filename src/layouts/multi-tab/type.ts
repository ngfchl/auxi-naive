import type { InjectionKey } from '@vue/runtime-core'
import type { RouteLocationNormalized } from 'vue-router'

export interface TabItem {
  path: string
  tabTitle: string
  route?: Omit<RouteLocationNormalized, 'matched'>
}

export interface MultiTabState {
  tabList: TabItem[]
  current: string
}

export const MULTI_TAB_STATE_KEY: InjectionKey<MultiTabState> = Symbol('multiTabState')
