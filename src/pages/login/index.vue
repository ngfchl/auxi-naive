<script lang="ts" setup>
import { BlankLayout } from '~/layouts'
import PwdLogin from '~/pages/login/components/pwd-login.vue'
</script>

<template>
  <BlankLayout>
    <div flex="~ col" class="py-20px items-center justify-center mt-12%">
      <div class="flex items-center">
        <img src="@/assets/ptools.svg" class="h-40px w-40px" alt="">
        <span class="ml-2 text-33px font-600">
          PT一下你就晓嘚
        </span>
      </div>
      <div class="flex items-center mt-12px mb-20px text-[var(--text-color-3)]">
        {{ $t('login.admin.desc') }}
      </div>
    </div>
    <div class="w-380px mx-auto">
      <n-card title="">
        <n-tabs type="line" default-value="signin" justify-content="space-evenly">
          <n-tab-pane name="signin" :tab="$t('login.account.tab')">
            <!--            密码登录组件 -->
            <PwdLogin />
          </n-tab-pane>
          <!--          <n-tab-pane name="mobile" :tab="$t('login.mobile.tab')"> -->
          <!--            手机号注册组件 -->
          <!--            <MobileLogin /> -->
          <!--          </n-tab-pane> -->
        </n-tabs>
        <!--        第三方登录组件 -->
        <!--        <ThirdLogin /> -->
      </n-card>
    </div>
  </BlankLayout>
</template>
