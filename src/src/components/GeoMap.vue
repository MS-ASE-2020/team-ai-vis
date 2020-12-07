<template>
  <div class="geo-map" :id="id">
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "GeoMap",
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
      root.select('svg').remove();
      let svg = root.append("svg")
    .attr("width", width)
    .attr("height", height)
    
    var scale = width / 250
    let projection = d3.geoMercator()
    .center([104*scale,38*scale])
    .scale(250)
    .translate([width / 2, height / 2])
    let path = d3.geoPath().projection(projection)
    var mapData = require("@/assets/china.json");
    var pointData = require("@/assets/point.json")
    var point = pointData.features;
    var coo = function(d){
        var lngLat = d.geometry.coordinates;
        var coo = projection(lngLat);
        return coo;
      }
      var ss2 = d3.schemePastel2;
      var features = mapData.features;
      var size = [10,20,10,20,20,30];
      const g = svg.append("g");
      g.attr('class', 'map')
				.selectAll('.china')
        .data(features)
        //.enter()
				.join('path')
				.attr('class', 'china')
				.attr("fill", function(d, i) {
					return ss2[i % 3]
				})
				.attr('d', path);

      g.selectAll('circle')
        .data(point)
        //.enter()
				.join('circle')
				.attr("class", "point")
				.attr("cx", function(d){
					return coo(d)[0];
				})
				.attr("cy", function(d){
					return coo(d)[1];
				})
        .attr("fill", "black")
        .transition()
        .delay(function(d,i){
          return config.delay* i;
          }
        )
        .duration(
          config.duration
        )
	.attr("r", function(d,i){
          return size[i]/2;
        });
      //g.attr("transform", "translate("+(width)/2+","+(height)/2+")");
      var duration = config.delay * size.length + config.duration * 2;
      return duration;
    }
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
.geo-map {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}

</style>