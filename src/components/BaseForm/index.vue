<template>
  <el-form
    ref="elFormRef"
    :model="formData"
    :rules="formRules"
    :label-width="config.labelWidth || '120px'"
    :label-position="config.layout === 'horizontal' ? 'left' : 'top'"
    :inline="config.layout === 'inline'"
    :size="config.size || 'default'"
    :class="[
      'base-form',
      `base-form--${config.layout || 'vertical'}`,
      config.className
    ]"
    @submit.prevent="handleSubmit"
  >
    <el-form-item
      v-for="field in config.fields"
      :key="field.name"
      :label="field.label"
      :prop="field.name"
      :required="isRequired(field)"
      :class="[
        'form-field',
        `form-field--${field.type}`,
        field.className
      ]"
    >
      <!-- 文本输入 -->
      <el-input
        v-if="['text', 'email', 'password', 'number'].includes(field.type)"
        v-model="formData[field.name]"
        :type="getFieldProps(field).type"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
        :readonly="field.readonly"
        :show-password="field.type === 'password'"
        :clearable="true"
        v-bind="field.attrs"
        @blur="validateField(field.name)"
      />

      <!-- 文本域 -->
      <el-input
        v-else-if="field.type === 'textarea'"
        v-model="formData[field.name]"
        type="textarea"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
        :readonly="field.readonly"
        :rows="field.attrs?.rows || 4"
        :clearable="true"
        v-bind="field.attrs"
        @blur="validateField(field.name)"
      />

      <!-- 选择框 -->
      <el-select
        v-else-if="field.type === 'select'"
        v-model="formData[field.name]"
        :placeholder="field.placeholder || '请选择'"
        :disabled="field.disabled"
        :clearable="true"
        :filterable="true"
        style="width: 100%"
        v-bind="field.attrs"
        @change="validateField(field.name)"
      >
        <el-option
          v-for="option in field.options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          :disabled="option.disabled"
        />
      </el-select>

      <!-- 单选框组 -->
      <el-radio-group
        v-else-if="field.type === 'radio'"
        v-model="formData[field.name]"
        :disabled="field.disabled"
        v-bind="field.attrs"
        @change="validateField(field.name)"
      >
        <el-radio
          v-for="option in field.options"
          :key="option.value"
          :label="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </el-radio>
      </el-radio-group>

      <!-- 复选框组 -->
      <el-checkbox-group
        v-else-if="field.type === 'checkbox'"
        v-model="formData[field.name]"
        :disabled="field.disabled"
        v-bind="field.attrs"
        @change="validateField(field.name)"
      >
        <el-checkbox
          v-for="option in field.options"
          :key="option.value"
          :label="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </el-checkbox>
      </el-checkbox-group>

      <!-- 日期选择 -->
      <el-date-picker
        v-else-if="field.type === 'date'"
        v-model="formData[field.name]"
        type="date"
        :placeholder="field.placeholder || '选择日期'"
        :disabled="field.disabled"
        :readonly="field.readonly"
        :clearable="true"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        style="width: 100%"
        v-bind="field.attrs"
        @change="validateField(field.name)"
      />

      <!-- 文件上传 -->
      <el-upload
        v-else-if="field.type === 'file'"
        :disabled="field.disabled"
        :multiple="field.attrs?.multiple"
        :accept="field.attrs?.accept"
        :auto-upload="false"
        action="#"
        v-bind="field.attrs"
        @change="handleFileChange(field.name, $event)"
      >
        <el-button type="primary">选择文件</el-button>
      </el-upload>

      <!-- 帮助文本 -->
      <div
        v-if="field.help"
        class="form-help"
      >
        {{ field.help }}
      </div>
    </el-form-item>

    <!-- 表单操作按钮 -->
    <el-form-item
      v-if="config.showButtons !== false"
      class="form-actions"
    >
      <el-button
        type="primary"
        :loading="isSubmitting"
        :class="config.submitButton?.className"
        @click="handleSubmit"
      >
        {{ config.submitButton?.text || '提交' }}
      </el-button>

      <el-button
        v-if="config.showResetButton !== false"
        :class="config.resetButton?.className"
        @click="handleReset"
      >
        {{ config.resetButton?.text || '重置' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import type { 
  FormConfig, 
  FormData, 
  FormErrors, 
  FormFieldConfig,
  FormFieldType 
} from '@/types/form'

// Props
interface Props {
  config: FormConfig
  modelValue?: FormData
  validateOnMount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  validateOnMount: false
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: FormData]
  'submit': [data: FormData]
  'reset': []
  'validate': [isValid: boolean, errors: FormErrors]
}>()

// 响应式数据
const formData = ref<FormData>({})
const errors = ref<FormErrors>({})
const isSubmitting = ref(false)
const elFormRef = ref()

// 初始化表单数据
const initFormData = () => {
  const data: FormData = {}
  props.config.fields.forEach(field => {
    if (field.defaultValue !== undefined) {
      data[field.name] = field.defaultValue
    } else if (field.type === 'checkbox') {
      data[field.name] = []
    } else {
      data[field.name] = ''
    }
  })
  
  // 合并传入的初始值
  Object.assign(data, props.modelValue)
  formData.value = data
}

// 获取字段组件类型
const getFieldComponent = (type: FormFieldType): string => {
  switch (type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return 'el-input'
    case 'textarea':
      return 'el-input'
    case 'select':
      return 'el-select'
    case 'radio':
      return 'el-radio-group'
    case 'checkbox':
      return 'el-checkbox-group'
    case 'date':
      return 'el-date-picker'
    case 'file':
      return 'el-upload'
    default:
      return 'el-input'
  }
}

// 获取字段属性
const getFieldProps = (field: FormFieldConfig) => {
  const props: any = { ...field.attrs }
  
  switch (field.type) {
    case 'text':
      props.type = 'text'
      break
    case 'email':
      props.type = 'email'
      break
    case 'password':
      props.type = 'password'
      props.showPassword = true
      break
    case 'number':
      props.type = 'number'
      break
    case 'textarea':
      props.type = 'textarea'
      props.rows = 4
      break
    case 'date':
      props.type = 'date'
      props.format = 'YYYY-MM-DD'
      props.valueFormat = 'YYYY-MM-DD'
      break
    case 'select':
      props.clearable = true
      props.filterable = true
      break
    case 'file':
      props.action = '#'
      props.autoUpload = false
      break
  }
  
  return props
}

// 检查字段是否必填
const isRequired = (field: FormFieldConfig): boolean => {
  return field.validation?.some(rule => rule.required) || false
}

// 获取字段错误信息
const getFieldError = (fieldName: string): string => {
  return errors.value[fieldName] || ''
}

// Element Plus 验证规则转换
const getElValidationRules = (field: FormFieldConfig) => {
  if (!field.validation) return []
  
  return field.validation.map(validationRule => ({
    required: validationRule.required,
    message: validationRule.message || `${field.label}是必填项`,
    min: validationRule.min,
    max: validationRule.max,
    pattern: validationRule.pattern,
    validator: validationRule.validator ? (rule: any, value: any, callback: Function) => {
      const result = validationRule.validator!(value)
      if (result === true) {
        callback()
      } else {
        callback(new Error(typeof result === 'string' ? result : validationRule.message || `${field.label}验证失败`))
      }
    } : undefined,
    trigger: ['blur', 'change']
  }))
}

// 验证单个字段
const validateField = (fieldName: string) => {
  const field = props.config.fields.find(f => f.name === fieldName)
  if (!field || !field.validation) {
    delete errors.value[fieldName]
    return true
  }

  const value = formData.value[fieldName]
  const fieldErrors: string[] = []

  field.validation.forEach(rule => {
    if (rule.required && (!value || (Array.isArray(value) && value.length === 0))) {
      fieldErrors.push(rule.message || `${field.label}是必填项`)
    }

    if (value && rule.min !== undefined) {
      if (typeof value === 'string' && value.length < rule.min) {
        fieldErrors.push(rule.message || `${field.label}最少${rule.min}个字符`)
      } else if (typeof value === 'number' && value < rule.min) {
        fieldErrors.push(rule.message || `${field.label}最小值为${rule.min}`)
      }
    }

    if (value && rule.max !== undefined) {
      if (typeof value === 'string' && value.length > rule.max) {
        fieldErrors.push(rule.message || `${field.label}最多${rule.max}个字符`)
      } else if (typeof value === 'number' && value > rule.max) {
        fieldErrors.push(rule.message || `${field.label}最大值为${rule.max}`)
      }
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      fieldErrors.push(rule.message || `${field.label}格式不正确`)
    }

    if (rule.validator) {
      const result = rule.validator(value)
      if (result !== true) {
        fieldErrors.push(typeof result === 'string' ? result : rule.message || `${field.label}验证失败`)
      }
    }
  })

  if (fieldErrors.length > 0) {
    errors.value[fieldName] = fieldErrors[0] // Element Plus 只显示第一个错误
  } else {
    delete errors.value[fieldName]
  }

  return fieldErrors.length === 0
}

// 验证整个表单
const validateForm = async (): Promise<boolean> => {
  if (elFormRef.value) {
    try {
      await elFormRef.value.validate()
      emit('validate', true, {})
      return true
    } catch (error) {
      emit('validate', false, error)
      return false
    }
  }
  
  // 降级到手动验证
  let isValid = true
  props.config.fields.forEach(field => {
    if (!validateField(field.name)) {
      isValid = false
    }
  })
  
  emit('validate', isValid, errors.value)
  return isValid
}

// 提交表单
const handleSubmit = async () => {
  const isValid = await validateForm()
  if (!isValid) {
    return
  }

  isSubmitting.value = true
  try {
    emit('submit', { ...formData.value })
  } finally {
    isSubmitting.value = false
  }
}

// 重置表单
const handleReset = () => {
  if (elFormRef.value) {
    elFormRef.value.resetFields()
  }
  initFormData()
  errors.value = {}
  emit('reset')
}

// 监听表单数据变化
watch(formData, (newData) => {
  emit('update:modelValue', newData)
}, { deep: true })

// 监听外部数据变化
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    Object.assign(formData.value, newValue)
  }
}, { deep: true })

// 暴露方法给父组件
defineExpose({
  validate: validateForm,
  reset: handleReset,
  getFormData: () => formData.value,
  setFieldValue: (fieldName: string, value: any) => {
    formData.value[fieldName] = value
  }
})

// Element Plus 表单验证规则
const formRules = computed(() => {
  const rules: any = {}
  props.config.fields.forEach(field => {
    if (field.validation) {
      rules[field.name] = getElValidationRules(field)
    }
  })
  return rules
})

// 文件上传处理
const handleFileChange = (fieldName: string, file: any) => {
  formData.value[fieldName] = file
  validateField(fieldName)
}

// 组件挂载时初始化
onMounted(() => {
  initFormData()
  if (props.validateOnMount) {
    validateForm()
  }
})
</script>

<style scoped>
.base-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.base-form--horizontal {
  max-width: 800px;
}

.base-form--inline {
  max-width: none;
}

.base-form--small {
  padding: 16px;
}

.base-form--large {
  padding: 24px;
}

.form-field {
  margin-bottom: 20px;
}

.form-field--inline {
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 0;
  vertical-align: top;
}

.form-help {
  margin-top: 4px;
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}

.form-actions {
  margin-top: 24px;
  text-align: center;
}

.form-actions .el-button {
  margin: 0 8px;
}

/* Element Plus 组件样式覆盖 */
:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333;
}

:deep(.el-input__wrapper) {
  transition: all 0.3s;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

:deep(.el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 1px #409eff inset;
}

:deep(.el-textarea__inner) {
  transition: all 0.3s;
}

:deep(.el-textarea__inner:hover) {
  border-color: #c0c4cc;
}

:deep(.el-textarea.is-focus .el-textarea__inner) {
  border-color: #409eff;
}

:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 1px #409eff inset;
}

:deep(.el-radio-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

:deep(.el-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload .el-button) {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .base-form {
    padding: 16px;
    margin: 0 16px;
  }
  
  .base-form--horizontal :deep(.el-form-item) {
    flex-direction: column;
  }
  
  .form-actions {
    text-align: center;
  }
  
  .form-actions .el-button {
    width: 100%;
    margin: 4px 0;
  }
  
  :deep(.el-radio-group) {
    flex-direction: column;
    gap: 8px;
  }
  
  :deep(.el-checkbox-group) {
    flex-direction: column;
    gap: 8px;
  }
}

/* 暗色主题支持 */
@media (prefers-color-scheme: dark) {
  .base-form {
    background: #2d2d2d;
    color: #fff;
  }
  
  :deep(.el-form-item__label) {
    color: #e4e7ed;
  }
  
  .form-help {
    color: #b1b3b8;
  }
}

/* 内联布局特殊样式 */
.base-form--inline :deep(.el-form-item) {
  margin-right: 16px;
  margin-bottom: 0;
}

.base-form--inline .form-actions {
  display: inline-block;
  margin-top: 0;
  margin-left: 16px;
}

/* 垂直布局标签样式 */
.base-form--vertical :deep(.el-form-item__label) {
  text-align: left;
  padding-bottom: 8px;
}
</style>