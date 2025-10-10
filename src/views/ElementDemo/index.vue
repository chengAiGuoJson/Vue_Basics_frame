<template>
  <div class="element-test">
    <div class="page-content">
    <h1 class="theme-title large">Element Plus 测试页面</h1>
    
    <!-- 按钮组件测试 -->
    <div class="test-section theme-card">
      <h3 class="theme-title medium">按钮组件</h3>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <!-- 输入框组件测试 -->
    <div class="test-section theme-card">
      <h3 class="theme-title medium">输入框组件</h3>
      <el-input v-model="inputValue" placeholder="请输入内容" style="width: 200px;"></el-input>
      <p class="theme-text">输入的内容：{{ inputValue }}</p>
    </div>

    <!-- 消息提示测试 -->
    <div class="test-section theme-card">
      <h3 class="theme-title medium">消息提示</h3>
      <el-button @click="showMessage">显示消息</el-button>
      <el-button @click="showNotification">显示通知</el-button>
    </div>

    <!-- 表格组件测试 -->
    <div class="test-section theme-card">
      <h3 class="theme-title medium">表格组件</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
    <div class="test-section theme-card">
      <h3 class="theme-title medium">日期时间选择器</h3>
      <el-date-picker
        v-model="timeData"
        type="datetime"
        placeholder="Select date and time"
      />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const timeData = ref('')

// 这些组件和函数会被自动导入，无需手动import
const inputValue = ref('')

const tableData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }
])

const showMessage = () => {
  ElMessage({
    message: '这是一条消息提示',
    type: 'success'
  })
}

const showNotification = () => {
  ElNotification({
    title: '成功',
    message: '这是一条成功的提示消息',
    type: 'success'
  })
}
</script>

<style scoped>
/* ElementDemo页面特有样式 */
.test-section {
  margin-bottom: 2rem;
}
.test-section h3 {
  margin-top: 0;
  color: #409eff;
}

.el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>