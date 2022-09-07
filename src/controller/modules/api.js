import { APIError } from "../../rest.js"

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
}