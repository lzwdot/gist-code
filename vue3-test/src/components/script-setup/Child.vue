<script setup>
import {defineProps, defineEmits, ref, defineExpose} from "vue";

// 定义属性
const props = defineProps({
  name: String,
  age: Number
})

// 定义事件
const emits = defineEmits(['change', 'delete'])

function deleteHandler() {
  emits('delete', '删除')
}

const a = ref(100)
const b = 200
defineExpose({
  a,
  b
})
</script>

<template>
  <p>child - {{ props.name }} {{ props.age }} {{ a }} {{ b }}</p>
  <button @click="$emit('change','修改')"> change</button>
  <button @click="deleteHandler"> delete</button>
</template>
