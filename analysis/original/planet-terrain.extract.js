// ============================================================
// planet & terrain 提取 (Lines 50567-50800, 65667-)
// ============================================================

// 行星类 - 负责加载和渲染行星网格
class planet$1 {
  constructor(e) {
    ((this.scene = e), (this.ready = miscutils.deferred()), this.init());
  }
  async init() {
    const [e, i, s, a] = await Promise.all([
      geometryLoader.load(
        `planets/present/intro/${client$1.lowMemoryDevice ? "low/" : ""}planet.drc`,
      ),
      geometryLoader.load("planets/present/intro/water.drc"),
      geometryLoader.load("planets/present/intro/trees.drc"),
      geometryLoader.load("planets/present/intro/clouds.drc"),
    ]);
    ((this.planetMesh = new Mesh(e, introMaterial({}))),
      (this.planetMesh.name = "Planet"),
      (this.waterMesh = new Mesh(i, waterMaterial({}))),
      (this.waterMesh.name = "Water"),
      (this.treeMesh = new Mesh(s, introMaterial({}))),
      (this.treeMesh.name = "Trees"),
      (this.cloudMesh = new Mesh(a, cloudMaterial({}))),
      (this.cloudMesh.name = "Clouds"),
      (this.mesh = new Group()),
      this.scene.planetGroup.add(this.planetMesh),
      this.scene.planetGroup.add(this.waterMesh),
      this.scene.planetGroup.add(this.treeMesh),
      this.scene.planetGroup.add(this.cloudMesh),
      this.ready.resolve());
  }
}

// PlanetMesh - 基于距离的行星可见性判断
class PlanetMesh extends Mesh {
  constructor(e, i, s, a = 15) {
    (super(e, i),
      (this._scene = s),
      (this._visThreshold = a),
      events$1.on("internal_prerender", this.__checkVisibility, this));
  }
  __checkVisibility() {
    var a;
    if (!this._scene || !((a = this._scene.characters) != null && a.mesh))
      return;
    const e = this._scene.characters.mesh._localObject;
    (this.geometry.boundingSphere === null &&
      this.geometry.computeBoundingSphere(),
      _s$5.copy(this.geometry.boundingSphere),
      _v0$g.copy(e.position).sub(_s$5.center).normalize());
    const i = _s$5.center.distanceTo(e.position),
      s = Math.min(i, _s$5.radius);
    (_v1$a.copy(_s$5.center).addScaledVector(_v0$g, s),
      (this.visible = e.position.distanceTo(_v1$a) < this._visThreshold));
  }
}

// presentScene - 主场景类，包含行星、角色等
class presentScene extends planet {
  constructor(e, i, s) {
    // 行星网格
    this.mesh = new PlanetMesh(e, i, this.scene, 25);
    // 水面、树木、云等
  }
}

// 关键：行星地表碰撞几何体 (hitmesh)
// collisionPhysics 初始化时从 colliderGeometry 加载
async _initializeBVH(e) {
  if (!e.colliderGeometry)
    throw new Error("Collider geometry not provided");

  // colliderGeometry 可以是 URL 字符串或几何体对象
  const s =
    typeof e.colliderGeometry == "string"
      ? await geometryLoader.load(e.colliderGeometry)
      : e.colliderGeometry;

  // 创建不可见的碰撞网格
  this._colliderMesh = new Mesh(s),
  this._colliderMesh.geometry.computeBoundingBox(),
  this._colliderMesh.geometry.computeBoundingSphere(),
  this._colliderMesh.updateMatrixWorld(!0);

  // 通过 Worker 构建 BVH
  i.postMessage({
    position: this._colliderMesh.geometry.attributes.position.array,
    index: this._colliderMesh.geometry.index
      ? this._colliderMesh.geometry.index.array
      : null,
    matrixWorld: this._colliderMesh.matrixWorld.elements,
  });
}
