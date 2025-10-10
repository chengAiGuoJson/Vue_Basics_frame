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

const handleClick = debounce(() => {
    console.log('防抖测试')
}, 1000)
</script>
<template>
    <div class="">
        <h1>tsjsDEMO</h1>
        <el-button type="primary" @click="handleClick">防抖测试</el-button>
    </div>
</template>
<style scoped></style>