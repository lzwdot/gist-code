<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>Vue3 子应用</h1>
  <router-link to="/helloworld">Vue3 Hello World</router-link>
  <a href="/react18/helloworld">React18 Hello World</a>
  <button @click="testClick">点击事件</button>
  <router-view></router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  methods:{
    testClick(){
      alert('测试点击事件')
    }
  }
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

a {
  margin-right: 10px;
}
</style>
