## 大文件上传
我是大文件上传的示例
# 功能实现
### 目标
- 支持大文件分片上传与并发传输
- 断点续传与失败重试，提升稳定性
- （可选）秒传：基于文件哈希判断是否已上传

### 核心思路
1. 将文件按照固定大小（如 10MB）切分为多个分片
2. 使用并发池（如 4～6 个并发）上传分片
3. 每个分片单独校验与重试；记录已完成分片支持断点续传
4. 全部分片成功后，通知服务端进行合并

### 前端实现步骤
```html
<!-- 上传区域示例 -->
<div class="uploader">
  <input id="fileInput" type="file" />
  <button id="uploadBtn">开始上传</button>
  <div id="progressText"></div>
  <div id="progressBar"><div id="progressInner"></div></div>
</div>
```

```css
#progressBar { height: 8px; background: #eee; border-radius: 4px; overflow: hidden; }
#progressInner { height: 100%; width: 0%; background: #007bff; transition: width .2s; }
```

```js
// 分片大小与并发数
const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB
const CONCURRENCY = 4; // 并发上传数

const el = {
  fileInput: document.getElementById('fileInput'),
  uploadBtn: document.getElementById('uploadBtn'),
  progressText: document.getElementById('progressText'),
  progressInner: document.getElementById('progressInner'),
};

// 计算文件哈希（示例：SHA-1；大型文件更推荐增量哈希库）
async function calcHash(file) {
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-1', buf);
  const view = new Uint8Array(digest);
  return Array.from(view).map(b => b.toString(16).padStart(2, '0')).join('');
}

// 将文件切片
function createChunks(file) {
  const chunks = [];
  let offset = 0, index = 0;
  while (offset < file.size) {
    const end = Math.min(offset + CHUNK_SIZE, file.size);
    const blob = file.slice(offset, end);
    chunks.push({ index, blob });
    offset = end; index++;
  }
  return chunks;
}

// 带重试的请求封装
async function requestWithRetry(url, options, retry = 2) {
  for (let i = 0; i <= retry; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json().catch(() => ({}));
    } catch (e) {
      if (i === retry) throw e;
      // 简单退避
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
}

// 并发池上传
async function uploadChunks({ file, hash, chunks }) {
  let completed = 0;
  const total = chunks.length;
  const queue = [...chunks];

  async function uploadOne({ index, blob }) {
    const form = new FormData();
    form.append('fileHash', hash);
    form.append('fileName', file.name);
    form.append('chunkIndex', index.toString());
    form.append('chunk', blob);
    await requestWithRetry('/api/upload/chunk', { method: 'POST', body: form });
    completed++;
    const pct = Math.round((completed / total) * 100);
    el.progressText.textContent = `上传进度：${completed}/${total}（${pct}%）`;
    el.progressInner.style.width = pct + '%';
  }

  const workers = Array.from({ length: CONCURRENCY }).map(async () => {
    while (queue.length) {
      const task = queue.shift();
      if (!task) break;
      await uploadOne(task);
    }
  });
  await Promise.all(workers);
}

async function mergeChunks({ file, hash, total }) {
  await requestWithRetry('/api/upload/merge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name, fileHash: hash, totalChunks: total }),
  });
}

// 主流程：计算哈希 → 切片 → 并发上传 → 合并
async function handleUpload(file) {
  const hash = await calcHash(file);
  const chunks = createChunks(file);
  await uploadChunks({ file, hash, chunks });
  await mergeChunks({ file, hash, total: chunks.length });
  el.progressText.textContent = '上传完成并已合并！';
}

el.uploadBtn.addEventListener('click', async () => {
  const file = el.fileInput.files?.[0];
  if (!file) {
    alert('请选择文件');
    return;
  }
  try {
    await handleUpload(file);
  } catch (e) {
    console.error(e);
    alert('上传失败，请重试');
  }
});
```

### 后端约定（示例）
- `POST /api/upload/chunk`：接收分片，参数包含 `fileHash`、`fileName`、`chunkIndex`、`chunk`
- `POST /api/upload/merge`：根据 `fileHash` 合并所有分片为完整文件；附带 `fileName` 与 `totalChunks`
- （可选）`GET /api/upload/check?fileHash=xxx`：返回已有的分片索引，支持断点续传与秒传

### 注意事项
- 超大文件建议使用增量哈希库（如 SparkMD5），避免一次性读入内存
- 并发数需结合网络与服务端能力调优（建议 4～6）
- 结合切片断点续传接口，可在失败后仅补传缺失分片
- 上传安全：建议服务端校验 `Content-Type`、文件大小与白名单扩展名