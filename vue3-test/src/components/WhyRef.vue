<template>
  <p> why ref demo {{ age }}</p>
</template>

<script>
import {reactive, ref, toRefs} from "vue";

function useFeatureX() {
  const state = reactive({
    x: 1,
    y: 2
  })

  return toRefs(state)
}

export default {
  name: "WhyRef",
  setup() {
    // vue3 是通过 proxy 实现响应式，所以值类型不具备响应式
    const {x, y} = useFeatureX()
    let age = ref(20)

    console.log(age)
    // RefImpl {_shallow: false, dep: undefined, __v_isRef: true, _rawValue: 20, _value: 20}
    // dep: Set(1) {ReactiveEffect}
    // __v_isRef: true
    // _rawValue: 20
    // _shallow: false
    // _value: 20
    // value: 30

    setTimeout(() => {
      age.value = 30
    }, 1500)

    return {
      age
    }
  }
}
</script>
