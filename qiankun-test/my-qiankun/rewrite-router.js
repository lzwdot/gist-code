import { handleRouter } from "./handle-router"

let prevRoute = '' // 上一个路由
let nextRoute = window.location.pathname // 下一个路由

export const getPrevRoute = () => prevRoute
export const getNextRoute = () => nextRoute

/**
 * 监听路由变化
 */
export const rewriteRouter = () => {
  /**
   * 1、监事路由变化-----这里需要 router-link 路由
   * - hash 路由: window.onhashchange
   * - history 路由
   *   - history.go history.back history.forward 使用 window.onpopstate 
   *   - history.pushState history.replaceState 需要函数重写方式进行劫持 
   */
  window.addEventListener('popstate', () => {
    console.log('popstate=======')
    // 这里处理有点不一样，触发 popstate 时，只能拿到最新的路由
    prevRoute = nextRoute // 之前的
    nextRoute = window.location.pathname // 最新的
    handleRouter()
  })

  const rawPushState = window.history.pushState
  window.history.pushState = (...args) => {
    console.log('pushState=======')
    // 导航前
    prevRoute = window.location.pathname
    rawPushState.apply(window.history, args)
    // 导航后
    nextRoute = window.location.pathname
    handleRouter()
  }

  const rawReplaceState = window.history.replaceState
  window.history.replaceState = (...args) => {
    console.log('replaceState=======')
    // 导航前
    prevRoute = window.location.pathname
    rawReplaceState.apply(window.history, args)
    // 导航后
    nextRoute = window.location.pathname
    // handleRouter() // vue3 有 bug 得处理下
  }
}