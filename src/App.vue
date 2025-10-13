<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import layout from '@/layout/index.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
</script>

<template>
    <div class="page-background">
      <!-- 背景装饰 -->
      <div class="bg-decoration">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
          <div class="shape shape-6"></div>
        </div>
      </div>
       <ThemeSwitcher :show-label="true" size="medium" position="top-right" />
       <RouterView />
    </div>
  
  <!-- <layout>
    <RouterView />
  </layout> -->
</template>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

.page-background {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(
    var(--primary-gradient-direction, 135deg),
    var(--primary-gradient-start, #667eea) 0%,
    var(--primary-gradient-end, #764ba2) 100%
  );
}

.bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-shapes {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  width: var(--size, 140px);
  height: var(--size, 140px);
  border-radius: 50%;
  /* 使用主题的高亮渐变作为球体主色，自动随主题切换 */
  --sphere-color-1: var(--highlight-gradient-start);
  --sphere-color-2: var(--highlight-gradient-end);
  /* 玻璃质感：半透明色 + 背景模糊 + 轻微高光 */
  background:
    radial-gradient(circle at 35% 30%,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.45) 12%,
      rgba(255, 255, 255, 0.16) 26%,
      rgba(255, 255, 255, 0.05) 40%,
      rgba(0, 0, 0, 0.0) 54%
    ),
    radial-gradient(circle at 55% 60%,
      color-mix(in srgb, var(--sphere-color-1) 62%, transparent) 0%,
      color-mix(in srgb, var(--sphere-color-2) 62%, transparent) 100%
    );
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.18),
    inset 0 -12px 20px rgba(0, 0, 0, 0.15),
    inset 0 12px 20px rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(4px) saturate(1.15);
  opacity: 0.55;
  mix-blend-mode: screen;
  filter: saturate(1.02);
  will-change: transform, filter;
  animation: float 7s ease-in-out infinite;
}

.shape::before {
  /* 高光反射斑点 */
  content: '';
  position: absolute;
  top: 10%;
  left: 12%;
  width: 38%;
  height: 38%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.55) 35%,
    rgba(255, 255, 255, 0.0) 70%
  );
  opacity: 0.7;
  filter: blur(1px);
  mix-blend-mode: screen;
  pointer-events: none;
}

.shape::after {
  /* 边缘泛光与环境遮蔽（更柔和） */
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.25);
  background: conic-gradient(from 180deg at 50% 50%, rgba(255, 255, 255, 0.06), transparent 25%, transparent 75%, rgba(255, 255, 255, 0.05));
  opacity: 0.5;
  pointer-events: none;
}

@keyframes float {
  0% { transform: translateY(0) translateX(0) scale(1) rotate(0deg); filter: brightness(1); }
  25% { transform: translateY(-15px) translateX(10px) scale(1.02) rotate(2deg); filter: brightness(1.03); }
  50% { transform: translateY(-25px) translateX(5px) scale(1.01) rotate(5deg); filter: brightness(1.05); }
  75% { transform: translateY(-15px) translateX(-8px) scale(1.03) rotate(3deg); filter: brightness(1.02); }
  100% { transform: translateY(0) translateX(0) scale(1) rotate(0deg); filter: brightness(1); }
}

/* 泡泡上升动画 */
@keyframes rise {
  0% { transform: translateY(10px) translateX(0) scale(1); opacity: 0.4; }
  50% { transform: translateY(-30vh) translateX(calc(var(--drift) * 30px)) scale(1.1); opacity: 0.7; }
  100% { transform: translateY(-60vh) translateX(calc(var(--drift) * 50px)) scale(0.9); opacity: 0.3; }
}

/* 不同球体的尺寸、颜色与位置 */
.shape-1 {
  --size: 120px;
  --drift: -1;
  top: 70%;
  left: 10%;
  filter: hue-rotate(-10deg) saturate(1.05);
  animation: rise 15s ease-in-out infinite alternate, float 7s ease-in-out infinite;
  animation-delay: 0s, 0.5s;
}

.shape-2 {
  --size: 170px;
  --drift: 1.2;
  top: 60%;
  right: 12%;
  filter: hue-rotate(0deg) saturate(1.08);
  animation: rise 18s ease-in-out infinite alternate, float 8s ease-in-out infinite;
  animation-delay: 2s, 0s;
}

.shape-3 {
  --size: 100px;
  --drift: 0.8;
  bottom: 30%;
  left: 22%;
  filter: hue-rotate(15deg) saturate(1.07);
  animation: rise 12s ease-in-out infinite alternate, float 6s ease-in-out infinite;
  animation-delay: 1s, 1.5s;
}

.shape-4 {
  --size: 150px;
  --drift: -0.5;
  bottom: 40%;
  right: 18%;
  filter: hue-rotate(-20deg) saturate(1.06);
  animation: rise 20s ease-in-out infinite alternate, float 9s ease-in-out infinite;
  animation-delay: 0.5s, 2s;
}

.shape-5 {
  --size: 130px;
  --drift: 1.5;
  top: 10%;
  left: 10%;
  filter: hue-rotate(30deg) saturate(1.05);
  animation: rise 16s ease-in-out infinite alternate, float 7s ease-in-out infinite;
  animation-delay: 3s, 0.5s;
}

.shape-6 {
  --size: 160px;
  --drift: -1.2;
  top: 20%;
  left: 15%;
  filter: hue-rotate(-30deg) saturate(1.08);
  animation: rise 14s ease-in-out infinite alternate, float 8s ease-in-out infinite;
  animation-delay: 4s, 1s;
}



/* 按主题微调球体配色以更融洽（使用全局选择器覆盖） */
:global([data-theme="dark"] .shape) {
  /* 深色主题：贴近页面主背景渐变，降低突兀 */
  --sphere-color-1: var(--primary-gradient-start);
  --sphere-color-2: var(--primary-gradient-end);
  mix-blend-mode: lighten;
  opacity: 0.48;
}

:global([data-theme="light"] .shape) {
  /* 亮色主题：使用主色的半透明混合，保持通透感 */
  --sphere-color-1: color-mix(in srgb, var(--primary-gradient-start) 62%, transparent);
  --sphere-color-2: color-mix(in srgb, var(--primary-gradient-end) 62%, transparent);
  mix-blend-mode: screen;
  opacity: 0.5;
}

:global([data-theme="default"] .shape) {
  /* 默认主题：沿用高亮色，但进一步降低饱和与透明度 */
  --sphere-color-1: color-mix(in srgb, var(--highlight-gradient-start) 58%, transparent);
  --sphere-color-2: color-mix(in srgb, var(--highlight-gradient-end) 58%, transparent);
}
</style>
