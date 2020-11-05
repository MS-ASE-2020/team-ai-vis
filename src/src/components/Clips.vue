<template>
  <div class="clips">
    <div class="title">My Clips</div>
    <div class="clips-list">
      <div v-for="(clip, index) in $store.state.clips" :key="index">
        <div v-if="clip.type === 'BarChart'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <bar-chart :clip="clip" :id="clip.type + index"></bar-chart>
        </div>
        <div v-else-if="clip.type === 'GeoMap'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <geo-map :clip="clip" :id="clip.type + index"></geo-map>
        </div>
        <div v-else-if="clip.type === 'LineChart'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <line-chart :clip="clip" :id="clip.type + index"></line-chart>
        </div>
        <div v-else-if="clip.type === 'PieChart'" @click="$store.commit('updateFocusedClip', clip)" 
            :class="{ active: $store.state.focusedClip === clip }">
          <pie-chart :clip="clip" :id="clip.type + index"></pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';
import GeoMap from '@/components/GeoMap.vue';
import LineChart from '@/components/LineChart.vue';
import PieChart from '@/components/PieChart.vue';

export default {
  name: 'Clips',
  components: {
    BarChart,
    GeoMap,
    LineChart,
    PieChart
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 15px;
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
</style>