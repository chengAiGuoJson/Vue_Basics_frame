# BaseForm 通用表单组件

BaseForm 是一个基于 Element Plus 的通用表单组件，支持多种字段类型和布局方式，提供完整的表单验证功能。

## 特性

- 🎯 **多种字段类型**：支持文本、邮箱、密码、数字、文本域、选择框、单选框、复选框、日期选择、文件上传等
- 🎨 **灵活布局**：支持水平、垂直、内联三种布局方式
- ✅ **完整验证**：内置多种验证规则，支持自定义验证器
- 📱 **响应式设计**：自适应移动端和桌面端
- 🌙 **主题支持**：支持明暗主题切换
- 🔧 **高度可配置**：通过配置对象即可生成完整表单

## 安装依赖

```bash
npm install element-plus
```

## 基础用法

```vue
<template>
  <BaseForm
    :config="formConfig"
    v-model="formData"
    @submit="handleSubmit"
    @validate="handleValidate"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseForm from '@/components/BaseForm/index.vue'
import type { FormConfig, FormData } from '@/types/form'

const formData = ref<FormData>({})

const formConfig: FormConfig = {
  layout: 'vertical',
  labelWidth: '120px',
  fields: [
    {
      name: 'username',
      label: '用户名',
      type: 'text',
      placeholder: '请输入用户名',
      validation: [
        { required: true, message: '用户名不能为空' },
        { min: 3, max: 20, message: '用户名长度为3-20个字符' }
      ]
    },
    {
      name: 'email',
      label: '邮箱',
      type: 'email',
      placeholder: '请输入邮箱地址',
      validation: [
        { required: true, message: '邮箱不能为空' },
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式不正确' }
      ]
    }
  ]
}

const handleSubmit = (data: FormData) => {
  console.log('表单提交:', data)
}

const handleValidate = (isValid: boolean, errors: any) => {
  console.log('表单验证:', isValid, errors)
}
</script>
```

## 字段类型

### 文本输入类型

```typescript
// 普通文本
{
  name: 'text',
  label: '文本',
  type: 'text',
  placeholder: '请输入文本'
}

// 邮箱
{
  name: 'email',
  label: '邮箱',
  type: 'email',
  placeholder: '请输入邮箱'
}

// 密码
{
  name: 'password',
  label: '密码',
  type: 'password',
  placeholder: '请输入密码'
}

// 数字
{
  name: 'number',
  label: '数字',
  type: 'number',
  placeholder: '请输入数字'
}

// 文本域
{
  name: 'textarea',
  label: '描述',
  type: 'textarea',
  placeholder: '请输入描述',
  attrs: { rows: 4 }
}
```

### 选择类型

```typescript
// 下拉选择
{
  name: 'select',
  label: '城市',
  type: 'select',
  placeholder: '请选择城市',
  options: [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' }
  ]
}

// 单选框
{
  name: 'gender',
  label: '性别',
  type: 'radio',
  options: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' }
  ]
}

// 复选框
{
  name: 'hobbies',
  label: '爱好',
  type: 'checkbox',
  options: [
    { label: '读书', value: 'reading' },
    { label: '运动', value: 'sports' },
    { label: '音乐', value: 'music' }
  ]
}
```

### 日期和文件

```typescript
// 日期选择
{
  name: 'birthday',
  label: '生日',
  type: 'date',
  placeholder: '请选择日期'
}

// 文件上传
{
  name: 'avatar',
  label: '头像',
  type: 'file',
  attrs: {
    accept: 'image/*',
    multiple: false
  }
}
```

## 表单验证

### 内置验证规则

```typescript
{
  name: 'username',
  label: '用户名',
  type: 'text',
  validation: [
    { required: true, message: '用户名不能为空' },
    { min: 3, message: '用户名最少3个字符' },
    { max: 20, message: '用户名最多20个字符' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
  ]
}
```

### 自定义验证器

```typescript
{
  name: 'confirmPassword',
  label: '确认密码',
  type: 'password',
  validation: [
    { required: true, message: '请确认密码' },
    {
      validator: (value) => {
        if (value !== formData.value.password) {
          return '两次密码输入不一致'
        }
        return true
      }
    }
  ]
}
```

## 布局配置

### 垂直布局（默认）

```typescript
const config: FormConfig = {
  layout: 'vertical',
  labelWidth: '120px',
  fields: [...]
}
```

### 水平布局

```typescript
const config: FormConfig = {
  layout: 'horizontal',
  labelWidth: '120px',
  fields: [...]
}
```

### 内联布局

```typescript
const config: FormConfig = {
  layout: 'inline',
  fields: [...]
}
```

## 按钮配置

```typescript
const config: FormConfig = {
  fields: [...],
  showButtons: true,
  showResetButton: true,
  submitButton: {
    text: '提交表单',
    className: 'custom-submit-btn'
  },
  resetButton: {
    text: '重置表单',
    className: 'custom-reset-btn'
  }
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| config | FormConfig | - | 表单配置对象 |
| modelValue | FormData | {} | 表单数据（支持v-model） |
| validateOnMount | boolean | false | 组件挂载时是否验证 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: FormData) | 表单数据更新时触发 |
| submit | (data: FormData) | 表单提交时触发 |
| reset | () | 表单重置时触发 |
| validate | (isValid: boolean, errors: FormErrors) | 表单验证时触发 |

## Methods

通过 ref 可以调用以下方法：

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| validate | () | Promise\<boolean\> | 验证整个表单 |
| reset | () | void | 重置表单 |
| getFormData | () | FormData | 获取表单数据 |
| setFieldValue | (fieldName: string, value: any) | void | 设置字段值 |

### 使用示例

```vue
<template>
  <BaseForm ref="formRef" :config="config" />
  <el-button @click="validateForm">验证表单</el-button>
  <el-button @click="resetForm">重置表单</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()

const validateForm = async () => {
  const isValid = await formRef.value.validate()
  console.log('表单验证结果:', isValid)
}

const resetForm = () => {
  formRef.value.reset()
}
</script>
```

## 样式定制

### CSS 变量

组件支持通过 CSS 变量进行样式定制：

```css
.base-form {
  --form-padding: 20px;
  --form-border-radius: 8px;
  --form-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  --label-color: #333;
  --help-color: #909399;
}
```

### 自定义类名

```typescript
const config: FormConfig = {
  className: 'my-custom-form',
  fields: [
    {
      name: 'field1',
      label: 'Field 1',
      type: 'text',
      className: 'my-custom-field'
    }
  ]
}
```

## 响应式设计

组件内置响应式设计，在移动端会自动调整布局：

- 表单容器自适应屏幕宽度
- 按钮在移动端变为全宽度
- 单选框和复选框在移动端垂直排列

## 主题支持

组件支持明暗主题自动切换：

```css
/* 暗色主题 */
@media (prefers-color-scheme: dark) {
  .base-form {
    background: #2d2d2d;
    color: #fff;
  }
}
```

## 完整示例

```vue
<template>
  <div class="form-demo">
    <h2>用户注册表单</h2>
    <BaseForm
      ref="formRef"
      :config="formConfig"
      v-model="formData"
      @submit="handleSubmit"
      @validate="handleValidate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseForm from '@/components/BaseForm/index.vue'
import type { FormConfig, FormData } from '@/types/form'

const formRef = ref()
const formData = ref<FormData>({})

const formConfig: FormConfig = {
  layout: 'vertical',
  labelWidth: '120px',
  size: 'default',
  showButtons: true,
  showResetButton: true,
  submitButton: {
    text: '注册',
    type: 'primary'
  },
  resetButton: {
    text: '重置',
    type: 'default'
  },
  fields: [
    {
      name: 'username',
      label: '用户名',
      type: 'text',
      placeholder: '请输入用户名',
      help: '用户名将作为您的登录凭证',
      validation: [
        { required: true, message: '用户名不能为空' },
        { min: 3, max: 20, message: '用户名长度为3-20个字符' },
        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
      ]
    },
    {
      name: 'email',
      label: '邮箱地址',
      type: 'email',
      placeholder: '请输入邮箱地址',
      validation: [
        { required: true, message: '邮箱不能为空' },
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式不正确' }
      ]
    },
    {
      name: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码',
      validation: [
        { required: true, message: '密码不能为空' },
        { min: 6, message: '密码至少6个字符' }
      ]
    },
    {
      name: 'confirmPassword',
      label: '确认密码',
      type: 'password',
      placeholder: '请再次输入密码',
      validation: [
        { required: true, message: '请确认密码' },
        {
          validator: (value) => {
            if (value !== formData.value.password) {
              return '两次密码输入不一致'
            }
            return true
          }
        }
      ]
    },
    {
      name: 'gender',
      label: '性别',
      type: 'radio',
      defaultValue: 'male',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ]
    },
    {
      name: 'city',
      label: '所在城市',
      type: 'select',
      placeholder: '请选择城市',
      options: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' }
      ],
      validation: [
        { required: true, message: '请选择所在城市' }
      ]
    },
    {
      name: 'hobbies',
      label: '兴趣爱好',
      type: 'checkbox',
      options: [
        { label: '读书', value: 'reading' },
        { label: '运动', value: 'sports' },
        { label: '音乐', value: 'music' },
        { label: '旅行', value: 'travel' }
      ]
    },
    {
      name: 'birthday',
      label: '生日',
      type: 'date',
      placeholder: '请选择生日'
    },
    {
      name: 'bio',
      label: '个人简介',
      type: 'textarea',
      placeholder: '请简单介绍一下自己',
      attrs: { rows: 4 }
    }
  ]
}

const handleSubmit = (data: FormData) => {
  console.log('表单提交数据:', data)
  // 这里可以调用API提交数据
}

const handleValidate = (isValid: boolean, errors: any) => {
  console.log('表单验证结果:', isValid, errors)
}
</script>

<style scoped>
.form-demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
</style>
```

## 注意事项

1. **依赖要求**：组件依赖 Element Plus，请确保已正确安装和配置
2. **类型支持**：建议使用 TypeScript 以获得更好的类型提示
3. **性能优化**：对于大型表单，建议合理使用字段分组和懒加载
4. **浏览器兼容**：支持现代浏览器，IE11+ 需要 polyfill

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础字段类型和验证
- 支持多种布局方式
- 响应式设计和主题支持