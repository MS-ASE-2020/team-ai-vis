<template>
  <div class="pie-chart-b" :id="id"></div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "PieChartB",
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
      var pie = d3.pie();

      var arr = Array.from(data.values);
      //console.log(arr.value)
      //var arr = [30,20,30,20];
      var names = Array.from(data.names);
      var pieData = pie(arr);
      console.log(pieData);
      var outerRadius = 90 * scale; // 外半径
      var innerRadius = 45 * scale; // 内半径，为0则中间没有空白

      var arc = d3
        .arc() // 弧生成器
        .innerRadius(innerRadius) // 设置内半径
        .outerRadius(outerRadius);
      var arcs = svg
        .selectAll("g")
        .data(pieData)
        .enter()
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");
      var color = d3.scaleOrdinal(d3.schemeDark2);
      // 有十种颜色的颜色比例尺

      arcs
        .append("path")
        .transition() //开启过渡效果
        .delay(function (d, i) {
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          return config.delay * i;
        })
        .duration(config.duration) //执行动画的时间--毫秒     // 给每个分组添加分组元素
        .attr("fill", function (d, i) {
          // 每段圆弧分配不同的颜色
          return color(i);
        })
        .attr("d", function (d) {
          // 调用弧生成器，得到路径值
          return arc(d);
        });
      arcs
        .append("text")
        .transition() //开启过渡效果
        .delay(function (d, i) {
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          return config.delay * i;
        })
        .duration(config.duration)
        .attr("transform", function (d) {
          // 注意这里直接传入整个数据对象就行了
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .attr("font-size", scale * config.fontsize + "px") // 相对于text元素的中心点，将内容居中
        .text(function (d, i) {
          return names[i] + " " + d.data;
        }); // 设置外半径
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
      //g.attr("transform", "translate("+(width)/2+","+(height)/2+")");
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
.pie-chart-b {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}
</style>