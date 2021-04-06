import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projectTitle: '疫 情 可 视 化 信 息 数 据 分 析 平 台',
        projectTime: '系 统 当 前 时 间 ：',
        itemArr: ['数据大屏展示', '中国疫情地图', '世界疫情地图', '全球各国数据', '中国各省数据', '中国城市数据', '疫情推送信息'],
        imgFailure: '图片加载失败'
    },
    mutations: {},
    actions: {},
    modules: {}
})