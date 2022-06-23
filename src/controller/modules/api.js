import { APIError } from "../../rest.js"

const test_api = async (ctx, next) => {
  ctx.rest({
    testData: 'test ok!'
  })
}

const post_api = async (ctx, next) => {
  ctx.rest({
    body: ctx.request.body
  })
}

export default {
  'GET /api/test_api': test_api,
  'POST /api/post_api': post_api
}