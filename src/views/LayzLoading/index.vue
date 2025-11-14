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
      <img :src="item" alt="" class="w-full h-full object-cover" />
    </div>
  </div>
  <div ref="infiniteSentinel" class="h-1"></div>
</template>
<style lang="less" scoped></style>
