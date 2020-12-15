<template>
  <div class="geo-map-config-1">
    <el-form label-width="80px" :model="config">
      <el-form-item label="delay">
        <el-input v-model.number="config.delay"></el-input>
      </el-form-item>
      <el-form-item label="duration">
        <el-input v-model.number="config.duration"></el-input>
      </el-form-item>
      <el-form-item label="size">
        <el-input v-model.number="config.size"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'GeoMapConfig_1',
  computed: {
    config: function() {
      return this.$store.state.focusedClip.config;
    }
  }
}
</script>

<style scoped>
</style>