const Koa = require('koa')
const path = require("path");
const Router = require('@koa/router')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')

const app = new Koa()
const router = new Router()

const { User } = require('./db')
const port = 8000

app.use(cors())
app.use(koaStatic(path.join(__dirname, '/static')))
app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true,
    maxFieldsSize: 10 * 1024 * 1024,
    uploadDir: path.join(__dirname, "/static")
  }
}))
app
  .use(router.routes())
  .use(router.allowedMethods());



router.get('/getUserInfo', async (ctx) => {
  const result = await User.findOne({ where: { id: 1 } })
  ctx.body = {
    code: 200,
    data: result
  }
})

router.post('/setUserInfo', async (ctx) => {
  console.log(ctx.request.body);
  const result = await User.update(ctx.request.body, {
    where: { id: 1 }
  });
  console.log(result);
  ctx.body = {
    code: 200,
    data: result
  }
})

router.post('/upload', (ctx) => {
  console.log(ctx.request.files.file.newFilename)
  ctx.body = {
    code: 200,
    data: {
      url: 'http://localhost:' + port,
      path: ctx.request.files.file.newFilename
    }
  }
})

app.listen(port, () => {
  console.log('server run on http://localhost:' + port)
})
