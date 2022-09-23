import sign from 'jsonwebtoken/sign.js'

// controller 中的 public module 默认添加到该列表中
// 其他的接口可手动添加到数组中
export const withoutToken = [
  '/api/getToken',
  '/api/test_api'
]

export const secret = 'boretech_server_secret'

export const expiresIn = 60 * 60 * 24 * 1

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

export default {
  secret,
  expiresIn,
  withoutToken
}