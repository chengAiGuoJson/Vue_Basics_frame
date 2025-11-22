<script lang="ts" setup>
import MarkDownVue from '../markDownVue.vue'
// 导入 .md 文件（Vite 支持 ?raw 将文件作为字符串导入）
import bigMd from './BigFileUploadDemo.md?raw'
</script>
<template>
  <div>
    <!-- 大文件上传功能实现 -->
    <!-- 渲染 Markdown 内容 -->
    <MarkDownVue :bigMd="bigMd" />
  </div>
</template>

<style scoped>
</style>
