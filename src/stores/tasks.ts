import type { DataTableColumns, FormInst, FormRules, SelectOption } from 'naive-ui'
import { NButton, NSpace, NSwitch, NTag } from 'naive-ui'
import type { Crontab, Schedule, ScheduleForm, Task } from '~/api/tasks'
import {
  $addSchedule,
  $crontabList,
  $editSchedule,
  $removeSchedule,
  $schedule,
  $scheduleList, $taskExecute,
  $taskList,
} from '~/api/tasks'
import { useGlobalConfig } from '~/composables/gobal-config'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
import ScheduleFormPage from '~/pages/tasks/components/schedule-form.vue'

export const useTaskStore = defineStore('task', () => {
  const taskList = ref<Task[]>()
  const taskSelectList = ref<SelectOption[]>([{
    label: '请选择任务',
    value: 0,
  }])
  const scheduleList = ref<Schedule[]>()
  const crontabList = ref<Crontab[]>()
  const { dialog } = useGlobalConfig()
  const refScheduleForm = ref<FormInst>()
  const baseSchedule = {
    id: 0,
    name: '',
    task: '',
    enabled: true,
    crontab: {
      minute: '10',
      hour: '8',
      day_of_week: '*',
      day_of_month: '*',
      month_of_year: '*',
    },
    args: [],
    kwargs: {},
  }
  const scheduleForm = ref<ScheduleForm>({ ...baseSchedule })
  const addScheduleFormRules = reactive<FormRules>({
    'task': [
      {
        required: true,
        message: '请选择要添加的任务',
        trigger: 'change',
      },
    ],
    'name': [
      {
        required: true,
        message: '请为你的任务命名',
        trigger: 'blur',
      },
    ],
    'crontab.hour': [
      {
        required: true,
        message: '请填写执行时间：小时',
        trigger: 'blur',
      },
    ],
    'crontab.minute': [
      {
        required: true,
        message: '请填写执行时间：分钟',
        trigger: 'blur',
      },
    ],
  })
  const getTaskList = async () => {
    taskList.value = await $taskList()
    taskSelectList.value.length = 1
    taskList.value?.forEach((item) => {
      taskSelectList.value.push({
        label: item.desc,
        value: item.task,
      })
    })
  }
  const getCrontabList = async () => {
    crontabList.value = await $crontabList()
  }

  const getScheduleList = async () => {
    await getTaskList()
    await getCrontabList()
    scheduleList.value = await $scheduleList()
  }
  const editSchedule = async (schedule_id: number) => {
    if (schedule_id === 0) {
      scheduleForm.value = { ...baseSchedule }
    }
    else {
      const schedule = await $schedule({ schedule_id })
      if (typeof schedule.args === 'string')
        schedule.args = JSON.parse(schedule.args)
      const crontab = crontabList.value?.find(item => item.id === schedule.crontab)
      scheduleForm.value = schedule
      scheduleForm.value.crontab = crontab
    }
    dialog?.info({
      title: schedule_id === 0 ? '添加任务' : `编辑任务：${scheduleForm.value.name}`,
      content: () => h(ScheduleFormPage),
      closable: true,
    })
  }
  const saveSchedule = async () => {
    await refScheduleForm.value?.validate()
    const flag = scheduleForm.value.id === 0 ? await $addSchedule(scheduleForm.value) : await $editSchedule(scheduleForm.value)
    if (flag) {
      await getScheduleList()
      dialog?.destroyAll()
    }
  }
  const removeSchedule = async (schedule_id: number) => {
    const flag = await $removeSchedule({ schedule_id })
    if (flag) {
      await getScheduleList()
      dialog?.destroyAll()
    }
  }
  const executeTask = async (task_id: number) => {
    await $taskExecute(task_id)
  }
  const columns = ref<DataTableColumns<Schedule>>([
    {
      title: '任务名称',
      key: 'name',
      width: 200,
      minWidth: 185,
      fixed: 'left',
    },
    {
      title: '任务',
      key: 'task',
      width: 180,
      minWidth: 165,
      render(row: Schedule) {
        const item = taskList.value?.find(item => row.task === item.task)
        if (!item) return null
        return h(
          NTag,
          {
            style: {
              marginRight: '6px',
            },
            type: 'primary',
            bordered: false,
            ghost: true,
          },
          {
            default: () => item?.desc,
          },
        )
      },
    }, {
      title: '执行时间',
      key: 'crontab',
      minWidth: 155,
      width: 180,
      render(row: Schedule): any {
        const item = crontabList.value?.find(item => row.crontab === item.id)
        return h(
          NTag,
          {
            style: {
              marginRight: '6px',
            },
            type: 'info',
            bordered: false,
          },
          {
            default: () => item?.express,
          },
        )
      },
    },
    // {
    //   title: '一次性',
    //   key: 'one_off',
    //   minWidth: 35,
    //   render(row: Schedule) {
    //     return h(
    //       NSwitch,
    //       {
    //         size: 'small',
    //         round: false,
    //         value: row.one_off,
    //       },
    //       {
    //         'checked': () => '开启',
    //         'unchecked': () => '关闭',
    //         'checked-icon': () => '✅',
    //         'unchecked-icon': () => h(
    //           MenuIcon,
    //           {
    //             icon: 'CloseSharp',
    //             color: 'red',
    //             size: 16,
    //           },
    //         ),
    //       },
    //     )
    //   },
    // },
    {
      title: '开启',
      key: 'enabled',
      minWidth: 88,
      width: 100,
      render(row: Schedule) {
        return h(
          NSwitch,
          {
            'size': 'small',
            'round': false,
            'value': row.enabled,
            'onUpdate:value': async (value) => {
              row.enabled = value
              const flag = await $editSchedule(row)
              if (flag) await getTaskList()
            },
          },
          {
            'checked': () => '开启',
            'unchecked': () => '关闭',
            'checked-icon': () => '✅',
            'unchecked-icon': () => h(
              MenuIcon,
              {
                icon: 'CloseSharp',
                color: 'red',
                size: 16,
              },
            ),
          },
        )
      },

    },
    // {
    //   title: '次数',
    //   key: 'total_run_count',
    //   width: 85,
    // },
    {
      title: '上次运行',
      key: 'last_run_at',
      width: 180,
      minWidth: 165,
    },
    // {
    //   title: '备注',
    //   key: 'description',
    //   minWidth: 135,
    // }, {
    //   title: '最后修改',
    //   key: 'date_changed',
    //   minWidth: 135,
    // },
    {
      key: 'actions',
      title: '操作',
      width: 150,
      align: 'center',
      render(row: Schedule) {
        return h(NSpace, { justify: 'center' }, {
          default: () => {
            return [
              h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: () => executeTask(row.id),
                },
                { default: () => '运行' },
              ),
              h(
                NButton,
                {
                  size: 'small',
                  type: 'info',
                  onClick: () => editSchedule(row.id),
                },
                { default: () => '编辑' },
              ),
            ]
          },
        })
      },
    },
  ])

  return {
    columns,
    taskList,
    scheduleList,
    scheduleForm,
    addScheduleFormRules,
    refScheduleForm,
    taskSelectList,

    getTaskList,
    getScheduleList,
    editSchedule,
    saveSchedule,
    removeSchedule,
  }
})
