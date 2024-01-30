import React from "react";
import PropTypes from 'prop-types'

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    }
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    return (
      <div style={{height: '500px'}} onMouseMove={this.handleMouseMove}>
        {/*将当前 state 作为 props，传递给 render （render 是一个函数组件）*/}
        {this.props.render(this.state)}
      </div>
    )
  }
}

Mouse.propTypes = {
  render: PropTypes.func.isRequired // 必须接收一个 render 属性，而且函数
}

const App = (props) => (
  <div style={{height: '500px'}}>
    <p>a:{props.a}</p>
    <Mouse render={
      // render 是一个函数组件
      ({x, y}) => <h1>The Mouse position is ({x},{y})</h1>
    }/>
  </div>
)

// 定义了 Mouse 组件，只有获取 x y 的能力
// 至于 Mouse 组件如何渲染，App 说了算，通过 render prop 的方式告诉 Mouse 组件

export default App