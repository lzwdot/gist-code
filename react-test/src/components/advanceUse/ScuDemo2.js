import React from "react";
import PropTypes from 'prop-types'
import lodash from 'lodash'

// 子组件
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  render() {
    return <div>
      <input value={this.state.title} onChange={this.onTitleChange}/>
      <button onClick={this.onSubmit}>提交</button>
    </div>
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  onSubmit = (e) => {
    // 子组件接收函数
    const {submitTitle} = this.props
    submitTitle(this.state.title)

    this.setState({
      title: ''
    })
  }
}

// props 类型检查
Input.propTypes = {
  submitTitle: PropTypes.func.isRequired
}

// 子组件
class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // 子组件接收参数
    const {list} = this.props

    return <ul>
      {list.map((item, index) => {
        return <li key={item.id}>
          <span>{item.title}</span>
        </li>
      })}
    </ul>
  }

  // 增加 shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // lodash.isEqual 做对象或者数组的深度比较
    if (lodash.isEqual(nextProps.list, this.props.list)) {
      // 相等，则不重复渲染
      return false
    }
    return true // 不相等，则渲染
  }
}

// props 类型检查
List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
}

// 子组件
// class Footer extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return <p>
//       {this.props.text}
//     </p>
//   }
//
//   componentDidUpdate() {
//     // 当更新父组件时，会一直执行此
//     console.log('footer add update')
//   }
//
//   // shouldComponentUpdate 默认返回 true
//   shouldComponentUpdate(nextProps, nextState, nextContext) {
//     if (nextProps.text !== this.props.text) {
//       return true // 可以渲染
//     }
//     return false // 不重复渲染
//   }
//
//   // React 默认：父组件有更新，子组件则无条件也更新
//   // 性能优化对于 React 更加重要
//   // SCU 一定要每次都要么？ - 需要是才优化
// }

// 父组件
class TodoListDemo extends React.Component {
  constructor(props) {
    super(props);
    // 状态（数据）提升
    this.state = {
      list: [
        {
          id: 'id-1',
          title: '标题1'
        },
        {
          id: 'id-2',
          title: '标题2'
        },
        {
          id: 'id-3',
          title: '标题3'
        }
      ],
      footerInfo: '底部文字'
    }
  }

  render() {
    return <div>
      {/*父组件传递函数*/}
      <Input submitTitle={this.onSubmitTitle}></Input>
      {/*父组件传递参数*/}
      <List list={this.state.list}></List>
      {/*<Footer text={this.state.footerInfo}/>*/}
    </div>
  }

  onSubmitTitle = (title) => {
    this.setState({
      list: this.state.list.concat({
        id: `id-${Date.now()}`,
        title
      })
    })

    // 为了演示 SCU，故意写错
    // this.state.list.push({
    //   id: `id-${Date.now()}`,
    //   title
    // })
    // this.setState({
    //   list: this.state.list
    // })
  }
}

export default TodoListDemo