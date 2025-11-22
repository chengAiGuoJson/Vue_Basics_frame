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
</style>