import Vue from 'vue'
// import VueRouter from '../../vue-router/dist/vue-router.esm'
import VueRouter from './kvue-router/index'
// import Vuex from '../../vuex/dist/vuex.esm'
import Vuex from './kvuex/index'
import App from './App.vue'

import './assets/css.css'
import * as stream from "stream";

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)

const moduleA = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment({commit}) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    computedCount(state, getter) {
      console.log('getter', getter)
      return state.count + 1
    }
  }
}
const moduleB = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment(ctx) {
      ctx.commit('increment')
    }
  },
  getters: {
    computedCount(state) {
      return state.count + 1
    }
  }
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  },
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment(ctx) {
      return new Promise((resolve) => {
        setTimeout(() => {
          ctx.commit('increment')
          resolve(ctx.rootState)
        }, 1000)
      })
    }
  },
  getters: {
    computedCount(state) {
      return state.count + 1
    }
  },
  strict: true
})

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = {
  template: '<div><div>foo</div><router-link to="bar" :append="true">Go to Bar</router-link><router-view></router-view></div>',
  beforeRouteEnter(to, from, next) {
    console.log('foo beforeRouteEnter')
    console.log('this ?', this)
    next((vm) => {
      console.log('now this ?', vm)
    })
  },
  beforeRouteUpdate(to, from, next) {
    console.log('foo beforeRouteUpdate')
    console.log('this ?', this)
    next()
  }
}
const Bar = {
  template: '<div>bar</div>',
  beforeRouteLeave(to, from, next) {
    console.log('bar beforeRouteLeave')
    next()
  }
}
const HelloWorld = () => import('./components/HelloWorld')
const HelloChild = () => import('./components/HelloChild')

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  {
    path: '/foo',
    component: Foo,
    children: [
      {
        path: 'bar',
        component: Bar,
        beforeEnter(to, from, next) {
          console.log('bar beforeEnter')
          next()
        }
      }
    ]
  },
  {
    path: '/',
    component: HelloWorld,
  },
  {
    path: '/helloWorld',
    component: HelloWorld,
    children: [{
      path: '/helloWorld/helloChild',
      component: HelloChild
    }]
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
//
// router.beforeEach((to, from, next) => {
//   console.log('beforeEach')
//   next()
// })
//
// router.afterEach((to, from) => {
//   console.log('gloab afterEach')
// })
//
// router.beforeResolve((to, from, next) => {
//   console.log('gloab beforeResolve')
//   next()
// })
//
// window.store = store
// console.log(store)
// store.commit('increment')
// console.log(store.state.count)
// store.dispatch('increment').then((rootState) => {
//   console.log(rootState.count)
// })
// console.log(store.state.count)

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
console.log(process.env)
const app = new Vue({
  el: '#app',
  render(h) {
    return h(App)
  },
  router,
  store
})