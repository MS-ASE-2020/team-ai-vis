<template>
  <div class="geo-map-a" :id="id"></div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "GeoMapA",
  data() {
    return {
      svgWidth: 250,
      svgHeight: 250,
    };
  },
  props: {
    clip: Object,
    id: String,
  },
  methods: {
    initChart() {
      var root = d3.select(`#${this.id}`);
      var width = this.svgWidth;
      var height = this.svgHeight;
      var data = this.clip.data;
      var config = this.clip.config;
      this.renderClip(root, width, height, data, config);
    },
    renderClip(root, width, height, data, config) {
      root.select("svg").remove();
      let svg = root.append("svg").attr("width", width).attr("height", height);
      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#fff");
      let projection = d3
        .geoMercator()
        .center([104, 38])
        .scale(width)
        .translate([width / 2, height / 2]);
      let path = d3.geoPath().projection(projection);
      var mapData = require("@/assets/china.json");
      var pointData = data;
      var point = pointData.features;
      var coo = function (d) {
        var lngLat = d.geometry.coordinates;
        var coo = projection(lngLat);
        return coo;
      };
      var ss2 = d3.schemePastel2;
      var features = mapData.features;
      var size = pointData.size;
      console.log(size);
      const g = svg.append("g");

      g.selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", function (d, i) {
          return ss2[i % 3];
        });

      g.selectAll("circle")
        .data(point)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return coo(d)[0];
        })
        .attr("cy", function (d) {
          return coo(d)[1];
        })
        .attr("fill", config.color)
        .transition()
        .delay(function (d, i) {
          return config.delay * i;
        })
        .duration(config.duration)
        .attr("r", function (d, i) {
          return size[i] * config.size;
        });
      var scale = width / 250;
      //var temp = config.fontsize *scale;
      svg
        .append("g")
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 12 * scale + "px")
        .attr("font-weight", "700")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", 15 * scale)
        .text(config.title);
      //g.attr("transform", "translate("+(width)/2+","+(height)/2+")");
      //g.attr("transform", "translate("+(width)/2+","+(height)/2+")");

      return this.getDuration(data, config);
    },
    getDuration(data, config) {
      return config.delay * data.size.length + config.duration * 2;
    },
  },
  mounted() {
    this.initChart();
  },
  watch: {
    clip: {
      deep: true,
      handler() {
        console.log(this.clip);
        this.initChart();
      },
    },
  },
};
</script>
 
<style scoped>
.geo-map-a {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}
</style>

