<template>
  <div class="clips">
    <div class="clips-bar">
      <div class="title">My Clips</div>
      <el-button type="primary" @click="exportVideo()" size="mini">Export video</el-button>
    </div>
    <div class="clips-list">
      <div v-for="(clip, index) in $store.state.clips" :key="index">
        <div v-if="clip.type === 'BarChart_1'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <bar-chart-1 :clip="clip" :id="clip.type + index" :ref="clip.type + index"></bar-chart-1>
        </div>
        <div v-else-if="clip.type === 'GeoMap_1'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <geo-map-1 :clip="clip" :id="clip.type + index" :ref="clip.type + index"></geo-map-1>
        </div>
        <div v-else-if="clip.type === 'LineChart_1'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <line-chart-1 :clip="clip" :id="clip.type + index" :ref="clip.type + index"></line-chart-1>
        </div>
        <div v-else-if="clip.type === 'PieChart_1'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <pie-chart-1 :clip="clip" :id="clip.type + index" :ref="clip.type + index"></pie-chart-1>
        </div>
        <div v-if="clip.type === 'BarChart_2'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <bar-chart-2 :clip="clip" :id="clip.type + index" :ref="clip.type + index"></bar-chart-2>
        </div>
        <div v-else-if="clip.type === 'GeoMap_2'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <geo-map-2 :clip="clip" :id="clip.type + index" :ref="clip.type + index"></geo-map-2>
        </div>
        <div v-else-if="clip.type === 'LineChart_2'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <line-chart-2 :clip="clip" :id="clip.type + index" :ref="clip.type + index"></line-chart-2>
        </div>
        <div v-else-if="clip.type === 'PieChart_2'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <pie-chart-2 :clip="clip" :id="clip.type + index" :ref="clip.type + index"></pie-chart-2>
        </div>
      </div>
    </div>
    <el-dialog title="Exporting video..." :visible.sync="isExporting" :before-close="clearVideo()" width="80%" ref="dialog">
      <div class="video"></div>
    </el-dialog>
  </div>
</template>

<script>
import BarChart_1 from '@/components/BarChart_1.vue';
import GeoMap_1 from '@/components/GeoMap_1.vue';
import LineChart_1 from '@/components/LineChart_1.vue';
import PieChart_1 from '@/components/PieChart_1.vue';
import BarChart_2 from '@/components/BarChart_2.vue';
import GeoMap_2 from '@/components/GeoMap_2.vue';
import LineChart_2 from '@/components/LineChart_2.vue';
import PieChart_2 from '@/components/PieChart_2.vue';
import * as d3 from 'd3';

export default {
  name: 'Clips',
  components: {
    BarChart_1,
    GeoMap_1,
    LineChart_1,
    PieChart_1,
    BarChart_2,
    GeoMap_2,
    LineChart_2,
    PieChart_2

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
    },
    clearVideo() {
      d3.select('.video').selectAll('*').remove();
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