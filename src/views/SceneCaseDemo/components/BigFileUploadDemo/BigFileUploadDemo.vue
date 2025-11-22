<template>
  <div>
    <!-- 大文件上传功能实现 -->
    <!-- 渲染 Markdown 内容 -->
    <div class="markdown-body mt-16px" v-html="renderedHtml"></div>
  </div>
</template>

<script lang="ts" setup>
// 这里可以添加大文件上传的逻辑
import { computed, onMounted, watch, nextTick } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
// import 'highlight.js/styles/github.css'

// 导入 .md 文件（Vite 支持 ?raw 将文件作为字符串导入）
import bigMd from './BigFileUploadDemo.md?raw'
const renderedHtml = computed(() => marked.parse(bigMd))

// 渲染后执行代码高亮
const applyHighlight = () => {
  nextTick(() => {
    hljs.highlightAll()
  })
}

onMounted(() => {
  applyHighlight()
})

watch(renderedHtml, () => {
  applyHighlight()
})
</script>

<style scoped>
/* 在这里添加组件的样式 */
.markdown-body {
  line-height: 1.75;
  font-size: 14px;
}
</style>
