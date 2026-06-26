# 当前仓库地图

这个仓库现在是一个参考与孵化仓库，分成三个清楚部分：

1. 根目录保留原版 Messenger 的静态参考快照。
2. `analysis/` 保存对原版 Messenger 的分析结论。
3. `nandu-love-story/` 保存原创项目《南都爱情故事》的文档和后续工程空间。

它不再是那个混着实验工程、南京模型、Vite 服务和临时舞台的目录。

---

## 根目录：原版 Messenger 静态快照

- `index.html`  
  原版 Messenger 静态快照入口。

- `assets/`  
  原版 Messenger 运行需要的静态资源，包括打包后的 JS、Draco 几何、纹理、字体、音频、worker 和支持库。

- `robots.txt`  
  原站保留下来的 robots/content-signal 文件。

- `44bdbdb0-b663-47c1-95f5-14066afccd72`  
  原站抓取时保留下来的资源文件。

- `README.md`  
  给 GitHub 首页看的仓库说明。

---

## analysis：原版机制分析

- `analysis/`  
  对原版 Messenger 静态快照的分析目录。

- `analysis/README.md`  
  分析目录的公开仓库边界说明。

- `analysis/original/key-symbols.txt`  
  关键词索引，用于定位相机、角色、碰撞、地形、shader 等机制。

- `analysis/original/module-map.md`  
  原版 bundle 的粗略模块地图。

- `analysis/original/original-mechanics-notes.md`  
  原版力学机制笔记。

### analysis 目录规则

`analysis/` 只保留我们自己的分析结论、关键词索引、模块地图和工程笔记。

不要长期公开保留：

```text
analysis/original/*.extract.js
```

这些文件是从原版 `assets/App3D-DwM1eiaC.js` 中提取出来的代码片段。即使只用于学习分析，也属于原版 bundle 的派生代码片段。公开仓库中保留它们会增加版权、授权和项目边界风险。

如果后续需要查看此类片段，应在本地临时生成，不提交到公开仓库。

---

## nandu-love-story：《南都爱情故事》项目空间

- `nandu-love-story/`  
  原创项目《南都爱情故事》的独立项目空间。

- `nandu-love-story/docs/`  
  项目前期文档、正文、音频规划和工程决策。

当前重点文档：

- `nandu-love-story/docs/original-messenger-mechanics-audit.md`  
  原版 Messenger 力学机制审计与《南都爱情故事》工程决策。后续实现角色碰撞、walkmesh、相机系统时应优先遵守。

如果后续正式开发游戏源码，建议结构：

```text
nandu-love-story/
  package.json
  src/
  public/
  docs/
```

源码、原创素材、脚本和项目文档都应该优先放在这里，而不是塞进仓库根目录。

---

## 根 docs 目录

当前根部 `docs/` 只保留仓库级说明、原版 Messenger 抓取记录，以及历史整理资料。

- `docs/README_FOR_HANRUI.md`  
  当前仓库地图。

- `docs/original-site-capture.md`  
  原版 Messenger 抓取和本地运行记录。

- `docs/assets/nanjing-slow-mail-style-anchor.png`  
  风格参考图。后续如果确定属于《南都爱情故事》正式资料，可以再迁入 `nandu-love-story/docs/assets/`。

---

## 本地运行原站

在仓库根目录运行：

```bash
python3 -m http.server 3001 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:3001/
```

---

## 不要再找这些目录

下面这些是之前混乱阶段出现过的东西，现在不属于这个仓库：

- `messager/`
- `messenger-copy/`
- `jiewang/`
- `src/`
- `public/models/nanjing/`
- `ditumoxing/`
- `node_modules/`
- `vite.config.ts`
- `mochou-road.html`

如果后面重新开始做正式游戏，请在 `nandu-love-story/` 下创建干净工程，不要直接把实验代码塞回这个原站快照根目录。
