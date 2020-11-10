<template>
  <div class="clips">
    <div class="clips-bar">
      <div class="title">My Clips</div>
      <el-button type="primary" @click="exportVideo()" size="mini">Export video</el-button>
    </div>
    <div class="clips-list">
      <div v-for="(clip, index) in $store.state.clips" :key="index">
        <div v-if="clip.type === 'BarChart'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <bar-chart :clip="clip" :id="clip.type + index" :ref="clip.type + index"></bar-chart>
        </div>
        <div v-else-if="clip.type === 'GeoMap'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <geo-map :clip="clip" :id="clip.type + index" :ref="clip.type + index"></geo-map>
        </div>
        <div v-else-if="clip.type === 'LineChart'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <line-chart :clip="clip" :id="clip.type + index" :ref="clip.type + index"></line-chart>
        </div>
        <div v-else-if="clip.type === 'PieChart'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <pie-chart :clip="clip" :id="clip.type + index" :ref="clip.type + index"></pie-chart>
        </div>
      </div>
    </div>
    <el-dialog title="Exporting video..." :visible.sync="isExporting" width="80%" ref="dialog">
      <div class="video"></div>
    </el-dialog>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';
import GeoMap from '@/components/GeoMap.vue';
import LineChart from '@/components/LineChart.vue';
import PieChart from '@/components/PieChart.vue';
import * as d3 from 'd3';

export default {
  name: 'Clips',
  components: {
    BarChart,
    GeoMap,
    LineChart,
    PieChart
  },
  data() {
    return {
      isExporting: false,
      renderStatus: 'none',
      frames: [],
      frameWidth: 500,
      frameHeight: 500,
      interval: 15,
      recorder: null,
      recordedData: [],
      context: null
    };
  },
  methods: {
    exportVideo() {
      this.isExporting = true;
      this.renderStatus = 'none';
      setTimeout(() => {
        this.startRecord();
        this.renderVideo();
      }, 0);
    },
    async renderVideo() {
      for (const [index, clip] of this.$store.state.clips.entries())
      {
        var root = d3.select('.video');
        var width = this.frameWidth;
        var height = this.frameHeight;
        var data = clip.data;
        var config = clip.config;
        var duration = this.$refs[clip.type + index][0].renderClip(root, width, height, data, config);
        this.renderStatus = 'ongoing';
        // console.log(clip);
        await new Promise((resolve) => setTimeout(resolve, duration));
      }
      this.renderStatus = 'finished';
    },
    startRecord() {
      var canvas = document.createElement("canvas");
      canvas.width = this.frameWidth;
      canvas.height = this.frameHeight;
      this.context = canvas.getContext("2d");
      var stream = canvas.captureStream();
      this.recorder = new MediaRecorder(stream, {
          videoBitsPerSecond: 10 * 1920 * 1080,
          mimeType: "video/webm; codecs=H264",
        });
      
      var vm = this;

      this.recorder.ondataavailable = function (event) {
        if (event.data && event.data.size) {
          vm.recordedData.push(event.data);
        }
      };

      this.recorder.onstop = () => {
        var blob = new Blob(vm.recordedData, { type: "video/webm" });
        var url = URL.createObjectURL(blob);
        d3.select('.video')
          .append("a")
          .attr("href", url)
          .attr("download", "video.webm")
          .text("Click here to download the file");
      };

      this.frames = [];
      this.snapshot();
    },
    async snapshot() {
      if (this.renderStatus === 'finished') return;
      else if (this.renderStatus === 'ongoing')
      {
        var svg = d3.select('.video').select("svg");
        var serialized = new XMLSerializer().serializeToString(svg.node());
        var blob = new Blob([serialized], { type: "image/svg+xml" });
        var url = URL.createObjectURL(blob);
        var img = new Image();
        img.src = url;
        this.frames.push(img);
      }
      setTimeout(this.snapshot, this.interval);
    }
  },
  watch: {
    renderStatus: function(newValue) {
      var vm = this;
      function drawFrame() {
        if (vm.frames.length) {
          vm.context.drawImage(vm.frames.shift(), 0, 0, vm.frameWidth, vm.frameHeight);
          requestAnimationFrame(drawFrame);
        } else {
          vm.recorder.stop();
          vm.renderStatus = 'stop';
        }
      }
      if (newValue === 'finished') {
        vm.recorder.start();
        drawFrame();
      }
    }
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 15px;
  margin-right: auto;
}
.clips-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.clips-list > * {
  transition: .3s;
  cursor: pointer;
}
.clips-list > :not(:last-child) {
  margin: 5px 20px 5px 5px;
}
.clips-list > :last-child {
  margin: 5px 5px 5px 5px;
}
.clips-list.pie-chart:focus, .pie-chart:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}
.active {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}
.clips-bar {
  display: flex;
}
.video {
  display: flex;
  justify-content: center;
}
</style>