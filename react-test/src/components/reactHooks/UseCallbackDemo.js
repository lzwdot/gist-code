import React, {memo, useMemo, useState, useCallback} from "react";

// 子组件， memo 类似 class PureComponent，对 props 进行浅层比较
const Child = memo(({userInfo, onChange}) => {
  console.log('child render ...', userInfo)

  return <div>
    <p>this is child {userInfo.name} {userInfo.age}</p>
    <input onChange={onChange}/>
  </div>
})

// 父组件
function UseCallbackDemo() {
  console.log('parent render ...')

  const [count, setCount] = useState(0)
  const [name, setName] = useState('lzw')

  // 用 useMemo 缓存数据，有依赖
  const userInfo = useMemo(() => {
    return {name, age: 21}
  }, [name])

  // function onChange(e) {
  //   console.log(e.target.value)
  // }
  // 用 useCallback 缓存函数
  const onChange = useCallback(e => {
    console.log(e.target.value)
  }, []);


  return <div>
    <p>
      count is {count}
      <button onClick={() => setCount(count + 1)}>click</button>
    </p>
    <Child userInfo={userInfo} onChange={onChange}></Child>
  </div>
}

export default UseCallbackDemo