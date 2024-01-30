import React, {useState, useEffect} from "react";

function LifeCycles() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('lzw.')

  // 模拟 class 组件的 DidMount 和 DidUpdate
  // useEffect(() => {
  //   console.log('此处发送一个 Ajax 请求')
  // })

  // 模拟 class 组件的 DidMount
  useEffect(() => {
    console.log('加载完了')
  }, []) // 第二个参数是 [] （不依赖任何 state）

  // 模拟 class 组件的 DidUpdate
  useEffect(() => {
    console.log('更新了')
  }, [count, name]) // 第二个参数是依赖的 state

  // 模拟 class 组件的 DidMount
  useEffect(() => {
    let timerId = setInterval(() => {
      console.log(Date.now())
    }, 1000)

    // 返回函数
    // 模拟 class 组件的 WillUnMount
    return () => {
      clearInterval(timerId)
    }
  }, [])

  function setVal() {
    setCount(count + 1)
    setName(name + '-' + count)
  }

  return <div>
    <p>你点击了多少次 {count} 次 {name}</p>
    <button onClick={setVal}>点击</button>
  </div>
}

export default LifeCycles