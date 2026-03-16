<template>
  <div id="cesium-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as Cesium from "cesium";

onMounted(() => {
  // 写自己的token
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYmM2MWMyNC0xM2U4LTRjNjUtOWIxYy1mN2Q4ZDUyYTIyZTgiLCJpZCI6NDAzMTY3LCJpYXQiOjE3NzM0MTgyMjZ9.hiBhqZFQDwNJtxSXpl8g9jY7-E74Euxsg5lsaRwHvY0";

  const viewer = new Cesium.Viewer("cesium-container", {
    animation: false, // 禁用动画
    infoBox: false, // Hide the info box
    selectionIndicator: false, // Hide the selection indicator
    shadows: false, // Disable shadows
    shouldAnimate: true, // Enable animation
    baseLayerPicker: false, // 禁用底图选择器，防止其覆盖默认设置
  });
  // 加入天地图矢量图
  const customImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
    url: "https://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&layer=vec&style=default&tileMatrixSet=w&tileMatrix={z}&tileRow={y}&tileCol={x}&format=tiles", // 指向 public/bigemap-tiles/ 目录
    layer: "tdtBasicLayer",
    style: "default",
    format: "image/png",
    tileMatrixSetID: "GoogleMapsCompatible",
  });
  viewer.imageryLayers.addImageryProvider(customImageryProvider);
});
</script>

<style scoped>
#cesium-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
