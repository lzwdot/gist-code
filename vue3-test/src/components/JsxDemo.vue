<script>
import {ref} from "vue";

export default {
  name: "JsxDemo",
  setup() {
    const countRef = ref(100)
    const render = () => {
      return <p>Jsx Demo {countRef.value}</p>
    }
    // 必须返回一个函数
    return render
  }
}
</script>