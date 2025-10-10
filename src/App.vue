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
*{
  padding: 0px;
  margin: 0px;
}
</style>
