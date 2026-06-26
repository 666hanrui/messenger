// ============================================================
// followCamera 提取 (Lines 52144-52498)
// ============================================================

function followCamera(r) {
  var e, i, s, a, o, l, ws, Ha, Qa, p;
  return (
    (p = class extends r {
      constructor() {
        super();
        oe(this, l);
        oe(this, e, new Vector3());
        oe(this, i, new Vector3());
        oe(this, s, new Vector3());
        oe(this, a, new Spherical());
        oe(this, o, new Spherical());
        ((this.isFollowCamera = !0),
          this.displacement.position.set(-0.075, -0.05),
          (this._sphericalCameraPosition = new Spherical()),
          (this._spherical = new Spherical()),
          (this._sphericalTarget = new Spherical()),
          (this._sphericalVerticalMinLimit = Math.PI * 0.25),
          (this._sphericalVerticalMaxLimit = Math.PI * 0.75),
          (this._followedMesh = void 0),
          (this._followedMeshPhi = Math.PI * 0.5),
          (this._followedMeshDistance = 1),
          (this._followedMeshOffset = new Vector3()),
          (this._followedMeshOffsetDistance = 0),
          (this._followedMeshOffsetTarget = new Vector3()),
          (this._followedMeshTarget = new Vector3()),
          (this._cameraCollisions = !0),
          (this._cameraCollisionsMinDistance = 0.75),
          (this._cameraCollisionsMinDistance = 0.75),
          (this._cameraCollisionsMaxIterations = 10),
          (this._cameraTargetLocalLerp = 0.0125),
          (this._cameraTargetWorldLerp = 0.175),
          (this._cameraRotationLerp = 0.03),
          (this._cameraSphericalRotationLerp = 0.075),
          (this._cameraSphericalRotationFastLerp = 0.3),
          (this._cameraSphericalRadiusLerp = 0.035),
          (this._cameraSphericalRadiusCollisionsLerp = 0.35),
          (this._cameraAutomaticCenteringActiveLerp = 0.1),
          (this._cameraAutomaticCenteringInactiveLerp = 0.0125),
          (this._disableAutomaticCentering = !1),
          (this._automaticCenteringAmount = 1),
          (this._cameraInactiveMultiplier = 0.025),
          (this.additionalSpherical = new Spherical(0, 0, 0)),
          (this.overwriteSpherical = new Spherical(1, Math.PI * 0.5, 0)),
          (this.overwriteTarget = new Vector3()),
          (this.overwriteAmount = 0));
      }

      follow({
        mesh: _ = null,
        relativeCameraPosition: x = new Vector3(0, 2, 5.75),
        relativeCameraOffset: b = new Vector3(0, 1, 0.5),
      } = {}) {
        if (!_ || !_._localObject)
          throw new Error("follow camera needs a mesh character");
        ((this._followedMesh = _),
          this.setOffset(b.toArray()),
          L(this, a).setFromVector3(x),
          (L(this, a).phi = math.clamp(
            L(this, a).phi,
            this._sphericalVerticalMinLimit,
            this._sphericalVerticalMaxLimit,
          )),
          (this._followedMeshPhi = L(this, a).phi),
          (this._followedMeshDistance = L(this, a).radius),
          this._spherical.copy(L(this, a)),
          (this._spherical.theta = math.getShortestRotationAngle(
            this._spherical.theta,
            this._followedMesh._localObject.rotationHorizontal,
          )),
          this._sphericalTarget.copy(this._spherical),
          ...
        );
      }

      _update() {
        if (this._followedMesh) {
          const _ = this._followedMesh._localObject,
            x = this._followedMesh._collisionPhysics,
            b = math.lerpCoefFPS(this._cameraTargetLocalLerp),
            T = math.lerpCoefFPS(this._cameraTargetWorldLerp);

          // 相机碰撞检测
          if (this._cameraCollisions && x._collider) {
            // ... 射线投射到碰撞体检测
            // 如果距离小于最小距离，缩小球面半径
          }

          // 相机位置插值
          this._spherical.radius = math.lerpFPS(
            this._spherical.radius,
            O,
            this._cameraSphericalRadiusCollisionsLerp,
          );

          // 跟随目标插值
          this.baseTarget.lerpVectors(
            this._followedMeshTarget,
            this.overwriteTarget,
            this.overwriteAmount,
          );
        }
        super._update();
      }

      // 设置跟随覆盖（用于 NPC 对话等场景）
      setFollowOverwrite({
        phi: _ = Math.PI * 0.5,
        theta: x = 0,
        radius: b = 1,
        target: T = [0, 0, 0],
      } = {}) {
        this.overwriteSpherical.set(b, _, math.getShortestRotationAngle(this._spherical.theta, x));
        this.overwriteTarget.fromArray(T);
      }
    }),
    ...
  );
}
