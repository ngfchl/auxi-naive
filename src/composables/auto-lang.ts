import i18n, { defaultLocale, loadLanguageAsync } from '~/locales'

export const useAppLocale = createGlobalState(() => useStorage('locale', defaultLocale))
export const useAutoLang = () => {
  const appLocale = useAppLocale()
  const { locale, getLocaleMessage, t } = useI18n()
  const route = useRoute()
  const appStore = useAppStore()
  const setLanguage = async (lang: string) => {
    try {
      await loadLanguageAsync(lang)
      appLocale.value = lang
      locale.value = lang
      const title = route.meta?.title
      if (title) {
        const localeTitle = t(title)
        document.title = `${localeTitle} - ${appStore.layout.title}`
      }
    }
    catch (e) {
      throw new Error(`Failed to load language: ${lang}`)
    }
  }
  const { isSupported, language } = useNavigatorLanguage()

  if (isSupported.value && language.value) {
    const lang = language.value
    if (lang !== defaultLocale)
      setLanguage (lang).then (() => {})

    watch (language, (newLang) => {
      if (newLang)
        setLanguage (newLang).then (() => {})
    })
  }
  else {
    if (appLocale.value !== defaultLocale)
      setLanguage(appLocale.value).then(() => {})
  }
  watch(appLocale, () => {
    if (appLocale.value !== i18n.global.locale.value)
      setLanguage(appLocale.value).then(() => {})
  })
  const targetLocale = computed(() => getLocaleMessage(appLocale.value).naiveUI || {})
  const naiveLocale = computed(() => getLocaleMessage(appLocale.value).naiveUI || {})
  return {
    targetLocale, setLanguage, naiveLocale,
  }
}
