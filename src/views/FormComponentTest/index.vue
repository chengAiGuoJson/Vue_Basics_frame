<template>
  <div class="form-component-test-container">
    <h2 class="theme-title medium">表单组件测试</h2>
    
    <!-- 基础表单测试 -->
    <div class="test-section">
      <h3>基础表单测试</h3>
      <BaseForm 
        :config="basicFormConfig" 
        v-model="basicFormData"
        @submit="handleBasicSubmit"
        @validate="handleValidate"
      />
    </div>

    <!-- 水平布局表单测试 -->
    <div class="test-section">
      <h3>水平布局表单测试</h3>
      <BaseForm 
        :config="horizontalFormConfig" 
        v-model="horizontalFormData"
        @submit="handleHorizontalSubmit"
      />
    </div>

    <!-- 复杂表单测试 -->
    <div class="test-section">
      <h3>复杂表单测试</h3>
      <BaseForm 
        :config="complexFormConfig" 
        v-model="complexFormData"
        @submit="handleComplexSubmit"
        ref="complexFormRef"
      />
      <div class="form-actions">
        <button @click="validateComplexForm" class="btn btn-info">验证表单</button>
        <button @click="resetComplexForm" class="btn btn-warning">重置表单</button>
        <button @click="fillTestData" class="btn btn-success">填充测试数据</button>
      </div>
    </div>

    <!-- 表单数据展示 -->
    <div class="test-section">
      <h3>表单数据展示</h3>
      <div class="data-display">
        <div class="data-item">
          <h4>基础表单数据:</h4>
          <pre>{{ JSON.stringify(basicFormData, null, 2) }}</pre>
        </div>
        <div class="data-item">
          <h4>水平表单数据:</h4>
          <pre>{{ JSON.stringify(horizontalFormData, null, 2) }}</pre>
        </div>
        <div class="data-item">
          <h4>复杂表单数据:</h4>
          <pre>{{ JSON.stringify(complexFormData, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import BaseForm from '@/components/BaseForm/index.vue'
import type { FormConfig, FormData, FormErrors } from '@/types/form'
import { FormFieldType } from '@/types/form'

// 表单引用
const complexFormRef = ref()

// 基础表单配置
const basicFormConfig: FormConfig = {
  layout: 'vertical',
  size: 'default',
  fields: [
    {
      name: 'username',
      label: '用户名',
      type: FormFieldType.TEXT,
      placeholder: '请输入用户名',
      validation: [
        { required: true, message: '用户名不能为空' },
        { min: 3, max: 20, message: '用户名长度应在3-20个字符之间' }
      ]
    },
    {
      name: 'email',
      label: '邮箱',
      type: FormFieldType.EMAIL,
      placeholder: '请输入邮箱地址',
      validation: [
        { required: true, message: '邮箱不能为空' },
        { min: 2, max: 50, message: '邮箱长度应在2-50个字符之间' }
      ]
    },
    {
      name: 'password',
      label: '密码',
      type: FormFieldType.PASSWORD,
      placeholder: '请输入密码',
      validation: [
        { required: true, message: '密码不能为空' },
        { min: 6, message: '密码长度不能少于6位' }
      ]
    }
  ]
}

// 水平布局表单配置
const horizontalFormConfig: FormConfig = {
  layout: 'horizontal',
  labelWidth: '100px',
  size: 'default',
  fields: [
    {
      name: 'name',
      label: '姓名',
      type: FormFieldType.TEXT,
      placeholder: '请输入姓名',
      validation: [{ required: true }]
    },
    {
      name: 'age',
      label: '年龄',
      type: FormFieldType.NUMBER,
      placeholder: '请输入年龄',
      validation: [
        { required: true },
        { min: 1, max: 120, message: '年龄应在1-120之间' }
      ]
    },
    {
      name: 'phone',
      label: '电话',
      type: FormFieldType.TEXT,
      placeholder: '请输入电话号码',
      validation: [
        { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
      ]
    }
  ]
}

// 复杂表单配置
const complexFormConfig: FormConfig = {
  layout: 'vertical',
  size: 'default',
  showValidation: true,
  fields: [
    {
      name: 'title',
      label: '标题',
      type: FormFieldType.TEXT,
      placeholder: '请输入标题',
      validation: [{ required: true }]
    },
    {
      name: 'category',
      label: '分类',
      type: FormFieldType.SELECT,
      placeholder: '请选择分类',
      options: [
        { label: '技术', value: 'tech' },
        { label: '生活', value: 'life' },
        { label: '工作', value: 'work' },
        { label: '学习', value: 'study' }
      ],
      validation: [{ required: true }]
    },
    {
      name: 'priority',
      label: '优先级',
      type: FormFieldType.RADIO,
      options: [
        { label: '低', value: 'low' },
        { label: '中', value: 'medium' },
        { label: '高', value: 'high' }
      ],
      defaultValue: 'medium'
    },
    {
      name: 'tags',
      label: '标签',
      type: FormFieldType.CHECKBOX,
      options: [
        { label: 'Vue', value: 'vue' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'CSS', value: 'css' }
      ]
    },
    {
      name: 'description',
      label: '描述',
      type: FormFieldType.TEXTAREA,
      placeholder: '请输入详细描述',
      validation: [
        { required: true },
        { min: 10, max: 500, message: '描述长度应在10-500个字符之间' }
      ]
    },
    {
      name: 'publishDate',
      label: '发布日期',
      type: FormFieldType.DATE,
      validation: [{ required: true }]
    },
    {
      name: 'isPublic',
      label: '是否公开',
      type: FormFieldType.CHECKBOX,
      options: [{ label: '公开发布', value: true }]
    }
  ]
}

// 表单数据
const basicFormData = ref<FormData>({})
const horizontalFormData = ref<FormData>({})
const complexFormData = ref<FormData>({})

// 事件处理函数
const handleBasicSubmit = (data: FormData) => {
  console.log('基础表单提交:', data)
  ElMessage.success('基础表单提交成功！请查看控制台输出')
}

const handleHorizontalSubmit = (data: FormData) => {
  console.log('水平表单提交:', data)
  ElMessage.success('水平表单提交成功！请查看控制台输出')
}

const handleComplexSubmit = (data: FormData) => {
  console.log('复杂表单提交:', data)
  ElMessage.success('复杂表单提交成功！请查看控制台输出')
}

const handleValidate = (isValid: boolean, errors: FormErrors) => {
  console.log('表单验证结果:', { isValid, errors })
}

// 复杂表单操作
const validateComplexForm = () => {
  if (complexFormRef.value) {
    const isValid = complexFormRef.value.validate()
    if (isValid) {
      ElMessage.success('表单验证通过')
    } else {
      ElMessage.error('表单验证失败，请检查错误信息')
    }
  }
}

const resetComplexForm = () => {
  if (complexFormRef.value) {
    complexFormRef.value.reset()
    ElMessage.info('表单已重置')
  }
}

const fillTestData = () => {
  complexFormData.value = {
    title: '测试标题',
    category: 'tech',
    priority: 'high',
    tags: ['vue', 'typescript'],
    description: '这是一个测试描述，用于演示表单组件的功能。',
    publishDate: new Date().toISOString().split('T')[0],
    isPublic: [true]
  }
  ElMessage.success('测试数据已填充')
}
</script>

<style scoped>
.form-component-test-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.theme-title {
  color: var(--text-color, #333);
  margin-bottom: 30px;
  text-align: center;
}

.test-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: var(--bg-color, #fff);
}

.test-section h3 {
  margin-bottom: 20px;
  color: var(--text-color, #333);
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.data-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.data-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.data-item h4 {
  margin-bottom: 10px;
  color: #495057;
  font-size: 14px;
}

.data-item pre {
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  font-size: 12px;
  overflow-x: auto;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

@media (max-width: 768px) {
  .form-component-test-container {
    padding: 10px;
  }
  
  .test-section {
    padding: 15px;
  }
  
  .data-display {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>