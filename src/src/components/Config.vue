<template>
  <div class="config">
    <div class="config-bar">
      <div class="title">Configuration</div>
      <div v-if="$store.state.focusedClip !== null">
        <div class="upload">
          <el-upload
            action=""
            :limit="1"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :auto-upload="false"
            :show-file-list="false"
          >
            <el-button
              class="upload-btn"
              slot="trigger"
              type="primary"
              size="small"
              >Upload data</el-button
            >

            <el-button
              type="primary"
              @click="$store.commit('left', $store.state.focusedClip)"
              size="small"
              >Left</el-button
            >
            <el-button
              type="primary"
              @click="$store.commit('right', $store.state.focusedClip)"
              size="small"
              >Right</el-button
            >
            <el-button
              type="danger"
              @click="$store.commit('deleteClip', $store.state.focusedClip)"
              size="small"
              >Delete Clip</el-button
            >
          </el-upload>
        </div>
      </div>
    </div>
    <div v-if="$store.state.focusedClip !== null">
      <div class="config-detail">
        <div v-if="$store.state.focusedClip.type === 'BarChartA'">
          <bar-chart-config-a></bar-chart-config-a>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'GeoMapA'">
          <geo-map-config-a></geo-map-config-a>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'LineChartA'">
          <line-chart-config-a></line-chart-config-a>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'PieChartA'">
          <pie-chart-config-a></pie-chart-config-a>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'BarChartB'">
          <bar-chart-config-b></bar-chart-config-b>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'GeoMapB'">
          <geo-map-config-b></geo-map-config-b>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'LineChartB'">
          <line-chart-config-b></line-chart-config-b>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'PieChartB'">
          <pie-chart-config-b></pie-chart-config-b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChartConfigA from "@/components/BarChartConfigA.vue";
import GeoMapConfigA from "@/components/GeoMapConfigA.vue";
import LineChartConfigA from "@/components/LineChartConfigA.vue";
import PieChartConfigA from "@/components/PieChartConfigA.vue";
import BarChartConfigB from "@/components/BarChartConfigB.vue";
import GeoMapConfigB from "@/components/GeoMapConfigB.vue";
import LineChartConfigB from "@/components/LineChartConfigB.vue";
import PieChartConfigB from "@/components/PieChartConfigB.vue";
export default {
  name: "Config",
  components: {
    BarChartConfigA,
    GeoMapConfigA,
    LineChartConfigA,
    PieChartConfigA,
    BarChartConfigB,
    GeoMapConfigB,
    LineChartConfigB,
    PieChartConfigB,
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      fileList.splice(fileList.indexOf(file), 1);
    },
    handleChange(file, fileList) {
      console.log(fileList);
      const reader = new FileReader();
      reader.readAsText(file.raw);
      var vm = this;
      reader.onload = function (e) {
        var data = JSON.parse(e.target.result);
        vm.$store.commit("updateData", data);
      };
    },
    handleExceed(files, fileList) {
      var file = {
        name: files[0].name,
        percentage: 0,
        raw: files[0],
        status: "ready",
        uid: 0,
      };
      fileList.splice(0, 1);
      fileList.push(file);
      this.handleChange(file, fileList);
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 15px;
  margin-right: auto;
}
.config-bar {
  display: flex;
}
.upload {
  margin-bottom: 15px;
}
.upload-btn {
  margin-right: 15px;
}
.config-detail {
  height: calc(100vh - 580px);
  overflow: auto;
  margin-bottom: 20px;
}
.config >>> .el-form > :last-child {
  margin-bottom: 0 !important;
}
</style>