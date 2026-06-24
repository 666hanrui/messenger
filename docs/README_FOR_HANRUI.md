# 当前仓库地图

这个仓库现在已经清理成一个单一用途的参考仓库：保留原版 Messenger 的静态快照，同时保存《南都爱情故事》的策划和正文文档。

它不再是那个混着实验工程、南京模型、Vite 服务和临时舞台的目录。

## 根目录

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

## 文档目录

- `docs/nanjing-slow-mail-concept.md`  
  早期“南京慢递”方向概念文档。现在项目名已经确定为《南都爱情故事》，但这份文档仍然保留了最初的题材来源和设计思路。

- `docs/nandu-love-story-draft.md`  
  已经通过的正文草稿。后续继续写故事时，应该优先续写或整理到这里。

- `docs/audio-scene-generation-plan.md`  
  场景音乐、环境声、音效、语音和触发方式规划。

- `docs/project-architecture.md`  
  未来正式工程的分层建议。注意：这是未来方案，不代表当前仓库里已经有这些源码目录。

- `docs/original-site-capture.md`  
  原版 Messenger 抓取和本地运行记录。

- `docs/assets/nanjing-slow-mail-style-anchor.png`  
  风格参考图。

## 本地运行原站

在仓库根目录运行：

```bash
python3 -m http.server 3001 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:3001/
```

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

如果后面重新开始做正式游戏，建议新建干净工程，不要直接把实验代码塞回这个原站快照根目录。
