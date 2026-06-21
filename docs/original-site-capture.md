# 原版 Messenger 抓取记录

来源：

```text
https://messenger.abeto.co/
```

当前仓库根目录保存的是一份静态运行快照。它保留原站结构：

```text
index.html
assets/
robots.txt
```

本地验证方式：

```bash
cd /Users/hanrui/messenger
python3 -m http.server 3001 --bind 127.0.0.1
```

打开：

```text
http://127.0.0.1:3001/
```

已做的本地化修复：

- 将主 bundle 中的 worker 地址从 `https://messenger.abeto.co/assets/...` 改成本地 `/assets/...`。
- 补齐运行时需要的 worker、wasm、Draco 几何、纹理、音频和 UI 资源。
- 保留原静态资源目录，方便后续对照和迁移玩法结构。

后续新项目方向见：

```text
docs/nanjing-slow-mail-concept.md
```
