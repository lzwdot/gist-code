<template>
  <p></p>
</template>

<script>
import {getCurrentInstance, onMounted} from "vue";

export default {
  name: "GetInstance",
  data() {
    return {
      x: 1,
      y: 2
    }
  },
  setup() {
    console.log('this1', this) // this1 undefined

    onMounted(() => {
      console.log('this in onMounted', this) // this in onMounted undefined

      // 这样就有值了
      console.log('x', instance.data.x) // x 1
    })

    const instance = getCurrentInstance() //instance {uid: 1, vnode: {…}, type: {…}, parent: {…}, appContext: {…},…}
    console.log('instance', instance)
    // 因为 setup 在生命周期 created beforeCreate
    console.log('x', instance.data.x) // x undefined
  },
  mounted() {
    console.log('this2', this) // this2 Proxy{…}
    console.log('y', this.y) // y 2
  }
}
</script>