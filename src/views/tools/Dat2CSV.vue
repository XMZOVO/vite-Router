<template >
    <div class="inline-flex rounded-lg shadow-lg w-full sm:w-1/2 md:w-2/5 mx-auto">
        <div class="mx-auto space-y-2 my-8 ">
            <p>能量区间(MeV)</p>
            <div class="flex flex-row">
                <span class="w-20 flex-auto">
                    <input v-model="st" class=" hover:border-main-active w-full border-2 rounded-md px-2" />
                </span>
                <p class="flex-auto text-center">-</p>
                <span class="w-20 flex-auto">
                    <input v-model="ed" class=" hover:border-main-active w-full border-2 rounded-md px-2" />
                </span>
            </div>
            <p>道址数</p>
            <input v-model="chl" class="rounded-md border-2 hover:border-main-active w-full px-2"/>
            <div class="flex justify-between pt-4">
                <label
                    class="border-2 rounded-md p-2 text-sm text-main-unactive hover:border-main-active hover:text-main-active"
                >
                    点击上传
                    <el-upload
                        drag
                        action=""
                        multiple
                        tip="haha"
                        :on-success="onSuccess"
                        :before-upload="beforeUp"
                        ref="upload"
                        class="hidden"
                    ></el-upload>
                </label>
                <button
                    class="border-2 rounded-md p-2 text-sm text-main-unactive hover:border-main-active hover:text-main-active"
                    @click="convert2Csv"
                >开始转换</button>
            </div>
        </div>
    </div>

    <!-- <div class="max-w-md mx-auto bg-white rounded-xl shadow-md flex">
        <div class="md:flex">
            <div class="flex-shrink-0">
                <div class="p-7">
                    <p class="uppercase tracking-wide text-sm font-semibold mb-2">能量区间(MeV)</p>
                    <div class="flex-auto flex items-baseline mb-2">
                        <el-input v-model="st" placeholder="输入能量起" />
                        <p class="label">-</p>
                        <el-input v-model="ed" placeholder="输入能量止" />
                    </div>
                    <p class="uppercase tracking-wide text-sm font-semibold mb-2">道址数</p>
                    <div class="flex-auto flex mb-3">
                        <el-input v-model="chl" placeholder="输入道址数" />
                    </div>

                    <button
                        class="w-1/3 flex items-center justify-center rounded-md bg-white text-main-unactive mb-3 p-1 border-2 font-semibold hover:border-main-active hover:text-main-active"
                        type="submit"
                        @click="convert2Csv"
                    >开始转换</button>

                    <el-upload
                        drag
                        action="http://43.154.8.62:8080/test/upload"
                        multiple
                        tip="haha"
                        on-success="onSuccess"
                        ref="upload"
                    >
                        <el-icon class="el-icon--upload">
                            <upload-filled />
                        </el-icon>
                        <div class="el-upload__text">
                            拖拽文件或
                            <em>点击上传</em>
                        </div>
                    </el-upload>
                </div>
            </div>
        </div>
    </div>-->
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElLoading } from 'element-plus'
import axios from 'axios'
import { ref } from 'vue'

let st = ref(0)
let ed = ref(1.6)
let chl = ref(4096)
const upload = ref(null)

let filesNum = ref(0)

let loading;

function beforeUp(file) {
    // console.log(file)
}

function onSuccess(response, file, fileList) {
    // if (filesNum.value == 0) {
    //     loading = ElLoading.service({
    //         lock: true,
    //         text: '上传中',
    //         background: 'rgba(0, 0, 0, 0.7)',
    //     })
    // }
    // filesNum.value += 1;
    // if (filesNum.value == fileList.length) {
    //     filesNum.value = 0;
    //     upload.value.clearFiles();
    //     loading.close()
    // }
    alert("哈哈")
}

function convert2Csv() {
    // loading = ElLoading.service({
    //     lock: true,
    //     text: '转换中',
    //     background: 'rgba(0, 0, 0, 0.7)',
    // })

    // axios.post('http://43.154.8.62:8080/test/execute/' + st.value + '/' + ed.value + '/' + chl.value).then(resp => {
    //     loading.close()
    //     // alert("转换完成")
    //     window.location.href = "http://43.154.8.62:8080/test/download?fileName=data2csv.zip";
    //     upload.value.clearFiles();
    // })
    alert("纯纯的沙口")
}
</script>

<style scoped>
</style>

