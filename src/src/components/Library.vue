<template>
  <div class="library">
    Clips Library
    <el-col>
      <el-row>
        <el-button type="primary" @click="$router.push('barchart').catch(err => err)">BarChart</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$router.push('geomap').catch(err => err)">GeoMap</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$router.push('linechart').catch(err => err)">LineChart</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$router.push('piechart').catch(err => err)">PieChart</el-button>
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