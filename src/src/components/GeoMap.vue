<template>
  <div class="geo-map">
    <canvas width="960" height="500"></canvas>
    <el-button type="primary" @click="generateMap()">Export</el-button>
  </div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';
// import * as queue from 'd3-queue';
//import "../assets/china.json";
export default {
  name: 'GeoMap',
  mounted() {
    //this.generateArc();
    console.log('mounted');
    // this.generateMap();
  },
  methods: {
    generateMap(){
      var canvas = document.querySelector("canvas"),
          context = canvas.getContext("2d"),
          width = +canvas.width,
          height = +canvas.height;

      var projection = d3.geoOrthographic().scale(195).translate([width / 2, height / 2]).precision(0.1);

      var path = d3.geoPath().projection(projection).context(context);

      var world = require("@/assets/world-110m.json");

      var land = topojson.feature(world, world.objects.land),
          mesh = topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
          });

      var data = [],
        stream = canvas.captureStream(),
        recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

      var timer = d3.timer(function(t) {
        t = t / 3000;
        if (t < 1) {
          draw(t);
        } else {
          recorder.stop();
          timer.stop();
        }
      });

      recorder.ondataavailable = function(event) {
        if (event.data && event.data.size) {
          data.push(event.data);
        }
      };

      recorder.onstop = () => {
        var url = URL.createObjectURL(new Blob(data, { type: "video/webm" }));
        d3.select("canvas").remove();
        d3.select(".geo-map")
          .append("video")
          .attr("src", url)
          .attr("controls", true)
          .attr("autoplay", true);
        d3.select(".geo-map")
          .append("a")
          .attr("href", url)
          .attr("download", "video.webm")
          .text("Click here to download the file");
      };

      recorder.start();

      function draw(t) {
        projection.rotate([360 * t]);

        context.lineWidth = 1;

        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, height);

        context.strokeStyle = "#222";
        context.beginPath();
        path({ type: "Sphere" });
        context.stroke();

        context.fillStyle = "#222";
        context.beginPath();
        path(land);
        context.fill();

        context.strokeStyle = "#fff";
        context.beginPath();
        path(mesh);
        context.stroke();
      }
    }
  },
};    

</script>
<style scoped>
</style>