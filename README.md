# Messenger Recovery

这个仓库保存从 Abeto 原版网页游戏《Messenger》抓取并修复成本地可运行的静态站内容。

原始网址：

```text
https://messenger.abeto.co/
```

本地运行：

```bash
python3 -m http.server 3001 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:3001/
```

## 目录

```text
index.html
assets/
robots.txt
docs/
```

`assets/` 中包含原站运行所需的 JS bundle、workers、wasm、Draco 几何、KTX2 纹理、音频和图标等资源。

项目新方向文档在：

```text
docs/nanjing-slow-mail-concept.md
```

## 说明

这份快照中已经把原 bundle 里的 worker 绝对地址改为本地 `/assets/...` 地址，方便直接在本地静态服务器下运行。

