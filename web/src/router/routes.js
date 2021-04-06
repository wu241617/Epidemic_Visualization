const routes = [{
        path: '/',
        redirect: '/Screen'
    },
    {
        path: '/Screen',
        name: 'Screen',
        component: resolve => require(['@/components/Screen.vue'], resolve)
    }, {
        path: '/Statistics/globalStatistics',
        name: 'GlobalStatistics',
        component: resolve => require(['@/components/GlobalStatistics.vue'], resolve)
    }, {
        path: '/Statistics/domesticStatistics',
        name: 'DomesticStatistics',
        component: resolve => require(['@/components/DomesticStatistics.vue'], resolve)
    }, {
        path: '/Statistics/internationalStatistics',
        name: 'InternationalStatistics',
        component: resolve => require(['@/components/InternationalStatistics.vue'], resolve)
    }, {
        path: '/CHN/provinceAll/daily',
        name: 'CHNProvinceAllDaily',
        component: resolve => require(['@/components/CHNProvinceAllDaily.vue'], resolve)
    }, {
        path: '/CHN/provinceAll/dailyNew',
        name: 'CHNProvinceAllDailyNew',
        component: resolve => require(['@/components/CHNProvinceAllDailyNew.vue'], resolve)
    }, {
        path: '/CHN/province/daily',
        name: 'CHNProvinceDaily',
        component: resolve => require(['@/components/CHNProvinceDaily.vue'], resolve)
    }, {
        path: '/CHN/province/dailyNew',
        name: 'CHNProvinceDailyNew',
        component: resolve => require(['@/components/CHNProvinceDailyNew.vue'], resolve)
    }, {
        path: '/CHN/cityAll/dailyNew',
        name: 'CHNCityAllDailyNew',
        component: resolve => require(['@/components/CHNCityAllDailyNew.vue'], resolve)
    }, {
        path: '/CHN/city/dailyNew',
        name: 'CHNCityDailyNew',
        component: resolve => require(['@/components/CHNCityDailyNew.vue'], resolve)
    }, {
        path: '/USA/provinceAll/daily',
        name: 'USAProvinceAllDaily',
        component: resolve => require(['@/components/USAProvinceAllDaily.vue'], resolve)
    }, {
        path: '/USA/provinceAll/dailyNew',
        name: 'USAProvinceAllDailyNew',
        component: resolve => require(['@/components/USAProvinceAllDailyNew.vue'], resolve)
    }, {
        path: '/USA/province/daily',
        name: 'USAProvinceDaily',
        component: resolve => require(['@/components/USAProvinceDaily.vue'], resolve)
    }, {
        path: '/USA/province/dailyNew',
        name: 'USAProvinceDailyNew',
        component: resolve => require(['@/components/USAProvinceDailyNew.vue'], resolve)
    }, {
        path: '/ChinaMap',
        name: 'ChinaMap',
        component: resolve => require(['@/components/EchartsChina.vue'], resolve)
    }, {
        path: '/WorldMap',
        name: 'WorldMap',
        component: resolve => require(['@/components/EchartsWorld.vue'], resolve)
    }, {
        path: '/Rumors',
        name: 'Rumors',
        component: resolve => require(['@/components/Rumors.vue'], resolve)
    }
]

export default routes