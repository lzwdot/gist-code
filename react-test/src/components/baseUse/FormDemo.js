import React from "react";

class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'lzw.',
      info: '个人信息',
      city: 'changsha',
      flag: true,
      gender: 'male'
    }
  }

  render() {
    // 受控组件，类似 v-model（state.name 受到 input 事件控制改变值）
    // return <div>
    //   <p>{this.state.name}</p>
    //   {/*用 htmlFor 代替 for*/}
    //   <label htmlFor="inputName">姓名：</label>
    //   <input id="inputName" value={this.state.name} onChange={this.onInputChange}/>
    // </div>

    // textarea - 使用 value
    // return <div>
    //   <textarea value={this.state.info} onChange={this.onTextareaChange}></textarea>
    //   <p>{this.state.info}</p>
    // </div>

    // select - 使用 value
    // return <div>
    //   <select value={this.state.city} onChange={this.onSelectChange}>
    //     <option value="beijing">北京</option>
    //     <option value="shanghai">上海</option>
    //     <option value="shenzhen">深圳</option>
    //   </select>
    //   <p>{this.state.city}</p>
    // </div>

    // checkbox
    // return <div>
    //   <input type="checkbox" checked={this.state.flag} onChange={this.onCheckboxChange}/>
    //   <p>{this.state.flag.toString()}</p>
    // </div>

    // radio
    return <div>
      <input type="radio" value="male" checked={this.state.gender === 'male'} onChange={this.onRadioChange}/>
      <input type="radio" value="female" checked={this.state.gender === 'female'} onChange={this.onRadioChange}/>
      <p>{this.state.gender}</p>
    </div>
  }

  onInputChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onTextareaChange = (e) => {
    this.setState({
      info: e.target.value
    })
  }

  onSelectChange = (e) => {
    this.setState({
      city: e.target.value
    })
  }
  onCheckboxChange = (e) => {
    this.setState({
      flag: !this.state.flag
    })
  }

  onRadioChange = (e) => {
    this.setState({
      gender: e.target.value
    })
  }

  componentWillUnmount() {
  }
}

export default FormDemo