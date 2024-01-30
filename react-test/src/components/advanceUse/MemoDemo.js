import React from "react";

function MyComponent(props) {
  // 使用 props 渲染
}

function areEqual(prevProps, nextProps) {
  // 如果把 nextProps 传入 render 方法的返回结果
  // 与将 prevProps 传入 render 方法的返回结果一致的话则返回 true，
  // 否则返回 false
}

export default React.memo(MyComponent, areEqual)
