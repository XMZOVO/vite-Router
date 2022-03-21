<template>
    <div>
        <div id="drawing" style="width:800px; height:600px"></div>
    </div>
</template>

<script setup type="text/javascript">

async function drawDetector() {
    var file = await JSROOT.openFile("/test.root");
    var obj = await file.readObject("Default;1");
    await JSROOT.draw('drawing', obj, 'ssao;transp60');
}
drawDetector();
console.log("hi")

</script>
