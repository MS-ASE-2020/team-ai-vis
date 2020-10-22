<template>
  <div class="bar-chart">
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'BarChart',
  data () {
    return {
      dataset: [100, 80, 78, 98, 93, 82],
      svgWidth: 300,
      svgHeight: 250,
      barPadding: 5
    }
  },
  methods: {
    initChart () {
      let barWidth = (this.svgWidth / this.dataset.length)
      let svg = d3.select(".bar-chart")
        .append("svg")
        .attr('width', this.svgWidth)
        .attr('height', this.svgHeight)
 
      let yScale = d3.scaleLinear()
        .domain([0, d3.max(this.dataset)])
        .range([this.svgHeight - 20,0])
       
      let barChart = svg.selectAll('rect')
        .data(this.dataset)
        .enter()
        .append('rect')
        .attr('x', (d, i) => barWidth * i)
        .attr('height', "0")
        .attr("width","0") //矩形的宽，过渡动画前
        .transition()   //开启过渡效果
        .delay(function(d,i){ //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
            return 200*i;
      })    
        .duration(1000) //执行动画的时间--毫秒
        //.ease(d3.easeBounceIn)
        .attr('y', d =>yScale(d))
        .attr('height', d => this.svgHeight - yScale(d))
        .attr('width', barWidth - this.barPadding)  
        .attr("fill","red")         //初始颜色为红色
        .transition()               //启动过渡
        .attr("fill","steelblue")   //终止颜色为铁蓝色
 
      let text = svg.selectAll('text')
        .data(this.dataset)
        .enter()
        .append('text')
        .transition()   //开启过渡效果
    
        .delay(function(d,i){ //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
            return 200*i;
        })
        .duration(1000) //执行动画的时间--毫秒
        .text(d => d)
        .attr('y', d => yScale(d) + 20)
        .attr('x', (d, i) => barWidth * i)
        .attr("fill","steelblue")         //初始颜色为红色
        .transition()               //启动过渡
        .attr("fill","red")   //终止颜色为铁蓝色
 
 
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