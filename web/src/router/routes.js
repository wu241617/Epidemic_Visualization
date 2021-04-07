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
        path: '/CHN/provinceAll/dailyNew',
        name: 'CHNProvinceAllDailyNew',
        component: resolve => require(['@/components/CHNProvinceAllDailyNew.vue'], resolve)
    }, {
        path: '/CHN/cityAll/dailyNew',
        name: 'CHNCityAllDailyNew',
        component: resolve => require(['@/components/CHNCityAllDailyNew.vue'], resolve)
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