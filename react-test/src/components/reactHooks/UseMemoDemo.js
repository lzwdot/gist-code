import React, {memo, useMemo, useState} from "react";

// 子组件
// function Child({userInfo}) {
//   console.log('child render ...', userInfo)
//
//   return <div>
//     <p>this is child {userInfo.name} {userInfo.age}</p>
//   </div>
// }

// 类似 class PureComponent，对 props 进行浅层比较
const Child = memo(({userInfo}) => {
  console.log('child render ...', userInfo)

  return <div>
    <p>this is child {userInfo.name} {userInfo.age}</p>
  </div>
})

// 父组件
function UseMemoDemo() {
  console.log('parent render ...')

  const [count, setCount] = useState(0)
  const [name, setName] = useState('lzw')

  // const userInfo = {name, age: 20}
  // 用 useMemo 缓存数据，有依赖
  const userInfo = useMemo(() => {
    return {name, age: 21}
  }, [name])

  return <div>
    <p>
      count is {count}
      <button onClick={() => setCount(count + 1)}>click</button>
    </p>
    <Child userInfo={userInfo}></Child>
  </div>
}

export default UseMemoDemo