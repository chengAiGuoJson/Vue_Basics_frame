import { createRouter, createWebHistory, } from 'vue-router'
import {type RouteRecordRaw} from 'vue-router'
export const routerList: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      name: '首页',
    },
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/element-test',
    name: 'element-test',
    meta: {
      name: 'Element Plus 测试',
    },
    component: () => import('@/views/ElementDemo/index.vue')
  },
  {
    path: '/vue3-proxy',
    name: 'vue3-proxy',
    meta: {
      name: 'Vue3 Proxy响应式原理',
    },
    component: () => import('@/views/vue3_Proxy_and_vue2_DefineProperty/Vue3ProxyPrinciple.vue')
  },
  {
    path:'/watch-demo',
    name:'watch-demo',
    meta: {
      name: 'watch与watchEffect',
    },
    component: () => import('@/views/WatchAndWatchEffect/index.vue')
  },
  {
    path:'/v-model-demo',
    name:'v-model-demo',
    meta: {
      name: 'v-model 自定义指令',
    },
    component: () => import('@/views/V-model/index.vue')
  },
  {
    path: '/svelte-demo',
    name: 'svelte-demo',
    meta: {
      name: 'Svelte框架对比',
    },
    component: () => import('@/views/SvelteDemo/index.vue')
  },
  {
    path: '/js-ts',
    name: 'JsTsDEMO',
    meta: {
      name: 'JsTsDEMO',
    },
    component: () => import('@/views/JsTsDemo/index.vue')
  },
  {
    path:'/animation-demo',
    name:'animation-demo',
    meta: {
      name: '动画与过渡',
    },
    component: () => import('@/views/AnimationTransFrom/index.vue')
  },
  {
    path:'/form-component-test',
    name:'form-component-test',
    meta: {
      name: '表单组件测试',
    },
    component: () => import('@/views/FormComponentTest/index.vue')
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routerList
  ]
})

export default router
