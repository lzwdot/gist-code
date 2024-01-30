<template>
  <p> why .value demo {{ state.age }} - {{ age1 }}</p>
</template>

<script>
import {computed, reactive, ref, toRefs} from "vue";

function useFeatureX() {
  const state = reactive({
    x: 1,
    y: 2
  })

  return toRefs(state)
}

export default {
  name: "WhyValue",
  setup() {
    // vue3 是通过 proxy 实现响应式，所以值类型不具备响应式
    const {x, y} = useFeatureX()
    const state = reactive({
      name: 'lzw.',
      age: 20
    })

    // computed 返回类似 ref 的对象，也有 .value
    const age1 = computed(() => {
      return state.age + 1
    })

    console.log(age1)
    // ComputedRefImpl {dep: undefined, _dirty: true, __v_isRef: true, effect: ReactiveEffect, _setter: ƒ, …}
    // dep: Set(1) {ReactiveEffect}
    // effect: ReactiveEffect {active: true, deps: Array(1), fn: ƒ, scheduler: ƒ}
    // __v_isReadonly: true
    // __v_isRef: true
    // _dirty: false
    // _setter: () => {…}
    // _value: 36
    // value: 36

    setTimeout(() => {
      state.age = 35
    }, 1500)

    return {
      state,
      age1
    }
  }
}
</script>
