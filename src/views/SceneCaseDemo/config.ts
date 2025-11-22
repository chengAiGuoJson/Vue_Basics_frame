import { ref, defineAsyncComponent } from "vue";

// 懒加载组件
const ConcurrentRequestDemo = defineAsyncComponent(() => import("./components/ConcurrentRequestDemo/ConcurrentRequestDemo.vue"));
const BigFileUploadDemo = defineAsyncComponent(() => import("./components/BigFileUploadDemo/BigFileUploadDemo.vue"));
const PageScreenshotDemo = defineAsyncComponent(() => import("./components/PageScreenshotDemo/PageScreenshotDemo.vue"));
export const useSceneCaseDemo = () => {
    const sceneCasesList =ref([
        { 
            title: "并发请求处理",
            description: "展示实际项目中如何处理并发请求，避免阻塞用户操作",
            component: ConcurrentRequestDemo,
        },
        {
            title: "大文件上传",
            description: "展示实际项目中如何处理大文件上传，避免超时和内存溢出",
            component: BigFileUploadDemo,
        },
        {
            title: "前端怎样实现页面截图",
            description: "展示实际项目中如何使用前端技术实现页面截图功能",
            component: PageScreenshotDemo,
        },
    ]) 

    return {
        sceneCasesList,
    }
}