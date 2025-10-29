import { Product } from './Product'
import { CartItem } from './CartItem'

/**
 * 购物车事件类型
 */
export interface CartEvent {
  type: 'add' | 'remove' | 'update' | 'clear'
  item?: CartItem
  productId?: string
  quantity?: number
}

/**
 * 购物车类 - 管理购物车的所有操作
 */
export class ShoppingCart {
  private _items: Map<string, CartItem> = new Map()
  private _listeners: ((event: CartEvent) => void)[] = []

  constructor() {
    this._items = new Map()
    this._listeners = []
  }

  /**
   * 获取所有购物车项
   */
  get items(): CartItem[] {
    return Array.from(this._items.values())
  }

  /**
   * 获取购物车项数量
   */
  get itemCount(): number {
    return this._items.size
  }

  /**
   * 获取商品总数量
   */
  get totalQuantity(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  /**
   * 检查购物车是否为空
   */
  get isEmpty(): boolean {
    return this._items.size === 0
  }

  /**
   * 添加商品到购物车
   */
  addProduct(product: Product, quantity: number = 1): void {
    if (!product || !product.isValid()) {
      throw new Error('无效的商品信息')
    }
    if (quantity <= 0) {
      throw new Error('商品数量必须大于0')
    }

    const existingItem = this._items.get(product.id)
    
    if (existingItem) {
      // 如果商品已存在，增加数量
      existingItem.increaseQuantity(quantity)
      this._notifyListeners({
        type: 'update',
        item: existingItem,
        quantity: existingItem.quantity
      })
    } else {
      // 如果商品不存在，创建新的购物车项
      const newItem = new CartItem(product, quantity)
      this._items.set(product.id, newItem)
      this._notifyListeners({
        type: 'add',
        item: newItem
      })
    }
  }

  /**
   * 从购物车移除商品
   */
  removeProduct(productId: string): boolean {
    const item = this._items.get(productId)
    if (item) {
      this._items.delete(productId)
      this._notifyListeners({
        type: 'remove',
        productId,
        item
      })
      return true
    }
    return false
  }

  /**
   * 更新商品数量
   */
  updateQuantity(productId: string, quantity: number): boolean {
    if (quantity <= 0) {
      throw new Error('商品数量必须大于0')
    }

    const item = this._items.get(productId)
    if (item) {
      const oldQuantity = item.quantity
      item.updateQuantity(quantity)
      this._notifyListeners({
        type: 'update',
        item,
        quantity
      })
      return true
    }
    return false
  }

  /**
   * 增加商品数量
   */
  increaseQuantity(productId: string, amount: number = 1): boolean {
    const item = this._items.get(productId)
    if (item) {
      item.increaseQuantity(amount)
      this._notifyListeners({
        type: 'update',
        item,
        quantity: item.quantity
      })
      return true
    }
    return false
  }

  /**
   * 减少商品数量
   */
  decreaseQuantity(productId: string, amount: number = 1): boolean {
    const item = this._items.get(productId)
    if (item) {
      try {
        item.decreaseQuantity(amount)
        this._notifyListeners({
          type: 'update',
          item,
          quantity: item.quantity
        })
        return true
      } catch (error) {
        // 如果减少后数量为0或负数，直接移除商品
        this.removeProduct(productId)
        return true
      }
    }
    return false
  }

  /**
   * 获取指定商品的购物车项
   */
  getItem(productId: string): CartItem | undefined {
    return this._items.get(productId)
  }

  /**
   * 检查商品是否在购物车中
   */
  hasProduct(productId: string): boolean {
    return this._items.has(productId)
  }

  /**
   * 获取指定商品的数量
   */
  getProductQuantity(productId: string): number {
    const item = this._items.get(productId)
    return item ? item.quantity : 0
  }

  /**
   * 计算购物车总金额
   */
  getTotalAmount(): number {
    return this.items.reduce((total, item) => total + item.getSubtotal(), 0)
  }

  /**
   * 获取格式化的总金额
   */
  getFormattedTotalAmount(): string {
    return `¥${this.getTotalAmount().toFixed(2)}`
  }

  /**
   * 清空购物车
   */
  clear(): void {
    this._items.clear()
    this._notifyListeners({ type: 'clear' })
  }

  /**
   * 获取购物车摘要信息
   */
  getSummary(): string {
    if (this.isEmpty) {
      return '购物车为空'
    }
    return `共 ${this.itemCount} 种商品，${this.totalQuantity} 件，总计 ${this.getFormattedTotalAmount()}`
  }

  /**
   * 添加事件监听器
   */
  addEventListener(listener: (event: CartEvent) => void): void {
    this._listeners.push(listener)
  }

  /**
   * 移除事件监听器
   */
  removeEventListener(listener: (event: CartEvent) => void): void {
    const index = this._listeners.indexOf(listener)
    if (index > -1) {
      this._listeners.splice(index, 1)
    }
  }

  /**
   * 通知所有监听器
   */
  private _notifyListeners(event: CartEvent): void {
    this._listeners.forEach(listener => {
      try {
        listener(event)
      } catch (error) {
        console.error('购物车事件监听器执行错误:', error)
      }
    })
  }

  /**
   * 转换为JSON对象
   */
  toJSON() {
    return {
      items: this.items.map(item => item.toJSON()),
      totalAmount: this.getTotalAmount(),
      totalQuantity: this.totalQuantity,
      itemCount: this.itemCount
    }
  }

  /**
   * 从JSON对象恢复购物车
   */
  static fromJSON(json: any): ShoppingCart {
    const cart = new ShoppingCart()
    if (json.items && Array.isArray(json.items)) {
      json.items.forEach((itemData: any) => {
        try {
          const item = CartItem.fromJSON(itemData)
          cart._items.set(item.productId, item)
        } catch (error) {
          console.error('恢复购物车项失败:', error)
        }
      })
    }
    return cart
  }

  /**
   * 克隆购物车
   */
  clone(): ShoppingCart {
    const newCart = new ShoppingCart()
    this.items.forEach(item => {
      newCart._items.set(item.productId, item.clone())
    })
    return newCart
  }

  /**
   * 合并另一个购物车
   */
  merge(otherCart: ShoppingCart): void {
    otherCart.items.forEach(item => {
      this.addProduct(item.product, item.quantity)
    })
  }
}