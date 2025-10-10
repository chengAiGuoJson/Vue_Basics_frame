import { ref, computed } from 'vue'

// 主题类型定义
export type ThemeType = 'default' | 'dark' | 'light'

// 主题配置接口
export interface ThemeConfig {
  name: string
  displayName: string
  primaryGradientStart: string
  primaryGradientEnd: string
  primaryGradientDirection: string
  bgDecorationOpacity: number
  cardBgOpacity: number
  cardBorderOpacity: number
  textPrimary: string
  textSecondary: string
  textTertiary: string
  highlightGradientStart: string
  highlightGradientEnd: string
}

// 预定义主题配置
const themeConfigs: Record<ThemeType, ThemeConfig> = {
  default: {
    name: 'default',
    displayName: '默认主题',
    primaryGradientStart: '#667eea',
    primaryGradientEnd: '#764ba2',
    primaryGradientDirection: '135deg',
    bgDecorationOpacity: 0.1,
    cardBgOpacity: 0.1,
    cardBorderOpacity: 0.2,
    textPrimary: 'white',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    textTertiary: 'rgba(255, 255, 255, 0.6)',
    highlightGradientStart: '#ff6b6b',
    highlightGradientEnd: '#feca57'
  },
  dark: {
    name: 'dark',
    displayName: '暗色主题',
    primaryGradientStart: '#2c3e50',
    primaryGradientEnd: '#34495e',
    primaryGradientDirection: '135deg',
    bgDecorationOpacity: 0.15,
    cardBgOpacity: 0.15,
    cardBorderOpacity: 0.25,
    textPrimary: 'white',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    textTertiary: 'rgba(255, 255, 255, 0.6)',
    highlightGradientStart: '#e74c3c',
    highlightGradientEnd: '#f39c12'
  },
  light: {
    name: 'light',
    displayName: '亮色主题',
    primaryGradientStart: '#74b9ff',
    primaryGradientEnd: '#0984e3',
    primaryGradientDirection: '135deg',
    bgDecorationOpacity: 0.08,
    cardBgOpacity: 0.08,
    cardBorderOpacity: 0.15,
    textPrimary: '#2d3436',
    textSecondary: 'rgba(45, 52, 54, 0.8)',
    textTertiary: 'rgba(45, 52, 54, 0.6)',
    highlightGradientStart: '#00b894',
    highlightGradientEnd: '#00cec9'
  }
}

// 当前主题状态
const currentTheme = ref<ThemeType>('default')

// 主题管理器 composable
export function useTheme() {
  // 获取当前主题配置
  const currentThemeConfig = computed(() => themeConfigs[currentTheme.value])
  
  // 获取所有可用主题
  const availableThemes = computed(() => Object.values(themeConfigs))
  
  // 切换主题
  const setTheme = (theme: ThemeType) => {
    currentTheme.value = theme
    applyTheme(themeConfigs[theme])
    
    // 保存到本地存储
    localStorage.setItem('vue-demo-theme', theme)
  }
  
  // 应用主题到CSS变量
  const applyTheme = (config: ThemeConfig) => {
    const root = document.documentElement
    
    // 设置CSS变量
    root.style.setProperty('--primary-gradient-start', config.primaryGradientStart)
    root.style.setProperty('--primary-gradient-end', config.primaryGradientEnd)
    root.style.setProperty('--primary-gradient-direction', config.primaryGradientDirection)
    root.style.setProperty('--bg-decoration-opacity', config.bgDecorationOpacity.toString())
    root.style.setProperty('--card-bg-opacity', config.cardBgOpacity.toString())
    root.style.setProperty('--card-border-opacity', config.cardBorderOpacity.toString())
    root.style.setProperty('--text-primary', config.textPrimary)
    root.style.setProperty('--text-secondary', config.textSecondary)
    root.style.setProperty('--text-tertiary', config.textTertiary)
    root.style.setProperty('--highlight-gradient-start', config.highlightGradientStart)
    root.style.setProperty('--highlight-gradient-end', config.highlightGradientEnd)
    
    // 设置data-theme属性
    root.setAttribute('data-theme', config.name)
  }
  
  // 从本地存储恢复主题
  const restoreTheme = () => {
    const savedTheme = localStorage.getItem('vue-demo-theme') as ThemeType
    if (savedTheme && themeConfigs[savedTheme]) {
      setTheme(savedTheme)
    } else {
      setTheme('default')
    }
  }
  
  // 获取主题预览样式
  const getThemePreviewStyle = (theme: ThemeType) => {
    const config = themeConfigs[theme]
    return {
      background: `linear-gradient(${config.primaryGradientDirection}, ${config.primaryGradientStart} 0%, ${config.primaryGradientEnd} 100%)`,
      color: config.textPrimary
    }
  }
  
  // 初始化主题
  const initTheme = () => {
    restoreTheme()
  }
  
  return {
    currentTheme: currentTheme.value,
    currentThemeConfig,
    availableThemes,
    setTheme,
    restoreTheme,
    initTheme,
    getThemePreviewStyle
  }
}

// 主题切换器组件的props类型
export interface ThemeSwitcherProps {
  showLabel?: boolean
  size?: 'small' | 'medium' | 'large'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}