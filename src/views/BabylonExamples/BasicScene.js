import * as BABYLON from '@babylonjs/core'
import { GLTFFileLoader } from '@babylonjs/loaders'
import { Pane } from 'tweakpane'

export class BasicScene {

    scene
    engine
    pane
    tableModels = []
    camera
    canvas

    constructor(canvas) {
        this.canvas = canvas
        GLTFFileLoader.IncrementalLoading = false;
        this.pane = new Pane()

        this.engine = new BABYLON.Engine(canvas, true)

        this.engine.displayLoadingUI()

        this.engine.setHardwareScalingLevel(1 / window.devicePixelRatio)
        this.scene = this.CreateScene()
        this.CreateCamera()
        this.CreateEnviroment()

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener('resize', (() => {
            this.engine.resize()
        }))

    }

    CreateScene() {
        const scene = new BABYLON.Scene(this.engine)

        const envTex = BABYLON.CubeTexture.CreateFromPrefilteredData(
            'textures/environmentMaps/christmas_photo_studio_01_2k.env',
            scene
        )
        envTex.gammaSpace = false;
        scene.environmentTexture = envTex
        scene.createDefaultSkybox(envTex, true, 1000, 0.25)
        scene.environmentIntensity = 1

        return scene
    }

    async CreateEnviroment() {
        // const {meshes} = await BABYLON.SceneLoader.ImportMeshAsync('', 'models/wooden_table/', 'scene.gltf')
        const dJRMeshes = await BABYLON.SceneLoader.ImportMeshAsync(
            '',
            'models/DSPEC_jr/',
            'DSPEC_jr.gltf',
            this.scene
        )
        console.log(dJRMeshes);
        this.camera.setTarget(dJRMeshes.meshes[2])

        // this.lightTubs = dJRmeshes.filter(
        //     (mesh) =>
        //         mesh.name === 'DSPEC_jr'
        // )
        const glowLayer = new BABYLON.GlowLayer('glowlayer', this.scene)
        glowLayer.intensity = 0.75

        this.CreateLight()
        this.engine.hideLoadingUI()
    }

    CreateCamera(){
        this.camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 8,  Math.PI / 3, 3, BABYLON.Vector3.Zero(), this.scene)
        this.camera.attachControl(this.canvas, true)
        this.camera.minZ = 0
        this.camera.lowerRadiusLimit = 1
        this.camera.upperRadiusLimit = 10
        this.camera.wheelPrecision = 100

        // this.camera.panningSensibility = 1000

        this.camera.useAutoRotationBehavior = true;
        this.camera.autoRotationBehavior.idleRotationSpeed = 0.3;
        this.camera.autoRotationBehavior.idleRotationSpinupTime = 1000;
        this.camera.autoRotationBehavior.idleRotationWaitTime = 2000;
        this.camera.autoRotationBehavior.zoomStopsAnimation = true;
        this.camera.useFramingBehavior = true;
    }

    CreateLight() {
        // const directionalLight = new BABYLON.Poi('hemiLight', new BABYLON.Vector3(0, 1, 0), this.scene)

        // directionalLight.intensity = 0.22

        // this.CreateGizmos(directionalLight)

        const pointLight = new BABYLON.DirectionalLight('pointLight', new BABYLON.Vector3(-1, -1.5, -0.8), this.scene)
        pointLight.intensity = 0.8

        this.pane.addInput(pointLight, 'intensity', { min: 0, max: 10, step: 0.01 })
        pointLight.shadowEnabled = true
        const shadowGen = new BABYLON.ShadowGenerator(1024, pointLight)

        this.CreateGizmos(pointLight)
    }

    CreateGizmos(customLight) {
        const lightGizmo = new BABYLON.LightGizmo()
        lightGizmo.scaleRatio = 2
        lightGizmo.light = customLight

        const gizmoManager = new BABYLON.GizmoManager(this.scene)
        gizmoManager.positionGizmoEnabled = true
        gizmoManager.rotationGizmoEnabled = true
        gizmoManager.usePointerToAttachGizmos = false
        gizmoManager.attachToMesh(lightGizmo.attachedMesh)
    }

}