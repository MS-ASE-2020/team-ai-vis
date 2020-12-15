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
          
          <el-button id = 'dir' type="primary" @click="$store.commit('left', $store.state.focusedClip)" size="small">Left</el-button>
          <el-button id = 'dir' type="primary" @click="$store.commit('right', $store.state.focusedClip)" size="small">Right</el-button>
          <el-button id = "warn" type="primary" @click="$store.commit('deleteClip', $store.state.focusedClip)" size="small">Delete Clip</el-button>
        </el-upload>
      </div>
      <div class="config-detail">
        <div v-if="$store.state.focusedClip.type === 'BarChart_1'">
          <bar-chart-config-1></bar-chart-config-1>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'GeoMap_1'">
          <geo-map-config-1></geo-map-config-1>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'LineChart_1'">
          <line-chart-config-1></line-chart-config-1>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'PieChart_1'">
          <pie-chart-config-1></pie-chart-config-1>
        </div>
        <div v-if="$store.state.focusedClip.type === 'BarChar_2'">
          <bar-chart-config-2></bar-chart-config-2>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'GeoMap_2'">
          <geo-map-config-2></geo-map-config-2>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'LineChart_2'">
          <line-chart-config-2></line-chart-config-2>
        </div>
        <div v-else-if="$store.state.focusedClip.type === 'PieChart_2'">
          <pie-chart-config-2></pie-chart-config-2>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import BarChartConfig_1 from '@/components/BarChartConfig_1.vue';
import GeoMapConfig_1 from '@/components/GeoMapConfig_1.vue';
import LineChartConfig_1 from '@/components/LineChartConfig_1.vue';
import PieChartConfig_1 from '@/components/PieChartConfig_1.vue';
import BarChartConfig_2 from '@/components/BarChartConfig_2.vue';
import GeoMapConfig_2 from '@/components/GeoMapConfig_2.vue';
import LineChartConfig_2 from '@/components/LineChartConfig_2.vue';
import PieChartConfig_2 from '@/components/PieChartConfig_2.vue';
export default {
  name: 'Config',
  components: {
    BarChartConfig_1,
    GeoMapConfig_1,
    LineChartConfig_1,
    PieChartConfig_1,
    BarChartConfig_2,
    GeoMapConfig_2,
    LineChartConfig_2,
    PieChartConfig_2
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
.title {
  margin-bottom: 15px;
}
.upload {
  margin-bottom: 15px;
}
#warn{
  color: white;
  background-color: red;
  margin-left: 15px;
}
#dir{
  color: white;
  margin-left: 15px;
}
</style>