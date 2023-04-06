import { getList } from '~/hooks/getList'
const { message } = useGlobalConfig()
export interface Task {
  task: string
  desc: string
}
export interface Schedule {
  id: number
  name: string
  task: string
  crontab: number
  one_off: boolean
  enabled: boolean
  last_run_at: string
  total_run_count: 0
  description: string
  date_changed: string
}
export interface Crontab {
  id?: number
  minute: number | string
  hour: number | string
  day_of_week: number | string
  day_of_month: number | string
  month_of_year: number | string
  express?: string
}
export interface ScheduleForm {
  id: number
  name: String
  task: String
  enabled?: boolean
  crontab?: Crontab | number
}

export const $taskList: () => Promise<any> = async () => {
  return await getList<null, Task>('schedule/tasks')
}
export const $scheduleList: () => Promise<any> = async () => {
  return await getList<null, Schedule[]>('schedule/schedules')
}

export const $schedule: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, Schedule>('schedule/schedule', params)
}
export const $crontabList: () => Promise<any> = async () => {
  return await getList<null, Crontab[]>('schedule/crontabs')
}

export const $addSchedule = async (schedule: ScheduleForm) => {
  const { msg, code } = await usePost('schedule/schedule', schedule)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $editSchedule = async (schedule: ScheduleForm) => {
  const { msg, code } = await usePut('schedule/schedule', schedule)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $removeSchedule = async (params: object) => {
  const { msg, code } = await useDelete('schedule/schedule', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
