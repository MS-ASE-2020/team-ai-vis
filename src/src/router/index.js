import Vue from 'vue';
import VueRouter from 'vue-router';
import BarChart from '@/components/BarChart.vue';
import GeoMap from '@/components/GeoMap.vue';
import LineChart from '@/components/LineChart.vue';
import PieChart from '@/components/PieChart.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/barchart', component: BarChart },
    { path: '/geomap', component: GeoMap},
    { path: '/linechart', component: LineChart },
    { path: '/piechart', component: PieChart }
];

const router = new VueRouter({
  routes,
});

export default router;