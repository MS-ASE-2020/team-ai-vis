<template>
  <div>
    <svg class="bar-chart"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'BarChart',
  data () {
    return {
      dataset: [100, 80, 78, 98, 93, 82],
      svgWidth: 500,
      svgHeight: 300,
      barPadding: 5
    }
  },
  methods: {
    initChart () {
      let barWidth = (this.svgWidth / this.dataset.length)
      let svg = d3.select('svg')
        .attr('width', this.svgWidth)
        .attr('height', this.svgHeight)
 
      let yScale = d3.scaleLinear()
        .domain([0, d3.max(this.dataset)])
        .range([0, this.svgHeight - 20])
 
      let barChart = svg.selectAll('rect')
        .data(this.dataset)
        .enter()
        .append('rect')
        .attr('y', d => this.svgHeight - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', barWidth - this.barPadding)
        .attr('transform', (d, i) => {
          let translate = [ barWidth * i, 0 ]
          return 'translate(' + translate + ')'
        })
        .attr('fill', '#566fde')
 
      let text = svg.selectAll('text')
        .data(this.dataset)
        .enter()
        .append('text')
        .text(d => d)
        .attr('y', d => this.svgHeight - yScale(d) - 2)
        .attr('x', (d, i) => barWidth * i)
        .attr('fill', '#000000')
 
      console.log(barChart, text, yScale)
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>
 
<style scoped>
 
</style>