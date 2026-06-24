# Messenger 参考仓库

这个仓库现在承担两个清楚的职责：

1. 保留 Abeto 网页游戏 **Messenger** 的静态参考快照。
2. 作为原创项目 **《南都爱情故事》** 的孵化仓库。

根目录保留原版 Messenger 的静态快照；《南都爱情故事》作为独立项目文件夹放在：

```text
nandu-love-story/
```

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

本地预览原版快照：

```bash
python3 -m http.server 3001 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:3001/
```

---

## 子项目：《南都爱情故事》

```text
nandu-love-story/
```

这是基于 Messenger 的“小地图、轻任务、强氛围、低压力探索”结构启发而来的原创叙事项目。

它不是 Messenger 的换皮，也不直接使用原版资产作为正式发布内容。项目方向是：以旧南京为舞台，玩家扮演年轻邮差，在晨昏流转中送出一封封“有情之书”，见证那些慢慢说出口、慢慢错过、慢慢抵达的爱。

当前阶段：

- 前期概念
- 故事正文
- 音频规划
- 未来工程结构设计

后续正式开发时，应在 `nandu-love-story/` 下创建干净工程，例如：

```text
nandu-love-story/
  package.json
  src/
  public/
  docs/
```

---

## 文档说明

当前仓库里仍保留 `docs/` 作为历史整理目录。后续与《南都爱情故事》强相关的文档，应逐步迁入：

```text
nandu-love-story/docs/
```

---

## 仓库边界

不要把实验项目、模型转换结果、Vite 工程、Blender 导出物或临时原型直接塞进仓库根目录。

如果是原版 Messenger 参考资料，放在根快照结构中；如果是《南都爱情故事》的原创内容，放入 `nandu-love-story/`。

---

## 权利说明

原版 Messenger 的站点和资产属于原作者。这个仓库目前用于学习、参考和原创项目孵化。

未来如果公开发布《南都爱情故事》，应使用原创资产、已授权资产，或取得明确许可的资产。
