import { handleRouter } from "./handle-router"
import { rewriteRouter } from "./rewrite-router"

// {name, activeRule, entry, container, bootstrap, mount, unmout ... }
let _apps = []

export const getApps = () => _apps

export const registerMicroApps = (apps) => {
  _apps = apps
}

export const start = () => {
  //====== 微前端运行原理：  
  rewriteRouter()

  // 初始执行匹配
  handleRouter()
}

export const runAfterFirstMounted = (cb) => cb()