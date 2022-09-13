import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import controller from './controller/index.js'
import { getStatic } from './static.js'
import { restify } from './rest.js'
import { join } from 'path'
import jwt from 'koa-jwt'
import { unlessList, secret } from './jwt/config.js'

const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  ctx.response.set('X-Response-Time', `${ms}ms`)
})

app.use(getStatic('/', join(process.cwd(), '/static')))

app.use(bodyParser())

app.use(jwt({
  secret,
  cookie: 'Authorization',
  debug: true
}).unless({ path: unlessList }))

app.use(restify())

app.use(controller())

app.listen(3200)

console.log('listening on port 3200...')
