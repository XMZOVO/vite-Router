<template>
    <canvas class="w-full h-screen">BabylonJs</canvas>
</template>

<script setup lang="ts">
import { BasicScene } from './BabylonExamples/BasicScene'
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