<template>
  <div class="digital-twin-project">
    <div class="section">
      <h4>技术栈:</h4>
      <p>Vue 2/3, Vuex, Vue-Router, TypeScript, Axios, ESLint/Prettier/Husky</p>
    </div>
    <div class="section">
      <h4>背景(S):</h4>
      <p>
        为满足中国移动集团财务稽核需求，需开发一套自动化稽核系统，处理超亿级工单与千万级基础数据，校验内部报账信息的真实性。
      </p>
    </div>
    <div class="section">
      <h4>任务(T):</h4>
      <p>
        负责系统前端的重构与优化，对核心费用模块进行真实性稽核校验，并主导后续的功能开发与维护。
      </p>
    </div>
    <div class="section">
      <h4>行动(A):</h4>
      <ul>
        <li>
          <strong>技术升级与重构:</strong> 牵头主导项目从 Vue 2 到 Vue 3
          的技术栈升级，并全面采用 Composition API
          进行重构，显著提升了代码的可读性与可维护性。
        </li>
        <li>
          <strong>代码质量体系建设:</strong> 引入 TypeScript
          进行类型约束，并结合 ESLint/Prettier/Husky
          建立代码规范与质量保障体系，负责团队的代码审查与合并。
        </li>
        <li>
          <strong>组件化与工程化:</strong>
          重新设计并封装了高复用性的公共组件（如 Table,
          Form），并对项目文件结构进行重构，实现了清晰的模块化划分。
        </li>
      </ul>
    </div>
    <div class="section">
      <h4>成果(R):</h4>
      <ul>
        <li>
          <strong>性能显著提升:</strong> 项目整体加载时间从平均 4-8 秒降低至
          1.5-3 秒，FCP 指标优于 1.8 秒。
        </li>
        <li>
          <strong>代码质量与维护效率:</strong>
          实现了高内聚、低耦合的组件化设计，新成员熟悉项目并投入开发的周期大大缩短。
        </li>
      </ul>
    </div>
    <div class="section">
      <h4>沉淀(L):</h4>
      <ul>
        <li>
          深刻理解并掌握了大型老旧项目重构的最佳实践，积累了在复杂业务系统中引入新技术（Vue
          3, TS）解决历史遗留问题的成功经验。
        </li>
        <li>
          全面提升了在组件化设计、前端工程化以及团队代码质量管理方面的综合能力。
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.digital-twin-project {
  padding: 20px;
  font-family: "Arial", sans-serif;
  line-height: 1.6;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}
.section {
  margin-bottom: 15px;
}
h4 {
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 600;
}
p,
ul {
  margin: 0;
}
ul {
  padding-left: 20px;
}
li {
  margin-bottom: 10px;
}
</style>
