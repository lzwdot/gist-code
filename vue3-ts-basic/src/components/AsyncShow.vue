<template>
  <h2>{{ result }}</h2>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "AsyncShow",
  setup() {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve({
          result: 43
        })
      },3000)
    })
  }
})
</script>

<style scoped>

</style>