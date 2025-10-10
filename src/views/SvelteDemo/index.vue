<script setup lang="ts">
import { ref, reactive } from 'vue'

// 当前活跃的标签页
const activeTab = ref('introduction')

// 代码示例 - 使用安全的方式处理包含script标签的代码
const codeExamples = {
  vue: {
    component: () => {
      const lines = [
        '<template>',
        '  <div>',
        '    <h1>{{ title }}</h1>',
        '    <p>计数: {{ count }}</p>',
        '    <button @click="increment">增加</button>',
        '  </div>',
        '</template>',
        '',
        '<' + 'script setup lang="ts">',
        'import { ref } from \'vue\'',
        '',
        'const title = ref(\'Vue 3 组件\')',
        'const count = ref(0)',
        '',
        'const increment = () => {',
        '  count.value++',
        '}',
        '</' + 'script>',
        '',
        '<style scoped>',
        'button {',
        '  padding: 8px 16px;',
        '  background: #42b883;',
        '  color: white;',
        '  border: none;',
        '  border-radius: 4px;',
        '}',
        '</style>'
      ]
      return lines.join('\n')
    },
    store: () => {
      const lines = [
        '// Pinia Store',
        'import { defineStore } from \'pinia\'',
        '',
        'export const useCounterStore = defineStore(\'counter\', {',
        '  state: () => ({',
        '    count: 0',
        '  }),',
        '  actions: {',
        '    increment() {',
        '      this.count++',
        '    }',
        '  }',
        '})'
      ]
      return lines.join('\n')
    }
  },
  svelte: {
    component: () => {
      const lines = [
        '<' + 'script>',
        '  let title = \'Svelte 组件\'',
        '  let count = 0',
        '  ',
        '  function increment() {',
        '    count++',
        '  }',
        '</' + 'script>',
        '',
        '<h1>{title}</h1>',
        '<p>计数: {count}</p>',
        '<button on:click={increment}>增加</button>',
        '',
        '<style>',
        '  button {',
        '    padding: 8px 16px;',
        '    background: #ff3e00;',
        '    color: white;',
        '    border: none;',
        '    border-radius: 4px;',
        '  }',
        '</style>'
      ]
      return lines.join('\n')
    },
    store: () => {
      const lines = [
        '// Svelte Store',
        'import { writable } from \'svelte/store\'',
        '',
        'export const count = writable(0)',
        '',
        'export function increment() {',
        '  count.update(n => n + 1)',
        '}'
      ]
      return lines.join('\n')
    }
  }
}

// 获取代码示例的便捷方法
const vueComponentCode = codeExamples.vue.component()
const vueStoreCode = codeExamples.vue.store()
const svelteComponentCode = codeExamples.svelte.component()
const svelteStoreCode = codeExamples.svelte.store()

// 性能对比数据
const performanceData = reactive([
  {
    metric: '首次加载时间',
    vue: '1.2s',
    svelte: '0.8s',
    winner: 'svelte'
  },
  {
    metric: '包大小',
    vue: '34KB',
    svelte: '10KB',
    winner: 'svelte'
  },
  {
    metric: '运行时性能',
    vue: '优秀',
    svelte: '卓越',
    winner: 'svelte'
  },
  {
    metric: '开发体验',
    vue: '优秀',
    svelte: '良好',
    winner: 'vue'
  }
])

// 特性对比数据
const featureComparison = reactive([
  {
    feature: '学习曲线',
    vue: '中等',
    svelte: '较低',
    description: 'Svelte 语法更接近原生 JavaScript'
  },
  {
    feature: '生态系统',
    vue: '丰富',
    svelte: '发展中',
    description: 'Vue 拥有更成熟的生态系统'
  },
  {
    feature: '编译时优化',
    vue: '部分',
    svelte: '完全',
    description: 'Svelte 在编译时进行更多优化'
  },
  {
    feature: '响应式系统',
    vue: 'Proxy',
    svelte: '编译时',
    description: '不同的响应式实现方式'
  }
])

// 响应式特性详细对比数据
const reactiveComparison = reactive([
  {
    feature: '响应式实现',
    vue: '运行时 Proxy',
    svelte: '编译时分析',
    description: 'Vue 使用 Proxy 在运行时拦截，Svelte 在编译时分析依赖'
  },
  {
    feature: '变量声明',
    vue: 'ref(), reactive()',
    svelte: '普通 let 声明',
    description: 'Vue 需要特殊 API，Svelte 使用原生 JavaScript 语法'
  },
  {
    feature: '计算属性',
    vue: 'computed()',
    svelte: '$: 语法',
    description: 'Vue 使用 computed 函数，Svelte 使用响应式声明'
  },
  {
    feature: '副作用',
    vue: 'watchEffect()',
    svelte: '$: 语法',
    description: 'Vue 使用 watchEffect，Svelte 统一使用 $: 语法'
  },
  {
    feature: '性能',
    vue: '运行时开销',
    svelte: '编译时优化',
    description: 'Vue 有运行时代理开销，Svelte 编译时优化无运行时开销'
  }
])

// 交互式演示数据
const vueCount = ref(0)
const svelteCount = ref(0)

const incrementVue = () => {
  vueCount.value++
}

const resetVue = () => {
  vueCount.value = 0
}

const incrementSvelte = () => {
  svelteCount.value++
}

const resetSvelte = () => {
  svelteCount.value = 0
}
</script>

<template>
    <div class="svelte-demo-container">
        <!-- 页面标题 -->
        <div class="header">
        <h1>🚀 Svelte 框架介绍与对比</h1>
        <p class="description">
            深入了解 Svelte 框架的特性，以及与 Vue 3 的详细对比分析
        </p>
        </div>

        <!-- 标签页导航 -->
        <div class="tabs">
        <button 
            :class="['tab', { active: activeTab === 'introduction' }]"
            @click="activeTab = 'introduction'"
        >
            📖 框架介绍
        </button>
        <button 
            :class="['tab', { active: activeTab === 'features' }]"
            @click="activeTab = 'features'"
        >
            ⚡ 特性对比
        </button>
        <button 
            :class="['tab', { active: activeTab === 'code' }]"
            @click="activeTab = 'code'"
        >
            💻 代码对比
        </button>
        <button 
            :class="['tab', { active: activeTab === 'performance' }]"
            @click="activeTab = 'performance'"
        >
            📊 性能对比
        </button>
        <button 
            :class="['tab', { active: activeTab === 'demo' }]"
            @click="activeTab = 'demo'"
        >
            🎮 交互演示
        </button>
        </div>

        <!-- 标签页内容 -->
        <div class="tab-content">
        <!-- 框架介绍 -->
        <div v-if="activeTab === 'introduction'" class="introduction">
            <div class="framework-intro">
            <div class="framework-card vue-card">
                <h3>🟢 Vue 3</h3>
                <p>渐进式 JavaScript 框架，易学易用，拥有丰富的生态系统。</p>
                <ul>
                <li>✅ 渐进式框架设计</li>
                <li>✅ 丰富的生态系统</li>
                <li>✅ 优秀的开发工具</li>
                <li>✅ 大型社区支持</li>
                </ul>
            </div>
            
            <div class="framework-card svelte-card">
                <h3>🔴 Svelte</h3>
                <p>编译时框架，无虚拟DOM，生成高效的原生JavaScript代码。</p>
                <ul>
                <li>✅ 编译时优化</li>
                <li>✅ 无虚拟DOM</li>
                <li>✅ 更小的包大小</li>
                <li>✅ 更快的运行时性能</li>
                </ul>
            </div>
            </div>
        </div>

        <!-- 特性对比 -->
        <div v-if="activeTab === 'features'" class="features">
            <div class="features-section">
            <h3>📋 基础特性对比</h3>
            <div class="comparison-table">
                <div class="table-header">
                <div class="header-cell">特性</div>
                <div class="header-cell vue-header">Vue 3</div>
                <div class="header-cell svelte-header">Svelte</div>
                <div class="header-cell">说明</div>
                </div>
                <div 
                v-for="item in featureComparison" 
                :key="item.feature"
                class="table-row"
                >
                <div class="cell feature-cell">{{ item.feature }}</div>
                <div class="cell vue-cell">{{ item.vue }}</div>
                <div class="cell svelte-cell">{{ item.svelte }}</div>
                <div class="cell description-cell">{{ item.description }}</div>
                </div>
            </div>
            </div>

            <div class="features-section">
            <h3>⚡ 响应式特性详细对比</h3>
            <div class="comparison-table reactive-table">
                <div class="table-header">
                <div class="header-cell">特性</div>
                <div class="header-cell vue-header">Vue 3</div>
                <div class="header-cell svelte-header">Svelte</div>
                <div class="header-cell">说明</div>
                </div>
                <div 
                v-for="item in reactiveComparison" 
                :key="item.feature"
                class="table-row"
                >
                <div class="cell feature-cell">{{ item.feature }}</div>
                <div class="cell vue-cell">{{ item.vue }}</div>
                <div class="cell svelte-cell">{{ item.svelte }}</div>
                <div class="cell description-cell">{{ item.description }}</div>
                </div>
            </div>
            </div>
        </div>

        <!-- 代码对比 -->
        <div v-if="activeTab === 'code'" class="code-comparison">
            <div class="code-section">
            <h3>📝 组件代码对比</h3>
            <div class="code-blocks">
                <div class="code-block vue-code">
                <h4>Vue 3 组件</h4>
                <pre><code>{{ vueComponentCode }}</code></pre>
                </div>
                <div class="code-block svelte-code">
                <h4>Svelte 组件</h4>
                <pre><code>{{ svelteComponentCode }}</code></pre>
                </div>
            </div>
            </div>

            <div class="code-section">
            <h3>🗃️ 状态管理对比</h3>
            <div class="code-blocks">
                <div class="code-block vue-code">
                <h4>Pinia Store</h4>
                <pre><code>{{ vueStoreCode }}</code></pre>
                </div>
                <div class="code-block svelte-code">
                <h4>Svelte Store</h4>
                <pre><code>{{ svelteStoreCode }}</code></pre>
                </div>
            </div>
            </div>
        </div>

        <!-- 性能对比 -->
        <div v-if="activeTab === 'performance'" class="performance">
            <div class="performance-grid">
            <div 
                v-for="item in performanceData" 
                :key="item.metric"
                class="performance-card"
            >
                <h4>{{ item.metric }}</h4>
                <div class="performance-comparison">
                <div class="performance-item vue-performance">
                    <span class="label">Vue 3</span>
                    <span class="value">{{ item.vue }}</span>
                </div>
                <div class="vs">VS</div>
                <div class="performance-item svelte-performance">
                    <span class="label">Svelte</span>
                    <span class="value">{{ item.svelte }}</span>
                </div>
                </div>
                <div :class="['winner', `${item.winner}-winner`]">
                🏆 {{ item.winner === 'vue' ? 'Vue 3' : 'Svelte' }} 胜出
                </div>
            </div>
            </div>
        </div>

        <!-- 交互演示 -->
        <div v-if="activeTab === 'demo'" class="demo">
            <div class="demo-section">
            <h3>🎮 交互式计数器对比</h3>
            <div class="demo-containers">
                <div class="demo-container vue-demo">
                <h4>Vue 3 风格</h4>
                <div class="counter-display">
                    <span class="count">{{ vueCount }}</span>
                </div>
                <div class="demo-controls">
                    <button @click="incrementVue" class="vue-button">
                    增加
                    </button>
                    <button @click="resetVue" class="vue-button secondary">
                    重置
                    </button>
                </div>
                </div>

                <div class="demo-container svelte-demo">
                <h4>Svelte 风格</h4>
                <div class="counter-display">
                    <span class="count">{{ svelteCount }}</span>
                </div>
                <div class="demo-controls">
                    <button @click="incrementSvelte" class="svelte-button">
                    增加
                    </button>
                    <button @click="resetSvelte" class="svelte-button secondary">
                    重置
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.svelte-demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.description {
  font-size: 1.1rem;
  color: #fff;
  max-width: 600px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #ecf0f1;
  flex-wrap: wrap;
}

.tab {
  padding: 12px 24px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  margin: 0 5px;
}

.tab:hover {
  color: #2c3e50;
  background-color: #f8f9fa;
}

.tab.active {
  color: #3498db;
  border-bottom-color: #3498db;
  font-weight: 600;
}

.tab-content {
  min-height: 500px;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 框架介绍样式 */
.framework-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

.framework-card {
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.framework-card:hover {
  transform: translateY(-5px);
}

.vue-card {
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  color: white;
}

.svelte-card {
  background: linear-gradient(135deg, #ff3e00 0%, #cc3200 100%);
  color: white;
}

.framework-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.framework-card ul {
  list-style: none;
  padding: 0;
}

.framework-card li {
  margin: 8px 0;
  padding-left: 20px;
  position: relative;
}

/* 特性对比样式 */
.comparison-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  background: #34495e;
  color: white;
}

.header-cell {
  padding: 15px;
  font-weight: 600;
  text-align: center;
}

.vue-header {
  background: #42b883;
}

.svelte-header {
  background: #ff3e00;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  border-bottom: 1px solid #ecf0f1;
}

.table-row:last-child {
  border-bottom: none;
}

.cell {
  padding: 15px;
  text-align: center;
}

.feature-cell {
  font-weight: 600;
  background: #f8f9fa;
}

.vue-cell {
  background: rgba(66, 184, 131, 0.1);
  color: #27ae60;
  font-weight: 600;
}

.svelte-cell {
  background: rgba(255, 62, 0, 0.1);
  color: #e74c3c;
  font-weight: 600;
}

.description-cell {
  text-align: left;
  color: #7f8c8d;
}

/* 特性分组样式 */
.features-section {
  margin-bottom: 40px;
}

.features-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
  border-left: 4px solid #3498db;
  padding-left: 15px;
}

.reactive-table {
  border: 2px solid #3498db;
}

.reactive-table .table-header {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
}

.reactive-table .vue-header {
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
}

.reactive-table .svelte-header {
  background: linear-gradient(135deg, #ff3e00 0%, #cc3200 100%);
}

/* 代码对比样式 */
.code-section {
  margin-bottom: 40px;
}

.code-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.code-blocks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.code-block {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.code-block h4 {
  margin: 0;
  padding: 15px;
  color: white;
  font-size: 1rem;
}

.vue-code h4 {
  background: #42b883;
}

.svelte-code h4 {
  background: #ff3e00;
}

.code-block pre {
  margin: 0;
  padding: 20px;
  background: #2d3748;
  color: #e2e8f0;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 性能对比样式 */
.performance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.performance-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.performance-card h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.performance-comparison {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.performance-item {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
}

.vue-performance {
  background: rgba(66, 184, 131, 0.1);
  color: #27ae60;
}

.svelte-performance {
  background: rgba(255, 62, 0, 0.1);
  color: #e74c3c;
}

.vs {
  margin: 0 15px;
  font-weight: bold;
  color: #7f8c8d;
}

.label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.value {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
}

.winner {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.vue-winner {
  background: #42b883;
  color: white;
}

.svelte-winner {
  background: #ff3e00;
  color: white;
}

/* 交互演示样式 */
.demo-section h3 {
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.demo-containers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.demo-container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.demo-container h4 {
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.vue-demo h4 {
  color: #42b883;
}

.svelte-demo h4 {
  color: #ff3e00;
}

.counter-display {
  margin: 30px 0;
}

.count {
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
  display: inline-block;
  min-width: 80px;
}

.demo-controls {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.vue-button, .svelte-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.vue-button {
  background: #42b883;
  color: white;
}

.vue-button:hover {
  background: #369870;
  transform: translateY(-2px);
}

.vue-button.secondary {
  background: #95a5a6;
}

.vue-button.secondary:hover {
  background: #7f8c8d;
}

.svelte-button {
  background: #ff3e00;
  color: white;
}

.svelte-button:hover {
  background: #cc3200;
  transform: translateY(-2px);
}

.svelte-button.secondary {
  background: #95a5a6;
}

.svelte-button.secondary:hover {
  background: #7f8c8d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .framework-intro,
  .code-blocks,
  .demo-containers {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .tab {
    margin: 5px 0;
    width: 200px;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    text-align: left;
  }
  
  .header-cell,
  .cell {
    border-bottom: 1px solid #ecf0f1;
  }
  
  .performance-comparison {
    flex-direction: column;
    gap: 10px;
  }
  
  .vs {
    margin: 10px 0;
  }
}
</style>