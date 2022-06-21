import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import controller from './controller.js'
import { getStatic } from './static.js'
import { join } from 'path'

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.response.body = 'hello'
})

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  ctx.response.set('X-Response-Time', `${ms}ms`)
})

app.use(getStatic('/static/', join(process.cwd(), '/static')))

app.listen(3200)
