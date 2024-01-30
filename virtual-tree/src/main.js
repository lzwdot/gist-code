import Vue from 'vue'
import App from './App.vue'
import ElementUI from '@femessage/element-ui';
import '@femessage/element-ui/lib/theme-chalk/index.css';

import VlTree from './el-tree2';
// import "./styles/index.scss";
Vue.config.productionTip = false

Vue.use(VlTree)
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
