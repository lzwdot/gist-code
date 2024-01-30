import React from "react";
import ReactDom from 'react-dom'
import './style.css'

class PortalsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    // 正常渲染
    // return <div className="modal">
    //   {/*类似 Vue slot*/}
    //   {this.props.children}
    // </div>

    // 使用 Portals 渲染到 body 上
    return ReactDom.createPortal(
      <div className="modal">
        {/*类似 Vue slot*/}
        {this.props.children}
      </div>,
      document.body // DOM 节点
    )
  }
}

export default PortalsDemo