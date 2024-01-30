const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  console.log(`${ctx.url}耗时${parseInt(end - start)}`)
})

app.use((ctx, next) => {
  ctx.body = [{
    name: 'lzw'
  }]
})

app.listen(8080, () => {
  console.log('koa start 3000')
})