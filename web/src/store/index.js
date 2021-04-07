import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projectTitle: '疫 情 可 视 化 信 息 数 据 分 析 平 台',
        projectTime: '系 统 当 前 时 间 ：',
        itemArr: ['数据大屏展示', '中国疫情地图', '世界疫情地图', '全球各国数据', '中国各省数据', '中国城市数据', '疫情推送信息'],
        imgFailure: '图片加载失败',
        GlobalType: ['国内', '国际', '全球'],
        ShowTitle: [{ title: '累计确诊', num: 0 }, { title: '当前确诊', num: 0 }, { title: '累计治愈', num: 0 }, { title: '累计死亡', num: 0 }],
        dateObj: [{ name: 'Jan', value: '01' }, { name: 'Feb', value: '02' }, { name: 'Mar', value: '03' }, { name: 'Apr', value: '04' }, { name: 'May', value: '05' }, { name: 'Jun', value: '06' }, { name: 'Jul', value: '07' }, { name: 'Aug', value: '08' }, { name: 'Sep', value: '09' }, { name: 'Oct', value: '10' }, { name: 'Nov', value: '11' }, { name: 'Dec', value: '12' }]
    },
    mutations: {

    },
    actions: {},
    modules: {}
})