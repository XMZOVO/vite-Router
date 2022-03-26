<template>
    <div class="flex w-full flex-wrap pt-10 pb-10 sm:flex-nowrap items-center">
        <!-- 主模型渲染图 -->
        <div class="flex items-center mx-auto w-full sm:w-3/5 shadow-lg rounded-lg p-3 mb-8 sm:mb-0">
            <iframe :src="detectorSrc" frameborder="0" class="w-full h-80"></iframe>
        </div>
        <!--  -->

        <div class="mx-auto w-full lg:w-2/5">
            <div class="flex justify-center sm:justify-end">
                <div class="mb-3 w-52">
                    <label
                        for="exampleFormControlInput1"
                        class="form-label inline-block mb-2 text-gray-700"
                    >晶体高度</label>
                    <input
                        v-model="cylinderH"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder="单位cm"
                    />
                </div>
            </div>

            <div class="flex justify-center sm:justify-end">
                <div class="grid mb-3 w-52">
                    <label
                        for="exampleFormControlInput1"
                        class="form-label inline-block mb-2 text-gray-700"
                    >晶体半径</label>
                    <input
                        v-model="cylinderR"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder="单位cm"
                    />
                </div>
            </div>

            <div class="flex justify-center sm:justify-end">
                <div class="grid mb-3 w-52">
                    <p>核素选择</p>
                    <select
                        class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example"
                    >
                        <option v-for="item in nuclides" :key="item">{{ item }}</option>
                    </select>
                </div>
            </div>

            <div class="flex justify-center sm:justify-end">
                <div class="grid mb-3 w-52">
                    <label
                        for="exampleFormControlInput1"
                        class="form-label inline-block mb-2 text-gray-700"
                    >发射粒子数</label>
                    <input
                        v-model="particleNumber"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder
                        :onChange="numberValid"
                    />
                </div>
            </div>

            <div class="flex justify-center sm:justify-end">
                <div class="flex justify-between mb-3 w-52">
                    <button
                        :disable="disabled"
                        @click="createGDML"
                        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        {{
                            refreshButton
                        }}
                    </button>
                    <button
                        :disable="disabled"
                        @click="simulation"
                        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        {{
                            LunchButton
                        }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-if="specFile" class="flex w-full flex-col lg:flex-row items-center border-t pt-10">
        <!-- 谱线展示 -->
        <div class="shadow-lg w-full lg:w-3/5 rounded-lg mb-8 sm:mb-0">
            <iframe :src="specFile" frameborder="0" class="w-full h-80 sm:h-96 rounded-lg"></iframe>
        </div>
        <!--  -->

        <div class="mx-auto w-full lg:w-2/5">
            <div class="flex justify-center sm:justify-end">
                <div class="mb-3 w-52">
                    <label
                        for="exampleFormControlInput1"
                        class="form-label inline-block mb-2 text-gray-700"
                    >a:</label>
                    <input
                        v-model="fa"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder="系数fa"
                    />
                </div>
            </div>

            <div class="flex justify-center sm:justify-end">
                <div class="mb-3 w-52">
                    <label
                        for="exampleFormControlInput1"
                        class="form-label inline-block mb-2 text-gray-700"
                    >b:</label>
                    <input
                        v-model="fb"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder="系数fb"
                    />
                </div>
            </div>

            <div class="flex justify-center sm:justify-end">
                <div class="mb-3 w-52">
                    <label
                        for="exampleFormControlInput1"
                        class="form-label inline-block mb-2 text-gray-700"
                    >c:</label>
                    <input
                        v-model="fc"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder="系数fc"
                    />
                </div>
            </div>

            <div class="flex items-center m-auto space-x-5 justify-center sm:justify-end w-full">
                <button
                    :disable="disabled"
                    @click="fwhm"
                    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    {{
                        fwhmBtn
                    }}
                </button>
                <button
                    :disable="disabled"
                    @click="originSpec"
                    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >查看原谱</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import axios from 'axios'
import 'tw-elements';
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

let detecMid = ref("/index.htm?nobrowser&noprogress&file=" )
let deteSuffix = ref("/root/wtest.root&item=Default;1&opt=ssao;BACK;transp60;zoomFACTOR=110")

let detectorSrc = ref(JSRootPath.value + detecMid.value + HttpUrl.value + deteSuffix.value);

function actived() {

}

function simulation() {
    LunchButton.value = "模拟中..."
    console.log(cylinderH);
    specFile.value = '';
    disabled.value = true;
    axios.post(HttpUrl.value + "/g4/simulate/" + particleNumber.value + "/" + nuclide.value + "/" + cylinderH.value + "/" + cylinderR.value + "/" + reflectTT.value + "/" + reflectST.value + "/" + reflectMat.value + "/" + pmtT.value).then(resp => {
        alert("模拟完成")
        LunchButton.value = "开始模拟"
        disabled.value = false;
        specFile.value = JSRootPath.value + '/index.htm?nobrowser&noprogress&file=' + HttpUrl.value + '/root/result.root&item=EDep;1&opt=hist;logy'
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
        detectorSrc.value = JSRootPath.value + detecMid.value + HttpUrl.value + deteSuffix.value;
    })
}

function fwhm() {
    specFile.value = " "
    fwhmBtn.value = "展宽中..."
    axios.post(HttpUrl.value + "/g4/fwhm/" + fa.value + "/" + fb.value + "/" + fc.value).then(resp => {
        disabled.value = true;
        specFile.value = JSRootPath.value + '/index.htm?nobrowser&noprogress&file=' + HttpUrl.value + '/root/FWHM_result.root&item=EDep;1&opt=hist;logy';
        fwhmBtn.value = "高斯展宽"
        disabled.value = false;
    })
}

function originSpec() {
    specFile.value = JSRootPath.value + '/index.htm?nobrowser&noprogress&file=' + HttpUrl.value + '/root/result.root&item=EDep;1&opt=hist;logy'
}

function reSet() {
    cylinderH.value = 7.6;
    cylinderR.value = 3.8;
    reflectTT.value = 0.3;
    reflectST.value = 0.2;
    reflectMat.value = "G4_SODIUM_IODIDE";
    pmtT.value = 3;
    detectorSrc.value = JSRootPath.value + detecMid.value + HttpUrl.value + deteSuffix.value;
}
</script>