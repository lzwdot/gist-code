class Router {
  constructor() {
    this.stack = []
  }

  register(path, methods, middleware) {
    let route = {path, methods, middleware}
    this.stack.push(route)
  }

  get(path, middleware) {
    this.register(path, 'get', middleware)
  }

  post(path, middleware) {
    this.register(path, 'post', middleware)
  }

  routes() {
    let stock = this.stack
    return async function (ctx, next) {
      let currPath = ctx.url
      let route

      for (let i = 0; i < stock.length; i++) {
        let item = stock[i]

        console.log(currPath, ctx.method)

        // 判断 path 和 method
        if (currPath === item.path && item.methods.indexOf(ctx.method) >= 0) {
          route = item.middleware
          break
        }
      }

      if (typeof route === 'function') {
        route(ctx, next)
        return
      }
    }
  }
}

module.exports = Router
