<template>
  <div class="geo-map-config-b">
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
      <el-form-item label="size">
        <el-input v-model.number="config.size"></el-input>
      </el-form-item>
      <el-form-item label="color">
        <el-input v-model="config.color"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "GeoMapConfigB",
  computed: {
    config: function () {
      return this.$store.state.focusedClip.config;
    },
  },
};
</script>

<style scoped>
</style>