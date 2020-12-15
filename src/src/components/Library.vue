<template>
  <div class="library">
    Clips Library
    <el-col>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'BarChart_1')">BarChart-1</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'BarChart_2')">BarChart-2</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'GeoMap_1')">GeoMap-1</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'GeoMap_2')">GeoMap-2</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'LineChart_1')">LineChart-1</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'LineChart_2')">LineChart-2</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'PieChart_1')">PieChart-1</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'PieChart_2')">PieChart-2</el-button>
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