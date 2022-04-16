<template>
    <canvas class="webgl"></canvas>
    <div id="progressDiv" class="w-full bg-gray-200 h-2 mb-6 absolute top-1/2">
        <div id="progress" class="transition-all duration-200 ease-in-out bg-main-active h-2 w-{{progressRatio}}"></div>
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
import {ref} from 'vue'

let debugObject
let camera
let renderer
let controls
let canvas
let scene
let progressRatio = ref(0)

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


/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.closed = true


debugObject = {}
debugObject.envMapIntensity = 5
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterial)




// Light 
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(-13, 22.4, 14.8)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)



// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)

gui.add(directionalLight, "intensity").min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, "x").min(-50).max(50).step(0.001).name('lightX')
gui.add(directionalLight.position, "y").min(-50).max(50).step(0.001).name('lightY')
gui.add(directionalLight.position, "z").min(-50).max(50).step(0.001).name('lightZ')



/**
 * Camera
 */
// Base camera
camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1, 7)


onUnmounted(() => {
    gui.destroy()
    scene = null
})

onMounted(() => {
    // Loaders

    // Canvas
    canvas = document.querySelector('canvas.webgl')
    const loadingBarElement = document.querySelector('#progress')
    const loadingElement = document.querySelector('#progressDiv')

    // Controls
    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    const loadingManage = new THREE.LoadingManager(
        () => {
            window.setTimeout(() => {

                gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })

                // loadingBarElement.classList.add('ended')
                // loadingBarElement.style.transform = ''
                loadingElement.style.visibility = 'hidden'
            }, 500)
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
        '/textures/environmentMaps/0/px.jpg',
        '/textures/environmentMaps/0/nx.jpg',
        '/textures/environmentMaps/0/py.jpg',
        '/textures/environmentMaps/0/ny.jpg',
        '/textures/environmentMaps/0/pz.jpg',
        '/textures/environmentMaps/0/nz.jpg',
    ])

    // Models
    gltfLoader.load('/models/Detector_model/Detector.gltf',
        (gltf) => {
            gltf.scene.scale.set(1.5, 1.5, 1.5)
            gltf.scene.position.set(0, 0, 0)
            gltf.scene.rotation.y =  - Math.PI * 1/4
            scene.add(gltf.scene)

            gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

            updateAllMaterial()
        })


    // Scene
    scene = new THREE.Scene()

    scene.add(directionalLight)
    scene.add(camera)

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

    gui.add(renderer, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping
    }).onFinishChange(() => {
        renderer.toneMapping = Number(renderer.toneMapping)
        updateAllMaterial()
    })

    gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)

    /**
     * Animate
     */

    tick()

})

const tick = () => {
    // Update controls
    controls.update()

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

</style>