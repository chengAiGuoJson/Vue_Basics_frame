<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref(true)
const animationKey = ref(0)

const move = () => {
    // 如果动画正在显示，先重置状态
    if (isShow.value) {
        isShow.value = false
        // 使用nextTick确保DOM更新后再显示
        setTimeout(() => {
            animationKey.value++ // 更改key值强制重新渲染
            isShow.value = true
        }, 10)
    } else {
        animationKey.value++ // 更改key值强制重新渲染
        isShow.value = true
    }
}

const onAnimationEnd = () => {
    // 动画结束后不隐藏元素，这样可以保持元素在最终位置
    // 下次点击时会重置状态
}
</script>
<template>
  <div class="animation-demo">
    <div class="page-content">
      <h1 class="theme-title large">动画演示</h1>
      
      <div class="demo-section theme-card">
        <h3 class="theme-title medium">Transform 动画</h3>
        <p class="theme-text">点击下方按钮查看动画效果</p>
        
        <div class="animation-controls">
          <button @click="move" class="demo-button">点击移动动画</button>
        </div>
        
        <div class="animation-container">
          <div 
              class="animation-transfrom" 
              v-if="isShow" 
              :key="animationKey"
              @animationend="onAnimationEnd">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 动画演示页面特有样式 */
.demo-section {
  margin-bottom: 2rem;
}

.animation-controls {
  margin: 2rem 0;
  text-align: center;
}

.demo-button {
  background: linear-gradient(45deg, var(--highlight-gradient-start), var(--highlight-gradient-end));
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.demo-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.animation-container {
  position: relative;
  height: 300px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

.animation-transfrom {
    width: 80px;
    height: 80px;
    position: absolute;
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    border-radius: 10px;
    animation: move 2s ease-in-out;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
/* @keyframes move {
    0% {
        left: 0;
    }
    50% {
        left: 500px;
    }
    100% {
        left: 0;
    }
} */
@keyframes move {
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(500px);
    }
    100% {
        transform: translateX(0);
    }
}

</style>

