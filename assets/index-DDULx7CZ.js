import{d as v,H as u}from"./index-Du4JMgtq.js";import{d as p,B as g,o as h,v as f,c as t,a as n,b as s,a0 as _,_ as m,r as S,y,g as D,F as M,f as b,C as w,t as V,z as l,aa as x}from"./index-CBNB1lXo.js";const B=["innerHTML"],k=p({__name:"markDownVue",props:{bigMd:{type:String,default:""}},setup(c){const i=c,o=g(()=>v.parse(i.bigMd)),a=()=>{_(()=>{u.highlightAll()})};return h(()=>{a()}),f(o,()=>{a()}),(e,r)=>(n(),t("div",null,[s("div",{class:"markdown-body mt-16px",innerHTML:o.value},null,8,B)]))}}),C=m(k,[["__scopeId","data-v-f14dc452"]]),E=`### 批量请求数据并增量渲染 ECharts 图表\r
\r
\`\`\`\r
// series配合修改\r
{\r
    name: '分布式光伏用户',\r
    type: 'scatter',\r
    coordinateSystem: 'geo',\r
    geoIndex: 1,\r
    z: 6,\r
    data: electricData.value,\r
    symbol: 'circle',\r
    symbolSize: 22,\r
    itemStyle: { color: '#2EB993' },\r
    progressive: 300,\r
    progressiveThreshold: 3000,\r
},\r
\r
import { to } from '@web/common/util'\r
/**\r
 * 批量请求数据并增量渲染ECharts图表\r
 * @param {object} options - 配置项\r
 * @param {Function} options.apiFn - 获取数据的API函数，该函数应返回一个Promise\r
 * @param {object} options.apiParams - API函数的固定参数\r
 * @param {import('vue').Ref<any[]>} options.dataRef - 用于存储所有数据的ref对象\r
 * @param {object} options.chart - ECharts实例\r
 * @param {string} options.activeType - 当前激活的图表类型，用于判断是否需要渲染\r
 * @param {string} options.type - 此方法对应的图表类型\r
 * @param {number} options.seriesIndex - ECharts中需要追加数据的系列索引\r
 * @param {Function} options.dataMapper - 用于处理和映射单页数据的函数\r
 * @param {number} options.pageSize - 每页请求的数据量，默认值为1000\r
 * @param {Function} options.onCancelled - 一个返回布尔值的函数，用于检查操作是否应被取消\r
 */\r
export const loadDataIncrementally = async ({\r
  apiFn,\r
  apiParams = {},\r
  dataRef,\r
  chart,\r
  activeType,\r
  type,\r
  seriesIndex = 0,\r
  dataMapper,\r
  pageSize = 1000,\r
  onCancelled = () => false,\r
}) => {\r
  dataRef.value = []; // 开始前清空数据\r
  let page = 1;\r
  let hasMoreData = true;\r
\r
  while (hasMoreData) {\r
    if (onCancelled()) break;\r
\r
    const [res, err] = await to(\r
      apiFn({\r
        ...apiParams,\r
        pagination: {\r
          page,\r
          size: pageSize,\r
        },\r
      })\r
    );\r
\r
    if (err) {\r
      console.error("获取数据失败:", err);\r
      hasMoreData = false;\r
      continue;\r
    }\r
\r
    const newData = dataMapper(res.data) || [];\r
\r
    if (newData.length > 0) {\r
      dataRef.value.push(...newData);\r
      if (chart && activeType.value === type) {\r
        chart.appendData({\r
          seriesIndex,\r
          data: newData,\r
        });\r
      }\r
    }\r
\r
    if (newData.length < pageSize) {\r
      hasMoreData = false;\r
    } else {\r
      page++;\r
    }\r
  }\r
};\r
\`\`\`\r
`,I="/Vue_Basics_frame/assets/mljg-D87gZs6F.png",T="/Vue_Basics_frame/assets/mapData-BeDtGg8Z.png",P="/Vue_Basics_frame/assets/economic-development-BXl-HK7n.webp",F="/Vue_Basics_frame/assets/scale-D7uVEKOH.mp4",H={class:"self-project-introduction"},z={class:"section"},R={class:"module-container"},j=["src"],L=p({__name:"index",setup(c){const i=S([{title:"Monorepo完成项目搭建",imgSrc:I},{title:"地图上渲染大数据优化",imgSrc:T},{title:"页面地图复杂样式实现",imgSrc:P},{title:"项目自适应功能实现",imgSrc:F}]),o=i.value.filter(a=>!a.imgSrc.endsWith(".mp4")).map(a=>a.imgSrc);return(a,e)=>(n(),t("div",H,[e[1]||(e[1]=y('<div class="section" data-v-52326929><h4 data-v-52326929>技术栈:</h4><p data-v-52326929> Vue 3, TypeScript, Vite, Pinia, Vue Router, Ant Design, ECharts, SWRV, ESLint, Prettier, Husky, Less, pnpm, Monorepo </p></div><div class="section" data-v-52326929><h4 data-v-52326929>背景(S):</h4><p data-v-52326929> 为解决集团能源数据孤岛问题,需构建一个可视化数据中心,将海量、抽象的后台数据转化为直观、可交互的前端界面,赋能业务决策。 </p></div><div class="section" data-v-52326929><h4 data-v-52326929>任务(T):</h4><p data-v-52326929> 独立负责集团首个能源大数据门户的前端架构与核心开发,将海量多维数据转化为高性能、高交互的可视化大屏与数据驾驶舱。 </p></div><div class="section" data-v-52326929><h4 data-v-52326929>行动(A):</h4><ul data-v-52326929><li data-v-52326929><strong data-v-52326929>前端架构设计:</strong> 主导完成技术选型(Vue 3/TS/Vite),从0到1搭建 Monorepo 架构,并封装了包括动态路由、权限控制、通用布局在内的核心功能模块。 </li><li data-v-52326929><strong data-v-52326929>可视化组件库构建:</strong> 基于ECharts 进行深度二次封装,沉淀出支持30+种图表类型的公司级组件库,将新看板开发效率提升50%。 </li><li data-v-52326929><strong data-v-52326929>复杂场景开发:</strong> 针对电网负荷等场景,开发高度定制化的数据驾驶舱,实现了百万级数据点的流畅渲染、多维度下钻与联动分析。 </li><li data-v-52326929><strong data-v-52326929>性能极致优化:</strong> 主导实施虚拟滚动、图表懒加载、代码分包等优化策略,将复杂仪表盘的首次可交互时间(TTI)缩短60%,确保对PB级后台数据的秒级响应。 </li></ul></div><div class="section" data-v-52326929><h4 data-v-52326929>成果(R):</h4><ul data-v-52326929><li data-v-52326929><strong data-v-52326929>业务价值:</strong> 成功交付集团首个能源大数据门户,将业务人员的数据分析与报表制作时间从平均2天缩短至半小时(效率提升≈97%),用户满意度提升40%。 </li><li data-v-52326929><strong data-v-52326929>技术沉淀:</strong> 封装的图表组件库已在公司内部3个项目成功复用,显著提升了团队的开发效率和标准化水平。 </li></ul></div><div class="section" data-v-52326929><h4 data-v-52326929>沉淀(L):</h4><ul data-v-52326929><li data-v-52326929> 掌握了从零到一构建现代化、可扩展前端架构(Monorepo)的全流程实践经验。 </li><li data-v-52326929> 深化了对ECharts 渲染核心、性能瓶颈及优化策略的理解,具备复杂可视化场景的解决方案设计能力。 </li></ul></div>',6)),s("div",z,[e[0]||(e[0]=s("h4",null,"自己负责的模块",-1)),s("div",R,[(n(!0),t(M,null,b(i.value,(r,d)=>(n(),t("div",{key:d,class:"module-item"},[s("h5",null,V(r.title),1),r.imgSrc.endsWith(".mp4")?(n(),t("video",{key:0,src:r.imgSrc,controls:"",class:"module-image",autoplay:"",muted:"",loop:""},null,8,j)):(n(),w(l(x),{key:1,src:r.imgSrc,"preview-src-list":l(o),"initial-index":d,fit:"cover",class:"module-image"},null,8,["src","preview-src-list","initial-index"]))]))),128))])]),D(C,{bigMd:l(E)},null,8,["bigMd"])]))}}),W=m(L,[["__scopeId","data-v-52326929"]]);export{W as default};
