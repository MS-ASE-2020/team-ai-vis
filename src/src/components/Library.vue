<template>
  <div class="library">
    Clips Library
    <el-col>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'BarChartA')"
          >BarChart A</el-button
        >
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'BarChartB')"
          >BarChart B</el-button
        >
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'GeoMapA')"
          >GeoMap A</el-button
        >
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'GeoMapB')"
          >GeoMap B</el-button
        >
      </el-row>
      <el-row>
        <el-button
          type="primary"
          @click="$store.commit('addClip', 'LineChartA')"
          >LineChart A</el-button
        >
      </el-row>
      <el-row>
        <el-button
          type="primary"
          @click="$store.commit('addClip', 'LineChartB')"
          >LineChart B</el-button
        >
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'PieChartA')"
          >PieChart A</el-button
        >
      </el-row>
      <el-row>
        <el-button type="primary" @click="$store.commit('addClip', 'PieChartB')"
          >PieChart B</el-button
        >
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