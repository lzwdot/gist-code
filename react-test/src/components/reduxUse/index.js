import React from 'react'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import rootReducer from './reducers'
import App from './components/App'

// 异步 action，需要引入中间件 redux-thunk
let store = createStore(rootReducer,applyMiddleware(thunk))

export default function () {
  return <Provider store={store}>
    <App/>
  </Provider>
}
