import {defineComponent, reactive, ref} from "vue"
import Child from "./JsxChild.jsx";

// defineComponent 可以传入两种
// 1. setup 函数
export default defineComponent(() => {
  const countRef = ref(11)
  const state = reactive({
    list: [1, 2, 3]
  })
  const render = () => {
    if (countRef.value < 100) {
      return <>{countRef.value}</>
    }
    return <>
      <p>Jsx Demo {countRef.value}</p>
      {countRef.value > 1000 && <Child a={countRef.value + 100}></Child>}
      <ul>
        {state.list.map(item => <li>{item}</li>)}
      </ul>
    </>
  }
  // 必须返回一个函数
  return render
})

// 2. 组件的配置
// export default defineComponent({
//   name: "JsxDemo",
//   props: ['a', 'b'],
//   setup() {
//   }
// })