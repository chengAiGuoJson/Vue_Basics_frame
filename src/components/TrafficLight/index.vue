/ 红绿灯实现
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 定义红绿灯状态类型
type TrafficLightState = 'red' | 'yellow' | 'green';

// 定义各状态持续时间（毫秒）
const DURATION = {
  red: 5000,    // 红灯5秒
  yellow: 2000, // 黄灯2秒
  green: 5000   // 绿灯5秒
};

// 当前状态
const currentState = ref<TrafficLightState>('red');
// 剩余时间（秒）
const remainingTime = ref<number>(DURATION.red / 1000);
// 定时器ID
let timer: number | null = null;
let countdownTimer: number | null = null;

// 切换到下一个状态
const switchToNextState = () => {
  switch (currentState.value) {
    case 'red':
      currentState.value = 'green';
      remainingTime.value = DURATION.green / 1000;
      startTimer(DURATION.green);
      break;
    case 'yellow':
      currentState.value = 'red';
      remainingTime.value = DURATION.red / 1000;
      startTimer(DURATION.red);
      break;
    case 'green':
      currentState.value = 'yellow';
      remainingTime.value = DURATION.yellow / 1000;
      startTimer(DURATION.yellow);
      break;
  }
};

// 启动定时器
const startTimer = (duration: number) => {
  // 清除之前的定时器
  if (timer) clearTimeout(timer);
  if (countdownTimer) clearInterval(countdownTimer);
  
  // 设置状态切换定时器
  timer = setTimeout(switchToNextState, duration);
  
  // 设置倒计时定时器
  countdownTimer = setInterval(() => {
    remainingTime.value--;
    if (remainingTime.value <= 0) {
      clearInterval(countdownTimer as number);
    }
  }, 1000);
};

// 启动/暂停红绿灯
const isRunning = ref<boolean>(false);
const toggleTrafficLight = () => {
  isRunning.value = !isRunning.value;
  
  if (isRunning.value) {
    // 启动红绿灯
    remainingTime.value = DURATION[currentState.value] / 1000;
    startTimer(DURATION[currentState.value]);
  } else {
    // 暂停红绿灯
    if (timer) clearTimeout(timer);
    if (countdownTimer) clearInterval(countdownTimer);
    timer = null;
    countdownTimer = null;
  }
};

// 组件挂载时初始化
onMounted(() => {
  // 默认不自动启动，等待用户点击按钮
});

// 组件卸载前清理定时器
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
  if (countdownTimer) clearInterval(countdownTimer);
});
</script>

<template>
  <div class="traffic-light-demo">
    <h2>红绿灯示例</h2>
    
    <div class="traffic-light">
      <div 
        class="light red" 
        :class="{ active: currentState === 'red' }"
      ></div>
      <div 
        class="light yellow" 
        :class="{ active: currentState === 'yellow' }"
      ></div>
      <div 
        class="light green" 
        :class="{ active: currentState === 'green' }"
      ></div>
    </div>
    
    <div class="controls">
      <div class="status">
        当前状态: 
        <span :class="currentState">
          {{ currentState === 'red' ? '红灯' : currentState === 'yellow' ? '黄灯' : '绿灯' }}
        </span>
        <span v-if="isRunning">
          (剩余 {{ remainingTime }} 秒)
        </span>
      </div>
      
      <button @click="toggleTrafficLight">
        {{ isRunning ? '暂停' : '启动' }}红绿灯
      </button>
    </div>
  </div>
</template>

<style scoped>
.traffic-light-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.traffic-light {
  display: flex;
  flex-direction: column;
  background-color: #333;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.light {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 10px;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.light.active {
  opacity: 1;
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.3);
}

.red {
  background-color: red;
}

.yellow {
  background-color: yellow;
}

.green {
  background-color: green;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.status {
  font-size: 18px;
  margin-bottom: 10px;
}

.status .red {
  color: red;
  font-weight: bold;
}

.status .yellow {
  color: orange;
  font-weight: bold;
}

.status .green {
  color: green;
  font-weight: bold;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>