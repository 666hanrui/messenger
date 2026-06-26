# Messenger 参考仓库

这个仓库承担三个清楚职责：

1. 保留 Abeto 网页游戏 **Messenger** 的静态参考快照。
2. 保存原创项目 **《南都爱情故事》** 的前期策划、正文、音频和工程决策文档。
3. 保存对原版 Messenger 静态快照的分析结论，但不长期公开保留从原版 bundle 中提取的大段代码片段。

它不是《南都爱情故事》的正式源码工程。不要把实验项目、模型转换结果、Vite 工程、Blender 导出物或临时原型直接塞进仓库根目录。

---

## 根目录：原版 Messenger 静态快照

- `index.html`  
  原版 Messenger 静态快照入口。

- `assets/`  
  原站运行需要的静态资源，包括 JS bundle、Draco 几何、纹理、字体、音频、worker 和支持库。

- `robots.txt`  
  原站保留下来的 robots/content-signal 文件。

- `44bdbdb0-b663-47c1-95f5-14066afccd72`  
  抓取原站时保留下来的资源文件。

---

## 原版分析目录

- `analysis/`  
  保存对原版 Messenger 静态快照的分析结果。

- `analysis/README.md`  
  说明分析目录的公开仓库边界。

- `analysis/original/key-symbols.txt`  
  原版 bundle 的关键词索引，用于定位相机、碰撞、角色、地形等机制。

- `analysis/original/module-map.md`  
  原版 bundle 的粗略模块地图。

- `analysis/original/original-mechanics-notes.md`  
  原版力学机制笔记。

### 关于 `.extract.js`

`analysis/original/*.extract.js` 这类文件不适合长期放在公开仓库。

原因：它们是从原版 `assets/App3D-DwM1eiaC.js` 中提取出来的代码片段，虽然用于学习分析，但属于原版 bundle 的派生代码片段。公开保留会增加版权、授权和项目边界风险。

后续如需再次查看，应在本地临时生成，不提交到公开仓库。仓库中只保留我们自己的分析结论、机制总结、关键词索引和工程决策。

---

## 子项目：《南都爱情故事》

- `nandu-love-story/`  
  原创项目《南都爱情故事》的独立项目空间。

- `nandu-love-story/docs/`  
  项目前期文档、正文、音频规划和工程决策。

当前文档：

- `nandu-love-story/docs/original-messenger-mechanics-audit.md`  
  原版 Messenger 力学机制审计与《南都爱情故事》工程决策。后续实现角色碰撞、walkmesh、相机等系统时应优先遵守。

目前仓库里可能还保留部分历史文档在根 `docs/` 中。后续与《南都爱情故事》强相关的原创文档，应逐步迁入 `nandu-love-story/docs/`。

---

## 本地预览原版快照

在仓库根目录运行：

```bash
python3 -m http.server 3001 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:3001/
```

---

## 仓库边界

这个仓库应该继续保持三个边界：

1. 原版 Messenger 静态快照留在根目录，用于参考与本地预览。
2. 原版分析结论放在 `analysis/`，但不提交大段原版提取代码。
3. 《南都爱情故事》的原创内容放在 `nandu-love-story/`。

后续真正开始写游戏源码时，应在 `nandu-love-story/` 下创建干净工程，例如：

```text
nandu-love-story/
  package.json
  src/
  public/
  docs/
```

正式工程应该有自己的源码树、依赖、构建脚本和资产管线，不要再和原站静态快照混在同一层。

---

## 权利说明

原版 Messenger 的站点和资产属于原作者。这个仓库目前用于学习、参考和前期规划。

未来如果公开发布《南都爱情故事》，应该使用原创资产、已授权资产，或取得明确许可的资产。不要把原版 Messenger 的模型、音频、贴图、shader 或提取代码片段迁入正式项目。