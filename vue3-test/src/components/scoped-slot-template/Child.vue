<template>
  <slot :msg="msg"></slot>
</template>

<script>
export default {
  name: "Child",
  data() {
    return {
      msg: '作用域插槽 Child'
    }
  }
}
</script>
