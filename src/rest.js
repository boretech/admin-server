export const restify = (prefix) => {
  prefix = prefix || '/api/'
  return async (ctx, next) => {
    if (ctx.request.path.startsWith(prefix)) {
      console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`)
      ctx.rest = (data) => {
        ctx.response.type = 'application/json'
        ctx.response.body = data
      }
      try {
        await next()
      } catch (e) {
        console.log('Process API error...')
        ctx.response.status = 400
        ctx.response.type = 'application/json'
        ctx.response.body = {
          code: e.code || 'internal:unknown_error',
          message: e.message || ''
        }
      }
    }
  }
}

export const APIError = (code, message) => ({
  code: code || 'internal:unknown_error',
  message: message || ''
})

export default {
  restify,
  APIError
}