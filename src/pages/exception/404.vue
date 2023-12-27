<template>
  <n-result
    status="404" title="404 资源不存在"
    size="huge" class="mt-12%"
    description="生活总归带点荒谬"
  >
    <template #footer>
      <n-button strong secondary type="info" size="large" @click="$router.go(-1)">
        返回首页
      </n-button>
    </template>
  </n-result>
</template>
