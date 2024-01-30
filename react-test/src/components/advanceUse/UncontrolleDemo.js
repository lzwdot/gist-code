import React from "react";

// class 组件
class UncontrolleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'lzw',
      flag: true
    }
    this.nameInputRef = React.createRef() // 创建 ref
    this.fileInputRef = React.createRef() // 创建 ref
  }


  render() {
    // input defaultValue
    // return <div>
    //   {/* 使用 defaultValue 而不是 value，使用 ref */}
    //   <input defaultValue={this.state.name} ref={this.nameInputRef}/>
    //   {/*state 并会不随着改变*/}
    //   <span>state.name:{this.state.name}</span>
    //   <br/>
    //   <button onClick={this.alertName}>alert name</button>
    // </div>

    // checkbox defaultChecked
    // return <div>
    //   <input type="checkbox" defaultChecked={this.state.flag}/>
    //   <span>state.flag:{this.state.flag.toString()}</span>
    // </div>

    // file
    return <div>
      <input type="file" ref={this.fileInputRef}/>
      <button onClick={this.alertFile}>alert file</button>
    </div>
  }

  alertName = () => {
    const elem = this.nameInputRef.current // 通过 ref 获取 DOM 节点
    alert(elem.value) // 不是 this.state.value
  }

  alertFile = () => {
    const elem = this.fileInputRef.current  // 通过 ref 获取 DOM 节点
    alert(elem.files[0].name)
  }
}

export default UncontrolleDemo