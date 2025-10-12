<script lang="ts" setup>
import { debounce } from 'lodash'

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
</script>
<template>
    <div class="">
    
    </div>
</template>
<style scoped></style>