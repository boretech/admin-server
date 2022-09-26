import { genToken } from "../jwt/index.js"
import { expiresIn } from '../jwt/config.js'

/**
 * @apiDefine Author 鉴权
 */

/**
 * @apiDefine Test 测试
 */

/**
* @api {POST} /api/getToken 获取用户 token
* @apiName 获取用户 token
* @apiGroup Author
*
* @apiParam {Object} userInfo 用户信息 {name: string, email: string, password: string}
*
* @apiSuccess {Boolean} success 请求状态 [true|false]
* @apiSuccess {String} token 返回的当前用户 token
* @apiSuccess {String} msg 请求信息
* @apiSuccessExample {json} 请求成功
* {
*   success: true,
*   token: '<Token String>',
*   msg: '请求成功'
* }
* @apiSuccessExample {json} 请求失败
* {
*   success: false,
*   msg: '请求失败'
* }
*/

const getToken = async (ctx, next) => {
  // ctx.response.status = 400;
  throw new Error({
    status: 400
  })
  console.log(ctx.request.body)
  const token = genToken(ctx.request.body)
  // ctx.set("Authorization", `Bearer ${token}`)
  ctx.rest({
    code: 200,
    success: true,
    data: { token, createdAt: new Date().getTime(), expiresIn },
    msg: '请求成功'
  })

  await next()
  // try {

  //   return next()
  // } catch (err) {
  //   return APIError('401', 'request token not valid')
  // }
}

const checkToken = async (ctx, next) => {

}

/**
* @api {GET} /api/test_api 测试 token
* @apiName 测试 token
* @apiGroup Test
*
* @apiSuccess {Boolean} success 请求状态 
* @apiSuccess {String} token 返回的当前用户 token
*/

const test_api = async (ctx, next) => {
  // ctx.rest({
  //   testData: 'test ok!'
  // })
  ctx.response.body = {
    testData: 'test ok!'
  }
  await next()
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
