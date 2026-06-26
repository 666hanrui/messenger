// ============================================================
// characters 提取 (Lines 62810-63312)
// ============================================================

let characters$1 =
  ((zi = class extends characterBatchedSkinnedMesh {
    constructor(i = {}) {
      super(i);
      oe(this, vi, new Vector3());
      oe(this, yr, new Vector3());
      oe(this, br, new Vector3());
      oe(this, da, new Euler());
      oe(this, Wn, new Quaternion());
      oe(this, wr, new Frustum());
      oe(this, Sr, new Matrix4());
      Ye(this, "LOCAL_ID", "local");
      Ye(
        this,
        "requestInteraction",
        miscutils.debounce(() => {
          if (this._interactingElement !== null) return;
          const i = [];
          (this._scene.traverse((s) => {
            (!s.isWorldSecret && !s.isWorldNPC && !s.isCustomInteraction) ||
              !s._isClose ||
              !s._clickInteraction ||
              i.push(s);
          }),
            i.sort((s, a) => s._distanceToCharacter - a._distanceToCharacter),
            i.length > 0 && (i[0]._clickInteracted = !0));
        }, 100),
      );
      ((this.isWorldCharacters = !0),
        (this.name = "Characters"),
        (this._scene = i.scene),
        (this._camera = this._scene.camera),
        (this._localObject = new Object3D()));
      const s = JSON.parse(
        JSON.stringify({ ...zi.INITIAL_DATA, ...(i.initialData || {}) }),
      );
      (Object.assign(this._localObject, {
        batchedIndex: 0,
        boundingSphere: new Sphere(),
        rotationHorizontal: 0,
        velocity: new Vector3(),
        velocityHorizontal: 0,
        modelsID: "",
        animationProps: {
          offset: Math.random() * 100,
          weights: new Array(s.animationFiles.length)
            .fill(0)
            .map((a, o) => (o === 0 ? 1 : 0)),
          mixer: null,
          actions: [],
          lastUpdate: 0,
        },
        networkEvents: [],
        userData: s,
      }),
        Object.defineProperty(this._localObject.userData, "networkEvent", {
          enumerable: !0,
          get: () => "",
          set: () => {},
        }),
        (this._charactersObjects = new Map()),
        this._charactersObjects.set(this.LOCAL_ID, this._localObject),
        (this._initialPosition = new Vector3()),
        (this._initialRotation = 0),
        (this._initialUp = new Vector3()),
        (this._canInteract = !0),
        (this._interactingElement = null),
        (this._interactingElementLast = null),
        (this._interactingElementChanged = !1),
        (this._positionCharLerp =
          typeof i.positionCharLerp == "number" ? i.positionCharLerp : 0.4),
        (this._rotationCharLerp =
          typeof i.rotationCharLerp == "number" ? i.rotationCharLerp : 0.4),
        (this._animationCharLerp =
          typeof i.animationCharLerp == "number" ? i.animationCharLerp : 0.1),
        (this._animationSprintLerp =
          typeof i.animationSprintLerp == "number"
            ? i.animationSprintLerp
            : 0.25),
        (this._velocityCharDamp =
          typeof i.velocityDamp == "number" ? i.velocityDamp : 0.7),
        (this._positionDeltaLimitSnap =
          typeof i.positionDeltaLimitSnap == "number"
            ? i.positionDeltaLimitSnap
            : 10),
        (this._controls = new charactersControls(this, i)),
        (this._collisionPhysics = new collisionPhysics(this, { ...i })),
        ...
      );

      // 关键：碰撞物理和控制器初始化
      this._collisionPhysics = new collisionPhysics(this, { ...i });

      // 初始化位置（使用 BVH 查找最近点）
      setInitialPosition(i = [0, 0, 0], s = 2, a = 0, o = [0, 1, 0]) {
        if (!this._collisionPhysics._collider) return;
        this._initialUp.fromArray(o).normalize();
        const l = Math.random() * s,
          c = Math.random() * Math.PI * 2;
        (L(this, Wn).setFromUnitVectors(
          L(this, vi).set(0, 1, 0),
          this._initialUp,
        ),
          L(this, vi)
            .set(l * Math.cos(c), 0, l * Math.sin(c))
            .applyQuaternion(L(this, Wn)),
          L(this, yr).fromArray(i).add(L(this, vi)));
        const h = Math.max(
          0.5,
          this._collisionPhysics._charactersCapsule.segment.end.y +
            this._collisionPhysics._charactersCapsule.radius * 2,
        );
        (L(this, vi).copy(L(this, yr)).addScaledVector(this._initialUp, h),
          this._collisionPhysics._rayCaster.set(
            L(this, vi),
            L(this, br).copy(this._initialUp).negate(),
          ));
        const d = this._collisionPhysics._rayCaster.intersectObject(
          this._collisionPhysics._collider,
        )[0];
        if (d) this._initialPosition.copy(d.point);
        else {
          const p =
            this._collisionPhysics._geometry.boundsTree.closestPointToPoint(
              L(this, vi).fromArray(i),
            );
          this._initialPosition.copy(p.point);
        }
      }
    }
  }));

// MEDIUMS 常量
zi.MEDIUMS = {
  GROUND: 0,
  AIR: 1,
  WATER: 2,
};
