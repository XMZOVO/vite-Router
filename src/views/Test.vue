<template>
<canvas ref="bjsCanvas" class="w-full h-screen"></canvas>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {Test} from './BabylonExamples/Test.ts'

const bjsCanvas = ref()

onMounted(() => {
    new Test(bjsCanvas.value)
})

</script>
