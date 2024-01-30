import React from "react";

class PureComponentDemo extends React.PureComponent{
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    // 浅比较
  }
}