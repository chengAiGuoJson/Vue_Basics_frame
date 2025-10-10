// 表单字段类型枚举
export enum FormFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DATE = 'date',
  FILE = 'file'
}

// 选项接口（用于select、radio、checkbox）
export interface FormOption {
  label: string
  value: string | number | boolean
  disabled?: boolean
}

// 验证规则接口
export interface FormValidationRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  message?: string
  validator?: (value: any) => boolean | string
}

// 表单字段配置接口
export interface FormFieldConfig {
  name: string
  label: string
  type: FormFieldType
  placeholder?: string
  defaultValue?: any
  options?: FormOption[]
  validation?: FormValidationRule[]  // 修正为validation，与实现保持一致
  disabled?: boolean
  readonly?: boolean
  className?: string
  style?: Record<string, any>
  attrs?: Record<string, any>
  help?: string  // 简化help文本配置
  // Element Plus 特有属性
  clearable?: boolean
  filterable?: boolean
  showPassword?: boolean
  multiple?: boolean
  accept?: string
  rows?: number
}

// 按钮配置接口
export interface FormButtonConfig {
  text?: string
  className?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  loading?: boolean
}

// 表单配置接口
export interface FormConfig {
  fields: FormFieldConfig[]
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top'
  size?: 'large' | 'default' | 'small'  // 修正为Element Plus的尺寸选项
  showValidation?: boolean
  showButtons?: boolean
  showResetButton?: boolean
  submitButton?: FormButtonConfig
  resetButton?: FormButtonConfig
  className?: string
  style?: Record<string, any>
  // Element Plus 特有属性
  inline?: boolean
  hideRequiredAsterisk?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  scrollToError?: boolean
}

// 表单数据接口
export interface FormData {
  [key: string]: any
}

// 表单验证错误接口
export interface FormErrors {
  [key: string]: string  // 修正为单个错误字符串，与Element Plus保持一致
}