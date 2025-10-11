<template>
  <div class="page-background">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>

    <div class="page-content">
      <div class="theme-card fade-in">
        <h1 class="theme-title large">🎨 全局滚动条样式演示</h1>
        <p class="theme-text">
          本页面展示了与项目主题系统完美集成的全局滚动条样式，支持多主题切换和响应式设计。
        </p>
      </div>

      <!-- 滚动条样式说明 -->
      <div class="theme-card fade-in delay-1">
        <h2 class="theme-title medium">📋 滚动条样式特性</h2>
        <div class="features-grid">
          <div class="feature-item">
            <h3>🎯 主题适配</h3>
            <p>自动适配默认、暗色、亮色三种主题</p>
          </div>
          <div class="feature-item">
            <h3>📱 响应式设计</h3>
            <p>在不同屏幕尺寸下自动调整滚动条宽度</p>
          </div>
          <div class="feature-item">
            <h3>🎨 多种样式</h3>
            <p>提供默认、自定义、细滚动条等多种样式</p>
          </div>
          <div class="feature-item">
            <h3>🌐 跨浏览器</h3>
            <p>支持 Webkit 和 Firefox 浏览器</p>
          </div>
        </div>
      </div>

      <!-- 默认滚动条演示 -->
      <div class="theme-card fade-in delay-2">
        <h2 class="theme-title medium">🔧 默认滚动条演示</h2>
        <p class="theme-text">这是使用默认全局滚动条样式的容器：</p>
        <div class="scrollbar-demo default-scrollbar">
          <div class="demo-content">
            <h3>默认滚动条样式</h3>
            <p>这个容器使用了全局默认的滚动条样式，具有以下特点：</p>
            <ul>
              <li>宽度：8px（桌面端）/ 6px（平板端）/ 4px（手机端）</li>
              <li>轨道：半透明背景，圆角设计</li>
              <li>滑块：半透明白色，悬停时变亮</li>
              <li>动画：平滑的过渡效果</li>
            </ul>
            <div class="placeholder-content">
              <div class="placeholder-item">内容项 1</div>
              <div class="placeholder-item">内容项 2</div>
              <div class="placeholder-item">内容项 3</div>
              <div class="placeholder-item">内容项 4</div>
              <div class="placeholder-item">内容项 5</div>
              <div class="placeholder-item">内容项 6</div>
              <div class="placeholder-item">内容项 7</div>
              <div class="placeholder-item">内容项 8</div>
              <div class="placeholder-item">内容项 9</div>
              <div class="placeholder-item">内容项 10</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 自定义滚动条演示 -->
      <div class="theme-card fade-in delay-3">
        <h2 class="theme-title medium">✨ 自定义滚动条演示</h2>
        <p class="theme-text">这是使用自定义渐变滚动条样式的容器：</p>
        <div class="scrollbar-demo custom-scrollbar">
          <div class="demo-content">
            <h3>自定义渐变滚动条</h3>
            <p>这个容器使用了自定义的渐变滚动条样式，具有以下特点：</p>
            <ul>
              <li>宽度：12px，更宽更易操作</li>
              <li>轨道：带有内阴影的半透明背景</li>
              <li>滑块：使用主题渐变色彩</li>
              <li>悬停效果：切换到高亮渐变色</li>
              <li>阴影：立体感的投影效果</li>
            </ul>
            <div class="placeholder-content">
              <div class="placeholder-item gradient">渐变内容项 1</div>
              <div class="placeholder-item gradient">渐变内容项 2</div>
              <div class="placeholder-item gradient">渐变内容项 3</div>
              <div class="placeholder-item gradient">渐变内容项 4</div>
              <div class="placeholder-item gradient">渐变内容项 5</div>
              <div class="placeholder-item gradient">渐变内容项 6</div>
              <div class="placeholder-item gradient">渐变内容项 7</div>
              <div class="placeholder-item gradient">渐变内容项 8</div>
              <div class="placeholder-item gradient">渐变内容项 9</div>
              <div class="placeholder-item gradient">渐变内容项 10</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 细滚动条演示 -->
      <div class="theme-card fade-in delay-4">
        <h2 class="theme-title medium">🔍 细滚动条演示</h2>
        <p class="theme-text">这是使用细滚动条样式的代码容器：</p>
        <div class="code-demo thin-scrollbar">
          <pre><code>// 细滚动条样式演示
function createScrollbarDemo() {
  const features = [
    '宽度：6px，适合代码块和小容器',
    '简洁设计：不干扰内容阅读',
    '平滑动画：优雅的交互体验',
    '主题适配：自动匹配当前主题色彩'
  ];
  
  return features.map((feature, index) => {
    return `${index + 1}. ${feature}`;
  }).join('\n');
}

// 使用示例
const demo = createScrollbarDemo();
console.log(demo);

// 更多代码内容用于演示滚动效果
const moreContent = `
这里是更多的代码内容，用于演示细滚动条的效果。
细滚动条特别适合用于代码块、文本编辑器等场景。

它具有以下优势：
- 不占用过多空间
- 视觉上不会干扰代码阅读
- 保持与主题的一致性
- 响应式设计，在移动端表现良好

你可以通过添加 'thin-scrollbar' 类来应用这种样式。
`;

export default {
  name: 'ScrollbarDemo',
  data() {
    return {
      content: moreContent
    };
  }
};
</code></pre>
        </div>
      </div>

      <!-- 隐藏滚动条演示 -->
      <div class="theme-card fade-in delay-5">
        <h2 class="theme-title medium">👻 隐藏滚动条演示</h2>
        <p class="theme-text">这个容器隐藏了滚动条但保持滚动功能：</p>
        <div class="scrollbar-demo hidden-scrollbar">
          <div class="demo-content">
            <h3>隐藏滚动条样式</h3>
            <p>这个容器使用了隐藏滚动条样式，适用于以下场景：</p>
            <ul>
              <li>需要保持界面简洁的设计</li>
              <li>移动端触摸滚动体验</li>
              <li>自定义滚动指示器的场景</li>
              <li>全屏展示内容时</li>
            </ul>
            <div class="placeholder-content">
              <div class="placeholder-item hidden">隐藏滚动条项 1</div>
              <div class="placeholder-item hidden">隐藏滚动条项 2</div>
              <div class="placeholder-item hidden">隐藏滚动条项 3</div>
              <div class="placeholder-item hidden">隐藏滚动条项 4</div>
              <div class="placeholder-item hidden">隐藏滚动条项 5</div>
              <div class="placeholder-item hidden">隐藏滚动条项 6</div>
              <div class="placeholder-item hidden">隐藏滚动条项 7</div>
              <div class="placeholder-item hidden">隐藏滚动条项 8</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="theme-card fade-in delay-6">
        <h2 class="theme-title medium">📖 使用说明</h2>
        <div class="usage-grid">
          <div class="usage-item">
            <h3>默认滚动条</h3>
            <p>无需添加任何类，全局自动应用</p>
            <code>&lt;div class="overflow-auto"&gt;内容&lt;/div&gt;</code>
          </div>
          <div class="usage-item">
            <h3>自定义滚动条</h3>
            <p>添加 custom-scrollbar 类</p>
            <code>&lt;div class="custom-scrollbar"&gt;内容&lt;/div&gt;</code>
          </div>
          <div class="usage-item">
            <h3>细滚动条</h3>
            <p>添加 thin-scrollbar 类</p>
            <code>&lt;div class="thin-scrollbar"&gt;内容&lt;/div&gt;</code>
          </div>
          <div class="usage-item">
            <h3>隐藏滚动条</h3>
            <p>添加 hidden-scrollbar 类</p>
            <code>&lt;div class="hidden-scrollbar"&gt;内容&lt;/div&gt;</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这个页面用于演示滚动条样式
</script>

<style scoped>
/* 演示容器样式 */
.scrollbar-demo {
  height: 200px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}

.demo-content h3 {
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 1.2rem;
}

.demo-content p {
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.6;
}

.demo-content ul {
  color: var(--text-secondary);
  margin: 16px 0;
  padding-left: 20px;
}

.demo-content li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* 占位内容样式 */
.placeholder-content {
  margin-top: 20px;
}

.placeholder-item {
  padding: 12px 16px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.placeholder-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateX(4px);
}

.placeholder-item.gradient {
  background: linear-gradient(135deg, 
    rgba(102, 126, 234, 0.2), 
    rgba(118, 75, 162, 0.2)
  );
}

.placeholder-item.hidden {
  background: rgba(255, 255, 255, 0.06);
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 代码演示样式 */
.code-demo {
  height: 300px;
  overflow: auto;
  background: #2d3748;
  border-radius: 12px;
  margin: 20px 0;
}

.code-demo pre {
  margin: 0;
  padding: 20px;
  color: #e2e8f0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* 特性网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature-item {
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.feature-item h3 {
  color: var(--text-primary);
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.feature-item p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 使用说明网格 */
.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.usage-item {
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.usage-item h3 {
  color: var(--text-primary);
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.usage-item p {
  color: var(--text-secondary);
  margin-bottom: 12px;
  font-size: 0.9rem;
}

.usage-item code {
  display: block;
  padding: 12px;
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 6px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem;
  overflow-x: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .features-grid,
  .usage-grid {
    grid-template-columns: 1fr;
  }
  
  .scrollbar-demo {
    height: 150px;
    padding: 15px;
  }
  
  .code-demo {
    height: 200px;
  }
}
</style>