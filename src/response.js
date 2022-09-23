export const response = () => async (ctx, next) => {
  console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`)
  try {
    await next()
  } catch (err) {
    console.log(err.status)
  }
  // console.log(ctx.status)
  // next().catch(err => {
  //   console.log(err.status)
  // })
}

export default response