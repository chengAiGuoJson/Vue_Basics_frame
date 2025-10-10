<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, watch, watchEffect } from 'vue'
const count = ref(0)
watch(count, (newVal, oldVal) => {
    console.log('watch-count变化了', newVal, oldVal)
})
const stop = watchEffect(() => {
    console.log('watchEffect-count变化了', count.value)
    if(count.value > 5) {
        stop()
        console.log('watchEffect-count大于5了，停止监听')
    }
}, {
    onTrack: (e) => {
        console.log('watchEffect-onTrack', e)
    },
    onTrigger: (e) => {
        console.log('watchEffect-onTrigger', e)
    }
})
</script>
<template>
  <div class="watch-demo-container">
    <div class="page-content">
    <h1 class="theme-title large">Watch 与 WatchEffect 对比演示</h1>
    
    <!-- 计数器演示区域 -->
    <div class="counter-section theme-card">
      <h2 class="theme-title medium">计数器演示</h2>
      <div class="counter-display">
        <span class="count-value">{{ count }}</span>
      </div>
      <div class="button-group">
        <el-button type="primary" @click="count++">count++</el-button>
        <el-button type="success" @click="count--">count--</el-button>
      </div>
    </div>

    <!-- 知识点对比区域 -->
    <div class="knowledge-section theme-card">
      <div class="comparison-grid">
        <!-- watch 特性 -->
        <div class="feature-card theme-card">
          <h3 class="theme-title small">watch</h3>
          <ul class="feature-list theme-text">
            <li>懒执行：默认不会立即执行</li>
            <li>只有在监听的数据发生变化时才执行</li>
            <li>可以通过 immediate: true 选项立即执行</li>
          </ul>
        </div>

        <!-- watchEffect 特性 -->
        <div class="feature-card theme-card">
          <h3 class="theme-title small">watchEffect</h3>
          <ul class="feature-list theme-text">
            <li>立即执行：默认会立即执行</li>
            <li>会监听所有响应式数据的变化</li>
            <li>可以通过 stop 方法停止监听</li>
            <li>可以通过 onTrack 和 onTrigger 选项调试监听</li>
          </ul>
        </div>
      </div>

      <!-- 性能考虑 -->
      <div class="performance-section">
        <h3 class="theme-title medium">性能考虑</h3>
        <div class="performance-grid">
          <div class="performance-item theme-text">
            <strong class="theme-highlight">watch：</strong>只在指定数据变化时执行，性能更可控
          </div>
          <div class="performance-item theme-text">
            <strong class="theme-highlight">watchEffect：</strong>会追踪函数内所有响应式数据，可能产生不必要的执行
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
/* Watch演示页面特有样式 */
.counter-section {
  text-align: center;
  margin-bottom: 2rem;
}

.knowledge-section {
  margin-bottom: 2rem;
}

.counter-display {
  margin: 32px 0;
}

.count-value {
  font-size: 48px;
  font-weight: bold;
  color: #409eff;
  background: linear-gradient(135deg, #409eff, #67c23a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.knowledge-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.feature-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
  border-left: 4px solid #409eff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feature-card:nth-child(2) {
  border-left-color: #67c23a;
}

.feature-title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.feature-title::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #409eff;
  margin-right: 8px;
}

.feature-card:nth-child(2) .feature-title::before {
  background: #67c23a;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 8px 0;
  color: #5a6c7d;
  line-height: 1.6;
  position: relative;
  padding-left: 20px;
}

.feature-list li::before {
  content: '•';
  color: #409eff;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.feature-card:nth-child(2) .feature-list li::before {
  color: #67c23a;
}

.performance-section {
  border-top: 1px solid #e9ecef;
  padding-top: 24px;
}

.performance-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

.performance-item {
  background: #f1f3f4;
  padding: 16px;
  border-radius: 6px;
  color: #5a6c7d;
  line-height: 1.6;
  border-left: 3px solid #ffc107;
}

.performance-item:nth-child(2) {
  border-left-color: #e74c3c;
}

.performance-item strong {
  color: #2c3e50;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .watch-demo-container {
    padding: 16px;
  }
  
  .comparison-grid,
  .performance-grid {
    grid-template-columns: 1fr;
  }
  
  .counter-section,
  .knowledge-section {
    padding: 20px;
  }
  
  .count-value {
    font-size: 36px;
  }
  
  .button-group {
    flex-direction: column;
    align-items: center;
  }
}
</style>