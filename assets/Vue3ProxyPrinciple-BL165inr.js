import{d as W,r as d,p as P,c as m,a as v,b as e,t as a,q as G,F as $,f as x,s as Q,_ as X}from"./index-30fO7wxP.js";const Y={class:"vue3-proxy-principle"},Z={class:"demo-section"},ee={class:"demo-content"},te={class:"controls"},ne={class:"output-container"},se={class:"demo-section"},oe={class:"demo-content"},ae={class:"interactive-demo"},ce={class:"state-display"},re={class:"output-container"},le={class:"log-output"},ie={class:"demo-section"},ue={class:"demo-content"},de={class:"interactive-demo"},me={class:"state-display"},ve={class:"output-container"},pe={class:"log-output"},fe={class:"demo-section"},ge={class:"demo-content"},be={class:"controls"},ye={key:0,class:"performance-results"},he={class:"performance-table"},_e={class:"improvement"},ke={class:"output-container"},Me={class:"log-output"},Pe={class:"demo-section"},$e={class:"comparison-table-container"},xe={class:"comparison-table"},Ve=["innerHTML"],Ce=["innerHTML"],we={class:"demo-section"},Te={class:"code-tabs"},Le=["onClick"],Se={class:"code-content"},je=W({__name:"Vue3ProxyPrinciple",setup(Ee){const b=d(""),y=d(""),h=d(""),_=d(""),f=d([]),k=d("reactive"),c=P({message:"Hello Vue3!",count:0,user:{name:"John",age:25}}),r=P({items:[1,2,3],users:[{name:"Alice",age:20},{name:"Bob",age:25}]}),S=[{name:"属性添加检测",vue2:"❌ 需要Vue.set",vue3:"✅ 原生支持"},{name:"属性删除检测",vue2:"❌ 需要Vue.delete",vue3:"✅ 原生支持"},{name:"数组索引修改",vue2:"❌ 无法检测",vue3:"✅ 完全支持"},{name:"数组长度修改",vue2:"❌ 无法检测",vue3:"✅ 完全支持"},{name:"Map/Set支持",vue2:"❌ 不支持",vue3:"✅ 完全支持"},{name:"初始化性能",vue2:"❌ 需要递归遍历",vue3:"✅ 惰性处理"},{name:"内存占用",vue2:"❌ 每个属性都有闭包",vue3:"✅ 更少的内存占用"},{name:"浏览器兼容性",vue2:"✅ IE9+",vue3:"❌ IE不支持"}],j=[{name:"reactive",label:"reactive函数"},{name:"track",label:"依赖收集"},{name:"trigger",label:"触发更新"},{name:"effect",label:"副作用函数"}],E={reactive:`// Vue3 reactive函数核心实现
function reactive(target) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key);
      const result = Reflect.get(target, key, receiver);
      
      // 深层响应式
      if (typeof result === 'object' && result !== null) {
        return reactive(result);
      }
      
      return result;
    },
    
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      
      // 只有值真正改变时才触发更新
      if (oldValue !== value) {
        trigger(target, key);
      }
      
      return result;
    },
    
    has(target, key) {
      track(target, key);
      return Reflect.has(target, key);
    },
    
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const result = Reflect.deleteProperty(target, key);
      
      if (result && hadKey) {
        trigger(target, key);
      }
      
      return result;
    }
  });
}`,track:`// 依赖收集系统
const targetMap = new WeakMap();
let activeEffect = null;

function track(target, key) {
  if (!activeEffect) return;
  
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  dep.add(activeEffect);
}`,trigger:`// 触发更新系统
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => {
      if (effect !== activeEffect) {
        effect();
      }
    });
  }
}`,effect:`// 副作用函数
function effect(fn) {
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      return fn();
    } finally {
      activeEffect = null;
    }
  };
  
  effectFn();
  return effectFn;
}

// 使用示例
const state = reactive({ count: 0 });

effect(() => {
  console.log('count:', state.count);
});

state.count++; // 自动触发副作用函数`};function n(o,t){const l=`[${new Date().toLocaleTimeString()}] ${t}
`;switch(o){case"basic":b.value+=l;break;case"object":y.value+=l;break;case"array":h.value+=l;break;case"performance":_.value+=l;break}}function g(o){switch(o){case"basic":b.value="";break;case"object":y.value="";break;case"array":h.value="";break;case"performance":_.value="",f.value=[];break}}function O(){g("basic"),n("basic","=== 开始基础Proxy响应式演示 ==="),n("basic","🎯 创建响应式对象"),n("basic","📦 设置副作用函数监听数据变化"),setTimeout(()=>{n("basic","✏️ 修改 message 属性"),n("basic","🚀 触发副作用函数重新执行")},1e3),setTimeout(()=>{n("basic","✏️ 修改 count 属性"),n("basic","🚀 触发副作用函数重新执行")},2e3),setTimeout(()=>{n("basic","➕ 添加新属性 newProp"),n("basic","🚀 Proxy可以检测到新属性的添加！")},3e3)}function F(){c.message=`更新时间: ${new Date().toLocaleTimeString()}`,n("object",`✏️ 修改了 message: ${c.message}`)}function B(){const o=`prop${Date.now()}`;c[o]="新属性值",n("object",`➕ 添加了新属性 ${o}: 新属性值`)}function I(){"count"in c?(delete c.count,n("object","🗑️ 删除了 count 属性")):(c.count=Math.floor(Math.random()*100),n("object",`🔄 重新添加了 count 属性: ${c.count}`))}function N(){c.user.name=`User${Math.floor(Math.random()*1e3)}`,c.user.age=Math.floor(Math.random()*50)+18,n("object",`🔧 修改了嵌套属性 user: ${JSON.stringify(c.user)}`)}function R(){const o=r.items.length+1;r.items.push(o),n("array",`➕ Push了新元素: ${o}`)}function D(){if(r.items.length>0){const t=Math.floor(Math.random()*100);r.items[0]=t,n("array",`✏️ 修改了索引 0 的值为: ${t}`)}}function H(){const o=Math.max(1,r.items.length-1);r.items.length=o,n("array",`📏 修改了数组长度为: ${o}`)}function J(){if(r.items.length>1){const o=r.items.splice(1,1,999);n("array",`🔄 Splice操作: 删除了 ${o}, 插入了 999`)}}function K(){g("performance"),n("performance","=== 开始性能测试 ===");const o=[100,500,1e3],t=[];o.forEach(s=>{n("performance",`
📊 测试对象大小: ${s} 个属性`);const l=i=>{const u={};for(let p=0;p<i;p++)u[`prop${p}`]={value:p,nested:{deep:`value${p}`}};return u},q=performance.now(),z=l(s);function V(i){Object.keys(i).forEach(u=>{typeof i[u]=="object"&&i[u]!==null&&V(i[u])})}V(z);const M=performance.now()-q,U=performance.now();P(l(s));const C=performance.now()-U,w=M.toFixed(2),T=C.toFixed(2),L=((M-C)/M*100).toFixed(1);n("performance",`Vue2模拟初始化时间: ${w}ms`),n("performance",`Vue3 Proxy初始化时间: ${T}ms`),n("performance",`性能提升: ${L}%`),t.push({size:s,vue2Time:w,vue3Time:T,improvement:L})}),f.value=t,n("performance",`
✅ 性能测试完成！`)}function A(){return E[k.value]||""}return(o,t)=>(v(),m("div",Y,[t[12]||(t[12]=e("div",{class:"header"},[e("h1",null,"Vue3 Proxy响应式原理演示"),e("p",{class:"description"}," Vue3使用Proxy替代Object.defineProperty实现响应式，具有更强大的拦截能力和更好的性能表现 ")],-1)),e("div",Z,[t[2]||(t[2]=e("h2",null,"🎯 基础Proxy响应式演示",-1)),e("div",ee,[e("div",te,[e("button",{onClick:O,class:"btn-primary"},"运行基础演示"),e("button",{onClick:t[0]||(t[0]=s=>g("basic")),class:"btn-secondary"},"清空日志")]),e("div",ne,[e("div",{class:"log-output",ref:"basicOutput"},a(b.value),513)])])]),e("div",se,[t[4]||(t[4]=e("h2",null,"🔧 对象操作演示",-1)),e("div",oe,[e("div",ae,[e("div",ce,[t[3]||(t[3]=e("h3",null,"当前状态：",-1)),e("pre",null,a(JSON.stringify(c,null,2)),1)]),e("div",{class:"controls"},[e("button",{onClick:F,class:"btn-primary"},"修改属性"),e("button",{onClick:B,class:"btn-success"},"添加属性"),e("button",{onClick:I,class:"btn-danger"},"删除属性"),e("button",{onClick:N,class:"btn-info"},"修改嵌套属性")])]),e("div",re,[e("div",le,a(y.value),1)])])]),e("div",ie,[t[6]||(t[6]=e("h2",null,"📋 数组操作演示",-1)),e("div",ue,[e("div",de,[e("div",me,[t[5]||(t[5]=e("h3",null,"数组状态：",-1)),e("pre",null,a(JSON.stringify(r,null,2)),1)]),e("div",{class:"controls"},[e("button",{onClick:R,class:"btn-primary"},"Push元素"),e("button",{onClick:D,class:"btn-primary"},"修改索引"),e("button",{onClick:H,class:"btn-warning"},"修改长度"),e("button",{onClick:J,class:"btn-info"},"Splice操作")])]),e("div",ve,[e("div",pe,a(h.value),1)])])]),e("div",fe,[t[8]||(t[8]=e("h2",null,"⚡ 性能对比演示",-1)),e("div",ge,[e("div",be,[e("button",{onClick:K,class:"btn-primary"},"运行性能测试"),e("button",{onClick:t[1]||(t[1]=s=>g("performance")),class:"btn-secondary"},"清空结果")]),f.value.length>0?(v(),m("div",ye,[e("table",he,[t[7]||(t[7]=e("thead",null,[e("tr",null,[e("th",null,"对象大小"),e("th",null,"Vue2模拟时间"),e("th",null,"Vue3时间"),e("th",null,"性能提升")])],-1)),e("tbody",null,[(v(!0),m($,null,x(f.value,s=>(v(),m("tr",{key:s.size},[e("td",null,a(s.size)+" 个属性",1),e("td",null,a(s.vue2Time)+"ms",1),e("td",null,a(s.vue3Time)+"ms",1),e("td",_e,a(s.improvement)+"%",1)]))),128))])])])):G("",!0),e("div",ke,[e("div",Me,a(_.value),1)])])]),e("div",Pe,[t[10]||(t[10]=e("h2",null,"📊 Vue2 vs Vue3 特性对比",-1)),e("div",$e,[e("table",xe,[t[9]||(t[9]=e("thead",null,[e("tr",null,[e("th",null,"功能特性"),e("th",{class:"vue2-col"},"Vue2 (Object.defineProperty)"),e("th",{class:"vue3-col"},"Vue3 (Proxy)")])],-1)),e("tbody",null,[(v(),m($,null,x(S,s=>e("tr",{key:s.name},[e("td",null,a(s.name),1),e("td",{class:"vue2-col",innerHTML:s.vue2},null,8,Ve),e("td",{class:"vue3-col",innerHTML:s.vue3},null,8,Ce)])),64))])])])]),e("div",we,[t[11]||(t[11]=e("h2",null,"💻 核心实现代码",-1)),e("div",Te,[(v(),m($,null,x(j,s=>e("button",{key:s.name,onClick:l=>k.value=s.name,class:Q(["tab-button",{active:k.value===s.name}])},a(s.label),11,Le)),64))]),e("div",Se,[e("pre",null,[e("code",null,a(A()),1)])])])]))}}),Fe=X(je,[["__scopeId","data-v-d2d991fe"]]);export{Fe as default};
