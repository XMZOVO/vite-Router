<template>
    <div class="flex w-full flex-wrap sm:space-x-5 pt-16 px-10 sm:px-20 sm:flex-nowrap">
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
                >{{refreshButton}}</button>
                <button
                    :disable="disabled"
                    @click="simulation"
                    class="text-main-unactive border-2 px-3 py-1 rounded-lg border-main-unactive hover:text-white hover:bg-main-unactive active:bg-main-active"
                >{{LunchButton}}</button>
            </div>
        </div>
    </div>

    <div class="flex items-center sm:items-start mx-auto sm:w-3/5 p-5">
        <iframe :src="specFile" frameborder="0" class="w-full h-80 sm:h-96 rounded-lg"></iframe>
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

const particleNumber = ref(1000);
let specFile = ref('');
let disabled = ref(false);
let LunchButton = ref("开始模拟")
let refreshButton = ref("刷新模型")

let JSRootPath = ref("/JsRoot634")

let detectorSrc = ref(JSRootPath.value + "/index.htm?nobrowser&file=http://43.154.8.62:8080/root/wtest.root&item=Default;1&opt=ssao;BACK;transp60");

function simulation() {
    if(!numberValid){
        return
    }
    LunchButton.value = "模拟中..."
    console.log(cylinderH);
    specFile.value = '';
    disabled.value = true;
    axios.post("http://43.154.8.62:8080/g4/simulate/" + particleNumber.value + "/" + nuclide.value + "/" + cylinderH.value + "/" + cylinderR.value + "/" + reflectTT.value + "/" + reflectST.value + "/" + reflectMat.value + "/" + pmtT.value).then(resp => {
        alert("模拟完成")
        LunchButton.value = "开始模拟"
        disabled.value = false;
        specFile.value = JSRootPath.value + '/index.htm?nobrowser&file=http://43.154.8.62:8080/root/result.root&item=EDep;1&opt=hist;logy'
    })
}

function numberValid(){
    if(particleNumber.value > 100000){
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
    axios.post("http://43.154.8.62:8080/g4/gdml/" + cylinderH.value + "/" + cylinderR.value + "/" + reflectTT.value + "/" + reflectST.value + "/" + reflectMat.value + "/" + pmtT.value).then(resp => {
        alert("创建完成！");
        disabled.value = true;
        refreshButton.value = "刷新模型"
        detectorSrc.value = JSRootPath.value + "/index.htm?nobrowser&file=http://43.154.8.62:8080/root/wtest.root&item=Default;1&opt=ssao;BACK;transp60";
    })
}

function reSet() {
    cylinderH.value = 7.6;
    cylinderR.value = 3.8;
    reflectTT.value = 0.3;
    reflectST.value = 0.2;
    reflectMat.value = "G4_SODIUM_IODIDE";
    pmtT.value = 3;
    detectorSrc.value = JSRootPath.value + "/index.htm?nobrowser&file=file:///Users/roy/IdeaProjects/springboottest/rootFiles/origin.root&item=Default;1&opt=ssao;BACK;transp60";
}
</script>