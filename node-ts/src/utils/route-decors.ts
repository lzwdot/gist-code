import * as glob from 'glob'
import * as Koa from 'koa'
import * as KoaRouter from "koa-router"

const router = new KoaRouter()

/*
export const get = (path: string) => {
    // target => User, property => list
    return (target, property) => {
        // 注册路由
        router.get(path, target[property])
    }
}
*/

type RouteOptions = {
  prefix?: string;
  middlewares?: Array<Koa.Middleware>
}

// router 引用透明原则
const createMethod = (router: KoaRouter) => (method: 'get' | 'post' | 'delete' | 'put') => (path: string, options: RouteOptions = {}) => {
  // target => User, property => add
  return (target, property) => {
    process.nextTick(() => {
      const middlewares = []

      if (target.middlewares) {
        middlewares.push(...target.middlewares)
      }

      if (options.middlewares) {
        middlewares.push(...options.middlewares)
      }
      middlewares.push(target[property])
      // 注册路由
      router[method](path, ...middlewares)
    })
  }
}

const method = createMethod(router)
export const get = method('get')
export const post = method('post')

export const middlewares = function middlewares(middlewares: Koa.Middleware[]) {
  return function (target) {
    target.prototype.middlewares = middlewares
  }
}

export const load = (folder: string): KoaRouter => {
  const extname = '.{js,ts}'
  glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach(item => {
    require(item)
  })

  return router
}