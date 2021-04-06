import Vue from 'vue'
import Home from '@/components/Home.vue'
import router from './router'
import store from './store'

//导入组件库	
import ElementUI from 'element-ui';
//导入组件相关样式	
import 'element-ui/lib/theme-chalk/index.css';
//配置Vue插件	
Vue.use(ElementUI);

import axios from 'axios'

Vue.prototype.axios = axios
import qs from 'qs'

import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(Home)
}).$mount('#app')