<script lang="ts" setup>
import { ref, shallowRef } from "vue";
import { useSceneCaseDemo } from "./config";
const { sceneCasesList } = useSceneCaseDemo();
const currentCase = shallowRef(sceneCasesList.value[0]);
function switchCase(item: any) {
  currentCase.value = item;
}
</script>
<template>
  <div class="scene-case-demo">
    <div class="directory-wrapper">
      <h3>目录</h3>
      <ul>
        <li
          v-for="item in sceneCasesList"
          :key="item.title"
          @click="switchCase(item)"
          :class="{ active: currentCase && currentCase.title === item.title }"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="content-wrapper">
      <div va_if="currentCase">
        <h2>{{ currentCase.title }}</h2>
        <p>{{ currentCase.description }}</p>
        <component :is="currentCase.component" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene-case-demo {
  display: flex;
  height: calc(100vh - 0px); /* 减去头部导航等高度 */
  padding: 20px;
  gap: 20px;
}

.content-wrapper,
.directory-wrapper {
  background: rgba(255, 255, 255, var(--card-bg-opacity));
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, var(--card-border-opacity));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--shadow-medium);
  padding: 25px;
  transition: all 0.3s ease;
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
}

.content-wrapper h2 {
  color: var(--text-primary);
  margin-top: 0;
  font-size: 2em;
  background: linear-gradient(
    45deg,
    var(--highlight-gradient-start),
    var(--highlight-gradient-end)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content-wrapper p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.directory-wrapper {
  width: 250px;
  flex-shrink: 0;
}

.directory-wrapper h3 {
  margin-top: 0;
  color: var(--text-primary);
  font-size: 1.5em;
  border-bottom: 2px solid rgba(255, 255, 255, var(--card-border-opacity));
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.directory-wrapper ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.directory-wrapper li {
  cursor: pointer;
  padding: 12px 15px;
  border-radius: 8px;
  color: var(--text-tertiary);
  font-weight: 500;
  transition: all 0.25s ease;
  margin-bottom: 8px;
}

.directory-wrapper li:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.directory-wrapper li.active {
  background: linear-gradient(
    var(--primary-gradient-direction),
    var(--highlight-gradient-start),
    var(--highlight-gradient-end)
  );
  color: var(--text-primary);
  font-weight: 600;
  box-shadow: var(--shadow-light);
  transform: translateY(-2px);
}

/* 自定义滚动条样式 */
.content-wrapper::-webkit-scrollbar {
  width: var(--scrollbar-width);
}

.content-wrapper::-webkit-scrollbar-track {
  background: var(--scrollbar-track-bg);
  border-radius: var(--scrollbar-border-radius);
}

.content-wrapper::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb-bg);
  border-radius: var(--scrollbar-border-radius);
}

.content-wrapper::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover-bg);
}

.content-wrapper::-webkit-scrollbar-thumb:active {
  background: var(--scrollbar-thumb-active-bg);
}
</style>
