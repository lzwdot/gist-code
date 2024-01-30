<script>
function add(a, b) {
  return a + b
}
</script>

<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import Child from './Child'

const countRef = ref(100)

// 直接使用，不需要 return
function addCount() {
  countRef.value++
}

const state = reactive({
  name: 'lzw.'
})
// 直接使用，不需要 return
const {name} = toRefs(state)

// 直接使用其他 script 函数
const addVal = add(1, 2)

function onChange(info) {
  console.log('on change', info)
}

function onDelete(info) {
  console.log('on delete', info)
}

const childRef = ref(null)
onMounted(() => {
  // 拿到 child 组件的一些数据
  console.log(childRef.value.a)
  console.log(childRef.value.b)
})
</script>

<template>
  <p @click="addCount">vue3.2+ script setup {{ countRef }} {{ name }} {{ addVal }}</p>
  <!--  直接引入使用，不需要注册了-->
  <Child :name="name" :age="countRef" @change="onChange" @delete="onDelete" ref="childRef"></Child>
</template>
