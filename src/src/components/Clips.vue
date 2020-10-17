<template>
  <div class="clips">
    My Clips
    <div id="map"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Clips',
  mounted() {
    //this.generateArc();
    this.generateMap();
  },
  methods: {
    generateMap(){
      let width = 550;
      let height = 420
let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)")

let projection = d3.geoMercator()
    .center([104, 38])
    .scale(500)
    .translate([width / 2, height / 2])

let path = d3.geoPath()
    .projection(projection)

d3.json("data/china.json").then((geojson) => {
    svg.append("path")
        .attr("d", path(geojson))
        .attr('fill', 'Lavender')
        .attr("stroke", "DarkGrey")
        .attr("stroke-width", 1)
})
  }
},
}

</script>

<style scoped>
</style>
