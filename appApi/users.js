const Router = require('koa-router') // router
const bcrypt = require('bcryptjs') // 密码加密解密
const jsonwebtoken = require('jsonwebtoken') // 生成token令牌
const qs = require('qs') // 解析body

const router = new Router()
const tools = require('../util/tools') // 加密
const token_secret = require('../config/config') // 定义的secret
// 数据库
const userModel = require('../db/schema/users')

router.post('/register', async (ctx) => { // 注册
  // 解析参数
  let data = qs.parse(ctx.request.body)
  // 查看数据是否重复
  const result = await userModel.find({ user_account: data.user_account })
  if (result.length <= 0) {// 没有找到,可以注册
    // 给密码加密
    data.user_password = tools.enbcrypt(data.user_password)
    // 生成token
    let token = jsonwebtoken.sign({ user: data.user_account }, token_secret, { expiresIn: '1 day' })
    ctx.cookies.set('vue_admin_token', token);
    // 储存用户信息到数据库
    const result = await userModel.create(data)
    if (result) {
      ctx.body = { 
        status: 200, 
        success: true,
        data: {
          token: token ,
          message: '注册成功'
        } 
      };
    } else {
      ctx.body = { 
        status: 100, 
        success: false,
        message: '注册失败'
      };
    }
  } else { // 已存在可以直接登录
    ctx.body = { 
      status: 100, 
      success: false, 
      message: '账号已存在' 
    }
  }
})

router.post('/login', async (ctx) => {
  var data = qs.parse(ctx.request.body);
  const result = await userModel.find({user_account: data.user_account})
  if(result.length <= 0) { // 账号不存在
    ctx.body = {
      status: 100,
      success: false,
      message: '请先注册',
    }
  }else {
    // 验证密码的一致性
    let www = await bcrypt.compareSync(data.user_password, result[0].user_password);
    if (www) { // 验证通过 生成token
      let token = jsonwebtoken.sign({ user: data.user_account }, token_secret, { expiresIn: '1 day' });
      ctx.cookies.set('vue_admin_token', token);
      ctx.body = { 
        status: 2000,
        success: true, 
        data: {
          token: token
        }
      }
    }else { // 密码错误
      ctx.body = {
        status: 100,
        success: false,
        message: '密码错误',
      }
    }
  }
})

router.get('/getUserInfo', async (ctx) => {
  var token = ctx.cookies.get('vue_admin_token');
  var user_account = jsonwebtoken.verify(token,token_secret);
  const result = userModel.find({user_account: user_account});
  if(result.length > 0) {
    ctx.body = {
      status: 200,
      success: true,
      data: result
    }
  }else {
    ctx.body = {
      status: 100,
      success: false,
      message: '获取失败'
    }
  }
})

module.exports = router.routes();