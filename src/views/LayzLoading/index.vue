<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import {
  useIntersectionObserver,
  useWindowSize,
  useDebounceFn,
} from "@vueuse/core";

const images = ref<string[]>([]);
const infiniteSentinel = ref<HTMLElement | null>(null);
const loading = ref(false);
const PICTURE = 400;

const loadedMap = ref<Record<string, boolean>>({});
const errorMap = ref<Record<string, boolean>>({});
const onImgLoad = (src: string) => {
  loadedMap.value[src] = true;
  errorMap.value[src] = false;
};
const onImgError = (src: string) => {
  errorMap.value[src] = true;
  loadedMap.value[src] = false;
};

const createHash = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);
const createImageUrl = () =>
  `https://picsum.photos/400/400?hash=${createHash()}`;

const loadImages = (count: number) => {
  if (loading.value) return;
  loading.value = true;
  for (let i = 0; i < count; i++) {
    images.value.push(createImageUrl());
  }
  loading.value = false;
};

const calcInitialCount = () => {
  const col = Math.max(1, Math.floor(window.innerWidth / PICTURE));
  const row = Math.max(1, Math.ceil(window.innerHeight / PICTURE));
  return col * row;
};

let stopObserve: (() => void) | null = null;
let stopResizeWatch: (() => void) | null = null;

const { width, height } = useWindowSize();
const calcFillCount = () => {
  const target = calcInitialCount();
  return Math.max(0, target - images.value.length);
};
const relayout = () => {
  const missing = calcFillCount();
  if (missing > 0) loadImages(missing);
};
//防抖处理，防止视口改变频率高不断执行方法，带来性能问题
const debouncedRelayout = useDebounceFn(relayout, 200);

onMounted(() => {
  loadImages(calcInitialCount());
  const { stop } = useIntersectionObserver(infiniteSentinel, ([entry]) => {
    console.log(entry);
    if (entry && entry.isIntersecting) {
      const col = Math.max(1, Math.floor(window.innerWidth / PICTURE));
      loadImages(col);
    }
  });
  stopObserve = stop;
  stopResizeWatch = watch([width, height], () => {
    debouncedRelayout();
  });
});

onBeforeUnmount(() => {
  if (stopObserve) stopObserve();
  if (stopResizeWatch) stopResizeWatch();
});
</script>
<template>
  <!-- 将容器栅格改为响应式自适应： grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 。当视口变窄时，卡片自动换行并保持最小宽度。 -->
  <div class="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
    <div
      v-for="(item, index) in images"
      :key="index"
      class="bg-[#f0f0f0] p-4 flex items-center justify-center min-w-400px min-h-400px"
    >
      <div class="relative w-full h-full">
        <img
          :src="item"
          alt=""
          class="w-full h-full object-cover transition-opacity duration-300"
          :class="loadedMap[item] ? 'opacity-100' : 'opacity-0'"
          @load="onImgLoad(item)"
          @error="onImgError(item)"
        />
        <div
          v-if="!loadedMap[item] && !errorMap[item]"
          class="absolute inset-0 flex items-center justify-center placeholder"
        >
          <div class="loader"></div>
        </div>
        <div
          v-if="errorMap[item]"
          class="absolute inset-0 flex items-center justify-center error"
        >
          <span class="error-text">图片加载失败</span>
        </div>
      </div>
    </div>
  </div>
  <div ref="infiniteSentinel" class="h-1"></div>
</template>
<style lang="less" scoped>
.placeholder {
  background-color: #f5f5f5;
}
.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #d4d4d4;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.error {
  background-color: #ccc3c3;
}
.error-text {
  color: #4c4949;
  font-size: 14px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
