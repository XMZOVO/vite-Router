<template>
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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ref } from 'vue'
import { Raycaster } from 'three'
import * as CANNON from 'cannon-es'
import { Pane } from 'tweakpane'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import CannonUtils from '../js/cannonUtils'
import CannonDebugRenderer from '../js/cannonDebugRenderer'
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js"


let debugObject
let camera
let renderer
let controls
let dragControl
let scene
let progressRatio = ref(0)

let world
let box
let djr
let physicsMaterial
let oldElapsedTime = 0
let DSpec
let Detector
let objects = []

let isDragging = false
let modelLoaded = false
let draggingId = -1

const raycaster = new Raycaster()
const mouse = new THREE.Vector2()
const moveMouse = new THREE.Vector2()
const clock = new THREE.Clock()
const boxes = []
const boxMeshes = []
const pane = new Pane();
let container
let cannonDebugRenderer
debugObject = {}


onMounted(() => {
    initCANNON()
    initThree()
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

    //CANNONJS Debug
    // cannonDebugRenderer = new CannonDebugRenderer(scene, world)

    tick()
})

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function initThree() {
    const loadingBarElement = document.querySelector('#progress')
    const loadingElement = document.querySelector('#progressDiv')

    // Scene
    scene = new THREE.Scene()

    //Camera
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0.7043043492115377, 14.388569228135337, 9.239105833036682)
    camera.quaternion.set(-0.27029782041898764, -0.0006752835476387169, -0.00018958467553528339, 0.9627765038296925)
    camera.rotation.set(-0.5474052811931926, -0.0011978059034376911, -0.0007301112729914485)
    scene.add(camera)

    //Light
    const light = new THREE.AmbientLight(0x404040); // soft white light
    light.intensity = 3
    scene.add(light);

    const size = 20
    const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
    directionalLight.position.set(0, 34, -21)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.camera.top = size
    directionalLight.shadow.camera.bottom = -size
    directionalLight.shadow.camera.left = -size
    directionalLight.shadow.camera.right = size
    directionalLight.show = 200

    scene.add(directionalLight)

    pane.addInput(directionalLight, 'intensity', { min: 0, max: 100, step: 0.001 })
    pane.addInput(directionalLight.position, 'x', { min: -100, max: 100, step: 0.001 })
    pane.addInput(directionalLight.position, 'y', { min: -100, max: 100, step: 0.001 })
    pane.addInput(directionalLight.position, 'z', { min: -100, max: 100, step: 0.001 })

    // const helper = new THREE.CameraHelper(directionalLight.shadow.camera)
    // scene.add(helper)

    //loadingManage
    const loadingManage = new THREE.LoadingManager(
        () => {
            window.setTimeout(() => {

                gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 1, value: 0 })

                loadingElement.style.visibility = 'hidden'
            }, 500)
        },
        (itemUrl, itemsLoaded, itemsTotal) => {
            progressRatio.value = itemsLoaded / itemsTotal * 100
            loadingBarElement.style.width = `${progressRatio.value}%`
        },
    )

    //Load Assets
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    const gltfLoader = new GLTFLoader(loadingManage)
    gltfLoader.setDRACOLoader(dracoLoader)
    const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManage)

    // EnvironmentMap
    const environmentMap = cubeTextureLoader.load([
        '/textures/environmentMaps/0/px.jpg',
        '/textures/environmentMaps/0/nx.jpg',
        '/textures/environmentMaps/0/py.jpg',
        '/textures/environmentMaps/0/ny.jpg',
        '/textures/environmentMaps/0/pz.jpg',
        '/textures/environmentMaps/0/nz.jpg',
    ])

    //Async Load Model
    Promise.all([
        gltfLoader.loadAsync('models/DSPEC_jr/DSPEC_jr.gltf'),
        gltfLoader.loadAsync('models/Detector_model/Detector.gltf'),
        // gltfLoader.loadAsync('models/PortalGun/portalGun.gltf'),
        gltfLoader.loadAsync('models/modern_coffee_table_01_2k_2.blend/modern_coffee_table_01_2k.gltf'),
    ]).then((results) => {
        const [djr, detector, table,] = results

        //DSPEC_jr
        let djrMesh
        djr.scene.traverse(function (child) {
            if (child.name === 'DSPEC_jr') {
                // console.log(child);
                djrMesh = createMesh(child.children)
                djrMesh.geometry.center()
            }
        })
        djrMesh.scale.set(0.7, 0.7, 0.7)
        djrMesh.position.set(0, 8.28, 0)
        djrMesh.userData.i = 0
        const box = new THREE.Box3().setFromObject(djrMesh);

        //DSPEC_jr CANNON Model
        const DspecShape = new CANNON.Box(box.getSize().divide(new THREE.Vector3(2, 2, 2)))
        const DspecBody = new CANNON.Body({ mass: 1, material: physicsMaterial })
        DspecBody.addShape(DspecShape)

        DspecBody.position.copy(djrMesh.position)
        world.addBody(DspecBody)

        scene.add(djrMesh)
        boxes.push(DspecBody)
        boxMeshes.push(djrMesh)

        //Detector
        let detectorMesh
        detector.scene.traverse(function (child) {
            if (child.name === 'Detector') {
                detectorMesh = createMesh(child.children)
                detectorMesh.geometry.center()
            }
        })
        detectorMesh.userData.i = 1
        detectorMesh.position.set(5, 8.28, 0)
        detectorMesh.rotation.z = - Math.PI / 2
        detectorMesh.rotation.y = - Math.PI / 2

        //Detector CANNON Model
        const DetectorShape = new CANNON.Cylinder(0.57, 0.57, 3.55, 20)
        const DetectorBody = new CANNON.Body({ mass: 20, material: physicsMaterial })
        DetectorBody.addShape(DetectorShape)
        DetectorBody.position.copy(detectorMesh.position)
        DetectorBody.quaternion.copy(detectorMesh.quaternion)

        world.addBody(DetectorBody)
        scene.add(detectorMesh)
        boxes.push(DetectorBody)
        boxMeshes.push(detectorMesh)


        //Table
        let deskMesh
        table.scene.traverse(function (child) {
            if (child.name === 'modern_coffee_table_01') {
                deskMesh = child
                deskMesh.geometry.center()
            }
        })

        deskMesh.userData.i = -1
        deskMesh.scale.set(20, 20, 20)
        deskMesh.position.set(0, 3.9, 0)
        let desk = new THREE.Box3().setFromObject(deskMesh);

        //Table CANNON Model
        const TableShape = new CANNON.Box(desk.getSize().divide(new THREE.Vector3(2, 2, 2)))
        const TableBody = new CANNON.Body({ mass: 20, material: physicsMaterial })
        TableBody.addShape(TableShape)
        TableBody.position.copy(deskMesh.position)

        world.addBody(TableBody)
        scene.add(deskMesh)
        boxes.push(TableBody)
        boxMeshes.push(deskMesh)

        updateAllMaterial()
        modelLoaded = true

    })
    const floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(50, 50),
        new THREE.MeshStandardMaterial({
            color: '#777777',
            metalness: 0.3,
            roughness: 0.4,
            envMap: environmentMap
        })
    )
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI * 0.5
    scene.add(floor)

    // AxisHelp
    // const axisHelp = new THREE.AxesHelper(20)
    // scene.add(axisHelp)

    const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
    const overlayMaterial = new THREE.ShaderMaterial({
        wireframe: true,
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

    // Renderer
    renderer = new THREE.WebGLRenderer({
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
    document.body.appendChild(renderer.domElement)

    // Controls
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    dragControl = new DragControls(boxMeshes, camera, renderer.domElement);
    // dragControl.transformGroup = true
    dragControl.addEventListener('dragstart', function (event) {
        draggingId = event.object.userData.i
        // console.log(draggingId);
        if (draggingId === -1)
            return
        // console.log(draggingId)
        controls.enabled = false
    })
    dragControl.addEventListener('dragend', function (event) {
        draggingId = -1
        controls.enabled = true
    })
    dragControl.addEventListener('drag', function (event) {
        // event.object.position.y = 1
    })
}

function initCANNON() {
    world = new CANNON.World()
    world.gravity.set(0, -9.8, 0)
    world.allowSleep = true

    // Create a slippery material (friction coefficient = 0.0)
    physicsMaterial = new CANNON.Material('physics')
    const physics_physics = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, {
        friction: 10,
        restitution: 0,
    })
    // We must add the contact materials to the world
    world.addContactMaterial(physics_physics)

    // Create the ground plane
    const groundShape = new CANNON.Plane()
    const groundBody = new CANNON.Body({ mass: 0, material: physicsMaterial })
    groundBody.addShape(groundShape)
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
    world.addBody(groundBody)
}

debugObject.envMapIntensity = 10
pane.addInput(debugObject, 'envMapIntensity', { min: 0, max: 10, step: 0.01 }).on('change', updateAllMaterial)
function updateAllMaterial() {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            // child.material.envMap = debugObject.envMapIntensity
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

onUnmounted(() => {

})

let lastCallTime
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    world.step(1 / 60, deltaTime, 3)
    // Update box positions
    if (modelLoaded) {
        boxMeshes.forEach((m, i) => {

            if (i === draggingId) {
                boxes[i].position.copy(m.position)
                boxes[i].quaternion.copy(m.quaternion)
                boxes[i].velocity.set(0, 0, 0)
                boxes[i].angularVelocity.set(0, 0, 0)
            } else {
                m.position.copy(boxes[i].position)
                m.quaternion.copy(boxes[i].quaternion)
            }
        })
    }

    // Update controls
    controls.update()

    // cannonDebugRenderer.update()

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

function createMesh(insertedMeshes) {

    var materials = [],
        geometries = [],
        mergedGeometry = new THREE.BufferGeometry(),
        meshMaterial,
        mergedMesh;

    insertedMeshes.forEach(function (mesh, index) {
        mesh.updateMatrix();
        geometries.push(mesh.geometry);
        meshMaterial = new THREE.MeshStandardMaterial(mesh.material);
        materials.push(meshMaterial);
    });

    mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, true);
    mergedGeometry.groupsNeedUpdate = true;

    mergedMesh = new THREE.Mesh(mergedGeometry, materials);

    return mergedMesh;
}

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