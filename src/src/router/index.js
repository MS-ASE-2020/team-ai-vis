import Vue from 'vue';
import VueRouter from 'vue-router';
import BarChartA from '@/components/BarChartA.vue';
import GeoMapA from '@/components/GeoMapA.vue';
import LineChartA from '@/components/LineChartA.vue';
import PieChartA from '@/components/PieChartA.vue';
import BarChartB from '@/components/BarChartB.vue';
import GeoMapB from '@/components/GeoMapB.vue';
import LineChartB from '@/components/LineChartB.vue';
import PieChartB from '@/components/PieChartB.vue';
Vue.use(VueRouter);

const routes = [
    { path: '/barchartA', component: BarChartA },
    { path: '/geomapA', component: GeoMapA},
    { path: '/linechartA', component: LineChartA },
    { path: '/piechartA', component: PieChartA },
    { path: '/barchart-2', component: BarChartB },
    { path: '/geomap-2', component: GeoMapB},
    { path: '/linechart-2', component: LineChartB },
    { path: '/piechart-2', component: PieChartB }
];

const router = new VueRouter({
  routes,
});

export default router;