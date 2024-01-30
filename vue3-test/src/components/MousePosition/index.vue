<template>
  <p>mouse position {{ x }}-{{ y }}</p>
</template>

<script>

import useMousePosition from "./useMousePosition.js";

export default {
  name: "MousePosition",
  setup() {
    const {x, y} = useMousePosition()

    return {
      x, y
    }
  }
}
</script>
