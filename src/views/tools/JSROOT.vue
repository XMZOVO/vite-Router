<template>
    <div>
        <div id="drawing" style="width:800px; height:600px"></div>
    </div>
</template>

<script setup type="text/javascript">

async function drawDetector() {
    const file = await JSROOT.openFile("../../../public/test.root");
    const obj = await file.readObject("Default;1");
    JSROOT.draw('drawing', obj, 'ssao;transp60');
}
drawDetector();

</script>
