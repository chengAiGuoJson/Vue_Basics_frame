<script setup lang='ts'>
import { defineProps, ref,onMounted } from 'vue'
import TabBar from './components/TabBar.vue';
</script>

<template>
  <div class="layout-container">
    <TabBar/>
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang='less'>
.layout-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  
  .main-content {
    flex: 1;
    margin-left: 200px;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>