import sign from 'jsonwebtoken/sign.js'
import { secret, expiresIn } from './config.js'

export const genToken = userInfo => sign(userInfo, secret, { expiresIn })

export const unauthorized = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.response.status = 200
      ctx.response.type = 'application/json'
      ctx.response.body = {
        success: false,
        code: 401,
        message: '该请求未获授权',
        data: null
      }
    } else {
      throw err
    }
  })
}