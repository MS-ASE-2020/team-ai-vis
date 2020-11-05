<template>
  <div class="bar-chart" :id="id">
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "BarChart",
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
      var data = this.clip.data;
      var config = this.clip.config;

      let barWidth = this.svgWidth / data.values.length;

      d3.select(`#${this.id}`).select('svg').remove();

      let svg = d3
        .select(`#${this.id}`)
        .append("svg")
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight);

      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data.values)])
        .range([this.svgHeight - 20, 0]);

      svg
        .selectAll("rect")
        .data(data.values)
        .enter()
        .append("rect")
        .attr("x", (d, i) => barWidth * i)
        .attr("height", "0")
        .attr("width", "0") //矩形的宽，过渡动画前
        .transition() //开启过渡效果
        .delay(function (d, i) {
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          return config.delay * i;
        })
        .duration(config.duration) //执行动画的时间--毫秒
        //.ease(d3.easeBounceIn)
        .attr("y", (d) => yScale(d))
        .attr("height", (d) => this.svgHeight - yScale(d))
        .attr("width", barWidth - config.barPadding)
        .attr("fill", config.bar.beginColor) //初始颜色为红色
        .transition() //启动过渡
        .attr("fill", config.bar.endColor); //终止颜色为铁蓝色

      svg
        .selectAll("text")
        .data(data.values)
        .enter()
        .append("text")
        .transition() //开启过渡效果
        .delay(function (d, i) {
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          return config.delay * i;
        })
        .duration(config.duration) //执行动画的时间--毫秒
        .text((d) => d)
        .attr("y", (d) => yScale(d) + 20)
        .attr("x", (d, i) => barWidth * i)
        .attr("fill", config.text.beginColor) //初始颜色为红色
        .transition() //启动过渡
        .attr("fill", config.text.endColor); //终止颜色为铁蓝色
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
.bar-chart {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}
</style>