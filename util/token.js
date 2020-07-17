// 单独的创建一个中间件，然后在app.js中注册使用
const jwt = require('jsonwebtoken')
const token_secret = require('../config/config')

async function check(ctx, next) {
  let url = ctx.url.split('?')[0]
  // 如果是登陆页面和注册页面就不需要验证token了
  if (url === '/user/login' || url === '/user/register') {
    await next()
  } else {
    // 否则获取到token
    let token = ctx.request.headers["x-token"]
    if (token) {
      try {
        jwt.verify(token, token_secret, {
          complete: true
        });
        await next();
      } catch (error) {
        ctx.body = {
          status: 405,
          message: 'token已过期，请重新登陆'
        }
      }
    }else {
      ctx.body = {
        status: 401,
        message: '没有token'
      }
    }
  }
}
module.exports = check
