import {defineComponent} from "vue"
import Child from './Child'

export default defineComponent(() => {
  function render(msg) {
    return <>{msg}</>
  }

  return () => {
    return <>
      <p>scoped slot Jsx <Child render={render}></Child></p>
    </>
  }
})