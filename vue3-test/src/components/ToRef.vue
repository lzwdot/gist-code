<template>
  <p ref="elemRef">toRef demo {{ state.name }}{{ state.age }} - {{ ageRef }}</p>
</template>

<script>
import {toRef, reactive} from 'vue'

export default {
  name: "toRef",
  setup() {
    // 对象实现响应式，使用 reactive
    const state = reactive({
      name: 'lzw.',
      age: 20
    })

    // toRef 如果用于非响应式对象，产出的结果不具备响应式
    // const state = {
    //   name: 'lzw.',
    //   age: 20
    // }

    // 响应式对象的一个属性实现响应式，使用 toRef
    const ageRef = toRef(state, 'age')
    setTimeout(() => {
      state.age = 25 // state.age 和 ageRef 保持引用关系
    }, 1000)
    setTimeout(() => {
      ageRef.value = 30  // state.age 和 ageRef 保持引用关系
    }, 1000)

    return {
      state,
      ageRef
    }
  }
}
</script>
