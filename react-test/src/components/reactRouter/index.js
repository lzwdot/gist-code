import React, {Suspense, lazy} from "react";
// hash 模式
import {HashRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
// H5 history 模式
// import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const Home = lazy(() => import('./routes/Home'))
const About = lazy(() => import('./routes/About'))
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
    </Suspense>
  </Router>
)


function Project() {
  // 获取 url 参数 如：'project/100'
  const {id} = useParams()
  console.log('id', id)

  return (
    <div>
      <Link to="/">首页</Link>
    </div>
  )
}


function RouterComponent() {
  return (
    <Router>
      <Switch>
        {/*首页*/}
        <Route exact path="/">
          <Home/>
        </Route>
        {/*动态路由*/}
        <Route path="/project/:id">
          <Project/>
        </Route>
        {/*默认路由*/}
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  )
}


