/**
 * @apiDefine Public 公共接口(无授权)
 */

/**
* @api {GET} /api/testGet 测试简单 GET 请求
* @apiName 测试 GET
* @apiVersion 0.1.0
* @apiGroup Public
*
* @apiSuccess {Boolean} success 请求是否成功 true | false
* @apiSuccess {String} message 请求附带信息 “请求成功”
* @apiSuccess {Number} code 请求返回状态码 200
* @apiSuccess {Object} data 返回的数据
* @apiSuccessExample {json} 成功的返回
* {
*  "success": true,
*  "data": {
*     "test": "测试数据成功"
*   },
*   "code": 200,
*   "message": "请求成功"
* }
* @apiErrorExample {json} 失败的返回
* {
*  "success": false,
*  "data": null,
*   "code": 400,
*   "message": "请求失败"
* }
*/

const testGet = async (ctx, next) => {
  ctx.response.body = {
    success: true,
    data: {
      test: '测试数据成功'
    },
    code: 200,
    message: '请求成功'
  }
  await next()
}

/**
* @api {POST} /api/testPost 测试简单 POST 请求
* @apiName 测试 POST
* @apiVersion 0.1.0
* @apiGroup Public
*
* @apiBody {any} test 任意数据类型
* @apiParamExample {json} body 示例
* {
*   "test": "test request body data"
* }
*
* @apiSuccess {Boolean} success 请求是否成功 true | false
* @apiSuccess {String} message 请求附带信息 “请求成功”
* @apiSuccess {Number} code 请求返回状态码 200
* @apiSuccess {Object} data 返回的数据
* @apiSuccessExample {json} 成功的返回
* {
*  "success": true,
*  "data": {
*     "requestBody": request.body
*   },
*   "code": 200,
*   "message": "请求成功"
* }
* @apiErrorExample {json} 失败的返回
* {
*  "success": false,
*  "data": null,
*   "code": 400,
*   "message": "请求失败"
* }
*/

const testPost = async (ctx, next) => {
  ctx.response.body = {
    success: true,
    data: {
      requestBody: ctx.request.body
    },
    code: 200,
    message: '请求成功'
  }
  await next()
}

export default {
  'GET /api/testGet': testGet,
  'POST /api/testPost': testPost,
}