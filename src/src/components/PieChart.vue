<template>
  <div class="pie-chart" :id="id">
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'PieChart',
  data() {
    return {
      svgWidth: 250,
      svgHeight: 250,
    };
  },
  props: {
    clip: Object,
    id: String
  },
  methods: {
    generateArc() {
      var w = this.svgWidth;
      var h = this.svgHeight;
      var data = this.clip.data;
      var config = this.clip.config; 
      d3.select(`#${this.id}`).select('svg').remove();
      const svg = d3
        .select(`#${this.id}`)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      const sortedGDP = data.values.sort((a, b) => (a.value > b.value ? 1 : -1));
      const color = d3.scaleOrdinal(d3.schemeDark2);

      const max_gdp = d3.max(sortedGDP, o => o.value);

      const angleScale = d3
        .scaleLinear()
        .domain([0, max_gdp])
        .range([0, config.range / 180.0 * Math.PI]);

      const arc = d3
        .arc()
        .innerRadius((d, i) => (i + 1) * 15)
        .outerRadius((d, i) => (i + 2) * 15)
        .startAngle(angleScale(0))
        .endAngle(d => angleScale(d.value));

      const g = svg.append("g");

      g.selectAll("path")
        .data(sortedGDP)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#FFF")
        .attr("stroke-width", "1px")
        .transition() //开启过渡效果
        .delay(function (d, i) {
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          return config.delay * i;
        })
        .duration(config.duration) //执行动画的时间--毫秒
        .transition() //启动过渡
        .attr("opacity",config.opacity / 10.0);
        //.ease(d3.easeBounceIn)



      g.selectAll("text")
        .data(data.values)
        .enter()
        .append("text")
        .text(d => `${d.country} -  ${d.value} Trillion`)
        .attr("x", -120)
        .attr("dy", -4)
        .attr("y", (d, i) => -(i + 1) * 15)
        .attr("font-size", "12px")
      g.attr("transform", "translate(125, 125)");
    },
  },
    mounted() {
    this.generateArc();
  },
  watch: {
    clip: {
      deep: true,
      handler() {
        console.log(this.clip);
        this.generateArc();
      },
    },
  },
};
</script>

<style scoped>
.pie-chart {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}
</style>