<script lang="ts" setup>
import { LockClosed, PhonePortrait } from '@vicons/ionicons5'
</script>

<template>
  <n-form label-align="left" label-placement="left">
    <n-form-item-row>
      <n-input :placeholder="$t('login.mobile.placeholder')">
        <template #prefix>
          <n-icon :component="PhonePortrait" />
        </template>
      </n-input>
    </n-form-item-row>
    <n-form-item-row>
      <n-input-group>
        <n-input :placeholder="$t('login.mobile.verification-code.placeholder')">
          <template #prefix>
            <n-icon :component="LockClosed" />
          </template>
        </n-input>
        <n-button>
          {{ $t("login.mobile.verification-code.get-verification-code") }}
        </n-button>
      </n-input-group>
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

<style scoped>

</style>
