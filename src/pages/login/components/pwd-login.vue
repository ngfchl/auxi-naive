<script lang="ts" setup>
import { Accessibility, LockClosed } from '@vicons/ionicons5'
import { useAccountLogin } from '~/pages/login/composables/account-login'

const { rules, formRef, userLogin, loading, model } = useAccountLogin()

const onLogin = async () => {
  await userLogin()
}
</script>

<template>
  <n-form ref="formRef" :model="model" :rules="rules" label-align="left" label-placement="left">
    <n-form-item-row path="username">
      <n-input v-model:value="model.username" :placeholder="$t('login.username.placeholder')">
        <template #suffix>
          <n-icon :component="Accessibility" />
        </template>
      </n-input>
    </n-form-item-row>
    <n-form-item-row path="password">
      <n-input v-model:value="model.password" type="password" :placeholder="$t('login.password.placeholder')" show-password-on="mousedown">
        <template #suffix>
          <n-icon :component="LockClosed" />
        </template>
      </n-input>
    </n-form-item-row>
    <n-form-item-row path="rememberMe">
      <div class="w-100% flex items-center justify-between">
        <n-checkbox v-model:checked="model.rememberMe">
          {{ $t("login.remember-me") }}
        </n-checkbox>
      </div>
    </n-form-item-row>
  </n-form>
  <n-button type="primary" :loading="loading" block secondary strong @click="onLogin">
    {{ $t("login.login") }}
  </n-button>
</template>
