<template>
  <div class="shopping-cart-container">
    <div class="header">
      <h1>购物车演示</h1>
      <p class="subtitle">基于面向对象设计的购物车功能</p>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      <span>{{ error }}</span>
      <button @click="clearError" class="close-btn">×</button>
    </div>

    <!-- 商品列表 -->
    <div class="products-section">
      <h2>商品列表</h2>
      <div class="products-grid">
        <div 
          v-for="product in availableProducts" 
          :key="product.id"
          class="product-card"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">{{ product.getFormattedPrice() }}</div>
            <div class="product-actions">
              <button 
                @click="handleAddProduct(product)"
                :disabled="isLoading"
                class="add-btn"
              >
                <span v-if="hasProduct(product.id)">
                  已在购物车 ({{ getProductQuantity(product.id) }})
                </span>
                <span v-else>加入购物车</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车 -->
    <div class="cart-section">
      <div class="cart-header">
        <h2>购物车</h2>
        <div class="cart-summary">{{ cartSummary }}</div>
      </div>

      <div v-if="isEmpty" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <p>购物车是空的</p>
        <p class="empty-hint">请从上方商品列表中添加商品</p>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div 
            v-for="item in cartItems" 
            :key="item.productId"
            class="cart-item"
          >
            <div class="item-image">
              <img :src="item.product.image" :alt="item.product.name" />
            </div>
            <div class="item-info">
              <h4>{{ item.product.name }}</h4>
              <p class="item-price">单价: {{ item.product.getFormattedPrice() }}</p>
            </div>
            <div class="item-quantity">
              <button 
                @click="handleDecreaseQuantity(item.productId)"
                :disabled="isLoading"
                class="quantity-btn"
              >
                -
              </button>
              <span class="quantity">{{ item.quantity }}</span>
              <button 
                @click="handleIncreaseQuantity(item.productId)"
                :disabled="isLoading"
                class="quantity-btn"
              >
                +
              </button>
            </div>
            <div class="item-subtotal">
              {{ item.getFormattedSubtotal() }}
            </div>
            <div class="item-actions">
              <button 
                @click="handleRemoveProduct(item.productId)"
                :disabled="isLoading"
                class="remove-btn"
              >
                删除
              </button>
            </div>
          </div>
        </div>

        <div class="cart-footer">
          <div class="cart-total">
            <div class="total-info">
              <span class="total-label">总计:</span>
              <span class="total-amount">{{ formattedTotalAmount }}</span>
            </div>
            <div class="total-details">
              共 {{ itemCount }} 种商品，{{ totalQuantity }} 件
            </div>
          </div>
          <div class="cart-actions">
            <button 
              @click="handleClearCart"
              :disabled="isLoading"
              class="clear-btn"
            >
              清空购物车
            </button>
            <button 
              @click="handleCheckout"
              :disabled="isLoading"
              class="checkout-btn"
            >
              结算
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useShoppingCart } from './hook/useShoppingCart'
import { Product } from './classes'

// 使用购物车hook
const {
  cartItems,
  totalAmount,
  formattedTotalAmount,
  totalQuantity,
  itemCount,
  isEmpty,
  cartSummary,
  isLoading,
  error,
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  getProductQuantity,
  hasProduct,
  clearError
} = useShoppingCart()

// 模拟商品数据
const availableProducts = ref<Product[]>([])

// 初始化商品数据
const initProducts = () => {
  const productsData = [
    {
      id: '1',
      name: '椰云拿铁',
      price: 32,
      image: '☕',
      description: '1人份 【千里香】一口',
      category: '咖啡'
    },
    {
      id: '2',
      name: '生椰拿铁',
      price: 19.9,
      image: '🥥',
      description: '1人份 【YYDS，无添加】',
      category: '咖啡'
    },
    {
      id: '3',
      name: '加浓 美式',
      price: 20.3,
      image: '☕',
      description: '1人份 【浓郁香醇，提神】',
      category: '咖啡'
    },
    {
      id: '4',
      name: '瓦尔登蓝钻奶昔',
      price: 38,
      image: '🥤',
      description: '1人份 【颜值担当】蓝色',
      category: '奶昔'
    },
    {
      id: '5',
      name: '椰云榛果美式',
      price: 21.12,
      image: '☕',
      description: '1人份 【千里香】大口喝',
      category: '咖啡'
    }
  ]

  availableProducts.value = productsData.map(data => 
    new Product(data.id, data.name, data.price, data.image, data.description, data.category)
  )
}

// 事件处理函数
const handleAddProduct = async (product: Product) => {
  try {
    await addProduct(product, 1)
  } catch (err) {
    console.error('添加商品失败:', err)
  }
}

const handleRemoveProduct = async (productId: string) => {
  try {
    await removeProduct(productId)
  } catch (err) {
    console.error('移除商品失败:', err)
  }
}

const handleIncreaseQuantity = async (productId: string) => {
  try {
    await increaseQuantity(productId, 1)
  } catch (err) {
    console.error('增加数量失败:', err)
  }
}

const handleDecreaseQuantity = async (productId: string) => {
  try {
    await decreaseQuantity(productId, 1)
  } catch (err) {
    console.error('减少数量失败:', err)
  }
}

const handleClearCart = async () => {
  if (confirm('确定要清空购物车吗？')) {
    try {
      await clearCart()
    } catch (err) {
      console.error('清空购物车失败:', err)
    }
  }
}

const handleCheckout = () => {
  if (isEmpty.value) {
    alert('购物车是空的，无法结算')
    return
  }
  alert(`结算成功！总金额: ${formattedTotalAmount.value}`)
}

// 组件挂载时初始化
onMounted(() => {
  initProducts()
})
</script>

<style scoped>
.shopping-cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  color: #666;
  font-size: 14px;
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  color: #c33;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
}

.products-section {
  margin-bottom: 40px;
}

.products-section h2 {
  color: #333;
  margin-bottom: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.product-image {
  text-align: center;
  margin-bottom: 12px;
}

.product-image img {
  font-size: 48px;
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 16px;
}

.product-description {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #e67e22;
  margin-bottom: 12px;
}

.add-btn {
  width: 100%;
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.add-btn:hover:not(:disabled) {
  background: #2980b9;
}

.add-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.cart-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.cart-header h2 {
  margin: 0;
  color: #333;
}

.cart-summary {
  color: #666;
  font-size: 14px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-hint {
  font-size: 14px;
  color: #999;
}

.cart-items {
  margin-bottom: 24px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.item-image {
  margin-right: 16px;
}

.item-image img {
  font-size: 32px;
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
}

.item-info {
  flex: 1;
  margin-right: 16px;
}

.item-info h4 {
  margin: 0 0 4px 0;
  color: #333;
  font-size: 16px;
}

.item-price {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.item-quantity {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.quantity-btn:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  color: #ccc;
}

.quantity {
  margin: 0 12px;
  font-weight: bold;
  min-width: 24px;
  text-align: center;
}

.item-subtotal {
  font-weight: bold;
  color: #e67e22;
  margin-right: 16px;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.remove-btn:hover:not(:disabled) {
  background: #c0392b;
}

.remove-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.cart-footer {
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-total {
  flex: 1;
}

.total-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.total-label {
  font-size: 18px;
  color: #333;
  margin-right: 12px;
}

.total-amount {
  font-size: 24px;
  font-weight: bold;
  color: #e67e22;
}

.total-details {
  color: #666;
  font-size: 14px;
}

.cart-actions {
  display: flex;
  gap: 12px;
}

.clear-btn {
  padding: 12px 24px;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.clear-btn:hover:not(:disabled) {
  background: #7f8c8d;
}

.checkout-btn {
  padding: 12px 24px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.checkout-btn:hover:not(:disabled) {
  background: #229954;
}

.clear-btn:disabled,
.checkout-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .shopping-cart-container {
    padding: 16px;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .cart-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .cart-actions {
    justify-content: stretch;
  }
  
  .cart-actions button {
    flex: 1;
  }
}
</style>