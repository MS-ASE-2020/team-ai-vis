<template>
  <div class="config">
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
          :show-file-list="false">
          <el-button slot="trigger" type="primary" size="small">Upload data</el-button>
          
          <el-button id="dir" type="primary" @click="$store.commit('left', $store.state.focusedClip)" size="small">Left</el-button>
          <el-button id="dir" type="primary" @click="$store.commit('right', $store.state.focusedClip)" size="small">Right</el-button>
          <el-button id="warn" type="primary" @click="$store.commit('deleteClip', $store.state.focusedClip)" size="small">Delete Clip</el-button>
        </el-upload>
      </div>
      <div class="config-detail">
        <div v-if="$store.state.focusedClip.type === 'BarChart'">
          <bar-chart-config></bar-chart-config>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'GeoMap'">
          <geo-map-config></geo-map-config>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'LineChart'">
          <line-chart-config></line-chart-config>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'PieChart'">
          <pie-chart-config></pie-chart-config>
        </div>
      
      </div>
      
    </div>
  </div>
</template>

<script>
import BarChartConfig from '@/components/BarChartConfig.vue';
import GeoMapConfig from '@/components/GeoMapConfig.vue';
import LineChartConfig from '@/components/LineChartConfig.vue';
import PieChartConfig from '@/components/PieChartConfig.vue';
export default {
  name: 'Config',
  components: {
    BarChartConfig,
    GeoMapConfig,
    LineChartConfig,
    PieChartConfig
  },
  data() {
    return {
      fileList: []
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
        vm.$store.commit('updateData', data);
      };
    },
    handleExceed(files, fileList) {
      var file = {
        name: files[0].name,
        percentage: 0,
        raw: files[0],
        status: 'ready',
        uid: 0
      }
      fileList.splice(0, 1);
      fileList.push(file);
      this.handleChange(file, fileList);
    }
  }
}
</script>

<style scoped>
.config {
  overflow-y: auto;
}
.title {
  margin-bottom: 15px;
}
.upload {
  margin-bottom: 15px;
}
#warn {
  color: white;
  background-color: red;
  margin-left: 15px;
}
#dir {
  color: white;
  margin-left: 15px;
}
</style>