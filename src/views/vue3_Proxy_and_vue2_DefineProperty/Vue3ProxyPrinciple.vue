<template>
    <div class="vue3-proxy-principle">
      <div class="header">
        <h1>Vue3 Proxy响应式原理演示</h1>
        <p class="description">
          Vue3使用Proxy替代Object.defineProperty实现响应式，具有更强大的拦截能力和更好的性能表现
        </p>
      </div>

      <!-- 基础演示 -->
      <div class="demo-section">
        <h2>🎯 基础Proxy响应式演示</h2>
        <div class="demo-content">
          <div class="controls">
            <button @click="runBasicDemo" class="btn-primary">运行基础演示</button>
            <button @click="clearLogs('basic')" class="btn-secondary">清空日志</button>
          </div>
          <div class="output-container">
            <div class="log-output" ref="basicOutput">{{ basicLogs }}</div>
          </div>
        </div>
      </div>

      <!-- 对象操作演示 -->
      <div class="demo-section">
        <h2>🔧 对象操作演示</h2>
        <div class="demo-content">
          <div class="interactive-demo">
            <div class="state-display">
              <h3>当前状态：</h3>
              <pre>{{ JSON.stringify(demoState, null, 2) }}</pre>
            </div>
            <div class="controls">
              <button @click="modifyProperty" class="btn-primary">修改属性</button>
              <button @click="addProperty" class="btn-success">添加属性</button>
              <button @click="deleteProperty" class="btn-danger">删除属性</button>
              <button @click="modifyNestedProperty" class="btn-info">修改嵌套属性</button>
            </div>
          </div>
          <div class="output-container">
            <div class="log-output">{{ objectLogs }}</div>
          </div>
        </div>
      </div>

      <!-- 数组操作演示 -->
      <div class="demo-section">
        <h2>📋 数组操作演示</h2>
        <div class="demo-content">
          <div class="interactive-demo">
            <div class="state-display">
              <h3>数组状态：</h3>
              <pre>{{ JSON.stringify(arrayState, null, 2) }}</pre>
            </div>
            <div class="controls">
              <button @click="pushItem" class="btn-primary">Push元素</button>
              <button @click="modifyByIndex" class="btn-primary">修改索引</button>
              <button @click="changeLength" class="btn-warning">修改长度</button>
              <button @click="spliceArray" class="btn-info">Splice操作</button>
            </div>
          </div>
          <div class="output-container">
            <div class="log-output">{{ arrayLogs }}</div>
          </div>
        </div>
      </div>

      <!-- 性能对比 -->
      <div class="demo-section">
        <h2>⚡ 性能对比演示</h2>
        <div class="demo-content">
          <div class="controls">
            <button @click="runPerformanceTest" class="btn-primary">运行性能测试</button>
            <button @click="clearLogs('performance')" class="btn-secondary">清空结果</button>
          </div>
          <div class="performance-results" v-if="performanceResults.length > 0">
            <table class="performance-table">
              <thead>
                <tr>
                  <th>对象大小</th>
                  <th>Vue2模拟时间</th>
                  <th>Vue3时间</th>
                  <th>性能提升</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="result in performanceResults" :key="result.size">
                  <td>{{ result.size }} 个属性</td>
                  <td>{{ result.vue2Time }}ms</td>
                  <td>{{ result.vue3Time }}ms</td>
                  <td class="improvement">{{ result.improvement }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="output-container">
            <div class="log-output">{{ performanceLogs }}</div>
          </div>
        </div>
      </div>

      <!-- 特性对比表 -->
      <div class="demo-section">
        <h2>📊 Vue2 vs Vue3 特性对比</h2>
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>功能特性</th>
                <th class="vue2-col">Vue2 (Object.defineProperty)</th>
                <th class="vue3-col">Vue3 (Proxy)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="feature in comparisonFeatures" :key="feature.name">
                <td>{{ feature.name }}</td>
                <td class="vue2-col" v-html="feature.vue2"></td>
                <td class="vue3-col" v-html="feature.vue3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 核心代码展示 -->
      <div class="demo-section">
        <h2>💻 核心实现代码</h2>
        <div class="code-tabs">
          <button 
            v-for="tab in codeTabs" 
            :key="tab.name"
            @click="activeCodeTab = tab.name"
            :class="['tab-button', { active: activeCodeTab === tab.name }]"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="code-content">
          <pre><code>{{ getCurrentCode() }}</code></pre>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'

// 响应式数据
const basicLogs = ref('')
const objectLogs = ref('')
const arrayLogs = ref('')
const performanceLogs = ref('')
const performanceResults = ref<any[]>([])
const activeCodeTab = ref('reactive')

// 演示用的响应式状态
const demoState = reactive({
  message: 'Hello Vue3!',
  count: 0,
  user: {
    name: 'John',
    age: 25
  }
})

const arrayState = reactive({
  items: [1, 2, 3],
  users: [
    { name: 'Alice', age: 20 },
    { name: 'Bob', age: 25 }
  ]
})

// 特性对比数据
const comparisonFeatures = [
  {
    name: '属性添加检测',
    vue2: '❌ 需要Vue.set',
    vue3: '✅ 原生支持'
  },
  {
    name: '属性删除检测',
    vue2: '❌ 需要Vue.delete',
    vue3: '✅ 原生支持'
  },
  {
    name: '数组索引修改',
    vue2: '❌ 无法检测',
    vue3: '✅ 完全支持'
  },
  {
    name: '数组长度修改',
    vue2: '❌ 无法检测',
    vue3: '✅ 完全支持'
  },
  {
    name: 'Map/Set支持',
    vue2: '❌ 不支持',
    vue3: '✅ 完全支持'
  },
  {
    name: '初始化性能',
    vue2: '❌ 需要递归遍历',
    vue3: '✅ 惰性处理'
  },
  {
    name: '内存占用',
    vue2: '❌ 每个属性都有闭包',
    vue3: '✅ 更少的内存占用'
  },
  {
    name: '浏览器兼容性',
    vue2: '✅ IE9+',
    vue3: '❌ IE不支持'
  }
]

// 代码标签页
const codeTabs = [
  { name: 'reactive', label: 'reactive函数' },
  { name: 'track', label: '依赖收集' },
  { name: 'trigger', label: '触发更新' },
  { name: 'effect', label: '副作用函数' }
]

// 代码内容
const codeContents = {
  reactive: `// Vue3 reactive函数核心实现
function reactive(target) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key);
      const result = Reflect.get(target, key, receiver);
      
      // 深层响应式
      if (typeof result === 'object' && result !== null) {
        return reactive(result);
      }
      
      return result;
    },
    
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      
      // 只有值真正改变时才触发更新
      if (oldValue !== value) {
        trigger(target, key);
      }
      
      return result;
    },
    
    has(target, key) {
      track(target, key);
      return Reflect.has(target, key);
    },
    
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const result = Reflect.deleteProperty(target, key);
      
      if (result && hadKey) {
        trigger(target, key);
      }
      
      return result;
    }
  });
}`,
  
  track: `// 依赖收集系统
const targetMap = new WeakMap();
let activeEffect = null;

function track(target, key) {
  if (!activeEffect) return;
  
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  dep.add(activeEffect);
}`,
  
  trigger: `// 触发更新系统
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => {
      if (effect !== activeEffect) {
        effect();
      }
    });
  }
}`,
  
  effect: `// 副作用函数
function effect(fn) {
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      return fn();
    } finally {
      activeEffect = null;
    }
  };
  
  effectFn();
  return effectFn;
}

// 使用示例
const state = reactive({ count: 0 });

effect(() => {
  console.log('count:', state.count);
});

state.count++; // 自动触发副作用函数`
}

// 方法
function addLog(type: string, message: string) {
  const timestamp = new Date().toLocaleTimeString()
  const logMessage = `[${timestamp}] ${message}\n`
  
  switch (type) {
    case 'basic':
      basicLogs.value += logMessage
      break
    case 'object':
      objectLogs.value += logMessage
      break
    case 'array':
      arrayLogs.value += logMessage
      break
    case 'performance':
      performanceLogs.value += logMessage
      break
  }
}

function clearLogs(type: string) {
  switch (type) {
    case 'basic':
      basicLogs.value = ''
      break
    case 'object':
      objectLogs.value = ''
      break
    case 'array':
      arrayLogs.value = ''
      break
    case 'performance':
      performanceLogs.value = ''
      performanceResults.value = []
      break
  }
}

function runBasicDemo() {
  clearLogs('basic')
  addLog('basic', '=== 开始基础Proxy响应式演示 ===')
  
  // 模拟响应式操作
  addLog('basic', '🎯 创建响应式对象')
  addLog('basic', '📦 设置副作用函数监听数据变化')
  
  setTimeout(() => {
    addLog('basic', '✏️ 修改 message 属性')
    addLog('basic', '🚀 触发副作用函数重新执行')
  }, 1000)
  
  setTimeout(() => {
    addLog('basic', '✏️ 修改 count 属性')
    addLog('basic', '🚀 触发副作用函数重新执行')
  }, 2000)
  
  setTimeout(() => {
    addLog('basic', '➕ 添加新属性 newProp')
    addLog('basic', '🚀 Proxy可以检测到新属性的添加！')
  }, 3000)
}

function modifyProperty() {
  demoState.message = `更新时间: ${new Date().toLocaleTimeString()}`
  addLog('object', `✏️ 修改了 message: ${demoState.message}`)
}

function addProperty() {
  const newKey = `prop${Date.now()}`
  ;(demoState as any)[newKey] = '新属性值'
  addLog('object', `➕ 添加了新属性 ${newKey}: 新属性值`)
}

function deleteProperty() {
  if ('count' in demoState) {
    delete (demoState as any).count
    addLog('object', '🗑️ 删除了 count 属性')
  } else {
    demoState.count = Math.floor(Math.random() * 100)
    addLog('object', `🔄 重新添加了 count 属性: ${demoState.count}`)
  }
}

function modifyNestedProperty() {
  demoState.user.name = `User${Math.floor(Math.random() * 1000)}`
  demoState.user.age = Math.floor(Math.random() * 50) + 18
  addLog('object', `🔧 修改了嵌套属性 user: ${JSON.stringify(demoState.user)}`)
}

function pushItem() {
  const newItem = arrayState.items.length + 1
  arrayState.items.push(newItem)
  addLog('array', `➕ Push了新元素: ${newItem}`)
}

function modifyByIndex() {
  if (arrayState.items.length > 0) {
    const index = 0
    const newValue = Math.floor(Math.random() * 100)
    arrayState.items[index] = newValue
    addLog('array', `✏️ 修改了索引 ${index} 的值为: ${newValue}`)
  }
}

function changeLength() {
  const newLength = Math.max(1, arrayState.items.length - 1)
  arrayState.items.length = newLength
  addLog('array', `📏 修改了数组长度为: ${newLength}`)
}

function spliceArray() {
  if (arrayState.items.length > 1) {
    const removed = arrayState.items.splice(1, 1, 999)
    addLog('array', `🔄 Splice操作: 删除了 ${removed}, 插入了 999`)
  }
}

function runPerformanceTest() {
  clearLogs('performance')
  addLog('performance', '=== 开始性能测试 ===')
  
  const sizes = [100, 500, 1000]
  const results: any[] = []
  
  sizes.forEach(size => {
    addLog('performance', `\n📊 测试对象大小: ${size} 个属性`)
    
    // 创建测试对象
    const createLargeObject = (size: number) => {
      const obj: any = {}
      for (let i = 0; i < size; i++) {
        obj[`prop${i}`] = {
          value: i,
          nested: {
            deep: `value${i}`
          }
        }
      }
      return obj
    }
    
    // 模拟Vue2的初始化（递归遍历所有属性）
    const vue2Start = performance.now()
    const vue2Obj = createLargeObject(size)
    // 模拟Object.defineProperty的递归处理
    function mockVue2Reactive(obj: any) {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          mockVue2Reactive(obj[key])
        }
      })
    }
    mockVue2Reactive(vue2Obj)
    const vue2Time = performance.now() - vue2Start
    
    // Vue3的初始化（只创建Proxy）
    const vue3Start = performance.now()
    const vue3Obj = reactive(createLargeObject(size))
    const vue3Time = performance.now() - vue3Start
    
    const vue2TimeStr = vue2Time.toFixed(2)
    const vue3TimeStr = vue3Time.toFixed(2)
    const improvement = ((vue2Time - vue3Time) / vue2Time * 100).toFixed(1)
    
    addLog('performance', `Vue2模拟初始化时间: ${vue2TimeStr}ms`)
    addLog('performance', `Vue3 Proxy初始化时间: ${vue3TimeStr}ms`)
    addLog('performance', `性能提升: ${improvement}%`)
    
    results.push({
      size,
      vue2Time: vue2TimeStr,
      vue3Time: vue3TimeStr,
      improvement
    })
  })
  
  performanceResults.value = results
  addLog('performance', '\n✅ 性能测试完成！')
}

function getCurrentCode() {
  return codeContents[activeCodeTab.value as keyof typeof codeContents] || ''
}
</script>

<style scoped>
.vue3-proxy-principle {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.description {
  font-size: 1.1em;
  margin: 0;
  opacity: 0.9;
}

.demo-section {
  background: white;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.demo-section h2 {
  color: #2c3e50;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
  margin-top: 0;
}

.demo-content {
  margin-top: 20px;
}

.interactive-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.state-display {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
}

.state-display h3 {
  margin-top: 0;
  color: #495057;
}

.state-display pre {
  background: #e9ecef;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
  font-size: 0.9em;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-success {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-success:hover {
  background: #1e7e34;
}

.btn-danger {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-warning:hover {
  background: #e0a800;
}

.btn-info {
  background: #17a2b8;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-info:hover {
  background: #138496;
}

.output-container {
  margin-top: 15px;
}

.log-output {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.4;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  border: 1px solid #34495e;
}

.performance-results {
  margin: 20px 0;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.performance-table th,
.performance-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.performance-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.performance-table .improvement {
  color: #28a745;
  font-weight: 600;
}

.comparison-table-container {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.comparison-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.vue2-col {
  background-color: #fff5f5;
}

.vue3-col {
  background-color: #f0fff4;
}

.code-tabs {
  display: flex;
  border-bottom: 2px solid #e1e5e9;
  margin-bottom: 20px;
}

.tab-button {
  background: none;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14px;
  color: #6c757d;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.tab-button:hover {
  color: #495057;
  background: #f8f9fa;
}

.tab-button.active {
  color: #007bff;
  border-bottom-color: #007bff;
  background: #f8f9fa;
}

.code-content {
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 5px;
  overflow: hidden;
}

.code-content pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.code-content code {
  color: #2c3e50;
}

@media (max-width: 768px) {
  .interactive-demo {
    grid-template-columns: 1fr;
  }
  
  .controls {
    justify-content: center;
  }
  
  .vue3-proxy-principle {
    padding: 10px;
  }
  
  .demo-section {
    padding: 15px;
  }
}
</style>