import type { DropdownOption } from 'naive-ui'
import { $sendCommand } from '~/api/tools'

export const useShellStore = defineStore('shell', () => {
  const { message } = useGlobalConfig()
  const shell = ref<string>('')
  const results = ref<string[]>([''])
  const options = ref<DropdownOption[]>([
    {
      label: '清除屏幕',
      key: 'clear',
    },
    {
      label: '更新依赖',
      key: 'pip install -r requirements.txt -U',
    },
    {
      label: '更新代码',
      key: 'git pull',
    },
    {
      label: '初始化代码',
      key: 'git clean -df && git reset --hard',
    },
    {
      label: '同步数据库',
      key: 'python manage.py migrate',
    },
  ])
  const sendCommand = async (command: string) => {
    return await $sendCommand(command)
  }
  const exec_shell = async (command: string) => {
    if (command.length <= 0) {
      message?.error('命令不能为空！')
      shell.value = ''
      return
    }
    results.value.unshift(shell.value)

    if (shell.value === 'clear') {
      results.value.length = 0
    }
    else {
      const res = await sendCommand(shell.value)
      results.value.splice(1, 0, res)
    }
    shell.value = ''
  }

  return {
    shell,
    results,
    options,
    exec_shell,
    sendCommand,
  }
})
