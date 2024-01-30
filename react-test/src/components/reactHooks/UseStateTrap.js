import {useState} from "react";

// 子组件
function Child({userInfo}) {
  // render: 初始化 state
  // re-render: 只恢复初始化的 state 值，不会再重新设置新的值
  // 只能用 setName 修改
  const [name, setName] = useState(userInfo.name)

  return <div>
    <p>child, props name:{userInfo.name}</p>
    <p>child, state name:{name}</p>
  </div>
}

function UseStateTrap() {
  const [name, setName] = useState('lzw')
  const userInfo = {name}

  return <div>
    <div>
      parent &nbsp;
      <button onClick={() => setName('张三')}>setName</button>
    </div>
    <Child userInfo={userInfo}/>
  </div>
}

export default UseStateTrap