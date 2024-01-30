import Vue from 'vue'

// 传入组件配置，
// 将它实例化，挂载到body

export function create(Componet, props) {
  // 实例化的方式
  // 1. extend
  // 2. new Vue({render(){})

  //============ 第二种方式
  const vm = new Vue({
    render: h => {
      return h(Componet, {props})
    }
  })
  // 挂载才能获得 dom
  vm.$mount()

  // 手动追加，不覆盖原有内容
  document.body.appendChild(vm.$el)

  // 获取组件实例
  const comp = vm.$children[0]

  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp
}