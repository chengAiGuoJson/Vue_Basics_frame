<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";

// 创建一个引用，用于访问 DOM 中的 div 容器
const threeContainer = ref<HTMLDivElement | null>(null);

// --- 核心 Three.js 变量 ---
let renderer: THREE.WebGLRenderer; // 将 renderer 提升到 setup 作用域
let controls: OrbitControls; // 将 controls 提升到 setup 作用域
let animationFrameId: number; // 用于存储 requestAnimationFrame 的 ID，方便在组件卸载时取消

// 创建一个 Three.js 场景
const scene = new THREE.Scene();
// 定义场景尺寸
const width = 1000;
const height = 500;

// 创建一个透视相机
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  width / height, // 宽高比
  0.1, // 近裁剪面
  1000, // 远裁剪面
);
camera.position.set(0, 10, 20); // 设置相机位置

// 添加环境光，提供基础照明
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 添加平行光，模拟太阳光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5); // 设置光源位置
scene.add(directionalLight);

// 渲染循环函数
const animate = () => {
  // requestAnimationFrame 会在浏览器下一次重绘之前调用指定的回调函数
  animationFrameId = requestAnimationFrame(animate);

  // 如果启用了阻尼，必须在动画循环中调用 .update()
  controls.update();

  // 核心：执行渲染操作，将场景和相机渲染到屏幕上
  renderer.render(scene, camera);
};

onMounted(() => {
  // 初始化 Three.js 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  // 将渲染器的 DOM 元素添加到 Vue 组件的 DOM 中
  if (threeContainer.value) {
    threeContainer.value.appendChild(renderer.domElement);
    // 创建镜头控制器，允许用户通过鼠标交互
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果，使控制更平滑

    // 加载gltf模型
    // 1. 准备 Draco 解码器
    // Draco 是 Google 开发的用于压缩和解压缩 3D 模型的库，能极大减小模型文件大小。
    const dracoLoader = new DRACOLoader();
    // 设置解码器路径，这里使用 Google 提供的在线地址，我们就不需要在项目中存放这些文件了。
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

    // 2. 准备 glTF 加载器
    const loader = new GLTFLoader();
    // 将 Draco 加载器“注册”到 glTF 加载器中，这样它才知道如何解压模型。
    loader.setDRACOLoader(dracoLoader);

    // 3. 开始异步加载模型
    loader.load(
      // 3.1. 提供模型文件的 URL 地址
      "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",

      // 3.2. 定义加载成功后的回调函数，参数 gltf 包含了解析后的模型所有信息
      (gltf) => {
        // 4. 将加载好的模型场景添加到我们自己的 Three.js 场景中
        const model = gltf.scene;
        scene.add(model);

        // --- 5. 自动调整相机视角，确保模型完整可见 ---

        // 5.1. 计算模型的“包围盒”，一个刚好能包住整个模型的看不见的盒子
        const box = new THREE.Box3().setFromObject(model);
        // 通过包围盒，精确计算出模型的几何中心点
        const center = box.getCenter(new THREE.Vector3());
        // 以及模型的整体尺寸（长、宽、高）
        const size = box.getSize(new THREE.Vector3());

        // 5.2. 基于模型的最大尺寸和相机的视野角度，通过三角函数计算出能完整看到模型的最佳相机距离
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = maxDim / 2 / Math.tan(fov / 2);

        // 5.3. 应用新的相机位置和焦点
        // 将相机移动到模型中心点，并向后移动计算出的最佳距离
        camera.position.set(center.x, center.y, center.z + cameraZ);
        // 告诉鼠标控制器，新的旋转中心是模型的中心点
        controls.target.set(center.x, center.y, center.z);
        // 应用对控制器所做的修改
        controls.update();
      },
    );
    // 组件挂载后，开始渲染循环

    animate();
  }
});

onUnmounted(() => {
  // 在组件卸载时，执行清理操作
  cancelAnimationFrame(animationFrameId); // 停止渲染循环
  renderer.dispose(); // 释放 renderer 占用的资源
  if (threeContainer.value) {
    // 移除 canvas 元素
    threeContainer.value.removeChild(renderer.domElement);
  }
});
</script>
<template>
  <div ref="threeContainer"></div>
</template>
<style lang="scss" scoped></style>
