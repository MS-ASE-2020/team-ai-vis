<template>
  <div class="library">
    Clips Library
    <el-col>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'BarChart')">BarChart</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'GeoMap')">GeoMap</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'LineChart')">LineChart</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'PieChart')">PieChart</el-button>
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