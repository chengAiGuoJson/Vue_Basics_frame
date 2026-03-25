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
    animation: false, // 禁用左下角的动画控件
    infoBox: false, // 禁用点击要素时显示的信息框
    selectionIndicator: false, // 禁用点击要素时出现的绿色高亮框
    shadows: false, // 禁用阴影
    shouldAnimate: true, // 开启相机动画
    baseLayerPicker: false, // 禁用右上角的底图选择器
  });
  // 开启帧率
  viewer.scene.debugShowFramesPerSecond = true;
  // flyTo和setView

  // ------------------flyTo--------------
  viewer.camera.flyTo({
    //destination : Cesium.Rectangle.fromDegrees(west, south, east, north),
    destination: Cesium.Cartesian3.fromDegrees(
      110.511154,
      29.362943,
      16531517.4,
    ),

    // ------------------------------------用这个，不卡顿，否则会在终点卡顿！！！！！！！！--------------------------------------------
    easingFunction: Cesium.EasingFunction.LINEAR_NONE,
    duration: 5,
    orientation: {
      heading: Cesium.Math.toRadians(348.3), // 水平旋转，围绕Y轴，0为正北方向
      pitch: Cesium.Math.toRadians(-89.8), // 上下旋转，围绕X轴，-90为俯视地面
      roll: 0.0, // 视口的翻滚角度，围绕Z轴，0为不翻转
    },
    complete: () => {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          115.585535,
          22.016248,
          5220342.6,
        ),
        duration: 5,
        easingFunction: Cesium.EasingFunction.LINEAR_NONE,
        orientation: {
          heading: Cesium.Math.toRadians(346.4), // east, default value is 0.0 (north)
          pitch: Cesium.Math.toRadians(-79.6), // default value (looking down)
          roll: 0.0, // default value
        },
        complete: () => {
          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              119.441071,
              34.651193,
              743459.7,
            ),
            duration: 5,
            easingFunction: Cesium.EasingFunction.LINEAR_NONE,
            orientation: {
              heading: Cesium.Math.toRadians(346.4), // east, default value is 0.0 (north)
              pitch: Cesium.Math.toRadians(-79.6), // default value (looking down)
              roll: 0.0, // default value
            },
          });
        },
      });
    },
  });
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(85.788705, 15.165394, 3013490),
    orientation: {
      heading: Cesium.Math.toRadians(27.7), // east, default value is 0.0 (north)
      pitch: Cesium.Math.toRadians(-67.7), // default value (looking down)
      roll: 0.0, // default value
    },
  });
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
