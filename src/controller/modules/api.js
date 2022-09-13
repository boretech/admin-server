import { APIError } from "../../rest.js"
import { genToken } from "../../jwt/index.js"

const getToken = async (ctx, next) => {
  const token = genToken(ctx.request.body.userInfo)
  // ctx.set("Authorization", `Bearer ${token}`)
  ctx.rest({ token })

  await next()
  // try {

  //   return next()
  // } catch (err) {
  //   return APIError('401', 'request token not valid')
  // }
}

const checkToken = async (ctx, next) => {

}

const test_api = async (ctx, next) => {
  ctx.rest({
    testData: 'test ok!'
  })
}

const post_api = async (ctx, next) => {
  ctx.rest(ctx.request.body)
}

const add_user = async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.rest({ msg: '添加成功', user: ctx.request.body })
}

export default {
  'GET /api/test_api': test_api,
  'POST /api/post_api': post_api,
  'POST /api/add_user': add_user,
  'POST /api/getToken': getToken,
}
