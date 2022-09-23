import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { join } from 'path'
import jwt from 'koa-jwt'
import controller from './controller/index.js'
import timer from './middleware/timer.js'
import getStatic from './middleware/static/index.js'
import response from './response.js'

import { withoutToken, secret } from './jwt/config.js'
import { unauthorized } from './jwt/index.js'

const app = new Koa()

// 请求计时器，用于返回前端请求花费的服务器时间
app.use(timer())

// 静态资源请求，对应服务器端 /static 文件夹内容
app.use(getStatic('/', join(process.cwd(), '/static')))

// body 数据格式解析
app.use(bodyParser())

// 进行 jwt 验证
app.use(jwt({
  secret,
  cookie: 'Authorization',
  debug: true
}).unless({ path: withoutToken }))

// 返回拦截器，用于处理返回封装
app.use(response())

app.use(controller())

app.listen(3200)

console.log(`${process.env.NODE_ENV} listening on port 3200...`)
