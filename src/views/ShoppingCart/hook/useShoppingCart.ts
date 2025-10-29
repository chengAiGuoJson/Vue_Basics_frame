import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ShoppingCart, Product, type CartEvent } from '../classes'

/**
 * 购物车组合式函数
 */
export function useShoppingCart() {
  // 创建购物车实例
  const cart = reactive(new ShoppingCart())
  
  // 响应式状态
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const cartItems = computed(() => cart.items)
  const totalAmount = computed(() => cart.getTotalAmount())
  const formattedTotalAmount = computed(() => cart.getFormattedTotalAmount())
  const totalQuantity = computed(() => cart.totalQuantity)
  const itemCount = computed(() => cart.itemCount)
  const isEmpty = computed(() => cart.isEmpty)
  const cartSummary = computed(() => cart.getSummary())

  // 事件处理函数
  const handleCartEvent = (event: CartEvent) => {
    console.log('购物车事件:', event)
    // 这里可以添加其他事件处理逻辑，比如保存到本地存储
    saveToLocalStorage()
  }

  // 添加商品到购物车
  const addProduct = async (product: Product, quantity: number = 1) => {
    try {
      isLoading.value = true
      error.value = null
      cart.addProduct(product, quantity)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '添加商品失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 移除商品
  const removeProduct = async (productId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const success = cart.removeProduct(productId)
      if (!success) {
        throw new Error('商品不存在')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '移除商品失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 更新商品数量
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      isLoading.value = true
      error.value = null
      const success = cart.updateQuantity(productId, quantity)
      if (!success) {
        throw new Error('商品不存在')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新数量失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 增加商品数量
  const increaseQuantity = async (productId: string, amount: number = 1) => {
    try {
      isLoading.value = true
      error.value = null
      const success = cart.increaseQuantity(productId, amount)
      if (!success) {
        throw new Error('商品不存在')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '增加数量失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 减少商品数量
  const decreaseQuantity = async (productId: string, amount: number = 1) => {
    try {
      isLoading.value = true
      error.value = null
      const success = cart.decreaseQuantity(productId, amount)
      if (!success) {
        throw new Error('商品不存在')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '减少数量失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 清空购物车
  const clearCart = async () => {
    try {
      isLoading.value = true
      error.value = null
      cart.clear()
    } catch (err) {
      error.value = err instanceof Error ? err.message : '清空购物车失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 获取商品数量
  const getProductQuantity = (productId: string) => {
    return cart.getProductQuantity(productId)
  }

  // 检查商品是否在购物车中
  const hasProduct = (productId: string) => {
    return cart.hasProduct(productId)
  }

  // 保存到本地存储
  const saveToLocalStorage = () => {
    try {
      const cartData = cart.toJSON()
      localStorage.setItem('shopping-cart', JSON.stringify(cartData))
    } catch (err) {
      console.error('保存购物车到本地存储失败:', err)
    }
  }

  // 从本地存储加载
  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem('shopping-cart')
      if (savedData) {
        const cartData = JSON.parse(savedData)
        const savedCart = ShoppingCart.fromJSON(cartData)
        // 将保存的数据合并到当前购物车
        cart.merge(savedCart)
      }
    } catch (err) {
      console.error('从本地存储加载购物车失败:', err)
    }
  }

  // 清除错误
  const clearError = () => {
    error.value = null
  }

  // 生命周期钩子
  onMounted(() => {
    // 添加事件监听器
    cart.addEventListener(handleCartEvent)
    // 从本地存储加载数据
    loadFromLocalStorage()
  })

  onUnmounted(() => {
    // 移除事件监听器
    cart.removeEventListener(handleCartEvent)
  })

  return {
    // 状态
    cart,
    cartItems,
    totalAmount,
    formattedTotalAmount,
    totalQuantity,
    itemCount,
    isEmpty,
    cartSummary,
    isLoading,
    error,

    // 方法
    addProduct,
    removeProduct,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getProductQuantity,
    hasProduct,
    clearError,
    saveToLocalStorage,
    loadFromLocalStorage
  }
}