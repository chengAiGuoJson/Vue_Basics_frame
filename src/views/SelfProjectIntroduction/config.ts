import { ref, defineAsyncComponent } from "vue";
const SelfProjectIntroduction = defineAsyncComponent(
  () => import("./components/SelfProjectIntroduction/index.vue")
);
const DigitalTwinProject = defineAsyncComponent(
  () => import("./components/DigitalTwinProject/index.vue")
);
const NetworkMaintenanceManagementSystem = defineAsyncComponent(
  () => import("./components/NetworkMaintenanceSystem/index.vue")
);

// 懒加载组件
export const useSceneCaseDemo = () => {
  const projectIntroductionList = ref([
    {
      title: "能大数据管理平台（可视化大屏）",
      description:
        "为解决集团能源数据孤岛问题，需构建一个可视化数据中心，将海量、抽象的后台数据转化为直观、可交互的前端界面，赋能业务决策。",
      path: "/self-project-introduction",
      icon: "📝",
      component: SelfProjectIntroduction,
    },
    {
      title: "数字孪生项目（智慧楼宇）",
      description:
        "为提升楼宇管理效率，需开发一套智能楼宇管理系统，实现对环境参数的实时监测与自动化调节。",
      path: "/digital-twin-project",
      icon: "📝",
      component: DigitalTwinProject,
    },
    {
      title: "网络维修费管理系统",
      description:
        "为满足中国移动集团财务稽核需求，需开发一套自动化稽核系统，处理超亿级工单与千万级基础数据，校验内部报账信息的真实性。",
      path: "/network-maintenance-management-system",
      icon: "📝",
      component: NetworkMaintenanceManagementSystem,
    },
  ]);

  return {
    projectIntroductionList,
  };
};
