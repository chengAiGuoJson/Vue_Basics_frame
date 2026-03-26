<template>
  <div class="home-container">
    <!-- 主要内容 -->
    <div class="main-content page-content">
      <!-- 头部标题区域 -->
      <header class="hero-section">
        <div class="hero-content">
          <h1 class="main-title">
            <span class="title-line highlight">技术演示平台</span>
          </h1>
          <p class="subtitle">
            探索现代前端技术的无限可能，体验
            <span class="highlight font-bold">前端</span> 生态系统的强大功能
          </p>
          <div class="tech-badges">
            <span
              v-for="item in keywords"
              :key="item.name"
              class="badge cursor-pointer"
              @click="navigateToKeyword(item.link)"
              ><span v-html="item.icon"></span> {{ item.name }}</span
            >
          </div>
        </div>
      </header>

      <!-- 功能模块展示 -->
      <section class="features-section">
        <h2 class="section-title">功能模块</h2>
        <div
          class="h-930px overflow-hidden overflow-y-auto hidden-scrollbar scroll-container"
        >
          <div class="features-grid">
            <div
              v-for="(feature, index) in features"
              :key="feature.name"
              class="feature-card"
              :style="{ animationDelay: `${index * 0.1}s` }"
              @click="navigateToFeature(feature.path)"
            >
              <div class="card-icon">
                {{ feature.icon }}
              </div>
              <h3 class="card-title">{{ feature.name }}</h3>
              <p class="card-description">{{ feature.description }}</p>
              <div class="card-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技术亮点 -->
      <section class="highlights-section">
        <h2 class="section-title">技术亮点</h2>
        <div class="highlights-container">
          <div
            class="highlight-item"
            v-for="(highlight, index) in highlights"
            :key="index"
          >
            <div class="highlight-number">
              {{ String(index + 1).padStart(2, "0") }}
            </div>
            <div class="highlight-content">
              <h3>{{ highlight.title }}</h3>
              <p>{{ highlight.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { routerList } from "@/router";

const router = useRouter();
// 关键字
const keywords = [
  {
    icon: '<i class="iconfont icon-vue text-[#42b983]"></i>',
    name: "Vue3",
    link: "https://cn.vuejs.org/",
  },
  {
    icon: '<i class="iconfont icon-React text-[#61dafb]"></i>',
    name: "React",
    link: "https://zh-hans.react.dev/",
  },
  {
    icon: '<i class="iconfont icon-vite text-[#ffc51d] "></i>',
    name: "vite",
    link: "https://cn.vite.dev/",
  },
  {
    icon: '<i class="iconfont icon-webpack text-[#84c7e8]"></i>',
    name: "webpack",
    link: "https://webpack.docschina.org/",
  },
  {
    icon: "🔍",
    name: "TypeScript",
    link: "https://www.typescriptlang.org/zh/docs/",
  },
  {
    icon: "🍃",
    name: "Windicss",
    link: "https://cn.windicss.org/",
  },
  {
    icon: "🧩",
    name: "Element Plus",
    link: "https://element-plus.org/zh-CN/",
  },
  {
    icon: '<i class="iconfont icon-antd-copy text-[#f74557]"></i>',
    name: "Ant Design of React",
    link: "https://ant.design/docs/react/introduce-cn",
  },
  {
    icon: '<i class="iconfont icon-echarts text-[#fb628b]"></i>',
    name: "ECHarts",
    link: "https://echarts.apache.org/zh/index.html",
  },
  {
    icon: "🌐",
    name: "web.de",
    link: "https://web.dev/?hl=zh-cn",
  },
  {
    icon: '<i class="iconfont icon-github"></i>',
    name: "github",
    link: "https://github.com/",
  },
];

// 功能模块数据
const features = ref([
  {
    name: "Cesium 3D 地图",
    description: "展示 3D 地图和空间数据可视化",
    path: "/cesium-demo",
    icon: "🌐",
  },
  {
    name: "three.js 3D",
    description: "展示3D空间数据可视化",
    path: "/three-demo",
    icon: "3D",
  },
  {
    name: "图片瀑布流，触底懒加载，无限图片",
    description: "实现图片瀑布流布局，支持无限滚动加载，优化用户体验和页面性能",
    path: "/layz-loading",
    icon: "🖼️",
  },
  {
    name: "场景案例demo",
    description: "展示实际项目中的场景案例和解决方案",
    path: "/scene-case-demo",
    icon: "📝",
  },
  {
    name: "Vue3 Proxy响应式",
    description: "深入理解 Vue 3 响应式原理，对比 Vue 2 的 defineProperty 实现",
    path: "/vue3-proxy",
    icon: "🔄",
  },
  {
    name: "Element Plus 组件",
    description: "展示 Element Plus 组件库的使用和自定义主题配置",
    path: "/element-test",
    icon: "🧩",
  },
  {
    name: "动画与过渡",
    description: "探索 Vue 3 的动画系统和 CSS 过渡效果的最佳实践",
    path: "/animation-demo",
    icon: "✨",
  },
  {
    name: "Watch 与 WatchEffect",
    description: "对比 watch 和 watchEffect 的使用场景和性能差异",
    path: "/watch-demo",
    icon: "👁️",
  },
  {
    name: "V-model 自定义",
    description: "学习如何创建自定义 v-model 指令和双向数据绑定",
    path: "/v-model-demo",
    icon: "🔗",
  },
  {
    name: "Svelte 框架对比",
    description: "对比 Svelte 和 Vue 的设计理念与性能表现",
    path: "/svelte-demo",
    icon: "⚡",
  },
  {
    name: "JavaScript/TypeScript",
    description: "现代 JavaScript 特性和 TypeScript 类型系统演示",
    path: "/js-ts",
    icon: "💻",
  },
  {
    name: "表单组件测试",
    description: "测试和演示 Element Plus 表单组件的使用",
    path: "/form-component-test",
    icon: "📝",
  },
  {
    name: "性能测试",
    description:
      "测试和演示 白屏时间、首屏时间、DOM解析、完全加载、FCP、LCP等 性能指标",
    path: "/performance-test",
    icon: "⚙️",
  },
  {
    name: "滚动条样式",
    description: "自定义滚动条样式，提升用户体验",
    path: "/scrollbar-demo",
    icon: "🔧",
  },
  {
    name: "购物车",
    description:
      "面向对象开发实现购物车功能，包括添加、删除、数量调整和总价计算",
    path: "/shopping-cart",
    icon: "🛒",
  },
  {
    name: "项目介绍",
    description: "展示项目的背景、目标和实现方案",
    path: "/self-project-introduction",
    icon: "📝",
  },
  {
    name: "DataV组件",
    description: "展示 DataV 组件库的使用和自定义主题配置",
    path: "/datav-demo",
    icon: "📊",
  },
]);

// 技术亮点数据
const highlights = ref([
  {
    title: "现代化架构",
    description:
      "基于 Vue 3 Composition API 构建，充分利用 TypeScript 类型安全特性",
  },
  {
    title: "响应式设计",
    description: "采用 WindiCSS 实现原子化 CSS，支持多设备适配和暗色模式",
  },
  {
    title: "性能优化",
    description: "利用 Vite 构建工具实现快速热重载和按需加载优化",
  },
  {
    title: "组件化开发",
    description: "模块化组件设计，可复用性强，易于维护和扩展",
  },
]);

// 导航到关键字页面
const navigateToKeyword = (link: string) => {
  //新窗口打开网页
  window.open(link, "_blank");
};

// 导航到功能页面
const navigateToFeature = (path: string) => {
  router.push(path);
};

// 页面加载动画
onMounted(() => {
  // 触发入场动画
  document.querySelector(".home-container")?.classList.add("loaded");
});
</script>

<style scoped>
/* Home页面特有样式 */
.home-container.loaded {
  opacity: 1;
  transform: translateY(0);
}

/* 主要内容样式已移至全局主题 */

/* 头部区域 */
.hero-section {
  text-align: center;
  padding: 4rem 0 6rem;
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.title-line {
  display: block;
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.8s ease-out forwards;
}

.title-line:nth-child(2) {
  animation-delay: 0.2s;
}

.highlight {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.4s forwards;
}

.tech-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.6s forwards;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.badge:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* 功能模块区域 */
.features-section {
  margin-bottom: 6rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.8s forwards;
}

/* 滚动吸附容器 */
.scroll-container {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.scroll-container:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.6s ease-out forwards;
  scroll-snap-align: start;
  scroll-margin-top: 1rem;
}

.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.6s ease;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: white;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.card-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-arrow {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.feature-card:hover .card-arrow {
  color: white;
  transform: translate(5px, -5px);
}

/* 技术亮点区域 */
.highlights-section {
  margin-bottom: 4rem;
}

.highlights-container {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0;
  transform: translateX(-30px);
  animation: slideInLeft 0.6s ease-out forwards;
}

.highlight-item:nth-child(even) {
  transform: translateX(30px);
  animation-name: slideInRight;
}

.highlight-item:nth-child(1) {
  animation-delay: 1s;
}
.highlight-item:nth-child(2) {
  animation-delay: 1.2s;
}
.highlight-item:nth-child(3) {
  animation-delay: 1.4s;
}
.highlight-item:nth-child(4) {
  animation-delay: 1.6s;
}

.highlight-number {
  font-size: 2rem;
  font-weight: 700;
  color: #feca57;
  min-width: 60px;
}

.highlight-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.highlight-content p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

/* 动画定义 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .highlight-item {
    flex-direction: column;
    gap: 1rem;
  }

  .tech-badges {
    gap: 0.5rem;
  }

  .badge {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 0 4rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
