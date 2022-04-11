import { Scene, Engine, Camera, Mesh, CubeTexture, Vector3, SceneLoader, ActionManager, AmmoJSPlugin, DirectionalLight, ExecuteCodeAction, FreeCamera, GizmoManager, LightGizmo, Matrix, MeshBuilder, PhysicsImpostor, ShadowGenerator } from '@babylonjs/core'
import { GLTFFileLoader } from '@babylonjs/loaders'
import { Pane } from 'tweakpane'
import Ammo from '../../js/ammojs-typed/ammo/ammo'

export class BasicScene {

  scene: Scene
  engine: Engine
  pane: Pane
  tableModels = []
  camera: Camera
  canvas: any
  djr: Mesh
  ground: Mesh

  constructor(canvas: HTMLCanvasElement) {
    const debugObject = {
      fps: '0'
    }

    this.canvas = canvas
    GLTFFileLoader.IncrementalLoading = false;
    this.pane = new Pane()
    this.pane.addMonitor(debugObject, 'fps', { label: 'FPS' })

    this.engine = new Engine(canvas, true)

    this.engine.displayLoadingUI()

    this.engine.setHardwareScalingLevel(1 / window.devicePixelRatio)
    this.scene = this.CreateScene()
    this.CreateCamera()
    this.CreateEnviroment()
    this.CreatePickRay()

    this.engine.runRenderLoop(() => {
      this.scene.render()
      debugObject.fps = this.engine.getFps().toFixed() + 'fps'
    });

    window.addEventListener('resize', (() => {
      this.engine.resize()
    }))

    //Shoot
    // this.scene.onPointerDown = (evt) => {
    //     if (evt.button === 2) {
    //         this.Shoot()
    //     }
    // }

  }

  CreateScene() {
    const scene = new Scene(this.engine)

    const envTex = CubeTexture.CreateFromPrefilteredData(
      'textures/environmentMaps/christmas_photo_studio_01_2k.env',
      scene
    )
    envTex.gammaSpace = false;
    scene.environmentTexture = envTex
    scene.createDefaultSkybox(envTex, true, 1000, 0.25)
    scene.environmentIntensity = 1

    const framesPerSecond = 60
    const gravity = -9.8
    scene.gravity = new Vector3(0, gravity / framesPerSecond, 0)
    scene.collisionsEnabled = true

    scene.onPointerDown = (evt) => {
    }

    // const axes = new AxesViewer(scene, 3)

    return scene
  }

  async CreateEnviroment() {
    // const {meshes} = await SceneLoader.ImportMeshAsync('', 'models/wooden_table/', 'scene.gltf')
    const dJRMeshes = await SceneLoader.ImportMeshAsync(
      '',
      'models/DSPEC_jr/',
      'DSPEC_jr.gltf',
      this.scene
    )

    const ammo = await Ammo()
    this.scene.enablePhysics(new Vector3(0, -9.81, 0), new AmmoJSPlugin(true, ammo))

    //Ground
    const ground = MeshBuilder.CreateGround('ground', { width: 16.1, height: 16.1 })
    ground.visibility = 0

    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.1, friction: 1 }
    )

    this.ground = ground

    // for(let mesh of dJRMeshes.meshes[1]){
    //     mesh.checkCollisions = true
    // }
    dJRMeshes.meshes[1].position.set(0, 0, 0)
    dJRMeshes.meshes[19].checkCollisions = true
    dJRMeshes.meshes[19].position.set(0, 0, 0)

    var boxCollider = MeshBuilder.CreateBox("box1", { width: 1.1, depth: 2.4, height: 0.985 }, this.scene);
    boxCollider.visibility = 0

    var djrCollider = MeshBuilder.CreateBox("dJR", { width: 0.358, depth: 0.266, height: 0.111 }, this.scene);
    djrCollider.visibility = 0

    var djrRoot = new Mesh("", this.scene);
    for (let mesh of dJRMeshes.meshes.slice(2, 19)) {
      djrRoot.addChild(mesh);
      mesh.position.set(0.1, 0, 0)
    }

    boxCollider.physicsImpostor = new PhysicsImpostor(boxCollider, PhysicsImpostor.BoxImpostor,
      { mass: 5, friction: 1, margin: 1 }, this.scene);
    djrCollider.physicsImpostor = new PhysicsImpostor(djrCollider, PhysicsImpostor.BoxImpostor,
      { mass: .5, friction: 1 }, this.scene);
    djrCollider.position.y = 0.016
    djrCollider.position.x = 0.013

    dJRMeshes.meshes[1].setParent(boxCollider)
    dJRMeshes.meshes[19].setParent(ground)
    djrRoot.setParent(djrCollider)

    djrCollider.position.y = 1.5

    djrCollider.actionManager = new ActionManager(this.scene)
    djrCollider.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickDownTrigger, () => {
    }))

    this.djr = djrCollider

    // this.camera.setTarget(dJRMeshes.meshes[2])

    // const glowLayer = new GlowLayer('glowlayer', this.scene)
    // glowLayer.intensity = 0.75

    this.CreateLight()
    this.engine.hideLoadingUI()
  }


  Shoot() {
    const clone = this.djr.clone('clone')
    clone.position = this.camera.position
    clone.setEnabled(true)
    clone.physicsImpostor.applyForce(
      this.camera.getForwardRay().direction.scale(500),
      clone.getAbsolutePosition()
    )

    clone.physicsImpostor.registerOnPhysicsCollide(
      this.ground.physicsImpostor,
      () => {

      }
    )

    setTimeout(() => {
      clone.dispose()
    }, 5000)
  }

  CreatePickRay() {
    this.scene.onPointerDown = (evt) => {
      if (evt.button === 2) {
        this.Shoot()
      }

      const ray = this.scene.createPickingRay(
        this.scene.pointerX,
        this.scene.pointerY,
        Matrix.Identity(),
        this.camera
      )

      const raycastHit = this.scene.pickWithRay(ray)

      if (raycastHit.hit && raycastHit.pickedMesh.name === 'dJR') {
        raycastHit.pickedMesh.physicsImpostor.applyImpulse(
          new Vector3(ray.direction.x, 0.6, ray.direction.z),
          raycastHit.pickedPoint
        )
      }
    }
  }

  CreateCamera() {
    // this.camera = new ArcRotateCamera('camera', Math.PI / 8,  Math.PI / 3, 3, Vector3.Zero(), this.scene)
    // this.camera.attachControl(this.canvas, true)
    // this.camera.minZ = 0
    // this.camera.lowerRadiusLimit = 1
    // this.camera.upperRadiusLimit = 10
    // this.camera.wheelPrecision = 100

    // // this.camera.panningSensibility = 1000

    // this.camera.useAutoRotationBehavior = true;
    // this.camera.autoRotationBehavior.idleRotationSpeed = 0.3;
    // this.camera.autoRotationBehavior.idleRotationSpinupTime = 1000;
    // this.camera.autoRotationBehavior.idleRotationWaitTime = 2000;
    // this.camera.autoRotationBehavior.zoomStopsAnimation = true;
    // this.camera.useFramingBehavior = true;
    // this.camera.framingBehavior.framingTime = 3000

    const camera = new FreeCamera('camera', new Vector3(3, 1.7, 0), this.scene)
    camera.rotation._y = - Math.PI / 2
    camera.rotation._x = Math.PI / 16
    camera.attachControl()
    camera.applyGravity = true
    camera.checkCollisions = true
    camera.ellipsoid = new Vector3(1, 1, 1)

    camera.minZ = 0.45
    camera.speed = 0.15

    camera.angularSensibility = 4000

    camera.keysUp.push(87)
    camera.keysLeft.push(65)
    camera.keysDown.push(83)
    camera.keysRight.push(68)

    this.camera = camera
  }

  CreateLight() {
    // const directionalLight = new Poi('hemiLight', new Vector3(0, 1, 0), this.scene)

    // directionalLight.intensity = 0.22

    // this.CreateGizmos(directionalLight)

    const pointLight = new DirectionalLight('pointLight', new Vector3(-1, -1.5, -0.8), this.scene)
    pointLight.intensity = 0.8

    this.pane.addInput(pointLight, 'intensity', { min: 0, max: 10, step: 0.01 })
    pointLight.shadowEnabled = true
    const shadowGen = new ShadowGenerator(1024, pointLight)

    // this.CreateGizmos(pointLight)
  }

  CreateGizmos(customLight) {
    const lightGizmo = new LightGizmo()
    lightGizmo.scaleRatio = 2
    lightGizmo.light = customLight

    const gizmoManager = new GizmoManager(this.scene)
    gizmoManager.positionGizmoEnabled = true
    gizmoManager.rotationGizmoEnabled = true
    gizmoManager.usePointerToAttachGizmos = false
    gizmoManager.attachToMesh(lightGizmo.attachedMesh)
  }

}