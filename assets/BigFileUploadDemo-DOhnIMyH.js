import{d as i,H as l}from"./index-Du4JMgtq.js";import{d as a,B as c,o as d,v as u,c as s,a as o,b as p,a0 as h,_ as f,g as m,z as g}from"./index-CBNB1lXo.js";const k=["innerHTML"],y=a({__name:"markDownVue",props:{bigMd:{type:String,default:""}},setup(r){const e=r,n=c(()=>i.parse(e.bigMd)),t=()=>{h(()=>{l.highlightAll()})};return d(()=>{t()}),u(n,()=>{t()}),(x,_)=>(o(),s("div",null,[p("div",{class:"markdown-body mt-16px",innerHTML:n.value},null,8,k)]))}}),w=f(y,[["__scopeId","data-v-205d6c01"]]),b=`## 大文件上传\r
我是大文件上传的示例\r
# 功能实现\r
### 目标\r
- 支持大文件分片上传与并发传输\r
- 断点续传与失败重试，提升稳定性\r
- （可选）秒传：基于文件哈希判断是否已上传\r
\r
### 核心思路\r
1. 将文件按照固定大小（如 10MB）切分为多个分片\r
2. 使用并发池（如 4～6 个并发）上传分片\r
3. 每个分片单独校验与重试；记录已完成分片支持断点续传\r
4. 全部分片成功后，通知服务端进行合并\r
\r
### 前端实现步骤\r
\`\`\`html\r
<!-- 上传区域示例 -->\r
<div class="uploader">\r
  <input id="fileInput" type="file" />\r
  <button id="uploadBtn">开始上传</button>\r
  <div id="progressText"></div>\r
  <div id="progressBar"><div id="progressInner"></div></div>\r
</div>\r
\`\`\`\r
\r
\`\`\`css\r
#progressBar { height: 8px; background: #eee; border-radius: 4px; overflow: hidden; }\r
#progressInner { height: 100%; width: 0%; background: #007bff; transition: width .2s; }\r
\`\`\`\r
\r
\`\`\`js\r
// 分片大小与并发数\r
const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB\r
const CONCURRENCY = 4; // 并发上传数\r
\r
const el = {\r
  fileInput: document.getElementById('fileInput'),\r
  uploadBtn: document.getElementById('uploadBtn'),\r
  progressText: document.getElementById('progressText'),\r
  progressInner: document.getElementById('progressInner'),\r
};\r
\r
// 计算文件哈希（示例：SHA-1；大型文件更推荐增量哈希库）\r
async function calcHash(file) {\r
  const buf = await file.arrayBuffer();\r
  const digest = await crypto.subtle.digest('SHA-1', buf);\r
  const view = new Uint8Array(digest);\r
  return Array.from(view).map(b => b.toString(16).padStart(2, '0')).join('');\r
}\r
\r
// 将文件切片\r
function createChunks(file) {\r
  const chunks = [];\r
  let offset = 0, index = 0;\r
  while (offset < file.size) {\r
    const end = Math.min(offset + CHUNK_SIZE, file.size);\r
    const blob = file.slice(offset, end);\r
    chunks.push({ index, blob });\r
    offset = end; index++;\r
  }\r
  return chunks;\r
}\r
\r
// 带重试的请求封装\r
async function requestWithRetry(url, options, retry = 2) {\r
  for (let i = 0; i <= retry; i++) {\r
    try {\r
      const res = await fetch(url, options);\r
      if (!res.ok) throw new Error('HTTP ' + res.status);\r
      return await res.json().catch(() => ({}));\r
    } catch (e) {\r
      if (i === retry) throw e;\r
      // 简单退避\r
      await new Promise(r => setTimeout(r, 500 * (i + 1)));\r
    }\r
  }\r
}\r
\r
// 并发池上传\r
async function uploadChunks({ file, hash, chunks }) {\r
  let completed = 0;\r
  const total = chunks.length;\r
  const queue = [...chunks];\r
\r
  async function uploadOne({ index, blob }) {\r
    const form = new FormData();\r
    form.append('fileHash', hash);\r
    form.append('fileName', file.name);\r
    form.append('chunkIndex', index.toString());\r
    form.append('chunk', blob);\r
    await requestWithRetry('/api/upload/chunk', { method: 'POST', body: form });\r
    completed++;\r
    const pct = Math.round((completed / total) * 100);\r
    el.progressText.textContent = \`上传进度：\${completed}/\${total}（\${pct}%）\`;\r
    el.progressInner.style.width = pct + '%';\r
  }\r
\r
  const workers = Array.from({ length: CONCURRENCY }).map(async () => {\r
    while (queue.length) {\r
      const task = queue.shift();\r
      if (!task) break;\r
      await uploadOne(task);\r
    }\r
  });\r
  await Promise.all(workers);\r
}\r
\r
async function mergeChunks({ file, hash, total }) {\r
  await requestWithRetry('/api/upload/merge', {\r
    method: 'POST',\r
    headers: { 'Content-Type': 'application/json' },\r
    body: JSON.stringify({ fileName: file.name, fileHash: hash, totalChunks: total }),\r
  });\r
}\r
\r
// 主流程：计算哈希 → 切片 → 并发上传 → 合并\r
async function handleUpload(file) {\r
  const hash = await calcHash(file);\r
  const chunks = createChunks(file);\r
  await uploadChunks({ file, hash, chunks });\r
  await mergeChunks({ file, hash, total: chunks.length });\r
  el.progressText.textContent = '上传完成并已合并！';\r
}\r
\r
el.uploadBtn.addEventListener('click', async () => {\r
  const file = el.fileInput.files?.[0];\r
  if (!file) {\r
    alert('请选择文件');\r
    return;\r
  }\r
  try {\r
    await handleUpload(file);\r
  } catch (e) {\r
    console.error(e);\r
    alert('上传失败，请重试');\r
  }\r
});\r
\`\`\`\r
\r
### 后端约定（示例）\r
- \`POST /api/upload/chunk\`：接收分片，参数包含 \`fileHash\`、\`fileName\`、\`chunkIndex\`、\`chunk\`\r
- \`POST /api/upload/merge\`：根据 \`fileHash\` 合并所有分片为完整文件；附带 \`fileName\` 与 \`totalChunks\`\r
- （可选）\`GET /api/upload/check?fileHash=xxx\`：返回已有的分片索引，支持断点续传与秒传\r
\r
### 注意事项\r
- 超大文件建议使用增量哈希库（如 SparkMD5），避免一次性读入内存\r
- 并发数需结合网络与服务端能力调优（建议 4～6）\r
- 结合切片断点续传接口，可在失败后仅补传缺失分片\r
- 上传安全：建议服务端校验 \`Content-Type\`、文件大小与白名单扩展名`,B=a({__name:"BigFileUploadDemo",setup(r){return(e,n)=>(o(),s("div",null,[m(w,{bigMd:g(b)},null,8,["bigMd"])]))}});export{B as default};
