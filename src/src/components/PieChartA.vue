<template>
  <div class="pie-chart-a" :id="id"></div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "PieChartA",
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
      var scale = width / 250;
      const svg = root
        //.select(`#${this.id}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#fff");
      var arr = Array.from(data.values);
      const sortedGDP = arr.sort((a, b) => (a.value > b.value ? 1 : -1));
      //const color = d3.scaleOrdinal(d3.schemeDark2);

      const max_gdp = d3.max(sortedGDP, (o) => o.value);
      const color = ["#F08080","#FFFF66","#ADFF2F","#87CEFA","#7B68EE"]
      const angleScale = d3
        .scaleLinear()
        .domain([0, max_gdp])
        .range([0, (config.range / 180.0) * Math.PI]);

      const arc = d3
        .arc()
        .innerRadius((d, i) => (i + 1) * scale * 15)
        .outerRadius((d, i) => (i + 2) * scale * 15)
        .startAngle(angleScale(0))
        .endAngle((d) => angleScale(d.value));

      const g = svg.append("g");

      g.selectAll("path")
        .data(sortedGDP)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color[i])
        .attr("stroke", "#FFF")
        .attr("stroke-width", config.strokewidth + "px")
        .transition() //开启过渡效果
        .delay(function (d, i) {
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          return config.delay * i;
        })
        .duration(config.duration) //执行动画的时间--毫秒
        .transition() //启动过渡
        .attr("opacity", config.opacity / 10.0);
      //.ease(d3.easeBounceIn)

      var temp = config.fontsize * scale;
      g.selectAll("text")
        .data(arr)
        .enter()
        .append("text")
        .text((d) => `${d.country} -  ${d.value} `)
        .attr("dx", -80 * scale)
        .attr("dy", -4 * scale)
        .attr("y", (d, i) => -(i + 1) * scale * 15)
        .attr("font-size", temp + "px");
      svg
        .append("g")
        .append("text")
        .attr("fill", "#000")
        .attr("font-size", 12 * scale + "px")
        .attr("font-weight", "700")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", 15 * scale)
        .text(config.title);
      g.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      return this.getDuration(data, config);
    },
    getDuration(data, config) {
      return config.delay * data.values.length + config.duration * 2;
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
.pie-chart-a {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}
</style>