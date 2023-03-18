<script lang="ts" setup>
import { Accessibility, LockClosed } from '@vicons/ionicons5'
</script>

<template>
  <n-form label-align="left" label-placement="left">
    <n-form-item-row>
      <n-input :placeholder="$t('login.username.placeholder')">
        <template #suffix>
          <n-icon :component="Accessibility" />
        </template>
      </n-input>
    </n-form-item-row>
    <n-form-item-row>
      <n-input type="password" :placeholder="$t('login.password.placeholder')" show-password-on="mousedown">
        <template #suffix>
          <n-icon :component="LockClosed" />
        </template>
      </n-input>
    </n-form-item-row>
    <n-form-item-row>
      <div class="w-100% flex items-center justify-between">
        <n-checkbox>
          {{ $t("login.remember-me") }}
        </n-checkbox>
      </div>
    </n-form-item-row>
  </n-form>
  <n-button type="primary" block secondary strong>
    {{ $t("login.login") }}
  </n-button>
</template>
