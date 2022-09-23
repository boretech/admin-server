
/**
 * @apiDefine Public 公共接口(无授权)
 */

/**
* @api {GET} /api/getTest 测试简单 GET 请求
* @apiName 测试 GET
* @apiGroup Public
*
* @apiSuccess {Boolean} success 请求状态 
* @apiSuccess {String} token 返回的当前用户 token
*/

const getTest = async (ctx, next) => {
  try {
    ctx.response.body = {
      testData: 'test ok!'
    }
    await next()
  } catch (err) {
    throw new Error(err)
  }
}

/**
* @api {POST} /api/login 测试 token
* @apiName 测试 token
* @apiGroup Public
*
* @apiSuccess {Boolean} success 请求状态 
* @apiSuccess {String} token 返回的当前用户 token
*/

const login = async (ctx, next) => {
  try {

  } catch (err) {
    throw new Error(err)
  }
}

export default {
  'GET /api/getTest': getTest,
  'POST /api/login': login
}