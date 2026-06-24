# 当前项目目录地图

这个工作区现在同时放了原版参考、南京项目、临时实验和模型原始文件，所以看起来很乱。先按下面找。

## 你主要要看的项目

- `messager/`
  - 当前《南都爱情故事》主工程。
  - 现在 `http://127.0.0.1:5173/` 跑的就是这里。
  - 源码现在按 `src/game/`、`src/reference/`、`src/nanjing/` 三层拆开。

## 原版 / 参考

- `messenger.abeto.co/`
  - 从原始网站扒下来的静态资源和打包产物。
  - 适合用来对照原版资产、bundle、图片、声音、几何体文件。

- `messenger-copy/`
  - 更接近“研究原版怎么做”的 Svelte/Three 参考工程。
  - 重点看：`messenger-copy/src/lib/messenger/`
  - 里面有原版场景拆解、terrain、水、材质、后处理、Draco 加载等代码。

## 南京模型资产

- `messager/ditumoxing/`
  - 你下载的原始白模包、zip、dae、skp 等。
  - 这是素材源头，不建议直接在游戏里加载。

- `messager/public/models/nanjing/`
  - 南京模型工作目录。
  - `optimized/` 里是已经转换压缩后的 GLB，游戏应该优先加载这里。

- `messager/scripts/`
  - 模型转换和风格化脚本。
  - 目前包括 DAE/OBJ/GLB 相关脚本。

## 文档

- `messager/docs/nandu-love-story-draft.md`
  - 已通过的故事正文。

- `messager/docs/audio-scene-generation-plan.md`
  - 场景、音乐、语音、音效的生成规划。

- `messager/walkthrough.md`
  - 我补上的当前技术现场说明。

- `messager/docs/project-architecture.md`
  - 当前源码分层说明和下一步接入方案。

## 当前混乱点

- `messager/src/nanjing/stagePrototype.ts`
  - 这是我前面错误方向造成的临时舞台文件，后来又被塞进了 GLB 加载。
  - 它现在是“混合实验状态”，不是最终正确架构。

- `messager/dist/`
  - 构建产物，可重新生成，不要当源码看。

- `jiewang/`
  - 早期几何克隆项目，不是现在要继续做的主项目。

## 当前结论

你刚才在浏览器看到的 `5173` 画面，确实不是你要验收的正确方向。它只是当前 `messager` 入口加载了混合实验舞台后的结果。
