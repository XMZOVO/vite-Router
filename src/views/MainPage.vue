<script setup>
</script>

<template>
  <canvas ref="canvas" class="w-full h-screen"></canvas>
  <div v-if="loaded" class="flex-col absolute top-40 sm:top-1/3 left-10 sm:left-20 text-white text-4xl sm:text-5xl select-none">
    <p class="">It's Summer Now</p>
    <div class="text-lg sm:text-2xl text-gray-300">
      <p class="">Xiao Liu is going to</p>
      <p class="">pursue meaningful people and things</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {MainPage} from './BabylonExamples/MainPage'
  
const canvas = ref()
const loaded = ref(false)

onMounted(() => {
  new MainPage(canvas.value)
  loaded.value = true
})


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

