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
      gdp: [
        { country: "USA", value: 20 },
        { country: "China", value: 13.4 },
        { country: "Germany", value: 4.0 },
        { country: "Japan", value: 4.9 },
        { country: "France", value: 2.8 }
      ]
    };
  },
  props: {
    clip: Object,
    id: String
  },
  mounted() {
    this.generateArc();
  },
  methods: {
    generateArc() {
      const w = "250px";
      const h = "250px";

      const svg = d3
        .select(`#${this.id}`)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1));
      const color = d3.scaleOrdinal(d3.schemeDark2);

      const max_gdp = d3.max(sortedGDP, o => o.value);

      const angleScale = d3
        .scaleLinear()
        .domain([0, max_gdp])
        .range([0, 1.5 * Math.PI]);

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
        .on("mouseenter", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 0.5);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 1);
        });

      g.selectAll("text")
        .data(this.gdp)
        .enter()
        .append("text")
        .text(d => `${d.country} -  ${d.value} Trillion`)
        .attr("x", -120)
        .attr("dy", -4)
        .attr("y", (d, i) => -(i + 1) * 15)
        .attr("font-size", "12px");

      g.attr("transform", "translate(125, 125)");
    }
  }
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