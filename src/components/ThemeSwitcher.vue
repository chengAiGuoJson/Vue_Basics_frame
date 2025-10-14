<template>
  <div class="theme-switcher" :class="[`size-${size}`, `position-${position}`]">
    <div class="theme-switcher-container">
      <div class="theme-switcher-trigger" v-if="!isHomePage">
        <div class="trigger-content theme-label" @click="goBack">
          返回
          <!-- 装饰性光效 -->
          <div class="glow-effect"></div>
        </div>
      </div>
     
      <!-- 主题切换按钮 -->
      <div class="theme-switcher-trigger" @click="toggleDropdown" :class="{ 'active': isDropdownOpen }">
        <div class="trigger-content">
          <!-- 主题图标 -->
          <div class="theme-icon">
            <svg viewBox="0 0 24 24" class="icon">
              <path d="M12 18.5C15.59 18.5 18.5 15.59 18.5 12C18.5 8.41 15.59 5.5 12 5.5C8.41 5.5 5.5 8.41 5.5 12C5.5 15.59 8.41 18.5 12 18.5ZM12 2L14.39 5.42C13.65 5.15 12.84 5 12 5C11.16 5 10.35 5.15 9.61 5.42L12 2ZM3.34 7L6.76 4.61C6.05 5.8 5.5 7.15 5.24 8.58L3.34 7ZM3.34 17L5.24 15.42C5.5 16.85 6.05 18.2 6.76 19.39L3.34 17ZM12 22L9.61 18.58C10.35 18.85 11.16 19 12 19C12.84 19 13.65 18.85 14.39 18.58L12 22ZM20.66 17L17.24 19.39C17.95 18.2 18.5 16.85 18.76 15.42L20.66 17ZM20.66 7L18.76 8.58C18.5 7.15 17.95 5.8 17.24 4.61L20.66 7Z"/>
            </svg>
          </div>
          
          <!-- 当前主题预览 -->
          <div class="current-theme-preview" :style="getThemePreviewStyle(currentTheme)"></div>
          
          <!-- 主题名称 -->
          <span v-if="showLabel" class="theme-label">{{ currentThemeConfig.displayName }}</span>
          
          <!-- 下拉箭头 -->
          <svg class="dropdown-arrow" :class="{ 'rotated': isDropdownOpen }" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      
      <!-- 装饰性光效 -->
      <div class="glow-effect"></div>
    </div>
    </div>
    
    <!-- 下拉菜单 -->
    <transition name="dropdown">
      <div v-if="isDropdownOpen" class="theme-dropdown">
        <div class="dropdown-header">
          <h4>选择主题</h4>
          <p>个性化你的界面体验</p>
        </div>
        
        <div class="theme-options">
          <div 
            v-for="theme in availableThemes" 
            :key="theme.name"
            class="theme-option"
            :class="{ 'active': theme.name === currentTheme }"
            @click="selectTheme(theme.name as ThemeType)"
          >
            <div class="theme-preview-container">
              <div class="theme-preview" :style="getThemePreviewStyle(theme.name as ThemeType)"></div>
              <div class="theme-preview-overlay"></div>
            </div>
            
            <div class="theme-info">
              <span class="theme-name">{{ theme.displayName }}</span>
              <span class="theme-description">{{ getThemeDescription(theme.name as ThemeType) }}</span>
            </div>
            
            <div class="theme-status">
              <svg v-if="theme.name === currentTheme" class="check-icon" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed,onUnmounted} from 'vue'
import {  useRoute, useRouter  } from 'vue-router'
import { useTheme, type ThemeType, type ThemeSwitcherProps } from '@/composables/useTheme'

const route = useRoute();
const router = useRouter();

// 判断当前是否在首页
const isHomePage = computed(() => {
  return route.path === '/' || route.name === 'home';
});

// 返回上一页
const goBack = () => {
  router.back();
};

// Props
const props = withDefaults(defineProps<ThemeSwitcherProps>(), {
  showLabel: true,
  size: 'medium',
  position: 'top-right'
})

// 使用主题管理器
const { 
  currentTheme, 
  currentThemeConfig, 
  availableThemes, 
  setTheme, 
  getThemePreviewStyle,
  initTheme 
} = useTheme()

// 下拉菜单状态
const isDropdownOpen = ref(false)

// 切换下拉菜单
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// 选择主题
const selectTheme = (theme: ThemeType) => {
  setTheme(theme)
  isDropdownOpen.value = false
}

// 获取主题描述
const getThemeDescription = (theme: ThemeType) => {
  const descriptions = {
    default: '经典渐变，优雅美观',
    dark: '深色护眼，专注工作',
    light: '清新明亮，舒适阅读'
  }
  return descriptions[theme]
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.theme-switcher')) {
    isDropdownOpen.value = false
  }
}

// 生命周期
onMounted(() => {
  initTheme()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.theme-switcher {
  position: relative;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 位置定位 */
.theme-switcher.position-top-right {
  position: fixed;
  top: 24px;
  right: 24px;
}

.theme-switcher.position-top-left {
  position: fixed;
  top: 24px;
  left: 24px;
}

.theme-switcher.position-bottom-right {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

.theme-switcher.position-bottom-left {
  position: fixed;
  bottom: 24px;
  left: 24px;
}

/* 主题切换容器 */
.theme-switcher-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 主题切换按钮 */
.theme-switcher-trigger {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08);
}

.theme-switcher-trigger:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.16),
    0 4px 12px rgba(0, 0, 0, 0.12);
}

.theme-switcher-trigger.active {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.trigger-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  position: relative;
  z-index: 2;
}

/* 主题图标 */
.theme-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--highlight-gradient-start), var(--highlight-gradient-end));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.theme-icon .icon {
  width: 14px;
  height: 14px;
  fill: white;
}

/* 当前主题预览 */
.current-theme-preview {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.theme-switcher-trigger:hover .current-theme-preview {
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.6);
}

/* 主题标签 */
.theme-label {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 下拉箭头 */
.dropdown-arrow {
  width: 16px;
  height: 16px;
  fill: var(--text-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* 光效装饰 */
.glow-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.theme-switcher-trigger:hover .glow-effect {
  left: 100%;
}

/* 下拉菜单 */
.theme-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 280px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(32px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.15);
}

/* 下拉菜单头部 */
.dropdown-header {
  padding: 20px 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
}

.dropdown-header h4 {
  margin: 0 0 4px 0;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.dropdown-header p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 12px;
  opacity: 0.8;
}

/* 主题选项容器 */
.theme-options {
  padding: 12px;
}

/* 主题选项 */
.theme-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  margin-bottom: 8px;
  border: 1px solid transparent;
}

.theme-option:last-child {
  margin-bottom: 0;
}

.theme-option:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateX(4px);
}

.theme-option.active {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 主题预览容器 */
.theme-preview-container {
  position: relative;
  flex-shrink: 0;
}

.theme-preview {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.theme-preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.theme-option:hover .theme-preview-overlay {
  opacity: 1;
}

.theme-option.active .theme-preview {
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.2),
    0 0 0 3px rgba(255, 255, 255, 0.1);
}

/* 主题信息 */
.theme-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.theme-name {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.theme-description {
  color: var(--text-secondary);
  font-size: 12px;
  opacity: 0.8;
  line-height: 1.4;
}

/* 主题状态 */
.theme-status {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  width: 18px;
  height: 18px;
  fill: var(--highlight-gradient-start);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  animation: checkIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes checkIn {
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* 下拉动画 */
.dropdown-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-16px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-switcher.position-top-right,
  .theme-switcher.position-top-left {
    top: 16px;
  }
  
  .theme-switcher.position-top-right,
  .theme-switcher.position-bottom-right {
    right: 16px;
  }
  
  .theme-switcher.position-top-left,
  .theme-switcher.position-bottom-left {
    left: 16px;
  }
  
  .theme-dropdown {
    min-width: 260px;
  }
  
  .trigger-content {
    padding: 10px 14px;
  }
  
  .theme-label {
    font-size: 13px;
  }
}

/* 尺寸变体 */
.size-small .trigger-content {
  padding: 8px 12px;
  gap: 8px;
}

.size-small .theme-icon {
  width: 20px;
  height: 20px;
}

.size-small .theme-icon .icon {
  width: 12px;
  height: 12px;
}

.size-small .current-theme-preview {
  width: 16px;
  height: 16px;
}

.size-small .theme-label {
  font-size: 12px;
}

.size-large .trigger-content {
  padding: 16px 20px;
  gap: 12px;
}

.size-large .theme-icon {
  width: 28px;
  height: 28px;
}

.size-large .theme-icon .icon {
  width: 16px;
  height: 16px;
}

.size-large .current-theme-preview {
  width: 24px;
  height: 24px;
}

.size-large .theme-label {
  font-size: 16px;
}


@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.back-icon {
  margin-right: 6px;
  font-size: 18px;
}

</style>