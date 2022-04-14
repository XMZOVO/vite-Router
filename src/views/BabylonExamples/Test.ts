import { ArcRotateCamera, AxesViewer, Camera, CubeTexture, Engine, Mesh, Scene, SceneLoader, UniversalCamera, Vector3 } from "@babylonjs/core"
import '@babylonjs/loaders'

export class Test {
    canvas: HTMLCanvasElement
    engine: Engine
    scene: Scene
    camera1: ArcRotateCamera
    vtb: any

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.CreateScene()
        this.CreateCamera()
        this.CreateModel()

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })

        window.addEventListener('resize', () => {
            this.engine.resize()
        })
    }

    CreateScene() {
        this.engine = new Engine(this.canvas, true, { adaptToDeviceRatio: true })
        this.engine.displayLoadingUI()
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

    }

    CreateCamera() {
        this.camera1 = new ArcRotateCamera('camera1', Math.PI / 2,  Math.PI / 3, 16, Vector3.Zero(), this.scene)
        this.camera1.attachControl()
        this.camera1.wheelPrecision = 10
    }

    async CreateModel() {
        const ecy = await SceneLoader.ImportMeshAsync('', 'models/uruha_rushia_-_hololive_vtuber/', 'scene.gltf', this.scene)
        // console.log(ecy);
        this.camera1.setTarget(new Vector3(0, 5, 0))
        // this.scene.beginAnimation(ecy.skeletons[0], 0, 100, true, 1.0);
        this.vtb = ecy
        this.engine.hideLoadingUI()
    }
}