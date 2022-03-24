<template>
    <div class="px-10 lg:px-40 md:px-24">
        <div class="flex w-full flex-wrap sm:space-x-5 pt-16 sm:flex-nowrap">
            <div class="flex items-center mx-auto sm:w-3/5">
                <iframe :src="detectorSrc" frameborder="0" class="w-full h-80 rounded-lg"></iframe>
            </div>
            <div class="flex items-center flex-col m-auto space-y-5 mt-5">
                <div class="flex items-center m-auto space-x-5 justify-between w-full">
                    <p>晶体高度</p>
                    <input
                        v-model="cylinderH"
                        placeholder="单位（cm）"
                        type="text"
                        class="rounded-lg border-2 w-3/5"
                    />
                </div>
                <div class="flex items-center m-auto space-x-5 justify-between w-full">
                    <p>晶体半径</p>
                    <input
                        v-model="cylinderR"
                        placeholder="单位（cm）"
                        type="text"
                        class="rounded-lg border-2 w-3/5"
                    />
                </div>
                <div class="flex items-center space-x-5 justify-between w-full">
                    <p>核素选择</p>
                    <select
                        v-model="nuclide"
                        placeholder="单位（cm）"
                        type="text"
                        class="rounded-lg border-2 w-3/5"
                    >
                        <option v-for="item in nuclides" :key="item">{{ item }}</option>
                    </select>
                </div>
                <div class="flex items-center space-x-5 sm:space-x-3 justify-between w-full">
                    <p class="text-left flex-wrap">发射粒子数</p>
                    <input
                        v-model="particleNumber"
                        placeholder="整数"
                        type="text"
                        class="rounded-lg border-2 w-3/5"
                        :onChange="numberValid"
                    />
                </div>
                <div class="flex items-center m-auto space-x-5 justify-between w-full">
                    <button
                        :disable="disabled"
                        @click="createGDML"
                        class="text-main-unactive border-2 px-3 py-1 rounded-lg border-main-unactive hover:text-white hover:bg-main-unactive active:bg-main-active"
                    >{{ refreshButton }}</button>
                    <button
                        :disable="disabled"
                        @click="simulation"
                        class="text-main-unactive border-2 px-3 py-1 rounded-lg border-main-unactive hover:text-white hover:bg-main-unactive active:bg-main-active"
                    >{{ LunchButton }}</button>
                </div>
            </div>
        </div>

        <div v-if="specFile" class="flex sm:w-full py-5">
            <iframe :src="specFile" frameborder="0" class="w-full h-80 sm:h-96 rounded-lg"></iframe>
        </div>

        <div
            v-if="specFile"
            class="flex space-x-1 w-full md:w-2/3 lg:w-1/2 mb-3"
        >
            <div class="w-1/3 flex items-center space-x-1">
                <p>a:</p>
                <input
                    v-model="fa"
                    class="w-full rounded-lg border-2 text-xs"
                    type="text"
                    placeholder="系数fa"
                />
            </div>

            <div class="flex w-1/3 items-center space-x-1">
                <p>b:</p>
                <input
                    v-model="fb"
                    class="w-full rounded-lg border-2 text-xs"
                    type="text"
                    placeholder="系数fb"
                />
            </div>

            <div class="flex items-center w-1/3 space-x-1">
                <p>c:</p>
                <input
                    v-model="fc"
                    class=" w-full rounded-lg border-2 text-xs"
                    type="text"
                    placeholder="系数fc"
                />
            </div>
        </div>


        <div v-if="specFile" class="flex sm:justify-start justify-between mb-5 lg:w-52">
            <button
                @click="fwhm"
                class=" mr-3 text-main-unactive border-2 px-3 py-1 rounded-lg border-main-unactive hover:text-white hover:bg-main-unactive active:bg-main-active"
            >{{ fwhmBtn }}</button>

            <button
                @click="originSpec"
                class=" text-main-unactive border-2 px-3 py-1 rounded-lg border-main-unactive hover:text-white hover:bg-main-unactive active:bg-main-active"
            >查看原谱</button>
        </div>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import axios from 'axios'
var router = useRouter();

let nuclides = reactive(["Cs137", "Co60", "Eu152"])
let nuclide = ref("Cs137")

let cylinderH = ref(7.6);
let cylinderR = ref(3.8);
let reflectTT = ref(0.3);
let reflectST = ref(0.2);
let reflectMat = ref("G4_ALUMINUM_OXIDE");
let pmtT = ref(3);

let fa = ref(-0.0137257);
let fb = ref(0.0739501);
let fc = ref(-0.152982);
let fwhmBtn = ref("高斯展宽");

let JSRootPath = ref("/JsRoot634")

//服务端IP
let HttpUrl = ref("http://43.154.8.62:8080")
//本地段IP
// let HttpUrl = ref("http://localhost:8080")

const particleNumber = ref(1000);
let specFile = ref("");
// specFile.value = JSRootPath.value + '/index.htm?nobrowser&noprogress&file=' + HttpUrl.value + '/root/FWHM_result.root&item=EDep;1&opt=hist;logy'
let disabled = ref(false);
let LunchButton = ref("开始模拟")
let refreshButton = ref("刷新模型")

let detectorSrc = ref(JSRootPath.value + "/index.htm?nobrowser&noprogress&file=" + HttpUrl.value + "/root/wtest.root&item=Default;1&opt=ssao;BACK;transp60");

function simulation() {
    LunchButton.value = "模拟中..."
    console.log(cylinderH);
    specFile.value = '';
    disabled.value = true;
    axios.post(HttpUrl.value + "/g4/simulate/" + particleNumber.value + "/" + nuclide.value + "/" + cylinderH.value + "/" + cylinderR.value + "/" + reflectTT.value + "/" + reflectST.value + "/" + reflectMat.value + "/" + pmtT.value).then(resp => {
        alert("模拟完成")
        LunchButton.value = "开始模拟"
        disabled.value = false;
        specFile.value = JSRootPath.value + '/index.htm?nobrowser&file=' + HttpUrl.value + '/root/result.root&item=EDep;1&opt=hist;logy'
    })
}

function numberValid() {
    if (particleNumber.value > 100000) {
        alert("测试阶段，请输入1e5以内")
        particleNumber.value = 1000;
        return false;
    }
    return true;
}

function createGDML() {
    detectorSrc.value = "";
    refreshButton.value = "刷新中..."
    disabled.value = true;
    axios.post(HttpUrl.value + "/g4/gdml/" + cylinderH.value + "/" + cylinderR.value + "/" + reflectTT.value + "/" + reflectST.value + "/" + reflectMat.value + "/" + pmtT.value).then(resp => {
        alert("创建完成！");
        disabled.value = true;
        refreshButton.value = "刷新模型"
        detectorSrc.value = JSRootPath.value + "/index.htm?nobrowse&noprogressr&file=" + HttpUrl.value + "/root/wtest.root&item=Default;1&opt=ssao;BACK;transp60";
    })
}

function fwhm() {
    fwhmBtn.value = "展宽中..."
    axios.post(HttpUrl.value + "/g4/fwhm/" + fa.value + "/" + fb.value + "/" + fc.value).then(resp => {
        disabled.value = true;
        specFile.value = JSRootPath.value + '/index.htm?nobrowser&noprogress&file=' + HttpUrl.value + '/root/FWHM_result.root&item=EDep;1&opt=hist;logy';
        fwhmBtn.value = "高斯展宽"
        disabled.value = false;
    })
}

function originSpec(){
    specFile.value = JSRootPath.value + '/index.htm?nobrowser&file=' + HttpUrl.value + '/root/result.root&item=EDep;1&opt=hist;logy'
}

function reSet() {
    cylinderH.value = 7.6;
    cylinderR.value = 3.8;
    reflectTT.value = 0.3;
    reflectST.value = 0.2;
    reflectMat.value = "G4_SODIUM_IODIDE";
    pmtT.value = 3;
    detectorSrc.value = JSRootPath.value + "/index.htm?nobrowser&noprogress&file=" + HttpUrl.value + "/root/origin.root&item=Default;1&opt=ssao;BACK;transp60";
}
</script>