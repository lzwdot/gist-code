import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/bmap',
    name: 'BMap',
    component: () => import('../views/BMap.vue')
  },
  {
    path: '/bmap2',
    name: 'BMap2',
    component: () => import('../views/BMap2.vue')
  },
  {
    path: '/liquidfill',
    name: 'Liquidfill',
    component: () => import('../views/Liquidfill.vue')
  },
  {
    path: '/wordcloud',
    name: 'WordCloud',
    component: () => import('../views/WordCloud.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
