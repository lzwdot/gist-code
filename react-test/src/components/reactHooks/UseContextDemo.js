import React, {useContext} from "react";

const themes = {
  light: {
    foreground: '#000',
    background: '#eee'
  },
  dark: {
    foreground: '#fff',
    background: '#222'
  }
}
// 创建 Context
const ThemeContext = React.createContext(themes.light)

// 孙子组件
function ThemeButton() {
  const theme = useContext(ThemeContext);
  return <button style={{background: theme.background, color: theme.foreground}}>
    hello world
  </button>
}

// 子组件
function Toolbar() {
  return <div>
    <ThemeButton></ThemeButton>
  </div>
}

// 父组件
function UseContextDemo() {
  return <ThemeContext.Provider value={themes.dark}>
    <Toolbar></Toolbar>
  </ThemeContext.Provider>
}

export default UseContextDemo