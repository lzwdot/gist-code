import './public-path';
import { createApp } from 'vue'
import App from './App.vue'
import routes from './router'
import * as VueRouter from 'vue-router'

// qiankun
let router = null;
let instance = null;
let history = null;

function render(props = {}) {
  const { container } = props;

  history = VueRouter.createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue3/' : '/')
  router = VueRouter.createRouter({
    history,
    routes
  })

  instance = createApp(App)
  instance.use(router)
  instance.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 生命周期函数
export async function bootstrap() {
  console.log('[vue3] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue3] props from main framework', props);
  
  // qiankun 触发运行
  render(props);
}
export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
  history.destroy();
}

// app.use(router)
// app.mount('#app')
