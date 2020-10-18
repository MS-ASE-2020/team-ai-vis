<template>
  <div class="library">
    Clips Library
    <el-col>
      <el-row>
        <el-button type="primary" @click="$router.push('barchart')">BarChart</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$router.push('geomap')">GeoMap</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$router.push('linechart')">LineChart</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$router.push('piechart')">PieChart</el-button>
      </el-row>
    </el-col>
  </div>
</template>

<script>
</script>

<style scoped>
.el-row {
  margin: 10px 0;
}
</style>