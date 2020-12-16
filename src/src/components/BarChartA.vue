<template>
  <div class="bar-chart-a" :id="id">
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "BarChartA",
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
      root.select('svg').remove();
      //let barWidth = width / data.values.length;
      
      //var ascendvalue=Array.from(data.values);
      //ascendvalue.sort(d3.ascending)
      // var descendvalue=data.values
      // descendvalue.sort(d3.descending)
      var scale = width / 250;
      var temp = config.fontsize *scale;
      var padding = {left:40, right:40, top:40, bottom:40};
      var b = d3.rgb(0,0,100);	//红色
      var a = d3.rgb(0,100,255);	//绿色
      var compute = d3.interpolate(a,b);
      var linearcolor = d3.scaleLinear()
				.domain([d3.min(data.values),d3.max(data.values)])
				.range([0,1]);
      let svg = root
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data.values)])
        .range([height - padding.top - padding.bottom, 0]);
      var min = yScale.domain()[0]
      let xScale =d3
        .scaleBand()
        .domain(d3.range(data.values.length))
        .range([0,width - padding.left - padding.right]);
      
      //定义x轴
      var xAxis = d3.axisBottom()
        .scale(xScale)
        
      //定义y轴
      var yAxis = d3.axisLeft()
        .scale(yScale)
  
      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#fff");
      svg
        .selectAll("rect.bar")
        .data(data.values)
        //.data(ascendvalue)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", (d, i) => xScale(i) + config.barPadding/2)
        .attr("height", 0)
        .attr("y",yScale(min))
        .style("position","relative")
        //.style("bottom","0px")
        .attr("width", xScale.bandwidth() - config.barPadding)
      
        .transition() //开启过渡效果
        .delay(config.delay) 
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          //return config.delay * (i+1);
          //return config.delay;
        //})
        .duration(config.duration) //执行动画的时间--毫秒
        //.ease(d3.easeBounceIn)
        .attr("y", (d) => yScale(d))
        .style("position","relative")
        //.style("bottom","0px")
        .attr("height", (d) => height - padding.top - padding.bottom - yScale(d))
        .attr("width", xScale.bandwidth() - config.barPadding)
        //.attr("fill", config.bar.beginColor) //初始颜色为红色
        //.transition() //启动过渡
        .style("position","relative")
        .style("bottom","100px")
        //.attr("fill", config.bar.endColor) //终止颜色为铁蓝色
        .attr("opacity",config.opacity / 10.0)
        .style("fill",function(d){
					return compute(linearcolor(d));
				});
      svg
        .selectAll("text")
        .data(data.values)
        //.data(ascendvalue)
        .enter()
        .append("text")
        .attr("font-size", (temp)+"px")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x",(d,i)=>xScale(i) + config.barPadding/2)
        .attr("y",yScale(min))
        .transition() //开启过渡效果
        .delay(config.delay) 
          //指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒
          //return config.delay * (i+1);
        //})
        .duration(config.duration) //执行动画的时间--毫秒
        .text((d) => d)
        .attr("font-size", (temp)+"px")
        .attr("y", (d) => yScale(d) + 20)
        .attr("x",(d,i)=>xScale(i) + config.barPadding/2)
        //.attr("fill", config.text.beginColor) //初始颜色为红色
        //.transition() //启动过渡
        .attr("fill", config.text.endColor); //终止颜色为铁蓝色
      //添加x轴
      svg
        .append("g")
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
        .call(xAxis); 
      //添加y轴
      svg
        .append("g")
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .call(yAxis);
      svg.append('g')
      .append("text")
      .attr('fill', '#000')
      .attr('font-size', 12 * scale +'px')
      .attr('font-weight', '700')
      .attr('text-anchor', 'middle')
      .attr('x', width/2)
      .attr('y', 20)
        .text(data.title)
      var duration = config.delay * data.values.length + config.duration * 2;
      return duration;
    }
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
.bar-chart-a {
  height: 250px;
  width: 250px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
}
.bar{
  position: absolute;
  top:0;
  border: 10px solid #d7dae2;
}
</style>
