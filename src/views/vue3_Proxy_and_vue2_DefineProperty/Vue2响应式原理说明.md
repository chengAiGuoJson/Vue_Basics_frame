# Vue2 Object.defineProperty 响应式原理详解

## 核心概念

Vue2的响应式系统基于ES5的`Object.defineProperty`API实现，通过劫持对象属性的getter和setter来实现数据的响应式。

## 主要组成部分

### 1. Object.defineProperty

```javascript
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get() {
    // 依赖收集
    console.log(`访问了属性 ${key}`);
    return val;
  },
  set(newVal) {
    // 派发更新
    console.log(`设置了属性 ${key}`);
    val = newVal;
  }
});
```

### 2. 依赖收集器 (Dep)

```javascript
class Dep {
  constructor() {
    this.subs = []; // 存储依赖的观察者
  }

  // 添加依赖
  depend() {
    if (currentWatcher) {
      this.subs.push(currentWatcher);
    }
  }

  // 通知所有依赖更新
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}
```

### 3. 观察者 (Watcher)

```javascript
class Watcher {
  constructor(fn) {
    this.fn = fn;
    this.get(); // 立即执行一次，触发依赖收集
  }

  get() {
    currentWatcher = this; // 设置当前观察者
    this.fn(); // 执行函数，触发getter
    currentWatcher = null; // 清空当前观察者
  }

  update() {
    this.fn(); // 重新执行函数
  }
}
```

## 响应式流程

### 1. 初始化阶段
1. 遍历data对象的所有属性
2. 使用`Object.defineProperty`为每个属性定义getter和setter
3. 为每个属性创建一个Dep实例

### 2. 依赖收集阶段
1. 当组件渲染或计算属性执行时，创建Watcher实例
2. Watcher执行时会访问响应式数据
3. 访问数据触发getter，在getter中调用`dep.depend()`收集当前Watcher

### 3. 派发更新阶段
1. 当数据发生变化时，触发setter
2. 在setter中调用`dep.notify()`通知所有依赖的Watcher
3. Watcher收到通知后重新执行，更新视图

## 核心代码实现

### 响应式处理函数

```javascript
function defineReactive(obj, key, val) {
  const dep = new Dep();
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 依赖收集
      if (currentWatcher) {
        dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 派发更新
      dep.notify();
    }
  });
}
```

### 对象响应式处理

```javascript
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}
```

## 数组响应式处理

Vue2对数组的响应式处理比较特殊，因为`Object.defineProperty`无法监听数组的变化。Vue2通过重写数组的原型方法来实现：

```javascript
const arrayMethods = Object.create(Array.prototype);
const methodsToIntercept = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

methodsToIntercept.forEach(method => {
  const original = Array.prototype[method];
  Object.defineProperty(arrayMethods, method, {
    value: function(...args) {
      const result = original.apply(this, args);
      // 触发更新
      this.__dep__.notify();
      return result;
    }
  });
});
```

## 限制和问题

### 1. 对象属性的限制
- 无法检测对象属性的添加或删除
- 需要使用`Vue.set`或`vm.$set`来添加响应式属性

### 2. 数组索引的限制
- 无法检测通过索引直接设置数组项
- 无法检测修改数组长度

### 3. 性能问题
- 需要递归遍历所有属性
- 深层嵌套对象的性能开销较大

## Vue3的改进

Vue3使用Proxy替代了Object.defineProperty，解决了以上问题：
- 可以监听对象属性的添加和删除
- 可以监听数组索引和length的变化
- 更好的性能表现

## 实际应用示例

```javascript
// 创建响应式数据
const data = {
  message: 'Hello Vue!',
  count: 0
};

// 使数据响应式
observe(data);

// 创建观察者（模拟组件渲染）
new Watcher(() => {
  console.log(`渲染: ${data.message}, 计数: ${data.count}`);
});

// 修改数据，自动触发重新渲染
data.message = 'Hello World!'; // 输出: 渲染: Hello World!, 计数: 0
data.count = 1; // 输出: 渲染: Hello World!, 计数: 1
```

## 总结

Vue2的响应式系统通过`Object.defineProperty`、Dep和Watcher三个核心组件，实现了数据变化到视图更新的自动化流程。虽然存在一些限制，但在当时是一个非常优雅的解决方案，为Vue的流行奠定了基础。