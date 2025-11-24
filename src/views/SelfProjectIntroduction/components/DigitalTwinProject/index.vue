<template>
  <div class="digital-twin-project">
    <div class="section">
      <h4>技术栈:</h4>
      <p>Vue 2, Webpack, WebSocket, Babel, Axios, Element UI</p>
    </div>
    <div class="section">
      <h4>背景(S):</h4>
      <p>
        为提升楼宇管理效率，需开发一套智能楼宇管理系统，实现对环境参数的实时监测与自动化调节。
      </p>
    </div>
    <div class="section">
      <h4>任务(T):</h4>
      <p>
        负责前端实时监控模块的开发，确保设备数据的秒级更新与页面高性能渲染，并构建数据驱动的页面逻辑层，处理复杂的实时异步数据流。
      </p>
    </div>
    <div class="section">
      <h4>行动(A):</h4>
      <ul>
        <li>
          <strong>实时通信:</strong>
          主导集成
          WebSocket，替代传统轮询，建立低延迟、高可靠性的数据长连接，实现设备状态的毫秒级响应。
        </li>
        <li>
          <strong>性能优化:</strong>利用 Webpack
          对项目进行深度性能调优（如代码分割、Tree
          Shaking），将首屏加载速度优化了 1.5 秒，保障了大数据量下的流畅交互。
        </li>
        <li>
          <strong>兼容性保障:</strong>通过配置
          Babel，确保系统在楼宇现场的多种浏览器及工控机上的稳定运行。
        </li>
      </ul>
    </div>
    <div class="section">
      <h4>成果(R):</h4>
      <ul>
        <li>
          成功构建了基于 WebSocket
          的毫秒级实时告警与推送机制，将管理员响应时间缩短
          30%，显著提升了楼宇的主动式监测与维护效率。
        </li>
      </ul>
    </div>
    <div class="section">
      <h4>沉淀(L):</h4>
      <ul>
        <li>
          熟练掌握了 WebSocket 在 IoT
          场景下的应用，具备处理高并发、低延迟实时数据流的实践经验。
        </li>
        <li>
          深化了对 Webpack
          打包构建及性能优化的理解，并积累了保障项目在复杂环境下跨浏览器兼容性的经验。
        </li>
      </ul>
    </div>
    <div class="section">
      <h4>负责模块:</h4>
      <ul>
        <li>
          <strong>实时监控模块:</strong>
          负责前端实时数据展示与交互，包括环境参数、设备状态等。
        </li>
        <li>
          <strong>监控连接实现实时画面:</strong>
          负责实现与后端的实时监控连接，确保前端页面能够实时展示监控数据。
        </li>
      </ul>
      <div>模块图片展示</div>
      <div class="image-gallery">
        <div
          v-for="(item, index) in imageList"
          :key="index"
          class="image-container"
        >
          <el-image
            :src="item.imgSrc"
            :preview-src-list="previewSrcList"
            :initial-index="index"
            fit="cover"
            class="module-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import onePng from "./img/one.png";
import twoPng from "./img/two.png";
import threePng from "./img/three.png";
import fourPng from "./img/four.png";
const imageList = [
  { imgSrc: onePng },
  { imgSrc: twoPng },
  { imgSrc: threePng },
  { imgSrc: fourPng },
];
const previewSrcList = imageList.map((item) => item.imgSrc);
</script>

<style scoped>
.digital-twin-project {
  padding: 20px;
  font-family: "Arial", sans-serif;
  line-height: 1.6;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
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

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-container {
  flex: 1 1 calc(25% - 10px);
  box-sizing: border-box;
}

.module-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
