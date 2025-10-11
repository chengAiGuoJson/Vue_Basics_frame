/**
 * 性能监控工具类
 * 用于监控页面的白屏时间和首屏时间
 */

export interface PerformanceMetrics {
  /** 白屏时间 (ms) */
  whiteScreenTime: number
  /** 首屏时间 (ms) */
  firstScreenTime: number
  /** DOM 解析完成时间 (ms) */
  domContentLoadedTime: number
  /** 页面完全加载时间 (ms) */
  loadTime: number
  /** 首次内容绘制时间 (ms) */
  firstContentfulPaint: number
  /** 最大内容绘制时间 (ms) */
  largestContentfulPaint: number
}

export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private observers: PerformanceObserver[] = []
  private startTime: number
  private isFirstScreenCalculated = false

  constructor() {
    this.startTime = performance.now()
    this.initPerformanceObserver()
    this.calculateBasicMetrics()
  }

  /**
   * 初始化性能观察器
   */
  private initPerformanceObserver() {
    // 观察绘制相关指标
    if ('PerformanceObserver' in window) {
      try {
        // 观察 FCP 和 LCP
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.firstContentfulPaint = Math.round(entry.startTime)
              // 白屏时间通常等于 FCP 时间
              this.metrics.whiteScreenTime = Math.round(entry.startTime)
            }
          }
        })
        paintObserver.observe({ entryTypes: ['paint'] })
        this.observers.push(paintObserver)

        // 观察 LCP
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          this.metrics.largestContentfulPaint = Math.round(lastEntry.startTime)
          
          // 首屏时间通常等于 LCP 时间
          if (!this.isFirstScreenCalculated) {
            this.metrics.firstScreenTime = Math.round(lastEntry.startTime)
            this.isFirstScreenCalculated = true
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)

      } catch (error) {
        console.warn('PerformanceObserver not supported:', error)
        this.fallbackCalculation()
      }
    } else {
      this.fallbackCalculation()
    }
  }

  /**
   * 计算基础性能指标
   */
  private calculateBasicMetrics() {
    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.metrics.domContentLoadedTime = Math.round(performance.now())
      })
    } else {
      this.metrics.domContentLoadedTime = Math.round(performance.now())
    }

    // 等待页面完全加载
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => {
        this.metrics.loadTime = Math.round(performance.now())
        
        // 如果没有通过 PerformanceObserver 获取到首屏时间，使用 load 事件时间
        if (!this.isFirstScreenCalculated) {
          this.metrics.firstScreenTime = this.metrics.loadTime
          this.isFirstScreenCalculated = true
        }
      })
    } else {
      this.metrics.loadTime = Math.round(performance.now())
      if (!this.isFirstScreenCalculated) {
        this.metrics.firstScreenTime = this.metrics.loadTime
        this.isFirstScreenCalculated = true
      }
    }
  }

  /**
   * 降级计算方案（当 PerformanceObserver 不支持时）
   */
  private fallbackCalculation() {
    // 使用 Navigation Timing API 作为降级方案
    setTimeout(() => {
      const timing = performance.timing
      const navigationStart = timing.navigationStart

      // 白屏时间 = 首次渲染时间 - 导航开始时间
      // 如果没有 firstPaint，使用 domLoading 作为近似值
      const firstPaint = timing.responseEnd - navigationStart
      this.metrics.whiteScreenTime = firstPaint

      // 首屏时间 = DOM 解析完成时间 - 导航开始时间
      const firstScreen = timing.domContentLoadedEventEnd - navigationStart
      this.metrics.firstScreenTime = firstScreen

      this.isFirstScreenCalculated = true
    }, 0)
  }

  /**
   * 手动计算首屏时间（基于可视区域内容）
   */
  public calculateFirstScreenTimeByViewport(): Promise<number> {
    return new Promise((resolve) => {
      const calculateTime = () => {
        const viewportHeight = window.innerHeight
        const elements = document.querySelectorAll('*')
        let hasContent = false

        for (const element of elements) {
          const rect = element.getBoundingClientRect()
          
          // 检查元素是否在可视区域内且有内容
          if (
            rect.top < viewportHeight &&
            rect.bottom > 0 &&
            rect.width > 0 &&
            rect.height > 0
          ) {
            const computedStyle = window.getComputedStyle(element)
            const hasVisibleContent = 
              computedStyle.opacity !== '0' &&
              computedStyle.visibility !== 'hidden' &&
              computedStyle.display !== 'none' &&
              (element.textContent?.trim() || 
               computedStyle.backgroundImage !== 'none' ||
               element.tagName === 'IMG' ||
               element.tagName === 'VIDEO' ||
               element.tagName === 'CANVAS')

            if (hasVisibleContent) {
              hasContent = true
              break
            }
          }
        }

        if (hasContent) {
          const firstScreenTime = Math.round(performance.now())
          this.metrics.firstScreenTime = firstScreenTime
          this.isFirstScreenCalculated = true
          resolve(firstScreenTime)
        } else {
          // 如果还没有内容，继续检查
          requestAnimationFrame(calculateTime)
        }
      }

      // 开始检查
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', calculateTime)
      } else {
        calculateTime()
      }
    })
  }

  /**
   * 获取当前性能指标
   */
  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }

  /**
   * 获取格式化的性能报告
   */
  public getFormattedReport(): string {
    const metrics = this.getMetrics()
    return `
性能监控报告:
- 白屏时间: ${metrics.whiteScreenTime || 'N/A'}ms
- 首屏时间: ${metrics.firstScreenTime || 'N/A'}ms
- DOM解析完成: ${metrics.domContentLoadedTime || 'N/A'}ms
- 页面完全加载: ${metrics.loadTime || 'N/A'}ms
- 首次内容绘制(FCP): ${metrics.firstContentfulPaint || 'N/A'}ms
- 最大内容绘制(LCP): ${metrics.largestContentfulPaint || 'N/A'}ms
    `.trim()
  }

  /**
   * 销毁监控器，清理资源
   */
  public destroy() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }

  /**
   * 等待所有指标计算完成
   */
  public async waitForMetrics(timeout = 10000): Promise<PerformanceMetrics> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now()
      
      const checkMetrics = () => {
        const metrics = this.getMetrics()
        const hasBasicMetrics = 
          metrics.whiteScreenTime !== undefined && 
          metrics.firstScreenTime !== undefined

        if (hasBasicMetrics) {
          resolve(metrics as PerformanceMetrics)
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Performance metrics calculation timeout'))
        } else {
          setTimeout(checkMetrics, 100)
        }
      }

      checkMetrics()
    })
  }
}

// 创建全局实例
export const performanceMonitor = new PerformanceMonitor()

// 页面卸载时清理资源
window.addEventListener('beforeunload', () => {
  performanceMonitor.destroy()
})