<template>
  <div class="clips">
    <div class="clips-bar">
      <div class="title">My Clips</div>
      <el-button
        type="primary"
        @click="exportVideo()"
        size="small"
        :disabled="$store.state.clips.length == 0"
        >Export video</el-button
      >
    </div>
    <div class="clips-list">
      <div v-for="(clip, index) in $store.state.clips" :key="index">
        <div
          v-if="clip.type === 'BarChartA'"
          @click="$store.commit('updateFocusedClip', clip)"
          :class="{ active: $store.state.focusedClip === clip }"
        >
          <bar-chart-a
            :clip="clip"
            :id="clip.type + index"
            :ref="clip.type + index"
          ></bar-chart-a>
        </div>
        <div
          v-else-if="clip.type === 'GeoMapA'"
          @click="$store.commit('updateFocusedClip', clip)"
          :class="{ active: $store.state.focusedClip === clip }"
        >
          <geo-map-a
            :clip="clip"
            :id="clip.type + index"
            :ref="clip.type + index"
          ></geo-map-a>
        </div>
        <div
          v-else-if="clip.type === 'LineChartA'"
          @click="$store.commit('updateFocusedClip', clip)"
          :class="{ active: $store.state.focusedClip === clip }"
        >
          <line-chart-a
            :clip="clip"
            :id="clip.type + index"
            :ref="clip.type + index"
          ></line-chart-a>
        </div>
        <div
          v-else-if="clip.type === 'PieChartA'"
          @click="$store.commit('updateFocusedClip', clip)"
          :class="{ active: $store.state.focusedClip === clip }"
        >
          <pie-chart-a
            :clip="clip"
            :id="clip.type + index"
            :ref="clip.type + index"
          ></pie-chart-a>
        </div>
        <div
          v-else-if="clip.type === 'BarChartB'"
          @click="$store.commit('updateFocusedClip', clip)"
          :class="{ active: $store.state.focusedClip === clip }"
        >
          <bar-chart-b
            :clip="clip"
            :id="clip.type + index"
            :ref="clip.type + index"
          ></bar-chart-b>
        </div>
        <div
          v-else-if="clip.type === 'GeoMapB'"
          @click="$store.commit('updateFocusedClip', clip)"
          :class="{ active: $store.state.focusedClip === clip }"
        >
          <geo-map-b
            :clip="clip"
            :id="clip.type + index"
            :ref="clip.type + index"
          ></geo-map-b>
        </div>
        <div
          v-else-if="clip.type === 'LineChartB'"
          @click="$store.commit('updateFocusedClip', clip)"
          :class="{ active: $store.state.focusedClip === clip }"
        >
          <line-chart-b
            :clip="clip"
            :id="clip.type + index"
            :ref="clip.type + index"
          ></line-chart-b>
        </div>
        <div
          v-else-if="clip.type === 'PieChartB'"
          @click="$store.commit('updateFocusedClip', clip)"
          :class="{ active: $store.state.focusedClip === clip }"
        >
          <pie-chart-b
            :clip="clip"
            :id="clip.type + index"
            :ref="clip.type + index"
          ></pie-chart-b>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="isExporting"
      :before-close="clearVideo()"
      width="80%"
      ref="dialog"
    >
      <div class="video"></div>
      <div class="link" style="display: flex"></div>
    </el-dialog>
  </div>
</template>

<script>
import BarChartA from "@/components/BarChartA.vue";
import GeoMapA from "@/components/GeoMapA.vue";
import LineChartA from "@/components/LineChartA.vue";
import PieChartA from "@/components/PieChartA.vue";
import BarChartB from "@/components/BarChartB.vue";
import GeoMapB from "@/components/GeoMapB.vue";
import LineChartB from "@/components/LineChartB.vue";
import PieChartB from "@/components/PieChartB.vue";
import * as d3 from "d3";

export default {
  name: "Clips",
  components: {
    BarChartA,
    GeoMapA,
    LineChartA,
    PieChartA,
    BarChartB,
    GeoMapB,
    LineChartB,
    PieChartB,
  },
  data() {
    return {
      isExporting: false,
      renderStatus: "none",
      frames: [],
      frameWidth: 500,
      frameHeight: 500,
      interval: 15,
      recorder: null,
      recordedData: [],
      context: null,
    };
  },
  methods: {
    exportVideo() {
      this.isExporting = true;
      this.renderStatus = "none";
      this.downloadDisabled = true;
      setTimeout(() => {
        this.startRecord();
        this.renderVideo();
      }, 0);
    },
    downloadVideo() {
      window.location = this.url;
    },
    async renderVideo() {
      for (const [index, clip] of this.$store.state.clips.entries()) {
        var root = d3.select(".video");
        var width = this.frameWidth;
        var height = this.frameHeight;
        var data = clip.data;
        var config = clip.config;
        var duration = this.$refs[clip.type + index][0].renderClip(
          root,
          width,
          height,
          data,
          config
        );
        this.renderStatus = "ongoing";
        // console.log(clip);
        await new Promise((resolve) => setTimeout(resolve, duration));
      }
      this.renderStatus = "finished";
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
        d3.select(".link")
          .append("a")
          .attr("class", "el-button el-button--primary el-button--small")
          .attr("href", url)
          .attr("style", "margin-left: auto; text-decoration: none;")
          .attr("download", "video.webm")
          .text("Download");
      };

      this.frames = [];
      this.snapshot();
    },
    async snapshot() {
      if (this.renderStatus === "finished") return;
      else if (this.renderStatus === "ongoing") {
        var svg = d3.select(".video").select("svg");
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
      d3.select(".video").selectAll("*").remove();
    },
  },
  watch: {
    renderStatus: function (newValue) {
      var vm = this;
      function drawFrame() {
        if (vm.frames.length) {
          vm.context.drawImage(
            vm.frames.shift(),
            0,
            0,
            vm.frameWidth,
            vm.frameHeight
          );
          requestAnimationFrame(drawFrame);
        } else {
          vm.recorder.stop();
          vm.renderStatus = "stop";
        }
      }
      if (newValue === "finished") {
        vm.recorder.start();
        drawFrame();
      }
    },
  },
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
  transition: 0.3s;
  cursor: pointer;
}
.clips-list > :not(:last-child) {
  margin: 5px 20px 5px 5px;
}
.clips-list > :last-child {
  margin: 5px 5px 5px 5px;
}
.clips-list.pie-chart:focus,
.pie-chart:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.active {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.clips-bar {
  display: flex;
}
.video {
  display: flex;
  justify-content: center;
}
</style>