# Messenger 原版力学机制笔记

## 穿模问题分析

根据代码解剖，穿模问题的答案集中在以下三个区域：

---

## 1. collisionPhysics._substep() (Lines 55514-55521)

**核心碰撞检测循环**

```javascript
_substep() {
  const e = 1 / this._substeps;  // e.g., 1/4 = 0.25
  L(this, Ji).position.add(L(this, Rt));  // Ji = 临时对象

  // 关键：执行 shapecast 检测胶囊体与地形碰撞
  const i = this._performShapecast(L(this, Ji), e);

  // 如果不是自动跨步，添加碰撞响应
  this._isAutoStepping ||
    this._velocityPhysics.addScaledVector(i, -i.dot(this._velocityPhysics));
}
```

**穿模风险点**：`_substeps` 默认值是 4，如果角色移动速度过快，单步位移超过胶囊半径，可能穿越薄障碍。

---

## 2. collisionPhysics._performShapecast() (Lines 55522-55540)

**胶囊体与 BVH 碰撞检测实现**

```javascript
_performShapecast(e, i) {
  e.updateMatrix();

  // 1. 构建胶囊体线段（start 到 end，加上半径偏移）
  L(this, jt).copy(this._charactersCapsule.segment);
  L(this, jt).start.y += this._charactersCapsule.radius;
  L(this, jt).end.y += this._charactersCapsule.radius;
  L(this, jt).start.applyMatrix4(e.matrix);
  L(this, jt).end.applyMatrix4(e.matrix);

  // 2. 扩展 AABB 包围盒
  L(this, nr).copy(L(this, jt));
  L(this, Zi).makeEmpty();
  L(this, Zi).expandByPoint(L(this, jt).start);
  L(this, Zi).expandByPoint(L(this, jt).end);
  L(this, Zi).min.addScalar(-this._charactersCapsule.radius);
  L(this, Zi).max.addScalar(this._charactersCapsule.radius);

  // 3. BVH shapecast 查询
  this._geometry.boundsTree.shapecast(this._shapecastFuncs);

  // 4. 计算位移
  const s = L(this, Rt);
  s.subVectors(L(this, jt).start, L(this, nr).start);
  const a = Math.max(0, s.length() - 1e-5 * i);
  return (s.normalize(), e.position.addScaledVector(s, a), s);
}
```

**穿模风险点**：
- `1e-5 * i` 是允许的误差阈值，如果位移过大可能跳过检测
- BVH 碰撞检测依赖 `shapecastFuncs` 中的 `intersectsTriangle` 回调

---

## 3. collisionPhysics._snap() (Lines 55504-55513)

**角色位置重置/快照机制**

```javascript
_snap(e = [0, 0, 0], i = 0, s = [0, 1, 0], a = !1) {
  this._positionPrevPhysics.fromArray(e),
    this._positionNextPhysics.fromArray(e),
    this._updatePosition(0),
    this._characters._localObject.up.fromArray(s).normalize(),
    (this._rotationPrevPhysics = i),
    (this._rotationNextPhysics = i),
    this._updateRotation(0),
    this._resetPhysics(a);
}
```

**用途**：跌落边界时重置角色到初始位置（Lines 67450-67463）

---

## 4. _detectJump() (Lines 55541-55592)

**跳跃检测与地面状态判断**

```javascript
_detectJump(e) {
  // 向下发射射线检测地面
  L(this, Rt)
    .copy(this._positionNextPhysics)
    .add(L(this, Qt).copy(e.up).multiplyScalar(0.005)),
  L(this, Qt).copy(e.up).negate(),
  this._rayCaster.set(L(this, Rt), L(this, Qt));

  const i = this._rayCaster.intersectObject(this._collider)[0],
    a = (i && typeof i.distance == "number" ? i.distance : 1 / 0) > 0.25,
    o = this._velocityVariation > 0.01;
  // ...
}
```

**关键阈值**：`distance > 0.25` 判断是否在空中

---

## 5. charactersControls (Lines 56620-56977)

**输入处理与移动向量生成**

```javascript
_update() {
  // WASD + 触摸 + 手柄输入
  if (this._moveKeysPressed.includes(!0)) {
    this._moveKeysPressed[0] && (L(this, $t).z += 1);  // W
    this._moveKeysPressed[1] && (L(this, $t).z -= 1);  // S
    this._moveKeysPressed[2] && (L(this, $t).x += 1);  // A
    this._moveKeysPressed[3] && (L(this, $t).x -= 1);  // D
    L(this, $t).normalize();
  }

  // 触摸/鼠标移动增量
  L(this, $t).x += this._touchMovingDelta.x;
  L(this, $t).z += this._touchMovingDelta.y;

  // 手柄摇杆
  L(this, $t).x -= gamepad$1.stick1.x;
  L(this, $t).z -= gamepad$1.stick1.y;

  return L(this, $t).clampLength(-1, 1);
}
```

---

## 6. followCamera._update() (Lines 52223-52425)

**相机碰撞检测（防止相机进入地形）**

```javascript
_update() {
  if (this._followedMesh) {
    const x = this._followedMesh._collisionPhysics;

    // 相机射线检测
    if (this._cameraCollisions && x._collider) {
      // 从目标位置向相机方向发射射线
      x._rayCaster.set(
        this.baseTarget,
        L(this, s).subVectors(L(this, i), this.baseTarget).normalize(),
      );
      const W = x._rayCaster.intersectObject(x._collider);

      // 如果碰撞距离小于跟随距离，缩短球面半径
      if (W.length > 0 && W[0].distance < this._followedMeshDistance) {
        L(this, a).radius = Math.max(
          this._followedMeshOffsetDistance,
          W[0].distance * 0.9,
        );
      }
    }
  }
}
```

---

## 关键参数表

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `_substeps` | 4 | 物理子步数，越高越精确但更慢 |
| `_gravity` | 0.015 | 重力加速度 |
| `_jumpForce` | 0.2 | 跳跃力 |
| `_positionForce` | 0.5 | 移动力 |
| `_velPhysicsDamp` | 0.005 | 速度阻尼 |
| `_charactersCapsule.radius` | 0.5 | 胶囊半径 |
| `_floorDetectInclination` | 0.8 | 地面检测倾斜阈值 |
| `_fallLimitDistance` | 10 | 跌落重置距离 |
| `_cameraCollisionsMinDistance` | 0.75 | 相机碰撞最小距离 |
| `_cameraCollisionsMaxIterations` | 10 | 相机碰撞迭代次数 |

---

## 穿模可能原因

1. **速度过快**：移动速度 `_positionForce` 过大 + 子步数不足
2. **BVH 精度**：`shapecast` 的 `intersectsTriangle` 返回 `false` 可能在高速时跳过碰撞
3. **胶囊偏移**：`_charactersCapsule.radius` 动态计算可能有误差
4. **地形裂缝**：碰撞几何体本身有缝隙或法线不连续

---

## 下一步建议

1. 对比 `hitmesh` 几何体（`colliderGeometry`）与可见地形几何体的差异
2. 检查 `_substeps` 是否可以动态增加（如高速时自动提高）
3. 分析 `_performShapecast` 中 `1e-5 * i` 阈值是否过大
