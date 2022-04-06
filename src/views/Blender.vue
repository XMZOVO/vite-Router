<template>
    <canvas class="webgl"></canvas>
    <div id="progressDiv" class="w-full bg-gray-200 h-2 mb-6 absolute top-1/2">
        <div
            id="progress"
            class="transition-all duration-200 ease-in-out bg-main-active h-2 w-{{progressRatio}}"
        ></div>
    </div>

    <div class="point point-0">
        <div class="label select-none">1</div>
        <div class="text select-none">This is creation of Roy</div>
    </div>

    <div class="point point-1">
        <div class="label select-none">2</div>
        <div class="text select-none">Switch</div>
    </div>

    <div class="point point-2">
        <div class="label select-none">3</div>
        <div class="text select-none">Light Switch</div>
    </div>

    <div class="point point-3">
        <div class="label select-none">4</div>
        <div class="text select-none">Power</div>
    </div>

    <div class="point point-4">
        <div class="label select-none">5</div>
        <div class="text select-none">Elden Ring</div>
    </div>

    <div class="point point-5">
        <div class="label select-none">6</div>
        <div class="text select-none">USB</div>
    </div>

    <div class="point point-6">
        <div class="label select-none">7</div>
        <div class="text select-none">This is creation of Roy</div>
    </div>

    <div class="point point-7">
        <div class="label select-none">8</div>
        <div class="text select-none">This is creation of Roy</div>
    </div>

    <div class="point point-8">
        <div class="label select-none">9</div>
        <div class="text select-none">This is creation of Roy</div>
    </div>
</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ref } from 'vue'
import { Raycaster } from 'three'

let debugObject
let camera
let renderer
let controls
let canvas
let scene
let progressRatio = ref(0)
let points
let sceneReady = false


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


const updateAllMaterial = () => {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

// Raycaster
const raycaster = new Raycaster()


/**
 * Base
 */
// Debug
const gui = new dat.GUI()
// gui.closed = true

const showTips = { visible: false }
gui.add(showTips, 'visible').name('Show tips').onFinishChange(() => {
    for(const point of points){
        point.element.classList.remove('visible')
    }
})

debugObject = {}
debugObject.envMapIntensity = 5
// gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterial)




// Light 
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(-13, 22.4, 14.8)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)



// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)

// gui.add(directionalLight, "intensity").min(0).max(10).step(0.001).name('lightIntensity')
// gui.add(directionalLight.position, "x").min(-50).max(50).step(0.001).name('lightX')
// gui.add(directionalLight.position, "y").min(-50).max(50).step(0.001).name('lightY')
// gui.add(directionalLight.position, "z").min(-50).max(50).step(0.001).name('lightZ')



/**
 * Camera
 */
// Base camera
camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-5, 1, 5)


onUnmounted(() => {
    gui.destroy()
})

onMounted(() => {
    // Loaders

    // Canvas
    canvas = document.querySelector('canvas.webgl')
    const loadingBarElement = document.querySelector('#progress')
    const loadingElement = document.querySelector('#progressDiv')
    // Points
    points = [
        {
            position: new THREE.Vector3(-1.5, -0.2, 1.5),
            element: document.querySelector('.point-0')
        },
        {
            position: new THREE.Vector3(0.6, -0.9, 1.7),
            element: document.querySelector('.point-1')
        },
        {
            position: new THREE.Vector3(1.9, -0.9, 1.7),
            element: document.querySelector('.point-2')
        },
        // {
        //     position: new THREE.Vector3(0.5, -0.9, -5.5),
        //     element: document.querySelector('.point-3')
        // },
        {
            position: new THREE.Vector3(0.2, -0.9, -5.5),
            element: document.querySelector('.point-4')
        },
        // {
        //     position: new THREE.Vector3(-0.1, -0.9, -5.5),
        //     element: document.querySelector('.point-5')
        // },
        // {
        //     position: new THREE.Vector3(-1.1, -0.9, -5.5),
        //     element: document.querySelector('.point-6')
        // },
        // {
        //     position: new THREE.Vector3(-2.2, -0.9, -5.5),
        //     element: document.querySelector('.point-7')
        // },
        // {
        //     position: new THREE.Vector3(-0.1, -1.5, -5.5),
        //     element: document.querySelector('.point-8')
        // },
    ]

    // Controls
    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    const loadingManage = new THREE.LoadingManager(
        () => {
            window.setTimeout(() => {

                gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 1, value: 0 })

                // loadingBarElement.classList.add('ended')
                // loadingBarElement.style.transform = ''
                loadingElement.style.visibility = 'hidden'
            }, 500)
            window.setTimeout(() => {

                sceneReady = true
            })
        },
        (itemUrl, itemsLoaded, itemsTotal) => {
            progressRatio.value = itemsLoaded / itemsTotal * 100
            loadingBarElement.style.width = `${progressRatio.value}%`
            // console.log(progressRatio.value);
        },
    )


    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')


    const gltfLoader = new GLTFLoader(loadingManage)
    gltfLoader.setDRACOLoader(dracoLoader)
    const cubeTextureLoader = new THREE.CubeTextureLoader()

    // EnvironmentMap
    const environmentMap = cubeTextureLoader.load([
        '/textures/environmentMaps/4/px.png',
        '/textures/environmentMaps/4/nx.png',
        '/textures/environmentMaps/4/py.png',
        '/textures/environmentMaps/4/ny.png',
        '/textures/environmentMaps/4/pz.png',
        '/textures/environmentMaps/4/nz.png',
    ])

    // Models
    gltfLoader.load('models/DSPEC_jr/DSPEC_jr.gltf',///
        (gltf) => {
            gltf.scene.scale.set(1.5, 1.5, 1.5)
            gltf.scene.position.set(0, -2, 0)
            gltf.scene.rotation.y = 0
            scene.add(gltf.scene)

            // gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

            updateAllMaterial()
        })


    // Scene
    scene = new THREE.Scene()

    scene.add(directionalLight)
    scene.add(camera)

    // AxisHelp
    // const axisHelp = new THREE.AxesHelper(10)
    // scene.add(axisHelp)

    const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
    const overlayMaterial = new THREE.ShaderMaterial({
        // wireframe:true,
        transparent: true,
        uniforms: {
            uAlpha: { value: 1 }
        },
        vertexShader: `

    void main(){
        gl_Position = vec4(position, 1.0);
        
    }`,
        fragmentShader: `
    uniform float uAlpha;

    void main(){
        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }`
    })
    const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
    scene.add(overlay)

    // Update all material

    environmentMap.encoding = THREE.sRGBEncoding
    scene.background = environmentMap
    scene.environment = environmentMap

    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 3
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // gui.add(renderer, 'toneMapping', {
    //     No: THREE.NoToneMapping,
    //     Linear: THREE.LinearToneMapping,
    //     Reinhard: THREE.ReinhardToneMapping,
    //     Cineon: THREE.CineonToneMapping,
    //     ACESFilmic: THREE.ACESFilmicToneMapping
    // }).onFinishChange(() => {
    //     renderer.toneMapping = Number(renderer.toneMapping)
    //     updateAllMaterial()
    // })

    // gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)


    /**
     * Animate
     */

    tick()

})

const tick = () => {
    // Update controls
    controls.update()

    // Update Point
    if (sceneReady && showTips.visible) {
        for (const point of points) {
            const screenPosition = point.position.clone()
            screenPosition.project(camera)

            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)
            if (intersects.length === 0) {
                point.element.classList.add('visible')
            }
            else {
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(camera.position)

                if (intersectionDistance < pointDistance) {
                    point.element.classList.remove('visible')
                }
                else {
                    point.element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = -screenPosition.y * sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }
    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}


window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

html,
body {
    overflow: hidden;
}

.webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}

.point {
    position: absolute;
    top: 50%;
    left: 50%;
}

.point .label {
    position: absolute;
    top: -20px;
    left: -20px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #00000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    line-height: 25px;
    font-weight: 100;
    font-size: 14px;
    cursor: help;

    transform: scale(0, 0);
    transition: transform 0.3s;
}

.point .text {
    position: absolute;
    top: 30px;
    left: -100px;
    width: 200px;
    padding: 20px;
    border-radius: 4px;
    background: #00000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    line-height: 1.3em;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 100;
    font-size: 14px;
    opacity: 0;

    transition: opacity 0.3s;
    pointer-events: none;
}

.point:hover .text {
    opacity: 1;
}

.point.visible .label {
    transform: scale(1, 1);
}
</style>