<template>
  <div class="linechart">
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Linechart',
  data () {
    return {
      dataset: [[1, 224], [2, 528], [3, 756], [4, 632], [5, 582], [6, 704],
              [7, 766], [8, 804], [9, 884], [10, 960], [11, 1095], [12, 1250]],
      svgWidth: 300,
      svgHeight: 250,
      barPadding: 5
    }
  },
  methods: {
    initChart () {
      
      // var min = d3.min(dataset, function(d) {
      //     return d[1];
      // })
      // var max = d3.max(dataset, function(d) {
      //     return d[1];
      // })
      let xScale = d3.scaleLinear()
              .domain([1, ])
              .range([0,this.svgWidth]);
      
      let yScale = d3.scaleLinear()
        .domain([0, d3.max(this.dataset)])
        .range([this.svgHeight,0])

      const svg = d3.select(".linechart")
        .append("svg")
        .attr('width', this.svgWidth)
        .attr('height', this.svgHeight)

      
      let xAxis = d3.axisBottom()
              .scale(xScale);
      let yAxis = d3.axisLeft()
              .scale(yScale);
      var padding = { top: 0, right: 0, bottom: 0, left: 0 };

      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + (this.svgHeight - padding.bottom) + ')')
        .call(xAxis);
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis);

     
      
    
  },
  mounted () {
    this.initChart()
  }
}
}
</script>

<style scoped>
</style>