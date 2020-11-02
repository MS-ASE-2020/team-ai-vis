<template>
  <div class="clips">
    <div class="title">My Clips</div>
    <div class="clips-list">
      <div v-for="(clip, index) in $store.state.clips" :key="index">
        <div v-if="clip.type === 'BarChart'">
          <bar-chart :clip="clip" :id="clip.type + index"></bar-chart>
        </div>
        <div v-else-if="clip.type === 'GeoMap'">
          <geo-map :clip="clip" :id="clip.type + index"></geo-map>
        </div>
        <div v-else-if="clip.type === 'LineChart'">
          <line-chart :clip="clip" :id="clip.type + index"></line-chart>
        </div>
        <div v-else-if="clip.type === 'PieChart'">
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
  overflow-x: scroll;
	overflow-y: hidden;
}
.clips-list > :not(:last-child) {
  margin: 5px 20px 0 0;
}
.clips-list > :last-child {
  margin: 5px 0 0 0;
}
</style>