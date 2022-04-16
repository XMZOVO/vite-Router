import { ArcRotateCamera, AxesViewer, Color3, Color4, CubeTexture, Engine, Scene, SceneLoader, Vector3 } from "@babylonjs/core"
import '@babylonjs/loaders'
import { HemisphereLight } from "three"
import {CustomLoadingScreen} from './CustomLoading/LoadingScreen'

export class MainPage {
    canvas: HTMLCanvasElement
    engine: Engine
    scene: Scene
    camera1: ArcRotateCamera

    loaded: any

    constructor(canvas: HTMLCanvasElement, loaded: any) {
        this.canvas = canvas
        this.loaded = loaded

        this.CreateScene()
        this.CreateCamera()
        this.CreateModel()
        this.CreateLight()

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })

        window.addEventListener('resize', () => {
            this.engine.resize()
        })
    }

    CreateScene() {
        this.engine = new Engine(this.canvas, true, { adaptToDeviceRatio: true })
        this.engine.setHardwareScalingLevel(1 / window.devicePixelRatio)
        this.scene = new Scene(this.engine)
        // new AxesViewer(this.scene, 3)

        const envTex = CubeTexture.CreateFromPrefilteredData(
            'textures/environmentMaps/harbor.env',
            this.scene
        )
        envTex.gammaSpace = false;
        this.scene.environmentTexture = envTex
        this.scene.createDefaultSkybox(envTex, true, 1000, 0.25)
        this.scene.environmentIntensity = 1

        this.scene.clearColor = new Color4(0, 0, 0, 0)

        // new AxesViewer(this.scene, 10)
    }

    async CreateModel() {
        const model = await SceneLoader.ImportMeshAsync(
            '',
            'models/jiggly_watermelon_jello/',
            'untitled.gltf', this.scene)
        this.loaded.value = true
    }

    CreateCamera() {
        this.camera1 = new ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 3, 16, new Vector3(1.5, -5.5, -10), this.scene)
        if (window.innerHeight / window.innerWidth > 1.76) {
            this.camera1.target.x = 0
            this.camera1.target.z = -7
            this.camera1.target.y = -3.5
        }
        // this.camera1.attachControl()
        // this.camera1.wheelPrecision = 10

        // this.camera1.useFramingBehavior = true;
        // this.camera1.framingBehavior.radiusScale = 2;
        // this.camera1.framingBehavior.framingTime = 4000;
    }

    CreateLight() {
        const light1 = new HemisphereLight()
        light1.intensity = 100
    }

}