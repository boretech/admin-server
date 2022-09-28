import sign from 'jsonwebtoken/sign.js'
import verify from 'jsonwebtoken/verify.js'
import publicAPI from '../controller/modules/public.js'

// controller 中的 public module 默认添加到该列表中
// 其他的接口可手动添加到数组中
export const withoutTokenList = [
  '/api/register',
  '/api/login'
]

export const secret = 'boretech_server_secret'

export const expiresIn = 60 * 60 * 24 * 1
// export const expiresIn = 10

export const createWithoutToken = () => {
  const modules = Object.keys(publicAPI).map(item => item.split(' ')[1])
  return withoutTokenList.concat(modules)
}

export const genToken = userInfo => sign(userInfo, secret, { expiresIn })

export const verifyToken = (ctx) => verify(ctx.request.headers.authorization.split(' ')[1], secret)

export const unauthorized = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
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
  }
}

export default {
  secret,
  expiresIn,
  createWithoutToken,
  unauthorized,
  genToken
}