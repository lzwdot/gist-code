import {useState, useEffect} from "react";

function useMousePosition() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    function mouseMoveHandler(e) {
      setX(e.clientX)
      setY(e.clientY)
    }

    // 绑定事件
    document.body.addEventListener("mousemove", mouseMoveHandler)

    // 解绑事情
    return () => document.body.removeEventListener("mousemove", mouseMoveHandler)
  }, [])

  return [x, y]
}

export default useMousePosition