import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index.vue'
import reple from '../components/reple.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/' , component : index },
  { path: '/reple' , component: reple }
]

const router = new VueRouter({
  routes
})

export default router
