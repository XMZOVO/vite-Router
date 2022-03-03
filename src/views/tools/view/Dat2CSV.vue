<template >
    <el-upload
        class="upload-demo"
        drag
        action="http://43.154.8.62:8080/test/upload"
        multiple
        tip="haha"
    >
        <el-icon class="el-icon--upload">
            <upload-filled />
        </el-icon>
        <div class="el-upload__text">
            拖拽文件或
            <em>点击上传</em>
        </div>
        <template #tip>
            <div class="inputTotal">
                <div class="inputArea">
                    <div class="label">能量区间(MeV)</div>
                    <el-input class="input" v-model="st" placeholder="输入能量起" />
                    <div class="label1">-</div>
                    <el-input class="input" v-model="ed" placeholder="输入能量止" />
                </div>
                <div class="inputArea">
                    <div class="label">道址</div>
                    <el-input class="input" v-model="chl"></el-input>
                </div>
            </div>
            <el-button class="bubbly-button" @click="convert2Csv">开始转换</el-button>
        </template>
    </el-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElLoading } from 'element-plus'
import axios from 'axios'
import { ref } from 'vue'

let st = ref(0)
let ed = ref(1.6)
let chl = ref(4096)



let loading;

function convert2Csv() {
    loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    axios.post('http://43.154.8.62:8080/test/execute/' + st.value + '/' + ed.value + '/' + chl.value).then(resp => {
        loading.close()
        // alert("转换完成")
        window.location.href = "http://43.154.8.62:8080/test/download?fileName=data2csv.zip";
    })
}
</script>

<style scoped>
.inputArea {
    text-align: center;
    display: flex;
    /* align-items: center; */
    /* overflow-x: auto; */
    margin-bottom: 1rem;
    margin-top: 1rem;

    align-items: center;
}

.inputArea .label {
    margin-right: 15px;
    height: 10;
    font-size: 14px;
    color: gray;
}

.inputArea .label1 {
    margin-right: 5px;
    height: 10;
    color: gray;
    font-size: 14px;
}


.input {
    max-width: 115px;
    margin-right: 5px;
}

</style>
