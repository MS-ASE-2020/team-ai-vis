import Vue from 'vue';
import VueRouter from 'vue-router';
import BarChart_1 from '@/components/BarChart_1.vue';
import GeoMap_1 from '@/components/GeoMap_1.vue';
import LineChart_1 from '@/components/LineChart_1.vue';
import PieChart_1 from '@/components/PieChart_1.vue';
import BarChart_2 from '@/components/BarChart_2.vue';
import GeoMap_2 from '@/components/GeoMap_2.vue';
import LineChart_2 from '@/components/LineChart_2.vue';
import PieChart_2 from '@/components/PieChart_2.vue';
Vue.use(VueRouter);

const routes = [
    { path: '/barchart-1', component: BarChart_1 },
    { path: '/geomap-1', component: GeoMap_1},
    { path: '/linechart-1', component: LineChart_1 },
    { path: '/piechart-1', component: PieChart_1 },
    { path: '/barchart-2', component: BarChart_2 },
    { path: '/geomap-2', component: GeoMap_2},
    { path: '/linechart-2', component: LineChart_2 },
    { path: '/piechart-2', component: PieChart_2 }
];

const router = new VueRouter({
  routes,
});

export default router;