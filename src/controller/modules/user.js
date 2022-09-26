import { genToken, expiresIn, verifyToken } from '../../middleware/jwt.js'

/**
 * @apiDefine User 用户
 */

/**
* @api {POST} /api/register 用户注册
* @apiName 用户注册
* @apiVersion 0.1.0
* @apiGroup User
*
* @apiBody {String} username 用户名
* @apiBody {String} password 用户密码(前端MD5)
* @apiBody {String} email 用户邮箱
* @apiParamExample {json} body 示例
* {
*   "username": "username",
*   "password": "passwordMD5",
*   "email": "user@example.com"
* }
*
* @apiSuccess {Boolean} success 请求是否成功 true | false
* @apiSuccess {String} message 请求附带信息 “请求成功”
* @apiSuccess {Number} code 请求返回状态码 200
* @apiSuccess {Object} data 返回的数据
* @apiSuccessExample {json} 成功的返回
* {
*  "success": true,
*  "data": null,
*   "code": 200,
*   "message": "注册成功"
* }
* @apiErrorExample {json} 失败的返回
* {
*  "success": false,
*  "data": null,
*   "code": 400,
*   "message": "注册失败"
* }
*/

const register = async (ctx, next) => {

}

/**
* @api {POST} /api/login 用户登录
* @apiName 用户登录
* @apiVersion 0.1.0
* @apiGroup User
*
* @apiBody {String} username 用户名
* @apiBody {String} password 用户密码(前端MD5)
* @apiParamExample {json} body 示例
* {
*   "username": "username",
*   "password": "passwordMD5",
* }
*
* @apiSuccess {Boolean} success 请求是否成功 true | false
* @apiSuccess {String} message 请求附带信息 “请求成功”
* @apiSuccess {Number} code 请求返回状态码 200
* @apiSuccess {Object} data 返回的数据
* @apiSuccess {String} data.token 用户 token
* @apiSuccess {Number} data.createdAt 创建时间 timestamp
* @apiSuccess {Number} data.expiresIn 有效期
* @apiSuccessExample {json} 成功的返回
* {
*  "success": true,
*  "data": {
*     "token": "userToken",
*     "createdAt": 1664181232228
*     "expiresIn": 7200
*   },
*   "code": 200,
*   "message": "登录成功"
* }
* @apiErrorExample {json} 失败的返回
* {
*  "success": false,
*  "data": null,
*   "code": 400,
*   "message": "请求失败"
* }
*/

const login = async (ctx, next) => {
  // 检查 body
  // console.log(ctx.request.body)

  const token = genToken(ctx.request.body)
  if (token) {
    ctx.response.body = {
      success: true,
      code: 200,
      message: '登录成功',
      data: {
        token,
        expiresIn,
        createdAt: new Date().getTime()
      }
    }
  }

  await next()
}

const checkToken = async (ctx, next) => {
  console.log(ctx.request.headers.authorization)
  console.log(verifyToken(ctx.request.headers.authorization.split(' ')[1]))
}


export default {
  'POST /api/register': register,
  'POST /api/login': login,
}