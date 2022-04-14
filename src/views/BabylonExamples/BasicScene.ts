import { Scene, Engine, Camera, Mesh, CubeTexture, Vector3, SceneLoader, ActionManager, AmmoJSPlugin, DirectionalLight, ExecuteCodeAction, FreeCamera, GizmoManager, LightGizmo, Matrix, MeshBuilder, PhysicsImpostor, ShadowGenerator, Light, AxesViewer, UniversalCamera, Ray, RayHelper, Color3, PointerDragBehavior, WebGPUEngine } from '@babylonjs/core'
import { GLTFFileLoader } from '@babylonjs/loaders'
import { Pane } from 'tweakpane'
import Ammo from '../../js/ammojs-typed/ammo/ammo'

export class BasicScene {

  scene: Scene
  engine: Engine
  pane: Pane
  camera: FreeCamera
  canvas: any
  djr: Mesh
  table: Mesh
  ground: Mesh
  shadowGen: ShadowGenerator
  portalGun: Mesh
  allMeshes: any
  sphere: Mesh

  withGun: Boolean
  Fire: Boolean
  rayHelper: RayHelper

  constructor(canvas: HTMLCanvasElement) {
    GLTFFileLoader.IncrementalLoading = false;

    const debugObject = {
      fps: '0'
    }
    this.pane = new Pane()
    this.pane.addMonitor(debugObject, 'fps', { label: 'FPS' })

    this.canvas = canvas
    this.setEngine()

    this.scene = this.CreateScene()
    this.CreateObject()
    this.CreateCamera()
    this.CreateLight()
    this.CreatePhysics()
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

  async setEngine() {
    this.engine = new Engine(this.canvas, true)
    this.engine.displayLoadingUI()
    this.engine.setHardwareScalingLevel(1 / window.devicePixelRatio)
  }

  CreateScene(): Scene {
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

  async CreatePhysics(): Promise<void> {
    const ammo = await Ammo()
    this.scene.enablePhysics(new Vector3(0, -9.81, 0), new AmmoJSPlugin(true, ammo))
  }

  async CreateEnviroment(): Promise<void> {
    const dJRMeshes = await SceneLoader.ImportMeshAsync(
      '',
      'models/DSPEC_jr/',
      'DSPEC_jr.gltf',
      this.scene
    )
    console.log(dJRMeshes);
    this.allMeshes = dJRMeshes

    //Ground Impostor
    const ground = MeshBuilder.CreateGround('ground', { width: 16.1, height: 16.1 })
    ground.visibility = 0
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.1, friction: 1 }
    )
    this.ground = ground

    this.shadowGen.useExponentialShadowMap = true

    //Table
    dJRMeshes.meshes[1].position.set(0, 0, 0)
    //Ground
    dJRMeshes.meshes[31].checkCollisions = true
    dJRMeshes.meshes[31].position.set(0, 0, 0)

    const boxCollider = MeshBuilder.CreateBox("box1", { width: 1.1, depth: 2.4, height: 0.985 }, this.scene);
    boxCollider.visibility = 0

    const djrCollider = MeshBuilder.CreateBox("dJR", { width: 0.358, depth: 0.266, height: 0.111 }, this.scene);
    djrCollider.position.y = 0.016
    djrCollider.position.x = -0.085
    djrCollider.visibility = 0

    // const detectorCollider = MeshBuilder.CreateCylinder(
    //   "detector",
    //   { height: 0.416, diameterTop: 0.134, diameterBottom: 0.134 },
    //   this.scene
    // );
    // detectorCollider.rotation.z = Math.PI / 2
    // detectorCollider.position.x = -0.15
    // detectorCollider.visibility = 0

    // const portalGunCollider = MeshBuilder.CreateBox(
    //   "portalGun",
    //   { width: 0.266, depth: 0.621, height: 0.266 },
    //   this.scene
    // );
    // portalGunCollider.visibility = 0.5
    // portalGunCollider.position._z = -0.12

    //DSPEC_jr
    const djrRoot = new Mesh("", this.scene);
    for (let mesh of dJRMeshes.meshes.slice(2, 19)) {
      djrRoot.addChild(mesh);
      mesh.position.set(0, 0, 0)
    }

    //Detector
    const detectorRoot = new Mesh("", this.scene);
    for (let mesh of dJRMeshes.meshes.slice(19, 26)) {
      detectorRoot.addChild(mesh);
      // mesh.position.set(0, 0, 0)
    }

    detectorRoot.position.y = 0.48

    //portalGun
    const portalGunRoot = new Mesh("portalMesh", this.scene);
    for (let mesh of dJRMeshes.meshes.slice(26, 30)) {
      portalGunRoot.addChild(mesh);
      mesh.position.set(0, 0, 0)
    }

    portalGunRoot.position.y = 1.1
    portalGunRoot.position.z = 0.7
    portalGunRoot.rotation.y = - Math.PI / 2


    boxCollider.physicsImpostor = new PhysicsImpostor(boxCollider, PhysicsImpostor.BoxImpostor,
      { mass: 5, friction: 1 }, this.scene)

    djrCollider.physicsImpostor = new PhysicsImpostor(djrCollider, PhysicsImpostor.BoxImpostor,
      { mass: .5, friction: 1 }, this.scene)

    // detectorCollider.physicsImpostor = new PhysicsImpostor(detectorCollider, PhysicsImpostor.BoxImpostor,
    //   { mass: 1, friction: 1 }, this.scene)

    // portalGunCollider.physicsImpostor = new PhysicsImpostor(portalGunCollider, PhysicsImpostor.BoxImpostor,
    // { mass: 1, friction: 1 }, this.scene)

    dJRMeshes.meshes[0].setParent(boxCollider)
    dJRMeshes.meshes[31].setParent(ground)

    console.log(dJRMeshes.meshes[31].material);
    djrRoot.setParent(djrCollider)
    // detectorRoot.setParent(detectorCollider)
    // portalGunRoot.setParent(portalGunCollider)

    //Final Transform to change objects status
    djrCollider.position.y = 1.5
    djrCollider.position.x = 0.2
    djrCollider.position.z = 0.2

    // detectorCollider.position.y = 1.5
    // detectorCollider.position.z = -0.2
    // detectorCollider.position.x = 0.2

    // portalGunCollider.position.z = 0.8

    // djrCollider.actionManager = new ActionManager(this.scene)
    // djrCollider.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickDownTrigger, () => {
    // }))

    this.djr = djrCollider

    let ray = new Ray(new Vector3(0, 0, -1), new Vector3(0, 0, 0.3), 5)
    this.rayHelper = new RayHelper(ray)
    this.rayHelper.attachToMesh(portalGunRoot)

    this.scene.registerBeforeRender(() => {

      var hitInfo = ray.intersectsMeshes(dJRMeshes.meshes.slice(19, 26));

      if (hitInfo.length && this.Fire === true) {
        //console.log(hitInfo);
        this.sphere.setEnabled(true);
        this.sphere.position.copyFrom(hitInfo[0].pickedPoint);
        ray.length = hitInfo[0].distance
      } else {
        this.sphere.setEnabled(false);
      }
    })


    this.portalGun = portalGunRoot

    //Add Shadow
    this.shadowGen.addShadowCaster(djrRoot, true)
    this.shadowGen.addShadowCaster(detectorRoot, true)

    dJRMeshes.meshes[1].receiveShadows = true
    this.shadowGen.addShadowCaster(dJRMeshes.meshes[1], true)
    dJRMeshes.meshes[30].receiveShadows = true

    // this.camera.setTarget(dJRMeshes.meshes[2])

    // const glowLayer = new GlowLayer('glowlayer', this.scene)
    // glowLayer.intensity = 0.75

    this.engine.hideLoadingUI()
  }

  CreateObject(): void {
    let source = MeshBuilder.CreateSphere('source', { diameter: 0.02 }, this.scene)
    source.setEnabled(false)

    this.sphere = source

  }


  Shoot(): void {
    const clone = this.djr.clone('clone')
    clone.position = this.camera.position
    clone.setEnabled(true)
    clone.physicsImpostor.applyForce(
      this.camera.getForwardRay().direction.scale(500),
      clone.getAbsolutePosition()
    )

    // clone.physicsImpostor.registerOnPhysicsCollide(
    //   this.ground.physicsImpostor,
    //   () => {
    //   }
    // )

    setTimeout(() => {
      clone.dispose()
    }, 5000)
  }

  CreatePickRay(): void {
    this.scene.onPointerDown = (evt) => {
      if (evt.button === 2) {
        this.Shoot()
      }
      if (evt.button === 0) {
        // this.engine.enterPointerlock()
        if (this.withGun) {
          this.rayHelper.ray.length = 5
          this.rayHelper.show(this.scene, new Color3(0, 0.5, 0.5))
          this.Fire = true

        }
      }
      if (evt.button === 1) {
        // this.engine.exitPointerlock()
      }

      const ray = this.scene.createPickingRay(
        this.scene.pointerX,
        this.scene.pointerY,
        Matrix.Identity(),
        this.camera
      )

      const raycastHit = this.scene.pickWithRay(ray)

      // if (raycastHit.hit && raycastHit.pickedMesh.name === 'dJR') {
      //   raycastHit.pickedMesh.physicsImpostor.applyImpulse(
      //     new Vector3(0, 0.6, 0),
      //     raycastHit.pickedPoint
      //   )
      // }

      if (raycastHit.hit && this.allMeshes.meshes.slice(26, 30).includes(raycastHit.pickedMesh)) {

        // this.portalGun.physicsImpostor.setMass(0)
        this.portalGun.setParent(this.camera)
        this.portalGun.scaling.set(1.15, 1.15, 1.15)
        this.portalGun.rotation.y = - Math.PI * 20 / 19
        this.portalGun.rotation.z = Math.PI * 23 / 12
        this.portalGun.rotation.x = - Math.PI * 1 / 500
        // this.portalGun.rotation._x =  Math.PI * 1/ 5
        this.portalGun.position.z = 0.7
        this.portalGun.position.x = 0.3
        this.portalGun.position.y = -0.2
        this.withGun = true
      }
    }

    this.scene.onPointerUp = (evt) => {
      this.rayHelper.hide()
      this.Fire = false
    }
  }

  CreateCamera(): void {
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

    const camera = new UniversalCamera('camera', new Vector3(1.5, 2.0, 0), this.scene)
    camera.rotation._y = - Math.PI / 2
    camera.rotation._x = Math.PI / 7
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

  CreateLight(): void {
    // const directionalLight = new Poi('hemiLight', new Vector3(0, 1, 0), this.scene)

    // directionalLight.intensity = 0.22

    // this.CreateGizmos(directionalLight)

    const pointLight = new DirectionalLight('pointLight', new Vector3(-1, -1.5, -0.8), this.scene)
    pointLight.intensity = 0.8

    this.pane.addInput(pointLight, 'intensity', { min: 0, max: 10, step: 0.01 })
    pointLight.shadowEnabled = true
    this.shadowGen = new ShadowGenerator(1024, pointLight)

    // this.CreateGizmos(pointLight)
  }

  CreateGizmos(customLight: Light) {
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