
export const timer = () => async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  ctx.response.set('X-Response-Time', `${ms}ms`)
}

export default timer