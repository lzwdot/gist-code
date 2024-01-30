import React, {useState} from "react";

class ClickCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0}

    this.setCount = this.setCount.bind(this)
  }

  render() {
    return <div>
      <p>你点击了多少次 {this.state.count}</p>
      <button onClick={this.setCount}>点击</button>
    </div>
  }

  setCount() {
    this.setState({
      count: this.state.count + 1
    })
  }
}

export default ClickCounter