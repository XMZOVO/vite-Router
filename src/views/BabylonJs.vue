<template>
    <canvas class="w-full h-screen">BabylonJs</canvas>
</template>

<script setup>
import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
import { BasicScene } from './BabylonExamples/BasicScene.ts'
import { onMounted } from 'vue'

onMounted(() => {
    const canvas = document.querySelector('canvas')
    new BasicScene(canvas)
})

</script>

<style scoped>* {
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
}</style>