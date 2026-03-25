<template>
  <div class="three-container">
    <!-- 
      el-tabs 的 v-model 绑定到 activeTab (一个字符串)。
      el-tab-pane 的 'name' 属性与 tabList 中的 'name' 对应。
      当用户点击标签页时，Element Plus 会自动将 activeTab 的值更新为对应 pane 的 name。
    -->
    <el-tabs v-model="activeTab" type="border-card" class="three-tabs">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      />
    </el-tabs>

    <!-- 
      使用 <main> 标签包裹动态组件，语义更清晰。
      :is 绑定到计算属性 activeComponent。
      Vue 的 <KeepAlive> 组件可以缓存失活的组件实例，
      当用户在标签页之间来回切换时，可以保持组件的状态（如3D场景中的相机位置、模型状态等），
      避免了组件的重复销毁和创建，提升了性能和用户体验。
    -->
    <main class="component-host">
      <KeepAlive>
        <component :is="activeComponent" />
      </KeepAlive>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue";

// 1. 使用 defineAsyncComponent 实现组件的异步（懒）加载
// 这样做的好处是，只有当用户切换到对应的标签页时，才会去加载和解析组件代码，
// 从而加快了初始页面的加载速度。
const components = {
  launchGuidedMissile: defineAsyncComponent(
    () => import("@/views/Three/launchGuidedMissile.vue"),
  ),
  loadCarModel: defineAsyncComponent(
    () => import("@/views/Three/loadCarModel/index.vue"),
  ),
};

// 2. 将标签页的配置定义为常量，因为它们通常不会在运行时改变。
// 使用 'name' 属性来唯一标识每个标签页，这更符合 Element Plus 的设计规范。
const tabList = [
  {
    label: "发射导弹",
    name: "launchGuidedMissile",
  },
  {
    label: "小车模型加载",
    name: "loadCarModel",
  },
];

// 3. activeTab 现在存储的是当前激活标签页的 'name' (字符串)，而不是组件对象本身。
// 这使得状态管理更清晰、轻量。
const activeTab = ref("launchGuidedMissile");

// 4. 创建一个计算属性，根据 activeTab 的值动态地返回对应的组件。
// 当 activeTab 变化时，这个计算属性会自动更新，从而切换 <component> 标签渲染的组件。
const activeComponent = computed(() => components[activeTab.value]);
</script>

<style scoped>
.three-container {
  padding: 20px;
  /* background-color: #f4f7fa; */
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 优化 el-tabs 的样式，使其与容器更好地融合 */
.three-tabs {
  flex-shrink: 0; /* 防止 tabs 在 flex 布局中被压缩 */
  border-bottom: none; /* 移除 border-card 模式下的底部边框，与下面的 component-host 衔接 */
}

/* 动态组件的容器样式 */
.component-host {
  flex-grow: 1; /* 占据剩余的所有垂直空间 */
  /* background-color: #ffffff;
  border: 1px solid #dcdfe6; */
  border-top: none; /* 移除顶部边框，与 el-tabs 的底部无缝连接 */
  padding: 15px;
  overflow: auto; /* 如果内容溢出，则显示滚动条 */
  position: relative; /* 为内部绝对定位的元素提供参照 */
  min-height: 400px; /* 给3D场景一个最小高度 */
}

/* 确保 el-tabs 的内容区域与我们的 component-host 样式一致 */
:deep(.el-tabs__content) {
  padding: 0;
}
</style>
