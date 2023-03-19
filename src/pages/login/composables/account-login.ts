import type { FormInst, FormRules } from 'naive-ui'
import type { UserAccountLoginParams } from '~/api/user'

export const useAccountLogin = () => {
  const formRef = ref<FormInst>()
  const loading = ref(false)

  const model = reactive<UserAccountLoginParams>({
    username: null,
    password: null,
    rememberMe: false,
  })
  const userStore = useUserStore()
  const router = useRouter()
  const { t } = useI18n()

  const userLogin = async () => {
    loading.value = true
    try {
      await formRef.value?.validate()
      const res = await userStore.userLogin(model)
      if (res) {
        const redirect = router.currentRoute.value?.params?.redirect as string
        await router.replace(redirect || '/')
      }
      // loading.value = false
    }
    catch (e) {
      // loading.value = false
    }
    finally {
      loading.value = false
    }
  }
  const rules = reactive<FormRules>({
    username: [
      {
        required: true,
        renderMessage: () => t('login.username.required'),
      },
      {
        min: 5,
        max: 20,
        renderMessage: () => t('login.username.length'),
      },
    ],
    password: [
      {
        required: true,
        renderMessage: () => t('login.password.required'),
      },
      {
        min: 5,
        max: 20,
        renderMessage: () => t('login.password.length'),
      },
    ],
  })
  return {
    formRef,
    loading,
    model,
    userLogin,
    rules,
  }
}
