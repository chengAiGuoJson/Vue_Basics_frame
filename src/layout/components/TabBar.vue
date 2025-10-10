<script setup lang='ts'>
import { defineProps, ref,onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type RouteRecordRaw } from 'vue-router'
import { routerList } from '@/router'

const currentRouterList = disposeRouterList(routerList)
console.log(currentRouterList,'currentRouterList')
const router = useRouter()

function disposeRouterList(list: RouteRecordRaw[]) {
  list.forEach((item) => {
    if (item.children?.length)
      item.children = disposeRouterList(item.children)
  })
  return list.filter(
    item => !item.meta?.isHide,
  )
}
</script>

<template>
  <div class="tab-bar">
      <div 
      v-for="(item,index) in currentRouterList"
      :key="index" 
      class="men-box" 
      :class="$route.path === item.path ? 'men-box-active' : ''" 
      @click="router.push(item.path)">{{item?.meta?.name}}</div>
  </div>
</template>

<style scoped lang='less'>
.tab-bar{
  width: 200px;
  height: 100vh;
  background: #ccc;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right: 1px solid #ccc;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .men-box{
    width: 100%;
    text-align: center;
    height: 60px;
    font-size: #000;
    line-height: 60px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
  .men-box-active{
    background: rgb(255, 255, 255,0.5);
  }
}

</style>