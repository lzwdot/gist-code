<template>
  <p ref="elemRef">toRefs demo {{ name }} {{ age }}</p>
</template>

<script>
import {toRefs, reactive} from 'vue'

export default {
  name: "toRefs",
  setup() {
    // 对象实现响应式，使用 reactive
    const state = reactive({
      name: 'lzw.',
      age: 20
    })

    // 将响应式对象变为普通对象，同时保留响应式
    const stateAsRefs = toRefs(state)

    // 每个属性，都是 ref 对象
    // const {name: nameRef, age: ageRef} = stateAsRefs

    setTimeout(() => {
      state.age = 25
    },1000)

    return stateAsRefs
  }
}
</script>
