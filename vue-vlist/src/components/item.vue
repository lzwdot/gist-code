<template>
  <div style="border: 1px solid red; padding: 20px 0">
    {{ item.value }}
  </div>
</template>

<script>
export default {
  name: "item",
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>