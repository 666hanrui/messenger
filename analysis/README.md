# analysis 目录说明

`analysis/` 用于保存对原版 Messenger 静态快照的分析结果。

这个目录只应该存放我们自己的分析、索引、机制笔记和工程决策，不应该长期保存从原版生产 bundle 中直接提取出来的代码片段。

## 当前允许保留的内容

```text
analysis/original/key-symbols.txt
analysis/original/module-map.md
analysis/original/original-mechanics-notes.md
```

这些文件用于记录关键词索引、模块定位和机制分析，方便后续理解原版的工程结构。

## 不应公开保留的内容

```text
analysis/original/*.extract.js
```

这类文件来自原版 `assets/App3D-DwM1eiaC.js` 的片段提取，虽然用于学习分析，但属于原版 bundle 的派生代码片段。公开仓库中长期保留它们可能带来版权、授权和项目边界风险。

后续如果需要再次查看这些片段，应在本地临时生成，不提交到公开仓库。

## 使用原则

1. 可以提交自己写的分析结论。
2. 可以提交文件路径、行号、关键词索引和机制总结。
3. 不提交大段原版代码片段。
4. 不把原版代码片段迁入《南都爱情故事》源码。
5. 《南都爱情故事》的实现必须使用原创代码、原创资产或明确授权内容。
