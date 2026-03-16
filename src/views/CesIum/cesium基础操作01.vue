<template>
  <div id="cesium-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as Cesium from "cesium";

onMounted(() => {
  const viewer = new Cesium.Viewer("cesium-container", {
    animation: false, // 禁用动画
    infoBox: false, // Hide the info box
    selectionIndicator: false, // Hide the selection indicator
    shadows: false, // Disable shadows
    shouldAnimate: true, // Enable animation
    baseLayerPicker: false, // 禁用底图选择器，防止其覆盖默认设置
  });
  // 默认展示中国
  // viewer.camera.setView({
  //   destination: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 1500000), // 目的地：经度, 纬度, 高度(米)
  //   orientation: {
  //     heading: Cesium.Math.toRadians(0.0), // 水平旋转
  //     pitch: Cesium.Math.toRadians(-90.0), // 俯仰角，-90度为垂直向下看
  //     roll: 10,
  //   },
  // });
  // 添加您自己的瓦片数据
  const customImageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/%7Bz%7D/%7By%7D/%7Bx%7D", // 指向 public/bigemap-tiles/ 目录
    tilingScheme: new Cesium.WebMercatorTilingScheme(), // 指定为 Web Mercator 投影
    maximumLevel: 12, // 请根据您下载的瓦片最高级别进行调整
  });
  viewer.imageryLayers.addImageryProvider(customImageryProvider);

  // 地图上画点画线
  const entityCollection = viewer.entities;
  // 画点
  entityCollection.add({
    position: Cesium.Cartesian3.fromDegrees(116.39, 39.9), // 北京
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
    },
  });
  // 画线
  // entityCollection.add({
  //   position: Cesium.Cartesian3.fromDegreesArray([116.39, 39.9, 116.4, 39.9]), // 北京到上海
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       116.39, 39.9, 116.4, 39.9,
  //     ]),
  //     width: 5,
  //     material: Cesium.Color.RED.withAlpha(0.5),
  //   },
  // });

  // // 将视角飞到瓦片数据所在的区域
  // viewer.camera.flyTo({
  //   destination: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 15000), // 目的地：经度, 纬度, 高度(米)
  //   orientation: {
  //     heading: Cesium.Math.toRadians(0.0), // 水平旋转
  //     pitch: Cesium.Math.toRadians(-90.0), // 俯仰角，-90度为垂直向下看
  //     roll: 0.0,
  //   },
  // });
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
