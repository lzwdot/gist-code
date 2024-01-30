import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React18 子应用</h1>
        <p>
          <Link to='/helloworld'>React18 Hello World</Link>
          <a href='/vue3/helloworld'>Vue3 Hello World</a>
          </p>
        <Routes>
          <Route path="/helloworld" element={<HelloWorld />} />
        </Routes>
      {/* </header> */}
    </div>
  );
}

function HelloWorld() {
  return (
    <>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </>
  );
}

export default App;
