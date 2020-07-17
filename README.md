## Koa-my
`koa-my`是基于koa搭建的个人服务。

> 在使用`swagger`的时候，由于设置了全局的`token`拦截，所以请求失败。 可以暂时先将`token`拦截去除。

```js
  const checkToken = require('./util/token')
  app.use(checkToken)
```


### 目前 
* 使用`koa-router`路由
* `mongoose`操控`mongodb`数据库
* `koa-static`声明静态文件
* 使用了`jwt`生成令牌`token`,解析`token`，为`token`增加过期时间；
* 使用`bcryptjs`为登陆密码加密；
* 全局的`token`拦截，除登陆，注册外请求头必须携带`token`
* `@koa/multer`解析formdata格式
* `swagger`文档的接入

### 后期
* 即时通讯 `sock-io` 的接入
* 更多接口开发


## 使用
> 由于项目使用了`mongodb`,所以务必一开始将`mongodb`挂起

```js
// data/db是本地的文件路径 ，需要将数据储存在此处
monogd --dbpath data/db 
```
```js
// clone
git clone https://github.com/yuanye4017/Koa-my.git

// cd
cd Koa-my

// start
node index

// 查看swagger
http://localhost:3000/swagger
```

## jwt生成token令牌
登陆验证成功以后， 可以利用登陆人的账号加上自己定义的特色字符生成`token`;
```js
  const jwt = require('jsonwebtoken');
  router.post('/login', async (ctx) => {
    var data = qs.parse(ctx.request.body);
    let token = jwt.sign(
      { user: data.user_account }, 
      '@#$%^@#$%^', 
      { expiresIn: '1 day' }
    );
  }
```

## jwt解析token令牌
```js
  router.get('/getUserInfo', async (ctx) => {
    var token = ctx.cookies.get('X-token');
    var user_account = jwt.verify(token,'@#$%^@#$%^');
  }
```

## token的全局拦截
很多时候我们需要将登陆以外的接口验证请求头是否携带token,这里给出的方案是自己写一个token的中间件。
```js
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
module.exports = checks
```
