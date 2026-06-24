# Messenger 原站参考快照

这个仓库现在只承担一个清楚的职责：保留 Abeto 网页游戏 Messenger 的静态参考快照，同时保存《南都爱情故事》的前期策划、正文和音频文档。

它不是《南都爱情故事》的正式源码工程。不要把实验项目、模型转换结果、Vite 工程、Blender 导出物或临时原型直接塞进这个仓库根目录。

## 这里有什么

- `index.html`  
  原版 Messenger 静态快照入口。

- `assets/`  
  原站运行需要的静态资源，包括 JS bundle、Draco 几何、纹理、字体、音频、worker 和支持库。

- `robots.txt`  
  原站保留下来的 robots/content-signal 文件。

- `docs/`  
  《南都爱情故事》的策划、正文和制作规划文档。

- `44bdbdb0-b663-47c1-95f5-14066afccd72`  
  抓取原站时保留下来的资源文件。

## 本地预览

在仓库根目录运行：

```bash
python3 -m http.server 3001 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:3001/
```

## 仓库边界

这个仓库应该继续保持两件事：

1. 原版 Messenger 参考快照
2. 《南都爱情故事》的前期文档

后续真正开始做游戏源码时，建议新建一个干净工程，或者在明确整理后新增独立的 `game/` 目录。正式工程应该有自己的源码树、依赖、构建脚本和资产管线，不要再和原站静态快照混在同一层。

## 当前文档

- `docs/nanjing-slow-mail-concept.md`  
  早期“南京慢递”方向概念文档。项目后续已经改名为《南都爱情故事》，但这份文档保留了最初的题材来源和设计思路。

- `docs/nandu-love-story-draft.md`  
  已经通过的正文草稿。

- `docs/audio-scene-generation-plan.md`  
  场景音乐、环境声、音效、语音和触发方式规划。

- `docs/project-architecture.md`  
  未来正式工程的分层建议。

- `docs/original-site-capture.md`  
  原版 Messenger 抓取和本地运行记录。

- `docs/README_FOR_HANRUI.md`  
  当前仓库地图。

## 权利说明

原版 Messenger 的站点和资产属于原作者。这个仓库目前用于学习、参考和前期规划。未来如果公开发布《南都爱情故事》，应该使用原创资产、已授权资产，或取得明确许可的资产。
