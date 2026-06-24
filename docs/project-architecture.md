# 《南都爱情故事》工程分层说明

当前源码已经按三层拆开：

```text
src/
  main.ts          # 极薄入口，只加载 game/main
  game/            # 游戏逻辑层：玩家、任务、NPC、对白、HUD、音频、入口装配
  reference/       # 原版参考层：Messenger 资源加载、terrain、水、树叶、shader、后处理
  nanjing/         # 南京内容层：南京模型、地点、碰撞、场景原型
```

## 1. 原版参考层：`src/reference/`

这一层来自对 `messenger-copy/src/lib/messenger/` 的迁移和整理，职责是保留原版 Messenger 的渲染与资源组织方法。

重点文件：

- `src/reference/gameplayTerrain.ts`
  - 加载原版 gameplay terrain 的 Draco 分块。
  - 对应参考工程的 `createGameplayTerrainGroup()`。

- `src/reference/gameplayWater.ts`
  - 加载 gameplay water 几何体。
  - 提供水材质、时间更新、深度贴图接入。

- `src/reference/terrainMaterial.ts`
  - terrain shader 材质。

- `src/reference/treeLeaves.ts`
  - 树叶 shader 材质与动画。

- `src/reference/postProcessing.ts`
  - 原版式 composer、LUT、depth outline、props 材质。

- `src/reference/sceneDepthPass.ts`
  - 给水和后处理使用的深度目标。

- `src/reference/loadGeometry.ts`
  - Draco / batched geometry 加载。

- `src/reference/shaders/`
  - 从原版参考工程迁移出来的 shader。

原版参考工程的组织方式是：

```text
MessengerScene.svelte
  -> createGameplaySceneGroup(renderer)
    -> load textures
    -> create terrain / water / tree leaves / props
    -> return bundle
  -> createMessengerComposer(renderer, scene, camera, lut)
  -> render loop:
    -> update controls/materials
    -> render depth pass without water
    -> composer.render()
```

这说明我们后面不要把南京场景写成一个大文件，而应该做成类似 `createNanjingSceneGroup(renderer)` 的 bundle。

## 2. 南京内容层：`src/nanjing/`

这一层只放南京相关内容。

重点文件：

- `src/nanjing/stagePrototype.ts`
  - 当前南京 GLB + 临时地面原型。
  - 这是过渡文件，不是最终架构，也不是最终美术方向。

- `src/nanjing/buildingCollider.ts`
  - 建筑碰撞系统。
  - 当前能收集建筑碰撞体，但还没有真正接进玩家移动逻辑。

- `src/nanjing/landmarkModel.ts`
  - 把 GLB 模型贴到球面上的变换工具。
  - 负责统一 toon 材质。

- `src/nanjing/regions.ts`
  - 南京地点锚点、任务目标、可选原版 props / landmark 加载。

南京模型资产位置：

```text
ditumoxing/                         # 原始下载白模，不直接进游戏
public/models/nanjing/              # 南京模型工作区
public/models/nanjing/optimized/    # 游戏优先使用的优化 GLB
scripts/                            # DAE/OBJ/GLB 转换与风格化脚本
```

## 3. 游戏逻辑层：`src/game/`

这一层是实际游戏逻辑。

重点文件：

- `src/game/main.ts`
  - 当前游戏装配入口。
  - 现在仍加载 `createNanjingStagePrototype()`，只是为了保持项目可运行。

- `src/game/player.ts`
  - 球面移动、跳跃、输入。

- `src/game/camera.ts`
  - 跟随相机。

- `src/game/npc.ts`
  - NPC 加载、标记、名牌。

- `src/game/quest.ts`
  - 送信任务状态机。

- `src/game/interaction.ts`
  - 交互与对话触发。

- `src/game/ui/`
  - 对话框和 HUD。

- `src/game/data/`
  - NPC 和任务数据。

## 4. 下一步接入方案

不要继续扩大 `stagePrototype.ts`。

建议下一步做：

```text
src/nanjing/createNanjingScene.ts
```

让它像原版参考的 `createGameplaySceneGroup()` 一样返回：

```ts
type NanjingSceneBundle = {
  group: THREE.Group;
  landmarkGroup: THREE.Group;
  colliders: THREE.Mesh[];
  update(elapsed: number): void;
};
```

然后 `src/game/main.ts` 只负责：

- 创建 renderer / scene / camera。
- 调用南京 scene bundle。
- 接入玩家、NPC、任务、HUD。
- 每帧调用 `bundle.update(time)`。
- 把 `BuildingCollider.testMove()` 接进 `player.update()` 的移动结果。

这样原版风格、南京模型、游戏逻辑就不会继续缠在一起。
