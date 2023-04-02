<script lang="ts" setup>
import type { ECBasicOption } from 'echarts/types/src/util/types'
import { v4 as uuidv4 } from 'uuid'
// 引入核心组件
import * as echarts from 'echarts/core'
import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'
import { BarChart, GaugeChart, LineChart, PieChart } from 'echarts/charts'

import type {
  DatasetComponentOption,
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | PieSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
>
const props = withDefaults(defineProps<{
  myOption: ECBasicOption
  theme?: string
  myStyle?: object
  myClass?: object[]
}>(), {
  theme: 'default',
  myStyle: () => ({
    height: '300px',
  }),
  myClass: () => [
    {
      'bg-grey': true,
    },
  ],
})

// 注册必须的组件
echarts.use([
  LegendComponent,
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  GaugeChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])
const element_id = ref(uuidv4())

/**
 * 初始化图表
 */
const initData = () => {
  const domNode = document.getElementById(element_id.value) as HTMLElement
  // domNode.setAttribute('_echarts_instance_', '')
  let myChart = echarts.getInstanceByDom(domNode)
  if (myChart === undefined) {
    myChart = echarts.init(
      domNode,
      props.theme,
    )
  }
  // myChart.setOption(props.myOption)
  // 在template中可以直接取props中的值，但是在script中不行，因为script是在挂载之前执行的
  setTimeout(async () => {
    myChart!.setOption(
      props.myOption,
      {
        notMerge: true, // 不和之前的option合并
      },
    )
  }, 300)

  myChart?.resize({
    animation: {
      duration: 300,
    },
  })

  // 监听页面的大小
  window.addEventListener('resize', () => {
    setTimeout(() => {
      myChart?.resize({
        animation: {
          duration: 300,
        },
      })
    }, 300)
  })
}
/**
 * 页面初始化时加载数据
 */
onMounted(async () => {
  initData()
})
/**
 * 深度监听数据变化
 */
watch(() => props.myOption, async () => {
  initData()
}, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <div
    :id="element_id"
    :style="myStyle"
    :class="myClass"
    style="margin: auto;"
  />
</template>

<style scoped>

</style>
