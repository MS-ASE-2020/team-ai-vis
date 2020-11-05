<template>
  <div class="geo-map" :id="id">
  </div>
</template>

<script>
import * as d3 from 'd3';
//import "../assets/china.json";
export default {
  name: 'GeoMap',
  props: {
    clip: Object,
    id: String
  },
  mounted() {
    //this.generateArc();
    this.generateMap();
  },
  methods: {
    generateMap(){
      let width = 250;
      let height = 250;
      let svg = d3.select(`#${this.id}`).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)")

      let projection = d3.geoMercator()
    .center([104,38])
    .scale(250)
    .translate([width / 2, height / 2])

      let path = d3.geoPath().projection(projection)
      var mapData = require("@/assets/china.json");
      
      svg.append("path")
          .attr("d", path(mapData))
          .attr('fill', 'Lavender')
          .attr("stroke", "DarkGrey")
          .attr("stroke-width", 1)
      
      
          
}
  },
}

</script>
<style scoped>
.geo-map {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}
</style>