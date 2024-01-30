<template>
  <p ref="elemRef">ref demo {{ nameRef }} {{ state.age }}</p>
  <jsx-child :a="nameRef"></jsx-child>
</template>

<script>
import {ref, reactive, onMounted} from 'vue'
import JsxChild from "@/components/JsxChild";

export default {
  name: "Ref",
  components:{
    JsxChild,
  },
  setup() {
    // 值类型 响应式
    const nameRef = ref('lzw.')
    const ageRef = ref(20)

    const state = reactive({
      name: nameRef,
      age: ageRef
    })

    // 通过 .value 获取值修改值
    setTimeout(() => {
      console.log('ageRef', ageRef.value)
      ageRef.value = 25 // .value 修改值
      nameRef.value = 'lzw. A'
    }, 2000)

    // 通过 ref 获取 dom 元素
    const elemRef = ref(null)
    onMounted(() => {
      console.log('elemRef', elemRef.value.innerHTML) // elemRef ref demo lzw. 20
    })

    return {
      nameRef,
      state,
      elemRef
    }
  }
}
</script>
