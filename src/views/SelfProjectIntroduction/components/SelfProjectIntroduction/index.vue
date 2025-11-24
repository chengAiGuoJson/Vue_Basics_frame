<script setup lang="ts">
import MarkDownVue from "../markDownVue.vue";
// 导入 .md 文件（Vite 支持 ?raw 将文件作为字符串导入）
import selfProjectIntroductionMd from "./selfProjectIntroduction.md?raw";
import { ref } from "vue";
import { ElImage } from "element-plus";
import mljg from "./img/mljg.png";
import mapData from "./img/mapData.png";
import economicDevelopment from "./img/economic-development.webp";
import scaleMp4 from "./img/scale.mp4";

const modules = ref([
  { title: "Monorepo完成项目搭建", imgSrc: mljg },
  { title: "地图上渲染大数据优化", imgSrc: mapData },
  { title: "页面地图复杂样式实现", imgSrc: economicDevelopment },
  { title: "项目自适应功能实现", imgSrc: scaleMp4 },
]);

const previewSrcList = modules.value
  .filter((item) => !item.imgSrc.endsWith(".mp4"))
  .map((item) => item.imgSrc);
</script>
<template>
  <div class="self-project-introduction">
    <div class="section">
      <h4>技术栈:</h4>
      <p>
        Vue 3, TypeScript, Vite, Pinia, Vue Router, Ant Design, ECharts, SWRV,
        ESLint, Prettier, Husky, Less, pnpm, Monorepo
      </p>
    </div>
    <div class="section">
      <h4>背景(S):</h4>
      <p>
        为解决集团能源数据孤岛问题,需构建一个可视化数据中心,将海量、抽象的后台数据转化为直观、可交互的前端界面,赋能业务决策。
      </p>
    </div>
    <div class="section">
      <h4>任务(T):</h4>
      <p>
        独立负责集团首个能源大数据门户的前端架构与核心开发,将海量多维数据转化为高性能、高交互的可视化大屏与数据驾驶舱。
      </p>
    </div>
    <div class="section">
      <h4>行动(A):</h4>
      <ul>
        <li>
          <strong>前端架构设计:</strong> 主导完成技术选型(Vue
          3/TS/Vite),从0到1搭建 Monorepo
          架构,并封装了包括动态路由、权限控制、通用布局在内的核心功能模块。
        </li>
        <li>
          <strong>可视化组件库构建:</strong> 基于ECharts
          进行深度二次封装,沉淀出支持30+种图表类型的公司级组件库,将新看板开发效率提升50%。
        </li>
        <li>
          <strong>复杂场景开发:</strong>
          针对电网负荷等场景,开发高度定制化的数据驾驶舱,实现了百万级数据点的流畅渲染、多维度下钻与联动分析。
        </li>
        <li>
          <strong>性能极致优化:</strong>
          主导实施虚拟滚动、图表懒加载、代码分包等优化策略,将复杂仪表盘的首次可交互时间(TTI)缩短60%,确保对PB级后台数据的秒级响应。
        </li>
      </ul>
    </div>
    <div class="section">
      <h4>成果(R):</h4>
      <ul>
        <li>
          <strong>业务价值:</strong>
          成功交付集团首个能源大数据门户,将业务人员的数据分析与报表制作时间从平均2天缩短至半小时(效率提升≈97%),用户满意度提升40%。
        </li>
        <li>
          <strong>技术沉淀:</strong>
          封装的图表组件库已在公司内部3个项目成功复用,显著提升了团队的开发效率和标准化水平。
        </li>
      </ul>
    </div>
    <div class="section">
      <h4>沉淀(L):</h4>
      <ul>
        <li>
          掌握了从零到一构建现代化、可扩展前端架构(Monorepo)的全流程实践经验。
        </li>
        <li>
          深化了对ECharts
          渲染核心、性能瓶颈及优化策略的理解,具备复杂可视化场景的解决方案设计能力。
        </li>
      </ul>
    </div>
    <div class="section">
      <h4>自己负责的模块</h4>
      <div class="module-container">
        <div v-for="(item, index) in modules" :key="index" class="module-item">
          <h5>{{ item.title }}</h5>
          <template v-if="item.imgSrc.endsWith('.mp4')">
            <video
              :src="item.imgSrc"
              controls
              class="module-image"
              autoplay
              muted
              loop
            />
          </template>
          <template v-else>
            <el-image
              :src="item.imgSrc"
              :preview-src-list="previewSrcList"
              :initial-index="index"
              fit="cover"
              class="module-image"
            />
          </template>
        </div>
      </div>
    </div>
    <!-- 渲染 Markdown 内容 -->
    <MarkDownVue :bigMd="selfProjectIntroductionMd" />
  </div>
</template>

<style scoped>
.self-project-introduction {
  padding: 20px;
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  /* color: #fff; */
}
.text-center {
  text-align: center;
}
.font-600 {
  font-weight: 600;
}
h2 {
  margin-bottom: 20px;
  font-size: 24px;
}
.section {
  margin-bottom: 15px;
}
h4 {
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 600;
}
p,
ul {
  margin: 0;
}
ul {
  padding-left: 20px;
}
li {
  margin-bottom: 10px;
}

.module-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.module-item {
  text-align: center;
}

.module-image {
  width: 400px;
  height: 400px;
  cursor: pointer;
}
</style>
