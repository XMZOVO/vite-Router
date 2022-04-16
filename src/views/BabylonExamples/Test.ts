import { ArcRotateCamera, Animation, AxesViewer, Camera, CubeTexture, CubicEase, EasingFunction, Engine, Mesh, Scene, SceneLoader, UniversalCamera, Vector3 } from "@babylonjs/core"
import '@babylonjs/loaders'
import { fa } from "element-plus/lib/locale"
import { Pane } from "tweakpane"

export class Test {
    canvas: HTMLCanvasElement
    engine: Engine
    scene: Scene
    camera1: ArcRotateCamera
    vtb: any

    pane: Pane

    constructor(canvas: HTMLCanvasElement) {
        this.pane = new Pane()
        const PARAMS = {
            position: 0,
        }

        this.pane.addInput(PARAMS, 'position', {
            options: {
                '全体': 0,
                '头': 1,
                '手': 2,
                '脚': 3,
                '腿': 4,
            }
        })

        this.canvas = canvas

        this.CreateScene()
        this.CreateCamera()
        this.CreateModel()

        this.pane.on('change', (evt) => {
            switch (evt.value) {
                case 0:
                    this.MoveActiveCamera({ radius: 16, alpha: Math.PI / 2, beta: Math.PI * 2 / 5, target: { x: 0, y: 5, z: -2 } })
                    break
                case 1:
                    this.MoveActiveCamera({ radius: 16, alpha: Math.PI / 2, beta: Math.PI / 2, target: { x: 0, y: 9, z: -10 } })
                    break
                case 2:
                    this.MoveActiveCamera({ radius: 16, alpha: 0, beta: Math.PI / 2, target: { x: -10, y: 5, z: 0.3 } })
                    break
                case 3:
                    this.MoveActiveCamera({ radius: 16, alpha: Math.PI / 2, beta: Math.PI / 3, target: { x: 0, y: -4, z: -6 } })
                    break
                case 4:
                    this.MoveActiveCamera({ radius: 16, alpha: Math.PI / 2, beta: Math.PI / 2, target: { x: 0, y: 3, z: -10 } })
                    break
            }
        })

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
        this.camera1 = new ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 3, 16, Vector3.Zero(), this.scene)
        this.camera1.attachControl()
        this.camera1.wheelPrecision = 10
    }

    async CreateModel() {
        const ecy = await SceneLoader.ImportMeshAsync('', 'models/uruha_rushia_-_hololive_vtuber/', 'scene.gltf', this.scene)
        // console.log(ecy);
        this.camera1.setTarget(new Vector3(0, 5, 0))
        // this.scene.beginAnimation(ecy.skeletons[0], 0, 100, true, 1.0);

        ecy.animationGroups[0] = null
        
        this.vtb = ecy
        this.engine.hideLoadingUI()
    }

    MoveActiveCamera({ radius, alpha, beta, target }): void {
        const camera = this.camera1

        camera.animations = [
            this.createAnimation(
                'radius',
                camera.radius,
                radius
            ),
            this.createAnimation(
                'alpha',
                camera.alpha,
                alpha
            ),
            this.createAnimation(
                'beta',
                camera.beta,
                beta
            ),
            this.createAnimation(
                'target.x',
                camera.target.x,
                target.x
            ),
            this.createAnimation(
                'target.y',
                camera.target.y,
                target.y
            ),
            this.createAnimation(
                'target.z',
                camera.target.z,
                target.z
            ),
        ]

        this.scene.beginAnimation(camera, 0, 100, false, 2)

    }

    createAnimation(property, from, to): Animation {
        const animation = new Animation('animation', property, 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT)

        animation.setKeys([
            {
                frame: 0,
                value: from
            },
            {
                frame: 100,
                value: to
            }
        ])

        return animation

    }
}