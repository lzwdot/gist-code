/**
 * 处理路由变化
 */

import { getApps } from "./index.js"
import { importHTML } from './import-html.js'
import { fetchResource } from "./fetch-resource.js"
import { getNextRoute, getPrevRoute } from "./rewrite-router.js"

export const handleRouter = async () => {
  /**
   * 2、匹配子路由
   * - 获取到当前路由路径
   * - 去 apps 里面查找
   */
  const apps = getApps()

  // 上一个应用 
  const prevApp = apps.find(item => getPrevRoute().startsWith(item.activeRule))
  // 下一个应用
  const app = apps.find(item => getNextRoute().startsWith(item.activeRule))

  // 上一个应用存在，得先销毁
  if (prevApp) {
    await unmount(prevApp)
  }
  // 下一个应用，不存在
  if (!app) {
    return
  }

  /**
   * 3、加载子应用
   * - 请求获取子应用的资源：html css js img
   */

  const container = document.querySelector(app.container)

  /* 内容不会渲染的原因
  * - 需要执行 js 来生成内容
  * - 浏览器出于安全考虑，innerHTML 中的 js 不会加载执行
  */

  // const html = await fetchResource(app.entry)
  // container.innerHTML = html

  /*
  * 那么，手动加载执行子应用的 js 
  * - eval 或 new function
  */
  const { template, getExternalScripts, execScripts } = await importHTML(app.entry)
  container.appendChild(template)

  // qiankun 标识，按照子应用进行渲染
  window.__POWERED_BY_QIANKUN__ = true 
  // 加载图片时，动态设置 __webpack_public_path__ 
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + '/' 

  // 拿到子应用生命周期钩子
  const appExports = await execScripts()
  app.bootstrap = appExports.bootstrap
  app.mount = appExports.mount
  app.unmount = appExports.unmount

  await bootstrap(app)
  await mount(app)

  // 4、渲染子应用
}

// 定义函数
async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap())
}
async function mount(app) {
  app.mount && (await app.mount({
    container: document.querySelector(app.container)
  }))
}
async function unmount(app) {
  app.unmount && (await app.unmount({
    container: document.querySelector(app.container)
  }))
}