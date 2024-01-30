<template>
  <div>HelloWorld
    <router-link to="/helloWorld/helloChild">helloChild</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HelloWorld"
}
</script>

<style scoped>

</style>