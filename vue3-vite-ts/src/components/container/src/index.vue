<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="collapse"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="collapse"></nav-header>
      </el-header>
      <el-main>
        <router-view></router-view>         
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts' setup>
import { ref } from "vue";
import NavSide from "./navSide/index.vue";
import NavHeader from "./navHeader/index.vue";
let collapse = ref(false);
</script>

<style scoped>
.el-header{
  padding: 0;
  border-bottom: 1px solid #e6e6e6;
}
</style>



