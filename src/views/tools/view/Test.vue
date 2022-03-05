<template>
 <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden sm:max-w-xl flex">
        <!-- <div class="sm:flex"> -->
            <div class="p-8">
                <p class="uppercase tracking-wide text-sm font-semibold mb-2">能量区间(MeV)</p>
                <div class=" items-baseline mb-2">
                    <input v-model="st" placeholder="输入能量起" />
                    <p class="label">-</p>
                    <input v-model="ed" placeholder="输入能量止" />
                </div>
                <p class="uppercase tracking-wide text-sm font-semibold mb-2">道址数</p>
                <div class=" flex mb-3">
                    <input v-model="chl" placeholder="输入道址数" />
                </div>
                <button
                    class="w-1/3 flex items-center justify-center rounded-md bg-white text-main-unactive mb-3 p-1 border-2 font-semibold hover:border-main-active hover:text-main-active"
                    type="submit"
                    @click="convert2Csv"
                >开始转换</button>
            </div>
        <!-- </div> -->
    </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ElLoading } from 'element-plus'
import axios from 'axios'
import { ref } from 'vue'

let st = ref(0)
let ed = ref(1.6)
let chl = ref(4096)
const upload = ref(null)

let loading;
</script>