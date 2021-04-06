import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import routes from './routes'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)



const router = new VueRouter({
    routes
})

export default router