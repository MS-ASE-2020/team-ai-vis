<template>
  <div class="pie-chart-config-a">
      <el-form label-width="80px" :model="config">
        <el-form-item label="title">
        <el-input v-model="config.title"></el-input>
      </el-form-item>
      <el-form-item label="delay">
        <el-input v-model.number="config.delay"></el-input>
      </el-form-item>
      <el-form-item label="duration">
        <el-input v-model.number="config.duration"></el-input>
      </el-form-item>
      <el-form-item label="range">
        <el-input v-model.number="config.range"></el-input>
      </el-form-item>
      <el-form-item label="opacity">
        <el-input v-model.number="config.opacity"></el-input>
      </el-form-item>
      <el-form-item label="fontsize">
        <el-input v-model.number="config.fontsize"></el-input>
      </el-form-item>
       <el-form-item label="stroke">
        <el-input v-model.number="config.strokewidth"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'PieChartConfigA',
  computed: {
    config: function() {
      return this.$store.state.focusedClip.config;
    }
  }
}
</script>

<style scoped>
</style>