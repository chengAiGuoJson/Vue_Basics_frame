import { Product } from './Product'

/**
 * 购物车项类 - 表示购物车中的一个商品项，包含商品和数量信息
 */
export class CartItem {
  private _product: Product
  private _quantity: number

  constructor(product: Product, quantity: number = 1) {
    if (quantity <= 0) {
      throw new Error('商品数量必须大于0')
    }
    if (!product || !product.isValid()) {
      throw new Error('无效的商品信息')
    }

    this._product = product
    this._quantity = quantity
  }

  /**
   * 获取商品信息
   */
  get product(): Product {
    return this._product
  }

  /**
   * 获取数量
   */
  get quantity(): number {
    return this._quantity
  }

  /**
   * 设置数量
   */
  set quantity(value: number) {
    if (value <= 0) {
      throw new Error('商品数量必须大于0')
    }
    this._quantity = value
  }

  /**
   * 获取商品ID
   */
  get productId(): string {
    return this._product.id
  }

  /**
   * 获取商品名称
   */
  get productName(): string {
    return this._product.name
  }

  /**
   * 获取单价
   */
  get unitPrice(): number {
    return this._product.price
  }

  /**
   * 计算小计金额
   */
  getSubtotal(): number {
    return this._product.price * this._quantity
  }

  /**
   * 获取格式化的小计金额
   */
  getFormattedSubtotal(): string {
    return `¥${this.getSubtotal().toFixed(2)}`
  }

  /**
   * 增加数量
   */
  increaseQuantity(amount: number = 1): void {
    if (amount <= 0) {
      throw new Error('增加数量必须大于0')
    }
    this._quantity += amount
  }

  /**
   * 减少数量
   */
  decreaseQuantity(amount: number = 1): void {
    if (amount <= 0) {
      throw new Error('减少数量必须大于0')
    }
    if (this._quantity - amount <= 0) {
      throw new Error('数量不能减少到0或负数')
    }
    this._quantity -= amount
  }

  /**
   * 更新数量
   */
  updateQuantity(newQuantity: number): void {
    if (newQuantity <= 0) {
      throw new Error('商品数量必须大于0')
    }
    this._quantity = newQuantity
  }

  /**
   * 检查是否是同一个商品
   */
  isSameProduct(product: Product): boolean {
    return this._product.id === product.id
  }

  /**
   * 克隆购物车项
   */
  clone(): CartItem {
    return new CartItem(this._product, this._quantity)
  }

  /**
   * 转换为JSON对象
   */
  toJSON() {
    return {
      product: this._product.toJSON(),
      quantity: this._quantity,
      subtotal: this.getSubtotal()
    }
  }

  /**
   * 从JSON对象创建CartItem实例
   */
  static fromJSON(json: any): CartItem {
    const product = Product.fromJSON(json.product)
    return new CartItem(product, json.quantity)
  }

  /**
   * 获取购物车项的描述信息
   */
  getDescription(): string {
    return `${this._product.name} x ${this._quantity} = ${this.getFormattedSubtotal()}`
  }
}