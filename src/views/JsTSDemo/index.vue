<script lang="ts" setup>
import { debounce } from "lodash";

/**
 * promise 详解
 * .then 方法有返回值return 时，会将返回值传递给下一个.then 方法
 * .then 方法没有返回值时，会将上一个.then 方法的返回值传递给下一个.then 方法
 * 如果.then 方法返回的是一个Promise 对象，那么下一个.then 方法会等待这个Promise 对象resolve 后再执行
 */
// Promise.resolve('初始值')
//     .then(value => {
//         console.log('接收到值:', value)
//         return value + ' - 第一次转换' // 返回新值
//     })
//     .then(value => {
//         console.log('接收到值:', value)
//         // return value + ' - 第二次转换'
//         // 返回一个新的Promise
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve(value + ' - 异步转换')
//             }, 500)
//         })
//     })
//     .then(value => {
//         console.log('接收到异步转换后的值:', value)
//         return value + ' - 第三次转换'
//         // return new Promise(resolve => {
//         //     resolve(value + ' - 第二次转换')
//         // })
//         // 不返回值
//     })
//     .then(value => {
//         console.log('没有返回值时，接收到:', value) // undefined
//     })
/**
 * Parameters<T>
 * 用于获取函数类型 T 的参数类型，将其作为一个元组类型返回。
 * 例如：Parameters<(a: number, b: string) => void> 会返回 [number, string]
 * 可以用于获取函数的参数类型，方便在类型注解中使用。
 * ReturnType<T>
 * 用于获取函数类型 T 的返回值类型。
 * 例如：ReturnType<(a: number, b: string) => number> 会返回 number
 * 可以用于获取函数的返回值类型，方便在类型注解中使用。
 */
// function fetchUserData(arg: { userId: string; token: string }) {
//     return {
//         userId: arg.userId,
//         token: arg.token,
//         userInfo: {
//             name: '张三',
//             age: 18
//         }
//     }
// }
// type FeatParams = Parameters<typeof fetchUserData>
// type FeatReturn = ReturnType<typeof fetchUserData>
// function textFn(arg: FeatParams[0]) {
// }
// textFn({ userId: '张三', token: '123' })

/**
 * 事件循环机制
 * 事件循环是一种机制，用于处理异步操作。它是浏览器或 Node.js 等环境中的一种机制，用于处理异步操作的回调函数。
 * 事件循环的执行顺序如下：
 * 1. 执行当前的宏任务(最初是整个脚本)
 * 2. 执行过程中可能产生新的宏任务和微任务，分别加入相应队列
 * 3. 当前宏任务执行完毕
 * 4. 执行所有微任务队列中的任务(包括执行微任务过程中新产生的微任务)
 * 5. 微任务队列清空后，进入下一轮事件循环，取出下一个宏任务执行
 * 6. 重复以上步骤
 */
// async function async1() {
//   console.log('async1 start'); // 2
//   await new Promise(resolve => {
//     console.log('promise1'); // 3
//     resolve();
//   }).then(() => {
//     console.log('promise2'); // 6 微任务
//   });
//   console.log('async1 end'); // 7 微任务
// }

// console.log('script start'); // 1

// setTimeout(() => {
//   console.log('setTimeout'); // 9 宏任务
// }, 0);

// async1();

// new Promise(resolve => {
//   console.log('promise3'); // 4
//   resolve();
// }).then(() => {
//   console.log('promise4'); // 8 微任务
// });

// console.log('script end'); // 5

/**
 * 动物类
 * 动物类的实例属性有 name 和 age
 * 如果定义了static 关键字，那么这个属性就属于类本身，而不是类的实例(species)，它在构造函数里面
 * 动物类的实例方法有 eat 和 run
 * 如果定义了static 关键字，那么这个方法就属于类本身，而不是类的实例，它在构造函数里面
 * Animal.name 有值的原因
    Animal.name 输出的是 "Animal" ，这是因为：
    所有函数（包括类）都有一个内置的 name 属性
    这个属性返回函数/类的名称
    Animal.name 返回字符串 "Animal"
 */
// class Animal {
//     name: string;
//     age: number = 18;
//     static species: string = '动物';
//     static eat() {
//         console.log(this.species + '正在吃饭');
//     }
//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }
//     eat() {
//         console.log(this.name + '正在吃饭');
//     }
//     run() {
//         console.log(this.name + '正在跑步');
//     }
// }
// console.log(Animal.prototype,'动物类的原型对象')
// const cat = new Animal('小白',2);
// console.log(cat)
// const dog = new Animal('旺财',3);
// console.log(dog)

// console.log(dog.__proto__ === Animal.prototype,'动物类的原型对象') // true
// console.log(Animal.__proto__ === Function.prototype,'动物类的原型对象') // true

// function Animal2() {
//     this.name = '动物2';
// }
// console.log(Animal2.__proto__ === Function.prototype,'动物类的原型对象') // true
// console.log(Animal2.prototype,'动物类的原型对象') // 类的原型就是它本身

// const cat = new Animal('小白');
// const obj = {
//     name: '张三',
//     age: 18
// }
// console.log(Animal.eat.prototype === Function.prototype)
// console.log(obj.prototype)
// console.log(obj.__proto__ === Object.prototype,'对象的原型对象')
// console.log(cat.__proto__ === Animal.prototype,'动物类的原型对象')
// console.log(Animal.__proto__ === Function.prototype,'动物类的原型对象')
// cat.eat();
// const jantou = () =>{
//     console.log('我是箭头函数');
// }
// console.log(jantou.__proto__,'箭头函数的原型对象')
// console.log(jantou.prototype,'箭头函数的原型对象')
// console.log(Animal.prototype,'动物类的原型对象')
// console.log(Animal.__proto__,'动物类的原型对象')

import TrafficLight from "@/components/TrafficLight/index.vue";
import { fa } from "element-plus/es/locales.mjs";
/**
 * 实现add函数
 * const r1 = add[1][2][3] + 4
 * const r2 = add[10][20] + 30
 * const r3 = add[100][200][300] + 400
 */
// const add = (() => {
//   let sum = 0;
//   const target = {};
//   const handler = {
//     get(target, prop, receiver) {
//       // a. 处理隐式转换的属性访问
//       if (prop === "valueOf" || prop === Symbol.toPrimitive) {
//         // 关键：返回一个函数，该函数返回当前的 sum
//         // 同时，在这里重置 sum，以便下次计算从 0 开始
//         console.log("执行这里1231231321");
//         const result = () => {
//           const finalSum = sum;
//           sum = 0; // 重置 sum
//           return finalSum;
//         };
//         return result;
//       }

//       // b. 处理数字属性的访问
//       const numValue = parseInt(prop as string, 10);
//       // 校验一下确保是数字属性
//       if (!isNaN(numValue)) {
//         console.log("zhixing");
//         sum += numValue;
//         // 返回代理自身，实现链式调用
//         return receiver;
//       }

//       // c. 对于其他属性，执行默认行为
//       return Reflect.get(target, prop, receiver);
//     },
//   };
//   return new Proxy(target, handler);
// })();
// const r1 = add[10][20] + 4;
// console.log(r1);
// const r2 = add[10][20][30] + 4;
// console.log(r2);

/**
 * try catch监听一个promise函数
 * catch能捕获到函数通过throw抛出的的错误
 */
// const testErrFn = async (a?: number, b?: number) => {
//   // 校验错误信息数组
//   const errors = [];
//   if (!a) {
//     errors.push("a参数不能为空");
//     throw new Error("a参数不能为空");
//   }
//   if (!b) {
//     errors.push("b参数不能为空");
//     throw new Error("b参数不能为空");
//   }
//   return true;
// };
// const zxFn = async () => {
//   try {
//     const res = await testErrFn(1);
//     if (res) {
//       console.log(res, "res是什么数据呢");
//     }
//   } catch (err) {
//     console.log(err, "错误数据");
//   }
// };
// zxFn();
/**
 * 测试一个object.defineProperty
 * 测试一个proxy
 * 的监听原理
 */
const obj = [1, 2, 3, 4];
// Object.defineProperty(obj, "length", {
//   get() {
//     console.log("get length", obj);
//     return obj.length;
//   },
//   set(val) {
//     console.log("set length", val);
//     this.length = val;
//   },
// });
// obj.push(5);
// const p = new Proxy(obj, {
//   get(target, prop, receiver) {
//     console.log("get", prop);
//     return Reflect.get(target, prop, receiver);
//   },
//   set(target, prop, value, receiver) {
//     console.log("set", prop, value);
//     return Reflect.set(target, prop, value, receiver);
//   },
// });
// p.push(5);
// console.log(obj);
/**
 *
 * @param fn 要防抖的函数
 * @param sum 防抖的时间间隔
 * @param isImmediate 是否立即执行
 */
function debounce(fn, sum, isImmediate) {
  let timer = null;
  return function (...agres) {
    console.log("agres", agres);
    let _this = this;
    if (timer) clearTimeout(timer);
    if (isImmediate) {
      fn.apply(_this, agres);
    } else {
      timer = setTimeout(() => {
        fn.apply(_this, agres);
      }, sum);
    }
  };
}
const debouncedDeb = debounce(
  (parmes) => {
    console.log("我是防抖函数", parmes);
  },
  1000,
  false
);
/**
 * 节流函数
 */
// function throttle(fn, sum, istimer) {
//   let timer = null;
//   return function (...agr) {
//     if (istimer) {
//       fn.apply(_this, agr);
//     } else {
//       if (!timer) {
//         timer = setTimeout(() => {
//           fn.apply(this, agr);
//           timer = null;
//         }, sum);
//       }
//     }
//   };
// }
// const throttledThrottle = throttle(
//   (params) => {
//     console.log("我是节流函数", params);
//   },
//   1000,
//   false
// );

// function timerjl(fn, timer) {
//   let timernow = 0;
//   return function (...gra) {
//     let now = Date.now();
//     if (now - timernow > timer) {
//       fn.apply(this, gra);
//       timernow = now;
//     }
//   };
// }
// const throttledTimer = timerjl((params) => {
//   console.log("我是定时器函数时间戳", params);
// }, 1000);

// const listArr = [
//   { id: 1, name: "部门A", parentId: null },
//   { id: 2, name: "部门B", parentId: 1 },
//   { id: 3, name: "部门C", parentId: 1 },
//   { id: 4, name: "部门D", parentId: 2 },
//   { id: 5, name: "部门E", parentId: 2 },
//   { id: 6, name: "部门F", parentId: 3 },
// ];

// function arrayToTree(list) {
//   const map = new Map();
//   const result = [];
//   list.forEach((element) => {
//     map.set(element.id, { ...element, Children: [] });
//   });
//   list.forEach((element) => {
//     const node = map.get(element.id);
//     if (!node.parentId) {
//       result.push(node);
//       return;
//     }
//     const parent = map.get(element.parentId);
//     if (parent) {
//       parent.Children.push(node);
//     }
//   });
//   console.log(map, "map");
//   return result;
// }
// console.log(arrayToTree(listArr), "arr数据");

// const mapTest = new Map();
// mapTest.set(1, { id: 1, name: "部门A", parentId: null, Children: [] });
// mapTest.set(2, { id: 2, name: "部门B", parentId: 1, Children: [] });
// // console.log(mapTest,"mapTest")
// const node = mapTest.get(1);
// // console.log(node,"node")
// // const result = [];
// // result.push(node);
// // console.log(result,"result")
// node.Children.push(mapTest.get(2));
// // console.log(result, "result");
// console.log(node, "node");
// console.log(mapTest, "mapTest");
</script>
<template>
  <div class="">
    <!-- <TrafficLight></TrafficLight> -->
    <div
      class="text-24px color-[#000] cursor-pointer"
      @click="debouncedDeb({ name: 'aiguo', age: 18 })"
    >
      防抖
    </div>
    <div
      class="text-24px color-[#000] cursor-pointer"
      @click="throttledThrottle({ name: 'aiguo', age: 18 })"
    >
      节流
    </div>
    <div
      class="text-24px color-[#000] cursor-pointer"
      @click="throttledTimer({ name: 'aiguo', age: 18 })"
    >
      时间戳节流版本
    </div>
  </div>
</template>
<style scoped></style>
