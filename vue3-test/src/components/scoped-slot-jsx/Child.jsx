import {defineComponent, ref} from "vue"

export default defineComponent({
  props: ['render'],
  setup(props) {
    const msgRef = ref('作用域插槽 Child')

    return () => {
      return <>
        {props.render(msgRef.value)}
      </>
    }
  }
})