# 《南都爱情故事》当前技术现场

## 先说结论

当前 `http://127.0.0.1:5173/` 跑的是 `messager/`，但它不是一个干净状态。

它原来同时混着三条线：

- 原版 Messenger 资源接入线。
- 南京 GLB 白模转换与风格化线。
- 我前面错误创建的临时低多边形舞台线。

所以你在浏览器看到的空旷低质地面，不应该被当作最终方向验收。

## 真正有价值的东西在哪

- 原版参考工程：`../messenger-copy/src/lib/messenger/`
- 原版扒站资源：`../messenger.abeto.co/assets/`
- 南京主工程入口：`src/game/main.ts`
- 南京模型原始文件：`ditumoxing/`
- 南京优化 GLB：`public/models/nanjing/optimized/`
- 模型转换脚本：`scripts/convert_dae_to_glb.py`
- 风格化脚本：`scripts/stylize_nanjing_glb.py`
- 建筑碰撞：`src/nanjing/buildingCollider.ts`
- 剧情正文：`docs/nandu-love-story-draft.md`
- 音频规划：`docs/audio-scene-generation-plan.md`
- 工程分层说明：`docs/project-architecture.md`

## 当前代码实际情况

- `src/game/world.ts` 已经把 `planetRadius` 调到 `200`，曲率更平。
- `public/models/nanjing/optimized/` 里已经有 7 个 GLB。
- `src/nanjing/buildingCollider.ts` 存在，浏览器日志显示 3 秒后能收集到 7 个建筑碰撞体。
- 但 `src/game/player.ts` 还没有真正调用 `collider.testMove(...)`，所以碰撞系统只是被创建了，还没有接进移动逻辑。
- `src/game/main.ts` 现在默认加载 `createNanjingStagePrototype()`。
- `src/nanjing/stagePrototype.ts` 现在既有临时低多边形地面，也有 optimized GLB 加载，这是过渡原型，不是最终架构。
- `src/nanjing/regions.ts` 里的 `ENABLE_IMPORTED_LANDMARKS` 仍是 `false`，另一条 GLB 加载路径没有启用。

## 为什么刚才打开的画面不对

浏览器日志显示建筑 GLB 加载后碰撞体数量为 7，说明模型不是完全没加载。

但默认出生点、相机朝向、临时舞台构图和建筑摆放没有作为一个整体设计，所以首屏看到的是低质临时地面，而不是你想看的原版气质或南京建筑场景。

## 下一步应该怎么整理

不要继续在 `src/nanjing/stagePrototype.ts` 上堆东西。

建议改成三层：

- `src/reference/`：原版 Messenger 参考加载、材质、水、terrain、后处理。
- `src/nanjing/`：南京模型、地点、建筑摆放、碰撞、场景触发。
- `src/game/`：玩家、相机、任务、对白、HUD、音频。

当前第一步应该是：先读 `messenger-copy/src/lib/messenger/` 的原版实现，再决定南京场景如何复用它的渲染和资产组织方式。
