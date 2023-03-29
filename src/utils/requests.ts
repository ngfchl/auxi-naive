import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { STORAGE_AUTHORIZATION_KEY, useAuthorization } from '~/composables/authorization'
import { useGlobalConfig } from '~/composables/gobal-config'
import i18n from '~/locales'
import router from '~/routes'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/',
  timeout: 60000,
})
const requestHandler = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig<any> | any> => {
  const authorization = useAuthorization()
  /**
     * 判断是否存在token，如果存在的话，则每个http header都加上token
     */
  if (authorization.value) {
    config.headers = {
      ...config.headers,
      [STORAGE_AUTHORIZATION_KEY]: authorization.value,
    }
  }
  return config
}
export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}

const responseHandler = (response: AxiosResponse): any | ResponseBody<any> | AxiosResponse<any> | Promise<any> => {
  return response.data
}
const errorHandler = (error: AxiosError): Promise<any> => {
  const { notification } = useGlobalConfig()
  const token = useAuthorization()

  // 判断是否存在response
  if (error.response) {
    const { data, status, statusText } = error.response as AxiosResponse<any>
    if (status === 401) {
      // 重新登录
      notification?.error({
        title: i18n.global.t('global.request.error.401'),
        content: data?.msg || statusText,
        duration: 3000,
      })
      router.replace({
        path: '/login',
        query: {
          redirect: router?.currentRoute.value?.path,
        },
      }).then(() => {
        /**
         * 这里处理清空用户信息和token的逻辑，后续扩展
         */
        token.value = null
      })
    }
    else if (status === 403) {
      //
      notification?.error({
        title: i18n.global.t('global.request.error.403'),
        content: data?.msg || statusText,
        duration: 3000,
      })
    }
    else if (status === 500) {
      notification?.error({
        title: i18n.global.t('global.request.error.500'),
        content: data?.msg || statusText,
        duration: 3000,
      })
    }
    else {
      notification?.error({
        title: i18n.global.t('global.request.error.other'),
        content: data?.msg || statusText,
        duration: 3000,
      })
    }
  }
  return Promise.reject(error)
}

instance.interceptors.request.use(requestHandler)
instance.interceptors.response.use(responseHandler, errorHandler)
const useGet = <P = any, R = any>(url: string, params?: P, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    method: 'GET',
    params,
    ...config,
  })
}

const usePost = <P = any, R = any>(url: string, data?: P, config?: AxiosRequestConfig): Promise< ResponseBody<R>> => {
  return instance.request({
    url,
    method: 'POST',
    data,
    ...config,
  })
}

const usePut = <P = any, R = any>(url: string, data?: P, config?: AxiosRequestConfig): Promise< ResponseBody<R>> => {
  return instance.request({
    url,
    method: 'PUT',
    data,
    ...config,
  })
}

const useDelete = <P = any, R = any>(url: string, params?: P, config?: AxiosRequestConfig): Promise< ResponseBody<R>> => {
  return instance.request({
    url,
    method: 'DELETE',
    params,
    ...config,
  })
}

export {
  instance, useGet, usePost, usePut, useDelete,
}
