<template>
  <!-- 发射导弹 -->
  <el-button type="primary" @click="emitMissile">发射导弹</el-button>
  <!-- 创建一个 div 容器，用于承载 Three.js 场景 -->
  <div ref="threeContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 创建一个引用，用于访问 DOM 中的 div 容器
const threeContainer = ref<HTMLDivElement | null>(null);

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
// 三维坐标系统
// 红色轴表示 X 轴，绿色轴表示 Y 轴，蓝色轴表示 Z 轴
const axesHelper = new THREE.AxesHelper(5); // 5 表示辅助线的长度
scene.add(axesHelper);

// 创建一个平面作为地面
const groundGeometry = new THREE.PlaneGeometry(24, 24);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // 将平面旋转使其水平
scene.add(ground);
// 将地面放置在 Y 轴下方
// ground.position.set(0, 0, 0);
// 地面向左旋转 90 度
// ground.rotation.y = 0;

let exploded = false; // 爆炸状态标志
const explosionRadius = 4; // 爆炸覆盖半径
const explosionSpeed = 2; // 爆炸冲击波的高度
const explosionParticleCount = 3000; // 爆炸碎片数量
const missileGravity = -9.8; // 重力加速度，模拟导弹下落

// 为导弹和粒子定义顶层变量
let missileGroup: THREE.Group;
let missileVelocity: THREE.Vector3;

// --- InstancedMesh 性能优化 ---
let instancedParticles: THREE.InstancedMesh; // 用于管理所有粒子的单一对象
// 存储每个粒子实例的数据（位置、速度）
const particleData: { position: THREE.Vector3; velocity: THREE.Vector3 }[] = [];
const dummy = new THREE.Object3D(); // 虚拟对象，用于计算每个实例的矩阵

// 创建粒子池 (使用 InstancedMesh)
function createParticlePool() {
  const particleGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const particleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  // 创建一个 InstancedMesh 实例，一次性渲染所有粒子
  instancedParticles = new THREE.InstancedMesh(
    particleGeometry,
    particleMaterial,
    explosionParticleCount,
  );
  // 设置矩阵为动态使用，以获得最佳性能
  instancedParticles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(instancedParticles);

  // 初始化每个粒子实例的数据结构
  for (let i = 0; i < explosionParticleCount; i++) {
    particleData.push({
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
    });
  }
}

// 发射导弹
function emitMissile() {
  if (missileGroup) {
    scene.remove(missileGroup);
  }
  exploded = false;
  // 通过将计数设置为0来隐藏所有粒子实例，而不是遍历数组
  if (instancedParticles) {
    instancedParticles.count = 0;
  }
  createMissile();
}

// 创建导弹函数
function createMissile() {
  missileGroup = new THREE.Group();
  const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.2, 1.5, 32);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.rotation.x = Math.PI / 2;

  missileVelocity = new THREE.Vector3(0, 0, 0);
  missileGroup.add(body);
  missileGroup.position.set(0, 10, 0);
  missileGroup.lookAt(new THREE.Vector3(0, 0, 0));

  scene.add(missileGroup);
}

// 动画循环
const animate = (controls: OrbitControls, renderer: THREE.WebGLRenderer) => {
  requestAnimationFrame(() => animate(controls, renderer));
  controls.update();

  // 导弹动画
  if (missileGroup) {
    if (missileGroup.position.y > 0.75 && !exploded) {
      missileVelocity.y += missileGravity * 0.001;
      missileGroup.position.add(missileVelocity);
    } else if (!exploded) {
      exploded = true;
      missileGroup.visible = false;

      // 触发爆炸：初始化所有粒子的数据
      instancedParticles.count = explosionParticleCount; // 一键“激活”所有粒子
      for (let i = 0; i < explosionParticleCount; i++) {
        const data = particleData[i];
        data.position.copy(missileGroup.position);

        const angle = Math.random() * Math.PI * 2;
        const horizontalSpeed = (Math.random() * explosionRadius) / 2;

        data.velocity.set(
          Math.cos(angle) * horizontalSpeed,
          Math.random() * explosionSpeed,
          Math.sin(angle) * horizontalSpeed,
        );
      }
    }
  }

  // 如果已爆炸，则更新粒子动画
  if (exploded) {
    for (let i = 0; i < explosionParticleCount; i++) {
      const data = particleData[i];
      // 只有当粒子在空中时才更新其位置
      if (data.position.y > 0) {
        data.position.add(data.velocity.clone().multiplyScalar(0.1));
        data.velocity.y -= 0.05; // 模拟重力
      } else {
        data.position.y = 0;
        data.velocity.set(0, 0, 0);
      }
      // 使用虚拟对象更新单个实例的矩阵
      dummy.position.copy(data.position);
      dummy.updateMatrix();
      instancedParticles.setMatrixAt(i, dummy.matrix);
    }
    // 在所有实例更新后，标记矩阵需要刷新
    instancedParticles.instanceMatrix.needsUpdate = true;
  }

  renderer.render(scene, camera);
};
onMounted(() => {
  // 确保容器已成功挂载
  if (!threeContainer.value) return;
  // 创建一个 WebGL 渲染器，并开启抗锯齿
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height); // 设置渲染器尺寸
  threeContainer.value.appendChild(renderer.domElement); // 将渲染器的 canvas 元素添加到容器中

  // 创建镜头控制器，允许用户通过鼠标交互
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 启用阻尼效果，使控制更平滑
  createParticlePool(); // 创建粒子池
  animate(controls, renderer); // 开始动画循环

  //   监听窗口大小变化，以调整相机和渲染器
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
onUnmounted(() => {
  // 清楚threejs场景
  scene.remove(missileGroup);
  scene.remove(instancedParticles);
});
</script>

<style scoped></style>
