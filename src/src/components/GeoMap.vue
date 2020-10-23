<template>
  <div class="geo-map">
    <svg width="960" height="500"></svg>
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
    this.generateMap();
  },
  methods: {
    async generateMap(){
      var svg = d3.select("svg"),
          canvas = document.createElement("canvas"),
          width = canvas.width = +svg.attr("width"),
          height = canvas.height = +svg.attr("height"),
          context = canvas.getContext("2d");

      var projection = d3.geoOrthographic()
        .scale(195)
        .translate([width / 2, height / 2])
        .precision(0.1);

      var path = d3.geoPath().projection(projection);

      var world = require("@/assets/world-110m.json");

      var data = [],
        stream = canvas.captureStream(),
        recorder = new MediaRecorder(stream, { videoBitsPerSecond: 10*1920*1080, mimeType: "video/webm; codecs=H264" });

      recorder.ondataavailable = function(event) {
        if (event.data && event.data.size) {
          data.push(event.data);
        }
      };

      recorder.onstop = () => {
        var url = URL.createObjectURL(new Blob(data, { type: "video/webm" }));
        d3.selectAll("canvas, svg").remove();
        d3.select(".geo-map")
          .append("video")
          .attr("src", url)
          .attr("controls", true)
          .attr("autoplay", true);
        d3.select(".geo-map")
          .append("a")
          .attr("href", url)
          .attr("download", "video.mp4")
          .text("Click here to download the file");
      };

      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#fff");

      svg.append("path")
        .datum({ type: "Sphere" })
        .attr("stroke", "#222")
        .attr("fill", "none");

      svg.append("path")
        .datum(topojson.feature(world, world.objects.land))
        .attr("fill", "#222")
        .attr("stroke", "none");

      svg.append("path")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
          return a !== b;
        }))
        .attr("fill", "none")
        .attr("stroke", "#fff");

      
      // 并发数为1
      // var queue = d3.queue(1);
      // var promises = [];



      // d3.range(120).forEach(function(frame){
      //   console.lgo(frame);
      //   // task, args
      //   // queue.defer(drawFrame, frame / 120);

      // });

      let frames = [];

      for(let i = 0; i < 120; i++) {
        let frame = await new Promise((resolve) => {
          projection.rotate([360 * i / 120]);
          svg.selectAll('path').attr('d', path);

          var img = new Image(),
              serialized = new XMLSerializer().serializeToString(svg.node()),
              url = URL.createObjectURL(new Blob([serialized], {type: "image/svg+xml"}));

          img.onload = function(){
            resolve(img);
          };

          img.src = url;

          });

        frames.push(frame);
      }

      recorder.start();
      drawFrame();

      function drawFrame() {
        if (frames.length) {
          context.drawImage(frames.shift(), 0, 0, width, height);
          requestAnimationFrame(drawFrame);
        } else {
          recorder.stop();
        }
      }

      // queue.awaitAll(function(err, frames){
      //   recorder.start();
      //   drawFrame();

      //   function drawFrame() {
      //     if (frames.length) {
      //       context.drawImage(frames.shift(), 0, 0, width, height);
      //       requestAnimationFrame(drawFrame);
      //     } else {
      //       recorder.stop();
      //     }
      //   }
      // });

      // async function drawFrame(t, cb) {
      //   projection.rotate([360 * t]);
      //   svg.selectAll("path").attr("d", path);

      //   var img = new Image(),
      //       serialized = new XMLSerializer().serializeToString(svg.node()),
      //       url = URL.createObjectURL(new Blob([serialized], {type: "image/svg+xml"}));

      //   img.onload = function(){
      //     cb(null, img);
      //   };

      //   img.src = url;

      // }
    },
  },
};    

</script>
<style scoped>
</style>