<template>
  <div id="app">
    <h1>主应用</h1>
    <pre>全局变量：<code>{{JSON.stringify(globalValue)}}</code></pre>
    <div class="sub-app__a">
      <router-link to="/">主应用</router-link>
      <router-link to="/vue3">vue3子应用</router-link>
      <router-link to="/react18">react18子应用</router-link>
      <a @click="$router.replace('/web')">web子应用</a>      
      <a @click="changeGlobalState" href="#">修改全局变量</a>
    </div>
    <hr />
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Vue2 主应用"/> -->
    <div id="sub-app"></div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import { initGlobalState } from "qiankun";

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  data() {
    return {
      globalValue: { user: "qiankun" },
      globalState: null,
    };
  },
  mounted() {
    this.globalState = initGlobalState(this.globalValue);
    // 监听全局状态变化，包含主应用和子应用的
    this.globalState.onGlobalStateChange((value, prev) => {
      this.globalValue = value;
      console.log("[onGlobalStateChange - master]:", value, prev);
    });
  },
  methods: {
    changeGlobalState() {
      this.globalState.setGlobalState({
        ignore: "master",
        user: {
          name: "master",
        },
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.sub-app__a a {
  margin-right: 10px;
  cursor: pointer;
}
code {
  background-color: #eee;
}
</style>
