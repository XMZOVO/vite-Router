<template>
    <canvas ref="bjsCanvas" class="w-full h-screen">BabylonJs</canvas>
</template>

<script setup lang="ts">
import { BasicScene } from './BabylonExamples/BasicScene'
import { onMounted, onUnmounted, ref } from 'vue'

const bjsCanvas = ref()
let basicScene: BasicScene

onMounted(() => {
    const canvas = bjsCanvas.value
    basicScene = new BasicScene(canvas)
})

onUnmounted(() => {
    basicScene.scene = null
    basicScene.pane.dispose()
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