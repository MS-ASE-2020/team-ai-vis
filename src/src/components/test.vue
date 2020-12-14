<template>
  <div class="line-chart" :id="id">
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'LineChart',
  data () {
    return {
      dataset: [100, 80, 78, 98, 93, 82],
      svgWidth: 250,
      svgHeight: 250,
      barPadding: 0
    }
  },
  props: {
    clip: Object,
    id: String
  },
  methods: {
    initChart () {
      var dataset = [[1, 224], [2, 528], [3, 756], [4, 632], [5, 582], [6, 704],
              [7, 766], [8, 804], [9, 884], [10, 960], [11, 1095], [12, 1250]];


var max = d3.max(dataset, function(d) {
  return d[1];
})
// 图表的宽度和高度
var width = 250;
var height = 250;
// 预留给轴线的距离
var padding = { top: 50, right: 50, bottom: 50, left: 50 };

var xScale = d3.scaleLinear()
              .domain([1, 12])
              .range([0, width - padding.left - padding.right]);
var yScale = d3.scaleLinear()
              .domain([0, max])
              .range([height - padding.top - padding.bottom, 0]);

var svg = d3.select(`#${this.id}`)
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px');
var xAxis = d3.axisBottom()
              .scale(xScale);
var yAxis = d3.axisLeft()
              .scale(yScale);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
  .call(xAxis);
svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
  .call(yAxis);

var linePath = d3.line()
                .x(function(d){ return xScale(d[0]) })
                .y(function(d){ return yScale(d[1]) });
svg.append('g')
  .append('path')
  .attr('class', 'line-path')
  .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
  .attr('d', linePath(dataset))
  .attr('fill', 'none')
  .attr('stroke-width', 3)
  .attr('stroke', 'green');

svg.append('g')
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('r', 5)
  .attr('transform', function(d){
    return 'translate(' + (xScale(d[0]) + padding.left) + ',' + (yScale(d[1]) + padding.top) + ')'
  })
  .attr('fill', 'green');





      console.log(xAxis)


    }
  },
  mounted () {
    this.initChart()
  }
}
</script>
 
<style scoped>
 .line-chart {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}
</style>






