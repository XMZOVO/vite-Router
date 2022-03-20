<template>
    <div id="drawing" style="width:800px; height:600px"></div>
</template>

<script type="text/javascript">
let geom_file = "https://jsroot.gsi.de/files/geom/evegeoshape.json.gz",
         tracks_file = "https://jsroot.gsi.de/files/geom/eve_tracks.root";
 
     async function draw_geometry_and_tracks() {
        let obj = await JSROOT.httpRequest(geom_file, "object");
        let geo_painter = await JSROOT.draw("drawing", obj);
        let file = await JSROOT.openFile(tracks_file);
        let tracks = await file.readObject("tracks;1");
 
        // one could simply draw list of tracks
        // JSROOT.draw("drawing", tracks, "same");
 
        // or use method of TGeoPainter to draw extras
        geo_painter.drawExtras(tracks, "tracks");
     }
 
     draw_geometry_and_tracks();
</script>