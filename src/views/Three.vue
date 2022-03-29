<template></template>

<script setup>
import {
    PerspectiveCamera,
    Scene,
    BoxGeometry,
    MeshNormalMaterial,
    Mesh,
    WebGLRenderer,
    FontLoader,
    MeshMatcapMaterial,
    TextBufferGeometry,
    TextureLoader,
} from 'three'


let camera
let scene
let renderer
let geometry
let material
let mesh
let text

const fontLoader = new FontLoader()
const textureLoader = new TextureLoader()
const matcapTextures = textureLoader.load('/matcaps/3.png')

const init = () => {
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10)
    camera.position.z = 1

    scene = new Scene()

    geometry = new BoxGeometry(0.2, 0.2, 0.2)
    material = new MeshNormalMaterial()


    renderer = new WebGLRenderer({
        antialias: true,
    })


    fontLoader.load('/font2.json',
        (font) => {
            const textGeometry = new TextBufferGeometry(
                '小阳人',
                {
                    font: font,
                    size: 0.2,
                    height: 0.2,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
                }
            )
            textGeometry.center()

            const textMaterial = new MeshMatcapMaterial({ matcap: matcapTextures })
            // textMaterial.wireframe = true
            // textMaterial.matcap
            text = new Mesh(textGeometry, textMaterial)
            scene.add(text)



            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setAnimationLoop(animation)
            document.querySelector('#app').appendChild(renderer.domElement)
        })
}

const animation = (time) => {
    // text.rotation.x = time / 2000
    text.rotation.y = time / 10000

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.render(scene, camera)
}

window.addEventListener("DOMContentLoaded", () => {
    init()
})
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