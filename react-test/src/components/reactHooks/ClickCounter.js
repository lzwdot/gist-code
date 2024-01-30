import React, {useState} from "react";

function ClickCounter() {
  // 数组的解构
  // const arr = userState(0)
  // const count = arr[0]
  // const setCount = arr[1]
  // useState 就是一个 Hook，最基本的一个 Hook
  const [count, setCount] = useState(0)
  const [name, setName] = useState('lzw.')

  function setVal() {
    setCount(count + 1)
    setName(name + '-' + count)
  }

  return <div>
    <p>你点击了多少次 {count} 次 {name}</p>
    <button onClick={setVal}>点击</button>
  </div>
}

export default ClickCounter