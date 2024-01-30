import React from "react";

// class 组件
class ListDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = [
      {
        id: 'id-1',
        title: '标题-1'
      },
      {
        id: 'id-2',
        title: '标题-2'
      },
      {
        id: 'id-3',
        title: '标题-3'
      }
    ]
  }

  render() {
    return <ul>
      {
        // 类似 Vue v-for
        this.state.map(
          (item, index) => {
            // 这里的 key 和 Vue 的 key 类似，必填，不能是 index 或 random
            return <li key={item.id}>
              index {index}; title {item.title}
            </li>
          }
        )
      }
    </ul>
  }
}

// 函数组件
function List(props) {
  return <ul>
    {
      // 类似 Vue v-for
      this.state.map(
        (item, index) => {
          // 这里的 key 和 Vue 的 key 类似，必填，不能是 index 或 random
          return <li key={item.id}>
            index {index}; title {item.title}
          </li>
        }
      )
    }
  </ul>
}

export default ListDemo