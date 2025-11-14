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
const defaultSize = 400;
const PICTURESIZE = 1000;
const pictureWidth = ref<number>(defaultSize);
const pictureHeight = ref<number>(defaultSize);

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

const previewSrc = ref<string | null>(null);
const previewScale = ref<number>(1);
const openPreview = (src: string) => {
  previewSrc.value = src;
  previewScale.value = 1;
};
const closePreview = () => {
  previewSrc.value = null;
};

const onPreviewWheel = (e: WheelEvent) => {
  const step = 0.1;
  const next = previewScale.value + (e.deltaY > 0 ? -step : step);
  previewScale.value = Math.min(5, Math.max(0.2, next));
};

const createHash = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);
const createImageUrl = () =>
  `https://picsum.photos/${PICTURESIZE}/${PICTURESIZE}?hash=${createHash()}`;

const loadImages = (count: number) => {
  if (loading.value) return;
  loading.value = true;
  for (let i = 0; i < count; i++) {
    images.value.push(createImageUrl());
  }
  loading.value = false;
};

const calcInitialCount = () => {
  const col = Math.max(1, Math.floor(window.innerWidth / pictureWidth.value));
  const row = Math.max(1, Math.ceil(window.innerHeight / pictureHeight.value));
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
      const col = Math.max(
        1,
        Math.floor(window.innerWidth / pictureWidth.value)
      );
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
  <div
    class="grid gap-4"
    :style="{
      gridTemplateColumns: `repeat(auto-fit, minmax(${pictureWidth}px, 1fr))`,
    }"
  >
    <div
      v-for="(item, index) in images"
      :key="index"
      class="bg-[#f0f0f0] p-4 flex items-center justify-center"
      :style="{
        minWidth: pictureWidth + 'px',
        minHeight: pictureHeight + 'px',
      }"
    >
      <div class="relative w-full h-full">
        <img
          :src="item"
          alt=""
          class="w-full h-full cursor-pointer object-cover transition-opacity duration-300"
          :class="loadedMap[item] ? 'opacity-100' : 'opacity-0'"
          @load="onImgLoad(item)"
          @error="onImgError(item)"
          @click="openPreview(item)"
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
  <div
    v-if="previewSrc"
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    @click="closePreview"
    @wheel.prevent="onPreviewWheel"
  >
    <div class="max-w-[100vw] max-h-[100vh] overflow-auto">
      <div class="min-w-full min-h-full flex items-center justify-center">
        <img
          :src="previewSrc"
          class="block max-w-none cursor-zoom-out select-none"
          :style="{
            transform: `scale(${previewScale})`,
            transformOrigin: 'center',
          }"
          @click="closePreview"
        />
      </div>
    </div>
  </div>
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
