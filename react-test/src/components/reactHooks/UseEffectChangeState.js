import {useEffect, useState, useRef} from "react";

function UseEffectChangeState() {
  const [count, setCount] = useState(0)

  // 模拟 DidMount
  let countRef = useRef(0)//解决办法
  useEffect(() => {
    console.log('useEffect...', count)

    // 定时任务
    const timer = setInterval(() => {
      // console.log('setInterval...', count)
      // setCount(count + 1)
      //解决办法-----
      console.log('setInterval...', countRef.current)
      setCount(++countRef.current)
      //解决办法-----
    }, 1000)

    // 清除定时任务
    return () => clearInterval(timer)
  }, []) // 依赖是 []

  // 依赖是 [] 时： re-render 不会重新执行 effect 函数
  // 没有依赖：re-render 会重新执行 effect 函数

  return <div>count: {count}</div>
}

export default UseEffectChangeState