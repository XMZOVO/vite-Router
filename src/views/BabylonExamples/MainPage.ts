import { ArcRotateCamera, Animation, AxesViewer, Color3, Color4, CubeTexture, Engine, MergeMeshesOptimization, Scene, SceneLoader, Vector3, AbstractMesh, CubicEase, EasingFunction } from "@babylonjs/core"
import '@babylonjs/loaders'
import { HemisphereLight } from "three"
import { CustomLoadingScreen } from './CustomLoading/LoadingScreen'

export class MainPage {
    canvas: HTMLCanvasElement
    engine: Engine
    scene: Scene
    camera1: ArcRotateCamera

    meshes: AbstractMesh[] = []
    currentTarget: string = 'GuaGua'
    radius: number
    compensate = {
        y: 0,
        x: 0,
    }

    loaded: any

    constructor(canvas: HTMLCanvasElement, loaded: any) {
        this.canvas = canvas
        this.loaded = loaded

        if (window.innerHeight / window.innerWidth > 1.76) {
            this.radius = 7
            this.compensate.y = 1.5
            this.compensate.x = 0
        }
        else {
            this.radius = 4
            this.compensate.y = 0
            this.compensate.x = 1.5
        }

        this.CreateScene()
        this.CreateModel()
        this.CreateCamera()

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

        const detector = await SceneLoader.ImportMeshAsync(
            '',
            'models/Detector_model/',
            'Detector.gltf', this.scene)

        detector.meshes[0].position.y = -5
        this.meshes.push(detector.meshes[0])
        this.meshes.push(model.meshes[0])

        this.scene.createDefaultLight(true)
        this.loaded.value = true

        this.camera1.target = this.meshes[1].position
    }

    Switch() {
        // this.camera1.target.x = this.meshes[0].position.x + 3
        // this.camera1.target.y = this.meshes[0].position.y - 5
        // this.camera1.target.z = this.meshes[0].position.z - 8

        // this.MoveActiveCamera({ radius: 16, alpha: Math.PI / 2, beta: Math.PI / 3, target: { x: this.meshes[0].position.x + 3, y: this.meshes[0].position.y - 5, z: this.meshes[0].position.z - 8 } })

        var ease = new CubicEase();
        ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

        if (this.currentTarget === 'detector') {
            this.camera1.useAutoRotationBehavior = false

            var aable1 = Animation.CreateAndStartAnimation('at5', this.camera1, 'target', 60, 60, this.camera1.target, new Vector3(this.meshes[1].position.x , this.meshes[1].position.y, this.meshes[1].position.z), 0, ease);
            var aable1 = Animation.CreateAndStartAnimation('at5', this.camera1, 'radius', 60, 60, this.camera1.radius, this.radius, 0, ease);
            aable1.disposeOnEnd = true;

            this.currentTarget = 'GuaGua'
        }
        else {
            
            var aable1 = Animation.CreateAndStartAnimation('at5', this.camera1, 'target', 60, 60, this.camera1.target, new Vector3(this.meshes[0].position.x + 1.5, this.meshes[0].position.y , this.meshes[0].position.z), 0, ease);
            var aable1 = Animation.CreateAndStartAnimation('at5', this.camera1, 'radius', 60, 60, this.camera1.radius, this.radius + 3, 0, ease);
            aable1.disposeOnEnd = true;

            this.camera1.useAutoRotationBehavior = true
            this.camera1.autoRotationBehavior.idleRotationSpeed = 1
            this.currentTarget = 'detector'
        }

    }

    CreateCamera() {
        this.camera1 = new ArcRotateCamera('camera1', Math.PI / 2, Math.PI * 7 / 24, 4, Vector3.Zero(), this.scene)

        if (window.innerHeight / window.innerWidth > 1.76) {
            this.camera1.radius = 7
        }
        // this.camera1.attachControl()
        // this.camera1.wheelPrecision = 10

        // this.camera1.useFramingBehavior = true;
        // this.camera1.framingBehavior.radiusScale = 2;
        // this.camera1.framingBehavior.framingTime = 4000;
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

        this.scene.beginAnimation(camera, 0, 100, false, 1)

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