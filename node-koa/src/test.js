const Koa = require('./index')
const Router = require('./router')
const app = new Koa()
const router = new Router()

router.get('/index', async ctx => {
  ctx.body = 'index'
})
router.get('/post', async ctx => {
  ctx.body = 'post'
})
router.get('/list', async ctx => {
  ctx.body = 'list'
})
router.post('/index', async ctx => {
  ctx.body = 'post index'
})
app.use(router.routes())

// app.use((req,res)=>{
//   res.writeHead(200)
//   res.end('hi 666')
// })

// app.use(ctx => {
//   ctx.body = 'hi 666'
// })

app.listen(8080, () => {
  console.log('start at 8080')
})