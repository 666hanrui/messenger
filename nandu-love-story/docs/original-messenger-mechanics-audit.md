# 原版 Messenger 力学机制审计与《南都爱情故事》工程决策

本文档用于记录对原版 `messenger.abeto.co` 静态快照中核心运行机制的阶段性解剖结果，并把这些结果转化为《南都爱情故事》后续工程实现的硬性决策。

它不是灵感文档，也不是美术方向文档，而是工程约束文档。后续让 Codex、AI Agent 或人工继续写代码时，应优先遵守本文档。

---

## 1. 当前结论摘要

原版 Messenger 的角色能够稳定站在球形世界上，不是因为它简单用了“球面公式”，也不是因为玩家直接踩在视觉地形上。

根据当前已提取文件：

- `analysis/original/collisionPhysics.extract.js`
- `analysis/original/characters.extract.js`
- `analysis/original/followCamera.extract.js`
- `analysis/original/planet-terrain.extract.js`
- `analysis/original/original-mechanics-notes.md`

可以确认原版核心机制更接近：

```text
视觉地形 terrain chunks
+
专用碰撞地形 hitmesh / colliderGeometry
+
BVH 加速结构
+
角色 capsule 胶囊体
+
shapecast 推离碰撞
+
raycast / closestPoint 初始吸附
+
snap 同步位置、up、旋转与物理状态
+
followCamera 与角色碰撞系统共享 collider
```

因此，《南都爱情故事》不能继续沿用“把角色直接放到可见南京白模/视觉地面上”的路线。

---

## 2. 原版机制审计

### 2.1 `collisionPhysics` 是真正的站稳核心

原版 `collisionPhysics` 初始化时会创建：

```text
Object3D
Line3
Box3
Vector3
Euler
Quaternion
Raycaster
charactersCapsule
```

并设置物理参数：

```text
_gravity = 0.015
_jumpForce = 0.2
_positionForce = 0.5
_substeps = 4
_capsuleRadiusPercentage = 0.2
_floorDetectInclination = 0.8
_fallLimitDistance = 10
```

这说明它不是普通移动控制器，而是完整的角色碰撞物理层。

最关键的是：角色不是一个点，也不是一个盒子，而是一个 capsule 胶囊体：

```javascript
this._charactersCapsule = {
  radius: 0.5,
  segment: new Line3(new Vector3(0, 0, 0), new Vector3(0, 1, 0)),
}
```

工程判断：

> 《南都爱情故事》第一版角色控制器也必须使用 capsule 或等价的胶囊碰撞结构，不能只用点、球或裸 Mesh 位置。

---

### 2.2 原版主要靠 `shapecast` 防穿模，不是单纯 raycast

原版每个物理子步会：

1. 把速度按 `_substeps` 分段；
2. 移动临时物理对象；
3. 调用 `_performShapecast()`；
4. 如果 capsule 和 BVH 地形发生重叠，则把 capsule 推出；
5. 根据碰撞方向修正速度。

核心伪代码：

```javascript
_substep() {
  const stepRatio = 1 / this._substeps;
  tempObject.position += velocity * stepRatio;

  const collisionNormal = this._performShapecast(tempObject, stepRatio);

  if (!this._isAutoStepping) {
    velocity += collisionNormal * -dot(collisionNormal, velocity);
  }
}
```

`_performShapecast()` 会把 capsule segment 转换到当前对象矩阵下，扩展 AABB，然后调用：

```javascript
this._geometry.boundsTree.shapecast(this._shapecastFuncs)
```

`intersectsTriangle` 回调内部通过最近点距离判断 capsule 是否和三角形重叠。如果距离小于 capsule 半径，就把 capsule 推离三角形。

工程判断：

> 《南都爱情故事》不能只依赖“向下 raycast 找地面高度”。必须实现 capsule 与 walkmesh 的碰撞推离逻辑。最小版本可以简化，但必须保留“碰撞体积 + 推离”这个核心思想。

---

### 2.3 `intersectsTriangle` 返回值不要误读

当前 `original-mechanics-notes.md` 中提到：`shapecast` 的 `intersectsTriangle` 返回 `false` 可能导致高速时跳过碰撞。

这个判断需要修正。

在原版提取代码中，`intersectsTriangle` 回调内部已经通过副作用修改 capsule segment，把角色推出碰撞面。它返回 `false` 更可能表示“不提前终止遍历”，而不是“没有发生碰撞”。

真正的穿模风险更可能来自：

```text
单步位移过大
substeps 太低
capsule 半径过小
walkmesh / hitmesh 有裂缝
碰撞地形法线不连续
视觉地形与碰撞地形坐标不一致
```

工程判断：

> 不要让 Codex 去修改 `intersectsTriangle` 的返回值来“修穿模”。真正应该检查的是 substeps、速度、capsule 尺寸、walkmesh 连续性和坐标对齐。

---

### 2.4 原版初始化位置会投射到 collider

`characters.extract.js` 中的 `setInitialPosition()` 证明，原版角色出生点不是直接使用裸坐标。

它会：

1. 读取初始 up 向量；
2. 从候选点上方沿 `-up` 方向 raycast 到 `_collider`；
3. 如果 raycast 命中，则使用 hit point 作为初始位置；
4. 如果没有命中，则使用 BVH 的 `closestPointToPoint()` 找最近点。

工程判断：

> 《南都爱情故事》的角色出生、传送、剧情锁点、交互结束回位，都必须通过 collider 投射或 closest point 修正。不能直接写死 `player.position = [x, y, z]`。

---

### 2.5 原版 `_snap()` 同步的不只是 position

原版 `_snap()` 会同步：

```text
_positionPrevPhysics
_positionNextPhysics
角色 up 向量
_rotationPrevPhysics
_rotationNextPhysics
_updatePosition(0)
_updateRotation(0)
_resetPhysics(...)
```

这说明 snap 是完整物理状态重置，不是简单把角色拉回某个坐标。

工程判断：

> 《南都爱情故事》必须有 `snapToWalkmesh()` / `resetToSafePose()` 之类的统一接口，同时同步 position、up、rotation、velocity、camera target 和 lastSafeState。

禁止散落写法：

```javascript
player.position.copy(lastSafePosition);
```

推荐统一概念：

```typescript
snapCharacter({
  position,
  up,
  rotation,
  resetVelocity: true,
  syncCamera: true,
});
```

---

### 2.6 `characters` 系统是三层结构，不是一个 Player 类包办

原版角色系统中可以看到：

```javascript
this._controls = new charactersControls(this, i)
this._collisionPhysics = new collisionPhysics(this, { ...i })
```

说明原版至少分成三层：

```text
charactersControls
  处理键盘、触摸、手柄输入，输出移动意图

collisionPhysics
  处理 capsule、gravity、substeps、shapecast、snap、floor 检测

characters
  处理角色对象、动画、交互、相机 follow、网络同步等
```

工程判断：

> 《南都爱情故事》不要再写一个万能 `Player.ts` 同时处理输入、碰撞、动画、相机和交互。必须拆分职责。

推荐第一版结构：

```text
src/character/InputControls.ts
src/character/CapsuleMotor.ts
src/character/CharacterEntity.ts
src/collision/WalkmeshCollider.ts
src/camera/FollowCamera.ts
```

---

### 2.7 followCamera 依赖角色碰撞系统

原版 `followCamera` 不是普通第三人称相机。它使用 `Spherical` 保存相机相对角色的球坐标，并有：

```text
_cameraCollisions = true
_cameraCollisionsMinDistance = 0.75
_cameraCollisionsMaxIterations = 10
_cameraTargetLocalLerp = 0.0125
_cameraTargetWorldLerp = 0.175
_cameraSphericalRadiusCollisionsLerp = 0.35
```

更关键的是，`followCamera._update()` 会直接访问：

```javascript
this._followedMesh._collisionPhysics
```

相机碰撞使用的也是角色物理层中的 `_collider`。

工程判断：

> 《南都爱情故事》的相机不能独立于角色碰撞系统。相机、角色、walkmesh 必须共享同一套 collider 数据。

最低要求：

```text
FollowCamera 从角色目标点向相机目标位置做 raycast；
如果射线命中 walkmesh，则缩短相机距离；
相机不能钻进地面内部；
相机不能在角色掉落时看穿球体背面。
```

---

### 2.8 视觉地形和碰撞地形必须分离

`planet-terrain.extract.js` 中，intro 星球会加载：

```text
planet.drc
water.drc
trees.drc
clouds.drc
```

这些属于视觉层。

但碰撞层通过 `colliderGeometry` 初始化，如果没有 colliderGeometry，会直接报错：

```javascript
if (!e.colliderGeometry)
  throw new Error("Collider geometry not provided");
```

之后它会创建不可见的 `_colliderMesh`，计算 boundingBox / boundingSphere，并把 position、index、matrixWorld 发给 worker 构建 BVH。

工程判断：

> 《南都爱情故事》必须明确区分视觉模型和碰撞模型。南京建筑白模、街道美术模型、地面贴图都不能默认作为角色可走地形。

---

## 3. 对前两次失败的解释

### 3.1 穿模失败

前两次本地失败很可能不是单一 bug，而是架构路线错误。

错误方向：

```text
视觉地面 / 南京白模
+
普通 player movement
+
raycast 找地面
+
事后修补 lastSafePosition
```

原版方向：

```text
专用 hitmesh / colliderGeometry
+
BVH
+
capsule
+
substeps
+
shapecast 推离
+
snap 完整重置
+
followCamera 碰撞修正
```

因此，继续在原有 Player 或白模上修穿模，只会越来越乱。

---

### 3.2 美术风格迁移失败

原版风格不是“低多边形模型 + 柔和材质”这么简单。

从代码和资源组织看，原版至少包含：

```text
terrain chunks / LOD
atlas 色彩体系
custom material / shader
water depth shader
草地 / 树叶 shader
景深 DOF
SMAA / 抗锯齿
基于 camera distance 的线条厚度控制
后处理合成
```

工程判断：

> 南京白模不能直接变成最终美术资产。第一版要先做小型风格锚点场景，而不是导入大量真实白模。

---

### 3.3 AI 操作 Blender 困难

AI 没有稳定视觉判断能力，不能让它开放式地“把白模改好看”。

可控方式应该是：

```text
固定色盘
固定模块
固定比例
固定材质规则
固定导出命名
固定碰撞层规则
```

工程判断：

> AI 可以生成规则化低模模块或脚本化资产，但不能作为最终美术审美裁判。需要先定义 style anchor，再让 AI 按规则生产。

---

## 4. 《南都爱情故事》第一阶段硬性工程决策

### 决策 1：先做 walkmesh，不做完整南京白模地形

第一版必须创建专用碰撞地形：

```text
public/collision/old-street-hitmesh.glb
```

或等价格式。

它应该满足：

```text
连续
无裂缝
简化
只包含可走面和必要阻挡面
和视觉地形坐标严格对齐
不包含复杂建筑细节
```

### 决策 2：视觉模型不参与角色落地判断

视觉模型只负责画面。

```text
邮局、街道、锅贴店、树、邮筒、建筑白模
```

默认都不作为地面。

如果需要阻挡或可走区域，必须在 walkmesh / collision layer 中显式表达。

### 决策 3：先做局部旧南京舞台，不做完整球形城市

第一阶段目标不是完整南京，也不是复刻整颗 Messenger 小星球。

第一阶段只做：

```text
邮局 → 老门东小街 → 蒋有记
```

并验证：

```text
角色连续乱跑 3 分钟不穿模
角色贴边不掉落
相机不钻地
角色初始点能稳定吸附到 walkmesh
```

### 决策 4：必须实现 `CapsuleBVHController` 最小验证

在正式剧情、UI、美术继续推进前，必须先实现最小力学 demo：

```text
一个可见地面
一个不可见 hitmesh
一个 capsule 玩家
一个 follow camera
一个 debug overlay
```

验收标准：

```text
WASD / 触摸移动稳定
连续移动不掉地底
高速移动不穿过薄面
斜坡/台阶可控
相机不会穿进地面
角色 reset 后 up/rotation/camera 同步
```

### 决策 5：角色重置必须通过统一 snap 接口

禁止：

```typescript
player.position.copy(pos);
```

必须：

```typescript
character.snapTo({
  position,
  up,
  rotation,
  resetVelocity: true,
  syncCamera: true,
});
```

### 决策 6：相机必须使用同一套 collider

`FollowCamera` 不能只做位置插值。

最低实现：

```text
从角色目标点到相机目标点做 raycast
命中 walkmesh 时缩短相机半径
限制最小相机距离
限制 vertical angle
支持剧情交互时 setFollowOverwrite
```

### 决策 7：工程目录必须围绕这些系统拆分

建议结构：

```text
nandu-love-story/
  src/
    character/
      InputControls.ts
      CapsuleMotor.ts
      CharacterEntity.ts
    collision/
      WalkmeshCollider.ts
      buildBVH.ts
    camera/
      FollowCamera.ts
    scene/
      OldStreetStage.ts
    debug/
      CollisionDebugView.ts
  public/
    collision/
      old-street-hitmesh.glb
    models/
    textures/
  docs/
```

---

## 5. 禁止事项

以下做法在第一阶段禁止：

```text
禁止直接把南京白模当作角色地面
禁止让角色只靠 y 高度修正站在地上
禁止让相机独立于 collider 运行
禁止把输入、碰撞、动画、相机写进一个 Player 类
禁止先做大地图再修碰撞
禁止没有 debug overlay 就继续调穿模
禁止用视觉效果掩盖物理掉落
禁止让 Codex 开放式“优化整个游戏”
```

---

## 6. 给 Codex 的下一步任务边界

下一次给 Codex 的任务应非常窄：

```text
只实现 CapsuleBVHController 最小 demo。
不要写剧情。
不要导入南京白模。
不要做完整美术。
不要做任务系统。
不要改原版 Messenger 静态快照。
```

推荐任务描述：

```text
在 nandu-love-story/ 下创建最小 Three.js/Vite demo。
实现一个可见低模地面和一个独立 invisible walkmesh。
使用 capsule + BVH shapecast 做玩家碰撞。
输入层只输出移动方向。
相机使用 follow camera，并对同一个 walkmesh 做 raycast 防穿地。
提供 debug 开关显示 capsule、walkmesh、raycast、lastSafePosition。
验收目标：连续乱跑 3 分钟不穿模。
```

---

## 7. 当前最重要的判断

《南都爱情故事》的下一步不是继续扩写剧情，也不是继续堆南京模型。

下一步只有一个目标：

> 做出一个不会穿模的最小旧南京力学舞台。

原版 Messenger 的答案已经很明确：

```text
不是球面玄学，
而是专用碰撞地形 + BVH + capsule + shapecast + snap + collision-aware camera。
```

这个机制跑通之前，所有美术和剧情推进都只能算风险堆积。
