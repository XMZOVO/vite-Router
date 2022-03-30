<template>
    <canvas class="webgl"></canvas>
</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { onMounted, onUnmounted } from 'vue'

const parmaeters = {

}
parmaeters.count = 100000
parmaeters.size = 0.01
parmaeters.radius = 5
parmaeters.branches = 3
parmaeters.spin = 1
parmaeters.randomness = 0.002
parmaeters.randomnessPower = 3
parmaeters.insideColors = '#ff6030'
parmaeters.outsideColors = '#1b3984'

let geometry = null
let material = null
let points = null

let canvas
let scene
let camera
let controls
let renderer
let clock

const gui = new dat.GUI({ width: 360 })

onUnmounted(() => {
    gui.destroy()
})

onMounted(() => {

    // Canvas
    canvas = document.querySelector('canvas.webgl')

    // Scene
    scene = new THREE.Scene()


    generateGalaxy()

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
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

    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 3
    camera.position.y = 3
    camera.position.z = 3
    scene.add(camera)



    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Controls
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    /**
     * Animate
     */
    clock = new THREE.Clock()

    tick()
})

const generateGalaxy = () => {
    if (points != null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parmaeters.count * 3)
    const colors = new Float32Array(parmaeters.count * 3)

    const colorInside = new THREE.Color(parmaeters.insideColors)
    const colorOutside = new THREE.Color(parmaeters.outsideColors)
    for (let i = 0; i < parmaeters.count; i++) {
        const i3 = i * 3

        const radius = Math.random() * parmaeters.radius
        const spinAngle = radius * parmaeters.spin
        const branchAngle = (i % parmaeters.branches) / parmaeters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parmaeters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parmaeters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parmaeters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = 0 + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parmaeters.radius)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )
    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )

    material = new THREE.PointsMaterial({
        size: parmaeters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    points = new THREE.Points(geometry, material)
    scene.add(points)
}

gui.add(parmaeters, 'count', 100, 1000000, 100).onFinishChange(generateGalaxy)
gui.add(parmaeters, 'size', 0.001, 0.1, 0.001).onFinishChange(generateGalaxy)
gui.add(parmaeters, 'radius', 0.01, 20, 0.01).onFinishChange(generateGalaxy)
gui.add(parmaeters, 'branches', 2, 20, 1).onFinishChange(generateGalaxy)
gui.add(parmaeters, 'spin', -5, 5, 0.001).onFinishChange(generateGalaxy)
gui.add(parmaeters, 'randomness', 0, 2, 0.001).onFinishChange(generateGalaxy)
gui.add(parmaeters, 'randomnessPower', 1, 10, 0.001).onFinishChange(generateGalaxy)
gui.addColor(parmaeters, 'insideColors', 1, 10, 0.001).onFinishChange(generateGalaxy)
gui.addColor(parmaeters, 'outsideColors', 1, 10, 0.001).onFinishChange(generateGalaxy)

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

</script>

<style>
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