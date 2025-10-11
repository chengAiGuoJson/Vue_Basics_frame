<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { performanceMonitor, type PerformanceMetrics } from '@/utils/performanceMonitor'
// 性能监控相关
const performanceMetrics = ref<Partial<PerformanceMetrics>>({})
const isLoading = ref(true)
const performanceReport = ref('')
const showReport = ref(false)

// 获取性能指标
const getPerformanceMetrics = async () => {
    try {
        isLoading.value = true
        
        // 等待性能指标计算完成
        const metrics = await performanceMonitor.waitForMetrics(5000)
        performanceMetrics.value = metrics
        
        // 获取格式化报告
        performanceReport.value = performanceMonitor.getFormattedReport()
        
        console.log('性能监控数据:', metrics)
        console.log('性能报告:', performanceReport.value)
        
    } catch (error) {
        console.error('获取性能指标失败:', error)
        // 即使失败也显示当前已有的指标
        performanceMetrics.value = performanceMonitor.getMetrics()
        performanceReport.value = performanceMonitor.getFormattedReport()
    } finally {
        isLoading.value = false
    }
}

// 手动重新计算首屏时间
const recalculateFirstScreen = async () => {
    try {
        const firstScreenTime = await performanceMonitor.calculateFirstScreenTimeByViewport()
        performanceMetrics.value = performanceMonitor.getMetrics()
        performanceReport.value = performanceMonitor.getFormattedReport()
        console.log('重新计算的首屏时间:', firstScreenTime)
    } catch (error) {
        console.error('重新计算首屏时间失败:', error)
    }
}

// 实时更新性能指标
const updateMetrics = () => {
    performanceMetrics.value = performanceMonitor.getMetrics()
    performanceReport.value = performanceMonitor.getFormattedReport()
}

// 性能评级函数
const getPerformanceRating = (time: number | undefined, type: 'whiteScreen' | 'firstScreen') => {
    if (!time) return { type: 'info', text: '未知' }
    
    const thresholds = {
        whiteScreen: { good: 1000, fair: 2000 }, // 白屏时间阈值
        firstScreen: { good: 2000, fair: 4000 }  // 首屏时间阈值
    }
    
    const threshold = thresholds[type]
    
    if (time <= threshold.good) {
        return { type: 'success', text: '优秀' }
    } else if (time <= threshold.fair) {
        return { type: 'warning', text: '良好' }
    } else {
        return { type: 'danger', text: '需要优化' }
    }
}

onMounted(() => {
    // 页面挂载后开始监控
    getPerformanceMetrics()
    
    // 定期更新指标（可选）
    const interval = setInterval(updateMetrics, 1000)
    
    // 5秒后停止定期更新
    setTimeout(() => {
        clearInterval(interval)
    }, 5000)
})

onUnmounted(() => {
    // 组件卸载时清理资源
    performanceMonitor.destroy()
})

</script>
<template>
    <div class="performance-demo">
        <!-- 性能监控展示 -->
        <div class="performance-section">
            <h2>页面性能监控</h2>
            
            <!-- 加载状态 -->
            <div v-if="isLoading" class="loading">
                <el-icon class="is-loading"><Loading /></el-icon>
                <span>正在计算性能指标...</span>
            </div>

            <!-- 性能指标卡片 -->
            <div v-else class="metrics-grid">
                <el-card class="metric-card white-screen" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <el-icon><Timer /></el-icon>
                            <span>白屏时间</span>
                        </div>
                    </template>
                    <div class="metric-value">
                        {{ performanceMetrics.whiteScreenTime || 'N/A' }}
                        <span v-if="performanceMetrics.whiteScreenTime" class="unit">ms</span>
                    </div>
                    <div class="metric-desc">从页面开始加载到首次内容绘制的时间</div>
                </el-card>

                <el-card class="metric-card first-screen" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <el-icon><Monitor /></el-icon>
                            <span>首屏时间</span>
                        </div>
                    </template>
                    <div class="metric-value">
                        {{ performanceMetrics.firstScreenTime || 'N/A' }}
                        <span v-if="performanceMetrics.firstScreenTime" class="unit">ms</span>
                    </div>
                    <div class="metric-desc">首屏内容完全加载显示的时间</div>
                </el-card>

                <el-card class="metric-card dom-ready" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <el-icon><Document /></el-icon>
                            <span>DOM解析</span>
                        </div>
                    </template>
                    <div class="metric-value">
                        {{ performanceMetrics.domContentLoadedTime || 'N/A' }}
                        <span v-if="performanceMetrics.domContentLoadedTime" class="unit">ms</span>
                    </div>
                    <div class="metric-desc">DOM解析完成时间</div>
                </el-card>

                <el-card class="metric-card load-complete" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <el-icon><Check /></el-icon>
                            <span>完全加载</span>
                        </div>
                    </template>
                    <div class="metric-value">
                        {{ performanceMetrics.loadTime || 'N/A' }}
                        <span v-if="performanceMetrics.loadTime" class="unit">ms</span>
                    </div>
                    <div class="metric-desc">页面完全加载时间</div>
                </el-card>

                <el-card class="metric-card fcp" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <el-icon><Picture /></el-icon>
                            <span>FCP</span>
                        </div>
                    </template>
                    <div class="metric-value">
                        {{ performanceMetrics.firstContentfulPaint || 'N/A' }}
                        <span v-if="performanceMetrics.firstContentfulPaint" class="unit">ms</span>
                    </div>
                    <div class="metric-desc">首次内容绘制时间</div>
                </el-card>

                <el-card class="metric-card lcp" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <el-icon><PictureRounded /></el-icon>
                            <span>LCP</span>
                        </div>
                    </template>
                    <div class="metric-value">
                        {{ performanceMetrics.largestContentfulPaint || 'N/A' }}
                        <span v-if="performanceMetrics.largestContentfulPaint" class="unit">ms</span>
                    </div>
                    <div class="metric-desc">最大内容绘制时间</div>
                </el-card>
            </div>

            <!-- 操作按钮 -->
            <div class="actions">
                <el-button type="primary" @click="getPerformanceMetrics" :loading="isLoading">
                    刷新性能数据
                </el-button>
                <el-button type="success" @click="recalculateFirstScreen">
                    重新计算首屏时间
                </el-button>
                <el-button type="info" @click="showReport = !showReport">
                    {{ showReport ? '隐藏' : '显示' }}详细报告
                </el-button>
            </div>

            <!-- 详细报告 -->
            <el-collapse-transition>
                <el-card v-show="showReport" class="report-card" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <el-icon><DataAnalysis /></el-icon>
                            <span>详细性能报告</span>
                        </div>
                    </template>
                    <pre class="performance-report">{{ performanceReport }}</pre>
                </el-card>
            </el-collapse-transition>

            <!-- 性能评级 -->
            <div class="performance-rating">
                <h3>性能评级</h3>
                <div class="rating-item">
                    <span>白屏时间评级：</span>
                    <el-tag :type="getPerformanceRating(performanceMetrics.whiteScreenTime, 'whiteScreen').type">
                        {{ getPerformanceRating(performanceMetrics.whiteScreenTime, 'whiteScreen').text }}
                    </el-tag>
                </div>
                <div class="rating-item">
                    <span>首屏时间评级：</span>
                    <el-tag :type="getPerformanceRating(performanceMetrics.firstScreenTime, 'firstScreen').type">
                        {{ getPerformanceRating(performanceMetrics.firstScreenTime, 'firstScreen').text }}
                    </el-tag>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.performance-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  background: var(--el-bg-color-page);
  border-radius: 8px;
}

.performance-section {
  margin-top: 40px;
}

.performance-section h2 {
  margin-bottom: 20px;
  color: var(--el-text-color-primary);
  font-size: 24px;
  font-weight: 600;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px;
  color: var(--el-text-color-regular);
  font-size: 16px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.metric-card {
  transition: all 0.3s ease;
  border: 1px solid var(--el-border-color-light);
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  margin: 15px 0 10px 0;
  color: var(--el-color-primary);
}

.unit {
  font-size: 16px;
  color: var(--el-text-color-regular);
  margin-left: 4px;
}

.metric-desc {
  color: var(--el-text-color-regular);
  font-size: 14px;
  line-height: 1.4;
}

/* 不同指标的主题色 */
.white-screen .metric-value {
  color: #e74c3c;
}

.first-screen .metric-value {
  color: #3498db;
}

.dom-ready .metric-value {
  color: #f39c12;
}

.load-complete .metric-value {
  color: #27ae60;
}

.fcp .metric-value {
  color: #9b59b6;
}

.lcp .metric-value {
  color: #e67e22;
}

.actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.report-card {
  margin-bottom: 30px;
  border: 1px solid var(--el-border-color-light);
}

.performance-report {
  background: var(--el-fill-color-light);
  padding: 20px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--el-text-color-primary);
  white-space: pre-wrap;
  margin: 0;
  overflow-x: auto;
}

.performance-rating {
  background: var(--el-bg-color-page);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--el-border-color-light);
}

.performance-rating h3 {
  margin: 0 0 15px 0;
  color: var(--el-text-color-primary);
  font-size: 18px;
  font-weight: 600;
}

.rating-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 14px;
}

.rating-item:last-child {
  margin-bottom: 0;
}

.rating-item span {
  color: var(--el-text-color-regular);
  min-width: 120px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .performance-demo {
    padding: 15px;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .actions .el-button {
    width: 100%;
  }
  
  .rating-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .rating-item span {
    min-width: auto;
  }
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .performance-report {
    background: var(--el-fill-color-darker);
  }
}
</style>