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
// 配置请求根路径
//axios.defaults.baseURL = 'http://127.0.0.1:3000/api'
axios.defaults.baseURL = 'http://123.57.46.110:8900/api'

// 设置请求超时
axios.defaults.timeout = 15000;
// 挂载到vue
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