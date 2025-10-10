<script setup lang="ts">
import ChildrenVModel from './children-v-model.vue'
import { ref, onMounted } from 'vue'
import hljs from 'highlight.js/lib/core'

const count = ref(0)
/**
 * 更新父组件的计数
 * @param newCount 子组件传递的新计数
 * 默认这个回调函数在v-model语法糖里面是已经封装好的，不需要手动调用
 */
const updateCount = (newCount: number) => {
    console.log('子组件计数更新:', newCount)
    count.value = newCount
}

// 在组件挂载后高亮代码块
onMounted(() => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
    })
})
</script>
<template>
    <div class="v-model-container">
        <div class="page-content">
            <h1 class="theme-title large">v-model 自定义指令</h1>
            
            <div class="demo-section theme-card">
                <h2 class="theme-title medium">演示区域</h2>
            <p>父组件当前计数: {{ count }}</p>
            <div class="divider"></div>
            <children-v-model v-model:count="count" @update:count="updateCount"></children-v-model>
        </div>
        <div class="code-examples">
            <div class="code-block theme-card">
                <h3 class="theme-title small">父组件中的示例代码：</h3>
                <pre class="code-container">
                    <code class="language-html">
&lt;template&gt;
    &lt;div&gt;
        &lt;children-v-model v-model:count="count" &lt;/children-v-model&gt;
    &lt;/div&gt;
&lt;/template&gt;
                    </code>
                </pre>
            </div>
            <div class="code-block theme-card">
                <h3 class="theme-title small">子组件中的示例代码：</h3>
                <pre class="code-container">
                    <code class="language-html">
&lt;template&gt;
    &lt;div&gt; 
        &lt;h2&gt;子组件当前计数: &lt;/h2&gt; 
        &lt;div&gt; 
            &lt;el-button type="primary" @click="emit('update:count', props.count + 1)"&gt;增加&lt;/el-button&gt; 
            &lt;el-button type="danger" @click="emit('update:count', props.count - 1)"&gt;减少&lt;/el-button&gt; 
        &lt;/div&gt; 
    &lt;/div&gt;
&lt;/template&gt;
                    </code>
                </pre>
            </div>
        </div>
    </div>
    </div>
</template>
<style scoped>


.divider {
    height: 1px;
    background-color: #e0e0e0;
    width: 100%;
    margin: 15px 0;
}

.code-examples {
    width: 100%;
}

.code-block {
    margin-bottom: 25px;
}

.code-container {
    background-color: #282c34;
    border-radius: 6px;
    padding: 0;
    margin: 0;
    overflow: hidden;
}

/* 覆盖highlight.js的一些样式 */
:deep(pre code) {
    padding: 15px !important;
    border-radius: 6px;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre;
    overflow-x: auto;
}

:deep(.hljs) {
    background: #282c34 !important;
}
</style>