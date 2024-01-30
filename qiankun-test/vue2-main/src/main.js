import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

Vue.config.productionTip = false

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{ path: '/', component: () => import('./App.vue') }]
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 1、引入 qinakun
import { registerMicroApps, start, runAfterFirstMounted } from 'qiankun';
// import { registerMicroApps, start, runAfterFirstMounted } from '../../my-qiankun/index';

const isPro = (process.env.NODE_ENV === 'production');
const proUrl = '//localhost:8080';

// 2、注册子应用
registerMicroApps([
  {
    name: 'vue-3',
    entry: isPro ? `${proUrl}/vue3-dist/` : '//localhost:8091/vue3-dist/', // 开发环境和生产环境
    container: '#sub-app',
    activeRule: '/vue3', // 建议不要和应用的 publicPath 路径一直，比如：vue3-dist
  },
  {
    name: 'react-18',
    entry: isPro ? `${proUrl}/react18-dist/` : '//localhost:8092/react18-dist/',
    container: '#sub-app',
    activeRule: '/react18',
  },
  {
    name: 'web',
    entry: isPro ? `${proUrl}/web-dist/` : '//localhost:8093',
    container: '#sub-app',
    activeRule: '/web',
  },
], {
  beforeLoad: () => { console.log('beforeLoad') },
  beforeMount: () => { console.log('beforeMount') },
  afterMount: () => { console.log('afterMount') },
  beforeUnmount: () => { console.log('beforeUnmount') },
  afterUnmount: () => { console.log('afterUnmount') },
});

runAfterFirstMounted(() => {
  console.log("----------------------------------");
  console.log(process.env.NODE_ENV);
  console.log("----------------------------------");
  console.log("[MainApp] first app mounted");
});

// 3、启动 qiankun
start({
  sandbox: {
    // strictStyleIsolation:true // 利用 shadow dom 解决样式冲突
    // experimentalStyleIsolation:true, // 添加 选择器范围 来解决样式冲突
  }
});