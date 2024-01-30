<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>this is modal</h2>
      <button @click="buttonClick">close</button>
    </div>
  </teleport>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    isOpen: Boolean
  },
  emits: {
    'close-modal': null
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit('close-modal')
    }
    return {
      buttonClick
    }
  }
})
</script>

<style scoped>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>