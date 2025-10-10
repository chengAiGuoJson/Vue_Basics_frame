/* empty css                  */import{d as r,r as p,c as m,a as v,b as l,t as g,g as d,E as _,w as u,h as i,o as f,H as q,e as b,_ as x}from"./index-B-z7_x6u.js";const y=r({__name:"children-v-model",props:{count:{type:Number,default:0}},emits:["update:count"],setup(c,{emit:n}){p(0);const a=c,o=n;return(t,e)=>{const s=_;return v(),m("div",null,[l("h2",null,"子组件当前计数: "+g(a.count),1),l("div",null,[d(s,{type:"primary",onClick:e[0]||(e[0]=h=>o("update:count",a.count+1))},{default:u(()=>[...e[2]||(e[2]=[i("增加",-1)])]),_:1}),d(s,{type:"danger",onClick:e[1]||(e[1]=h=>o("update:count",a.count-1))},{default:u(()=>[...e[3]||(e[3]=[i("减少",-1)])]),_:1})])])}}}),k={class:"v-model-container"},E={class:"page-content"},N={class:"demo-section theme-card"},B=r({__name:"index",setup(c){const n=p(0),a=o=>{console.log("子组件计数更新:",o),n.value=o};return f(()=>{document.querySelectorAll("pre code").forEach(o=>{q.highlightElement(o)})}),(o,t)=>(v(),m("div",k,[l("div",E,[t[3]||(t[3]=l("h1",{class:"theme-title large"},"v-model 自定义指令",-1)),l("div",N,[t[1]||(t[1]=l("h2",{class:"theme-title medium"},"演示区域",-1)),l("p",null,"父组件当前计数: "+g(n.value),1),t[2]||(t[2]=l("div",{class:"divider"},null,-1)),d(y,{count:n.value,"onUpdate:count":[t[0]||(t[0]=e=>n.value=e),a]},null,8,["count"])]),t[4]||(t[4]=b(`<div class="code-examples" data-v-7ca27edc><div class="code-block theme-card" data-v-7ca27edc><h3 class="theme-title small" data-v-7ca27edc>父组件中的示例代码：</h3><pre class="code-container" data-v-7ca27edc>                    <code class="language-html" data-v-7ca27edc>
&lt;template&gt;
    &lt;div&gt;
        &lt;children-v-model v-model:count=&quot;count&quot; &lt;/children-v-model&gt;
    &lt;/div&gt;
&lt;/template&gt;
                    </code>
                </pre></div><div class="code-block theme-card" data-v-7ca27edc><h3 class="theme-title small" data-v-7ca27edc>子组件中的示例代码：</h3><pre class="code-container" data-v-7ca27edc>                    <code class="language-html" data-v-7ca27edc>
&lt;template&gt;
    &lt;div&gt; 
        &lt;h2&gt;子组件当前计数: &lt;/h2&gt; 
        &lt;div&gt; 
            &lt;el-button type=&quot;primary&quot; @click=&quot;emit(&#39;update:count&#39;, props.count + 1)&quot;&gt;增加&lt;/el-button&gt; 
            &lt;el-button type=&quot;danger&quot; @click=&quot;emit(&#39;update:count&#39;, props.count - 1)&quot;&gt;减少&lt;/el-button&gt; 
        &lt;/div&gt; 
    &lt;/div&gt;
&lt;/template&gt;
                    </code>
                </pre></div></div>`,1))])]))}}),V=x(B,[["__scopeId","data-v-7ca27edc"]]);export{V as default};
