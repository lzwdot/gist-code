import logo from './logo.svg';
import './App.css';
import BaseUse from './components/baseUse'
import AdvanceUse from "./components/advanceUse";
import React from "react";
import Immutable from "immutable";
import ReduxDemo from './components/reduxUse'
import FaqDemo from "./components/faqDemo";
import ReactHooks from "./components/reactHooks";

// import JSXBaseDemo from "./components/baseUse/JSXBaseDemo";

function App() {
  return (
    <div className="App">
      <p>React App</p>
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      {/*<BaseUse/>*/}
      {/*<AdvanceUse/>*/}
      {/*<JSXBaseDemo/>*/}
      {/*<ReduxDemo />*/}
      {/*<FaqDemo/>*/}
      <ReactHooks />
    </div>
  );
}

// const map1 = Immutable.Map({a: 1, b: 2, c: 3})
// const map2 = map1.set('b', 50)
// console.log(map1.get('b')) // 2
// console.log(map2.get('b')) // 50


export default App;

