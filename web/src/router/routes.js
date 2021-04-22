const routes = [{
        path: '/',
        redirect: '/Screen'
    },
    {
        path: '/Screen',
        name: 'Screen',
        component: resolve => require(['@/views/Screen.vue'], resolve)
    }, {
        path: '/Statistics/globalStatistics',
        name: 'GlobalStatistics',
        component: resolve => require(['@/views/GlobalStatistics.vue'], resolve)
    }, {
        path: '/CHN/provinceAll/dailyNew',
        name: 'CHNProvinceAllDailyNew',
        component: resolve => require(['@/views/CHNProvinceAllDailyNew.vue'], resolve)
    }, {
        path: '/CHN/cityAll/dailyNew',
        name: 'CHNCityAllDailyNew',
        component: resolve => require(['@/views/CHNCityAllDailyNew.vue'], resolve)
    }, {
        path: '/ChinaMap',
        name: 'ChinaMap',
        component: resolve => require(['@/views/EchartsChina.vue'], resolve)
    }, {
        path: '/WorldMap',
        name: 'WorldMap',
        component: resolve => require(['@/views/EchartsWorld.vue'], resolve)
    }, {
        path: '/Rumors',
        name: 'Rumors',
        component: resolve => require(['@/views/Rumors.vue'], resolve)
    }
]

export default routes