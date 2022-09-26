export const BadRequest = (message = '请求失败') => ({
  success: false,
  data: null,
  code: 400,
  message
})

export const Unauthorized = (message = '未获授权') => ({
  success: false,
  data: null,
  code: 401,
  message
})

export const Forbidden = (message = '禁止访问') => ({
  success: false,
  data: null,
  code: 403,
  message
})

export const NotFound = (message = '资源未找到') => ({
  success: false,
  data: null,
  code: 404,
  message
})

export const InternalServerError = (message = '服务器内部错误') => ({
  success: false,
  data: null,
  code: 500,
  message
})

export const catchError = async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) {
      throw NotFound()
    }
  } catch (err) {
    // console.log(err.status)
    ctx.response.status = 200
    switch (err.status) {
      case 401:
        ctx.response.body = Unauthorized()
        break
      case 403:
        ctx.response.body = Forbidden()
        break
      case 404:
        ctx.response.body = NotFound()
        break
      case 500:
        ctx.response.body = InternalServerError()
        break
      default:
        ctx.response.body = BadRequest()
    }
  }
} 