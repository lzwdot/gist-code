// 组件
import Tree from './tree'
// 样式
import './styles/index.scss'
import './styles/checkbox.scss'

Tree.install = function(Vue) {
  Vue.component(Tree.name, Tree)
}

export default Tree
