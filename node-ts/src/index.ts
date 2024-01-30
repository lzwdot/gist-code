/** 装饰器代码测试

 function decorate(target, propertype, descriptor) {
    const oldVal = descriptor.value
    descriptor.value = msg => {
        msg = `[${msg}]`
        return oldVal.apply(null, [msg])
    }
    return descriptor
}

 class Log {
    @decorate // anotation 注解风格的装饰器（ts 中）
    print(msg) {
        console.log(msg)
    }
}

 const anotation = (target, proterty, decorate) => {
    const descriptor = decorate(
        target.prototype,
        proterty,
        Object.getOwnPropertyDescriptor(target.prototype, proterty)
    )
    Object.defineProperty(target.prototype, proterty, descriptor)
}

 anotation(Log, 'print', decorate)

 // 装饰器模式
 const createDec = sender => (target, property) => {
    const old = target.prototype[property]
    target.prototype[property] = msg => {
        msg = `${sender}:{${msg}}`
        old(msg)
    }
}
 const dec = createDec('lzw')
 dec(Log, 'print')

 const log = new Log()
 log.print('hello')

 */

import * as Koa from 'koa'
import * as bodify from 'koa-bodyparser'
import * as KoaRouter from "koa-router"
import {Sequelize} from "sequelize-typescript";

const app = new Koa()
const database = new Sequelize({
  port: 3306,
  database: 'wordpress',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
  modelPaths: [`${__dirname}/model`]
})
database['sync']({force: true})


app.use(bodify({
  // multipart: true,
  // 使用非严格模式，解析 delete 请求的请求
  strict: false
}))

// const router = new KoaRouter()
// router.get('/abc', ctx => {
//     ctx.body = 'abc'
// })
//
// app.use(router.routes())

import {load} from './utils/route-decors'
import {resolve} from 'path'

const router = load(resolve(__dirname, './routes'))
app.use(router.routes())
app.listen(8080, () => {
  console.log('服务器启动')
})