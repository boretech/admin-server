import { genToken, expiresIn, verifyToken } from '../../middleware/jwt.js'
import prisma from '../../lib/prisma.js'
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
  const { username, password, email } = ctx.request.body
  const existUser = await prisma.User.findFirst({
    where: {
      OR: [
        { username },
        { email }
      ]
    }
  })
  if (existUser) {
    ctx.response.body = {
      success: false,
      code: 200,
      message: `${existUser.username === username ? '用户名' : '邮箱'}已注册`,
      data: null
    }
  } else {
    const createdUser = await prisma.User.create({
      data: {
        username,
        password,
        email
      }
    })
    ctx.response.body = {
      success: true,
      data: {
        id: createdUser.id
      },
      code: 200,
      message: "注册成功"
    }
  }
  await next()
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
  const { username, password } = ctx.request.body
  // console.log(username)
  const existUser = await prisma.User.findFirst({
    where: {
      username
    }
  })

  if (existUser) {
    if (existUser.password === password) {
      const token = genToken(existUser)
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
    } else {
      ctx.response.body = {
        success: false,
        code: 200,
        message: '登录密码不正确',
        data: null
      }
    }
  } else {
    ctx.response.body = {
      success: false,
      code: 200,
      message: '该用户未注册',
      data: null
    }
  }
  await next()
}

/**
* @api {GET} /api/getUserInfo 获取用户信息
* @apiName 获取用户信息
* @apiVersion 0.1.0
* @apiGroup User
*
* @apiHeader {String} Authorization 以 Bearer 开始的用户 token
*
* @apiSuccess {Boolean} success 请求是否成功 true | false
* @apiSuccess {String} message 请求附带信息 “请求成功”
* @apiSuccess {Number} code 请求返回状态码 200
* @apiSuccess {Object} data 返回的数据
* @apiSuccess {String} data.uid 用户 id
* @apiSuccess {Number} data.email 用户邮箱
* @apiSuccess {Number} data.username 用户名
* @apiSuccessExample {json} 成功的返回
* {
*  "success": true,
*  "data": {
*     "uid": 1,
*     "email": "sample@example.com",
*     "username": "username"
*   },
*   "code": 200,
*   "message": "请求成功"
* }
* @apiErrorExample {json} 失败的返回
* {
*  "success": false,
*  "data": null,
*   "code": 401,
*   "message": "未获取到用户信息"
* }
*/

const getUserInfo = async (ctx, next) => {
  const userInfo = verifyToken(ctx)
  // console.log(userInfo)
  const { password, iat, exp, ...info } = userInfo
  ctx.response.body = info
  await next()
}

export default {
  'POST /api/register': register,
  'POST /api/login': login,
  'GET /api/getUserInfo': getUserInfo,
}