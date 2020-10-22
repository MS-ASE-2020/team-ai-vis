<template>
  <div class="line-chart">
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'LineChart',
  data() {
    return {
      dataset:[11,35,23,78,55,18,98,100,22,65],
      gdp: [
        { country: "USA", value: 90 },
        { country: "China", value: 13.4 },
        { country: "Germany", value: 4.0 },
        { country: "Japan", value: 4.9 },
        { country: "France", value: 2.8 }
      ]
    };
  },
  mounted() {
    this.generateLine();
  },
  methods: {
    generateLine() {
      //定义画布
      var width=500;
      var height=500;
  
      var svg=d3.select("line-chart")
                .append("svg")
                .attr("width",width)
                .attr("height",height);
    //   //定义内边距
    var padding={left:20,right:20,top:10,bottom:10};
     
     //数据
    //  var this.dataset=[11,35,23,78,55,18,98,100,22,65]
     //定义比例尺
     var xscale=d3.scaleLinear()
                  .domain([0,this.dataset.length-1])
                  .range([0,width-padding.left-padding.right])
     var yscale=d3.scaleLinear()
                  .domain([0,d3.max(this.dataset)])
                  .range([height-padding.top-padding.bottom,0])
    //绘制坐标轴
     var xAxis=d3.axisBottom()
                 .scale(xscale)
                 
     var yAxis=d3.axisLeft()
                 .scale(yscale)

    d3.select("svg")
      .append("g")
      .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
      .call(xAxis)
      .attr("class","axis")
      
     d3.select("svg")
      .append("g")
      .attr("transform","translate("+padding.left+","+padding.top+")")
      .call(yAxis)
      .attr("class","axis")
 
     
     //绘制图形
     var line_generator=d3.line()
                          .x(function(d,i){
                              return xscale(i)//x轴的点用数据下标表示
                         })
                          .y(function(d){
                              return yscale(d)
                         });
                          //.interpolate("linear")
     var g=svg.append("g")
             .attr("transform","translate("+padding.left+","+padding.top+")")
 
     
     g.append("path")
       .attr("d",line_generator(this.dataset))
       .attr('stroke', 'black')
       .attr('stroke-width', 1)
       .attr("fill","none")
    }
  }
};



</script>

<style scoped>
</style>