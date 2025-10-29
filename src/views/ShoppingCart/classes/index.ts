/**
 * 购物车相关类的统一导出
 */

export { Product } from './Product'
export { CartItem } from './CartItem'
export { ShoppingCart, type CartEvent } from './ShoppingCart'

// 导出一些常用的类型定义
export interface ProductData {
  id: string
  name: string
  price: number
  image?: string
  description?: string
  category?: string
}

export interface CartItemData {
  product: ProductData
  quantity: number
  subtotal: number
}

export interface CartData {
  items: CartItemData[]
  totalAmount: number
  totalQuantity: number
  itemCount: number
}