<script lang="ts" setup>
import { LogoGithub } from '@vicons/ionicons5'
</script>

<template>
  <div class="flex mt-24px items-center">
    {{ $t("login.sign-in-with") }}
    <n-icon
      size="24"
      class="cursor-pointer text-[var(--text-color-3)] hover:text-[var(--primary-color)]"
      :component="LogoGithub"
    />
  </div>
</template>
