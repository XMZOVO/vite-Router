<script setup>
</script>

<template>
  <canvas ref="canvas" class="w-full h-screen"></canvas>
  <div v-if="loaded"
    class="flex flex-col space-y-5 absolute top-20 sm:top-1/3 left-10 sm:left-20 text-white text-4xl sm:text-5xl select-none">
    <p class="">It's Summer Now</p>
    <div class="text-lg sm:text-2xl text-gray-300">
      <p class="">Xiao Liu is going to</p>
      <p class="">pursue meaningful people and things</p>
    </div>

    <div>
      <button @click="pullBtn"
        class=" transition hover:shadow-lg hover:-translate-y-1 active:translate-y-1 rounded-lg border text-3xl w-24">Pull</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {MainPage} from './BabylonExamples/MainPage'
  
const canvas = ref()
const loaded = ref(false)
let scene

onMounted(() => {
  scene = new MainPage(canvas.value, loaded)
})

function pullBtn():void {
  scene.Switch()
}

function elHandle() {
  window.open('https://store.steampowered.com/app/1245620/_/');
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
</style>

