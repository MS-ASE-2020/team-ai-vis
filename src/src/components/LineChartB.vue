<template>
  <div class="line-chart-b" :id="id"></div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "LineChartB",
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
      var max = d3.max(data.values, function (d) {
        return d[1];
      });
      var max1 = d3.max(data.values, function (d) {
        return d[0];
      });

      var linearcolor = d3.scaleLinear().domain([0, max]).range([0, 1]);

      var a = d3.rgb(255, 250, 200); //红色
      var b = d3.rgb(200, 0, 0); //绿色
      var compute = d3.interpolate(a, b);

      var padding = { top: 50, right: 50, bottom: 50, left: 50 };
      var xScale = d3
        .scaleLinear()
        .domain([1, max1])
        .range([0, width - padding.left - padding.right]);
      var yScale = d3
        .scaleLinear()
        .domain([0, max])
        .range([height - padding.top - padding.bottom, 0]);

      var svg = root.append("svg").attr("width", width).attr("height", height);
      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#fff");
      var xAxis = d3.axisBottom().scale(xScale);
      var yAxis = d3.axisLeft().scale(yScale);
      //const color = d3.scaleOrdinal(d3.schemeDark2);
      svg
        .append("g")
        .attr("class", "axis")
        .attr(
          "transform",
          "translate(" + padding.left + "," + (height - padding.bottom) + ")"
        )
        .call(xAxis);
      svg
        .append("g")
        .attr("class", "axis")
        .attr(
          "transform",
          "translate(" + padding.left + "," + padding.top + ")"
        )
        .call(yAxis);

      var linePath = d3
        .line()
        .x(function (d) {
          return xScale(d[0]);
        })
        .y(function (d) {
          return yScale(d[1]);
        });
      svg
        .append("g")
        .append("path")
        .attr("class", "line-path")
        .attr(
          "transform",
          "translate(" + padding.left + "," + padding.top + ")"
        )
        .transition() //开启过渡效果
        .delay(function (d, i) {
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          return config.delay * (i + 1);
        })
        .duration(config.duration) //执行动画的时间--毫秒
        .attr("d", linePath(data.values))
        .attr("fill", "none")
        .attr("stroke-width", config.strokewidth)
        .attr("stroke", "black");
      var scale = width / 250;
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
      svg
        .append("g")
        .selectAll("circle")
        .data(data.values)
        .enter()
        .append("circle")
        .attr("r", 0)
        .attr("transform", function (d) {
          return (
            "translate(" +
            (xScale(d[0]) + padding.left) +
            "," +
            (yScale(d[1]) + padding.top) +
            ")"
          );
        })
        .transition() //开启过渡效果
        .delay(function (d, i) {
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          return config.delay * (i + 1);
        })
        .duration(config.duration) //执行动画的时间--毫秒
        .attr("r", config.dotsize)
        .attr("transform", function (d) {
          return (
            "translate(" +
            (xScale(d[0]) + padding.left) +
            "," +
            (yScale(d[1]) + padding.top) +
            ")"
          );
        })
        .style("fill", function (d) {
          return compute(linearcolor(d[1]));
        });

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
.line-chart-b {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}
.line {
  position: absolute;
  top: 0;
  border: 10px solid #d7dae2;
}
</style>