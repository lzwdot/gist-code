import {get, post, middlewares} from '../utils/route-decors'

const users = [{
  name: 'lzw'
}]

import model from '../model/User'

@middlewares([
  async function guard(ctx, next) {
    if (ctx.header.token) {
      await next()
    } else {
      throw '请登录'
    }
  }
])
export default class User {
  @get('/users')
  public async list(ctx) {
    // ctx.body = {ok: 1, users}
    const data = await model.findAll()
    ctx.body = {ok: 1, data}
  }

  @post('/users', {
    middlewares: [
      async function (ctx, next) {
        // 用户名必填
        const name = ctx.request.body.name
        if (!name) {
          throw '请输入用户名'
        }
        await next()
      }
    ]
  })
  public add(ctx) {
    users.push(ctx.request.body)
    ctx.body = {ok: 1}
  }
}