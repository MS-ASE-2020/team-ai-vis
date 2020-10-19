<template>
  <div class="geo-map">
  </div>
</template>

<script>
import * as d3 from 'd3';
//import "../assets/china.json";
export default {
  name: 'GeoMap',
  mounted() {
    //this.generateArc();
    this.generateMap();
  },
  methods: {
    generateMap(){
      let width = 550;
      let height = 420;
      let svg = d3.select(".geo-map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)")

      let projection = d3.geoMercator()
    .center([104, 38])
    .scale(500)
    .translate([width / 2, height / 2])

      let path = d3.geoPath().projection(projection)
      var mapData = require("@/assets/china.json");
      console.log(mapData);
    
      console.log(mapData);
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
</style>