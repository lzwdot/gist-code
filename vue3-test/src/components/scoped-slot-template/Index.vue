<template>
  <child>
    <template v-slot:default="msgProp">
      <p>scoped slot template {{ msgProp.msg }}</p>
    </template>
  </child>
</template>

<script>
import Child from "./Child";

export default {
  name: "Index",
  components: {Child}
}
</script>
