<template>
  <div id="app">
    <h1>Hello App!</h1>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/">home</router-link>
      |
      <router-link to="/helloWorld">helloWorld</router-link>
    </p>
    <p @click="$store.commit('increment')">count:{{ $store.state.count }}</p>
    <p @click="$store.dispatch('increment')">async count:{{ $store.state.count }}</p>
    <p>get count:{{ $store.getters.computedCount }}</p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

    <!-- 表单 -->
    <k-form></k-form>
  </div>
</template>

<script>

import KForm from '@/kvue-form/Index'

export default {
  components: {
    KForm
  },
  name: 'App'
}
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

.router-link-active {
  color: #fc8919;
}

.router-link-exact-active {
  color: red;
}
</style>
