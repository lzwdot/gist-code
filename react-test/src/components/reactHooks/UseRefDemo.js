import React, {useEffect, useRef} from "react";

function UseRefDemo() {
  const btnRef = useRef(null) // 初始值
  const numRef = useRef(100);
  console.log(numRef.current) // 100

  useEffect(() => {
    console.log(btnRef.current) // DOM 节点 <button>click</button>
  }, [])

  return <div>
    <button ref={btnRef}>click</button>
  </div>
}

export default UseRefDemo