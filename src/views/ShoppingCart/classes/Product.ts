/**
 * 商品类 - 表示一个商品的基本信息
 */
export class Product {
  public readonly id: string
  public readonly name: string
  public readonly price: number
  public readonly image: string
  public readonly description: string
  public readonly category: string

  constructor(
    id: string,
    name: string,
    price: number,
    image: string = '',
    description: string = '',
    category: string = ''
  ) {
    if (price < 0) {
      throw new Error('商品价格不能为负数')
    }
    if (!name.trim()) {
      throw new Error('商品名称不能为空')
    }

    this.id = id
    this.name = name.trim()
    this.price = price
    this.image = image
    this.description = description
    this.category = category
  }

  /**
   * 获取格式化的价格字符串
   */
  getFormattedPrice(): string {
    return `¥${this.price.toFixed(2)}`
  }

  /**
   * 检查商品是否有效
   */
  isValid(): boolean {
    return this.id.length > 0 && this.name.length > 0 && this.price >= 0
  }

  /**
   * 获取商品的简要信息
   */
  getSummary(): string {
    return `${this.name} - ${this.getFormattedPrice()}`
  }

  /**
   * 转换为JSON对象
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      image: this.image,
      description: this.description,
      category: this.category
    }
  }

  /**
   * 从JSON对象创建Product实例
   */
  static fromJSON(json: any): Product {
    return new Product(
      json.id,
      json.name,
      json.price,
      json.image || '',
      json.description || '',
      json.category || ''
    )
  }
}