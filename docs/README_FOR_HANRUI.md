# 当前仓库地图

这个仓库现在已经整理成两个清楚部分：

1. 根目录保留原版 Messenger 的静态参考快照。
2. `nandu-love-story/` 作为《南都爱情故事》的独立项目文件夹。

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

## 《南都爱情故事》项目文件夹

- `nandu-love-story/`  
  原创项目《南都爱情故事》的独立项目空间。

- `nandu-love-story/README.md`  
  项目简介、边界和后续工程方向。

- `nandu-love-story/docs/`  
  项目前期文档、正文、音频规划和未来工程分层建议。

当前文档：

- `nandu-love-story/docs/nanjing-slow-mail-concept.md`  
  早期“南京慢递”方向概念文档。

- `nandu-love-story/docs/nandu-love-story-draft.md`  
  已经通过的正文草稿。

- `nandu-love-story/docs/audio-scene-generation-plan.md`  
  场景音乐、环境声、音效、语音和触发方式规划。

- `nandu-love-story/docs/project-architecture.md`  
  未来正式工程的分层建议。

后续正式开发时，源码、素材、脚本和项目文档都应该优先放在这里，而不是塞进仓库根目录。

推荐后续结构：

```text
nandu-love-story/
  package.json
  src/
  public/
  docs/
```

---

## 根 docs 目录

当前根部 `docs/` 只保留仓库级说明和原版 Messenger 抓取记录。

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
