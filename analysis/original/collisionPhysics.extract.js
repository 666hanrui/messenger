// ============================================================
// collisionPhysics 提取 (Lines 55200-55622)
// ============================================================

class collisionPhysics {
  constructor(e, i) {
    oe(this, Ji, new Object3D());
    oe(this, jt, new Line3());
    oe(this, nr, new Line3());
    oe(this, Zi, new Box3());
    oe(this, Rt, new Vector3());
    oe(this, Qt, new Vector3());
    oe(this, ui, new Vector3());
    oe(this, ms, new Euler());
    oe(this, ir, new Vector3());
    oe(this, gs, new Quaternion());

    (this._characters = e),
      (this._gravity =
        typeof i.gravity == "number" ? i.gravity : 0.015),
      (this._jumpForce =
        typeof i.jumpForce == "number" ? i.jumpForce : 0.2),
      (this._positionForce =
        typeof i.positionForce == "number" ? i.positionForce : 0.5),
      (this._substeps = typeof i.substeps == "number" ? i.substeps : 4),
      (this._directionLerp =
        typeof i.directionLerp == "number" ? i.directionLerp : 0.05),
      (this._velPhysicsIdleDamp =
        typeof i.velPhysicsIdleDamp == "number" ? i.velPhysicsIdleDamp : 0.01),
      (this._velPhysicsDamp =
        typeof i.velPhysicsDamp == "number" ? i.velPhysicsDamp : 0.005),
      (this._autoStep =
        i.autoStep === void 0 || i.autoStep === null || i.autoStep),
      (this._moveTowardsCameraTarget =
        i.moveTowardsCameraTarget === !0),
      (this._rotVelocityMin =
        typeof i.rotVelocityMin == "number" ? i.rotVelocityMin : 0.5),
      (this._rotVelocityMax =
        typeof i.rotVelocityMax == "number" ? i.rotVelocityMax : 5),
      (this._velPhysicsDampInterpolation = 1),
      (this._velocityVariation = 0),
      (this._rotationNextPhysics = 0),
      (this._positionNextPhysics = new Vector3()),
      (this._positionPrevPhysics = new Vector3()),
      (this._velocityPhysics = new Vector3()),
      (this._accelerationPhysics = new Vector3()),
      (this._jumpRequested = !1),
      (this._isAutoStepping = !1),
      (this._deltaRatioAccumulator = 0),
      (this._deltaRatioAccumulatorSteps = 0),
      (this._positionDelta = new Vector3()),
      (this._rayCaster = new Raycaster()),
      (this._capsuleRadiusPercentage =
        typeof i.capsuleRadiusPercentage == "number"
          ? Math.min(i.capsuleRadiusPercentage, 0.45)
          : 0.2),
      (this._charactersCapsule = {
        radius: 0.5,
        segment: new Line3(new Vector3(0, 0, 0), new Vector3(0, 1, 0)),
      }),
      (this._floorDetectInclination =
        typeof i.floorDetectInclination == "number"
          ? Math.min(1, i.floorDetectInclination)
          : 0.8),
      (this._fallLimitDistance =
        typeof i.fallLimitDistance == "number"
          ? Math.min(1, i.fallLimitDistance)
          : 10),
      (this._isOnFloor = !0),
      (this._prevIsOnFloor = this._isOnFloor),
      (this._prevIsOnFloorTime = -1),
      (this._shapecastFuncs = {
        intersectsBounds: (s) => s.intersectsBox(L(this, Zi)),
        intersectsTriangle: (s) => {
          const a = L(this, Rt),
            o = L(this, Qt),
            l = s.closestPointToSegment(L(this, jt), a, o);
          if (l < this._charactersCapsule.radius) {
            const c = o.equals(L(this, jt).start),
              h = this._charactersCapsule.radius - l,
              d = o.sub(a).normalize();
            (L(this, jt).start.addScaledVector(d, h),
              L(this, jt).end.addScaledVector(d, h),
              c &&
                d.dot(this._characters._localObject.up) > 0 &&
                (s.getNormal(L(this, ui)),
                L(this, ui).dot(this._characters._localObject.up) >
                  this._floorDetectInclination && (this._isOnFloor = !0)));
          }
          return !1;
        },
      }),
      this._initializeBVH(i);
  }

  _updateCapsule(e) {
    const i = Math.abs(e.max.y - e.min.y),
      s = i * this._capsuleRadiusPercentage,
      a = i - s * 2;
    ((this._charactersCapsule.radius = s),
      (this._charactersCapsule.segment.end.y = a));
  }

  _substep() {
    const e = 1 / this._substeps;
    (L(this, Rt).copy(this._velocityPhysics).multiplyScalar(e),
      L(this, Ji).position.add(L(this, Rt)));
    const i = this._performShapecast(L(this, Ji), e);
    this._isAutoStepping ||
      this._velocityPhysics.addScaledVector(i, -i.dot(this._velocityPhysics));
  }

  _performShapecast(e, i) {
    (e.updateMatrix(),
      L(this, jt).copy(this._charactersCapsule.segment),
      (L(this, jt).start.y += this._charactersCapsule.radius),
      (L(this, jt).end.y += this._charactersCapsule.radius),
      L(this, jt).start.applyMatrix4(e.matrix),
      L(this, jt).end.applyMatrix4(e.matrix),
      L(this, nr).copy(L(this, jt)),
      L(this, Zi).makeEmpty(),
      L(this, Zi).expandByPoint(L(this, jt).start),
      L(this, Zi).expandByPoint(L(this, jt).end),
      L(this, Zi).min.addScalar(-this._charactersCapsule.radius),
      L(this, Zi).max.addScalar(this._charactersCapsule.radius),
      this._geometry.boundsTree.shapecast(this._shapecastFuncs));
    const s = L(this, Rt);
    s.subVectors(L(this, jt).start, L(this, nr).start);
    const a = Math.max(0, s.length() - 1e-5 * i);
    return (s.normalize(), e.position.addScaledVector(s, a), s);
  }

  _snap(e = [0, 0, 0], i = 0, s = [0, 1, 0], a = !1) {
    (this._positionPrevPhysics.fromArray(e),
      this._positionNextPhysics.fromArray(e),
      this._updatePosition(0),
      this._characters._localObject.up.fromArray(s).normalize(),
      (this._rotationPrevPhysics = i),
      (this._rotationNextPhysics = i),
      this._updateRotation(0),
      this._resetPhysics(a));
  }
}
