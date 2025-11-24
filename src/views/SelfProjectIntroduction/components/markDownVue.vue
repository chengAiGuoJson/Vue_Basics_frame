<script lang="ts" setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
// import 'highlight.js/styles/github.css'
const props = defineProps({
  bigMd: {
    type: String,
    default: ''
  }
})

const renderedHtml = computed(() => marked.parse(props.bigMd))

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
<template>
  <div>
    <!-- 渲染 Markdown 内容 -->
    <div class="markdown-body mt-16px" v-html="renderedHtml"></div>
  </div>
</template>
<style scoped>
/* 在这里添加组件的样式 */
.markdown-body {
  line-height: 1.75;
  font-size: 14px;
}
.markdown-body h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
.markdown-body h2 {
  font-size: 1.5em;
  margin: 0.83em 0;
}
.markdown-body h3 {
  font-size: 1.25em;
  margin: 1em 0 0.5em;
}
.markdown-body h4 {
  font-size: 1.1em;
  margin: 1em 0 0.5em;
}
.markdown-body h5 {
  font-size: 1em;
  margin: 1em 0 0.5em;
}
.markdown-body h6 {
  font-size: 0.9em;
  margin: 1em 0 0.5em;
  color: #6a737d;
}
.markdown-body p,
.markdown-body li {
  margin: 8px 0;
}
.markdown-body ul, .markdown-body ol {
  padding-left: 1.5em;
}
.markdown-body pre {
  background: #f6f8fa;
  padding: 12px;
  border-radius: 6px;
  overflow: auto;
}
.markdown-body code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>