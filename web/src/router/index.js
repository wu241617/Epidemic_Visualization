import Vue from 'vue'
import VueRouter from 'vue-router'
import Screen from '@/components/Screen.vue'
import GlobalStatistics from '@/components/GlobalStatistics.vue'
import DomesticStatistics from '@/components/DomesticStatistics.vue'
import InternationalStatistics from '@/components/InternationalStatistics.vue'
import CHNProvinceAllDaily from '@/components/CHNProvinceAllDaily.vue'
import CHNProvinceAllDailyNew from '@/components/CHNProvinceAllDailyNew.vue'
import CHNProvinceDaily from '@/components/CHNProvinceDaily.vue'
import CHNProvinceDailyNew from '@/components/CHNProvinceDailyNew.vue'
import CHNCityAllDailyNew from '@/components/CHNCityAllDailyNew.vue'
import CHNCityDailyNew from '@/components/CHNCityDailyNew.vue'
import USAProvinceAllDaily from '@/components/USAProvinceAllDaily.vue'
import USAProvinceAllDailyNew from '@/components/USAProvinceAllDailyNew.vue'
import USAProvinceDaily from '@/components/USAProvinceDaily.vue'
import USAProvinceDailyNew from '@/components/USAProvinceDailyNew.vue'
// import Recommends from '@/components/Recommends.vue'
// import Remarks from '@/components/Remarks.vue'
import Rumors from '@/components/Rumors.vue'
import Router from 'vue-router'
import ChinaMap from '@/components/EchartsChina.vue'
import WorldMap from '@/components/EchartsWorld.vue'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/Screen'
    },
    {
        path: '/Screen',
        name: 'Screen',
        component: Screen
    }, {
        path: '/Statistics/globalStatistics',
        name: 'GlobalStatistics',
        component: GlobalStatistics
    }, {
        path: '/Statistics/domesticStatistics',
        name: 'DomesticStatistics',
        component: DomesticStatistics
    }, {
        path: '/Statistics/internationalStatistics',
        name: 'InternationalStatistics',
        component: InternationalStatistics
    }, {
        path: '/CHN/provinceAll/daily',
        name: 'CHNProvinceAllDaily',
        component: CHNProvinceAllDaily
    }, {
        path: '/CHN/provinceAll/dailyNew',
        name: 'CHNProvinceAllDailyNew',
        component: CHNProvinceAllDailyNew
    }, {
        path: '/CHN/province/daily',
        name: 'CHNProvinceDaily',
        component: CHNProvinceDaily
    }, {
        path: '/CHN/province/dailyNew',
        name: 'CHNProvinceDailyNew',
        component: CHNProvinceDailyNew
    }, {
        path: '/CHN/cityAll/dailyNew',
        name: 'CHNCityAllDailyNew',
        component: CHNCityAllDailyNew
    }, {
        path: '/CHN/city/dailyNew',
        name: 'CHNCityDailyNew',
        component: CHNCityDailyNew
    }, {
        path: '/USA/provinceAll/daily',
        name: 'USAProvinceAllDaily',
        component: USAProvinceAllDaily
    }, {
        path: '/USA/provinceAll/dailyNew',
        name: 'USAProvinceAllDailyNew',
        component: USAProvinceAllDailyNew
    }, {
        path: '/USA/province/daily',
        name: 'USAProvinceDaily',
        component: USAProvinceDaily
    }, {
        path: '/USA/province/dailyNew',
        name: 'USAProvinceDailyNew',
        component: USAProvinceDailyNew
    }, {
        path: '/ChinaMap',
        name: 'ChinaMap',
        component: ChinaMap
    }, {
        path: '/WorldMap',
        name: 'WorldMap',
        component: WorldMap
    }, {
        path: '/Rumors',
        name: 'Rumors',
        component: Rumors
    }
]

const router = new VueRouter({
    routes
})

export default router