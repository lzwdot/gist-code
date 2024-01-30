import React from "react";
import List from './ListDemo'

class JSXBaseDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'lzw',
      imgUrl: 'https://gravatar.loli.net/avatar/c0cd88e37cadb689c9c79caa0e9ac1f8?s=128',
      flag: true
    }
  }

  render() {
    // 获取变量 插值
    const pElem = <p>{this.state.name}</p>
    // return pElem

    // 表达式
    const exprElem = <p>{this.state.flag ? 'yes' : 'no'}</p>
    // return exprElem

    // 子元素
    const imgElem = <div>
      <p>我的头像</p>
      <img src={this.state.imgUrl} alt=""/>
    </div>
    // return imgElem

    // class
    const classElem = <p className="title">设置 class </p>
    // return classElem

    // style
    const styleData = {fontSize: '30px', color: 'red'}
    let styleElem = <p style={styleData}>设置 style </p>
    // 内联写法 注意是： {{}}
    styleElem = <p style={{fontSize: '50px', color: 'green'}}>设置 style</p>
    // return styleElem

    // 原始 html
    const rawHtml = '<sapn>富文本内容<i>斜体</i><b>粗体</b></sapn>'
    const rawHtmlData = {
      __html: rawHtml // 注意，必须是这种格式
    }
    const rawHtmlElem = <div>
      {/*显示 html*/}
      <p dangerouslySetInnerHTML={rawHtmlData}></p>
      {/*显示源代码*/}
      <p>{rawHtml}</p>
    </div>
    // return rawHtmlElem

    // 加载组件
    const componentElem = <div>
      <p>JSX 中加载一个组件</p>
      <List/>
    </div>
    return componentElem
  }
}

export default JSXBaseDemo