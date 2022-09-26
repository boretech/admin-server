import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { join } from 'path'
import jwt from 'koa-jwt'
import { catchError } from './middleware/errors.js'
import controller from './controller/index.js'
import timer from './middleware/timer.js'
import getStatic from './middleware/static/index.js'
import { createWithoutToken, secret } from './middleware/jwt.js'
import response from './response.js'

const app = new Koa()

app
  .use(catchError)  // 错误处理
  .use(timer())  // 请求计时器，用于返回前端请求花费的服务器时间
  .use(getStatic('/', join(process.cwd(), '/static')))  // 静态资源请求，对应服务器端 /static 文件夹内容
  .use(bodyParser())  // body 数据格式解析
  .use(jwt({
    secret,
    cookie: 'Authorization',
    debug: true
  }).unless({ path: createWithoutToken() }))  // 进行 jwt 验证
  // .use(response())  // 返回拦截器，用于处理返回封装
  .use(controller())  // 具体逻辑处理模块
  .listen(3200)  // 监听端口

console.log(`${process.env.NODE_ENV} listening on port 3200...`)
