import React from "react";
// import UncontrolleDemo from "./UncontrolleDemo";
// import PortalsDemo from "./PortalsDemo";
// import ContextDemo from "./ContextDemo";
import LazyDemo from "./LazyDemo";
import TodoListDemo from "./ScuDemo2";
import HOCDemo from './HOCDemo'
import RenderPropDemo from './RenderPropDemo'

class AdvanceUse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      {/*<UncontrolleDemo/>*/}
      {/*<PortalsDemo> modal 内容</PortalsDemo>*/}
      {/*<ContextDemo></ContextDemo>*/}
      {/*<LazyDemo></LazyDemo>*/}
      {/*<TodoListDemo></TodoListDemo>*/}
      {/*<HOCDemo a="123"/>*/}
      <RenderPropDemo a="456"/>
    </div>
  }
}

export default AdvanceUse
