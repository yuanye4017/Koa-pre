const Koa = require('koa'); // koa
const Router = require('koa-router') // koa路由
const bodyParser = require('koa-bodyparser') // 解析参数
const static = require('koa-static') // 静态资源
const swagger = require('./util/swagger')
const koaSwagger = require('koa2-swagger-ui')

// 自定义中间件
// app.js中注册使用
const checkToken = require('./util/token')
const db = require('./db/index');
const users = require('./appApi/users')  // 有关user的接口
const goods = require('./appApi/goods') // 有关商品的接口
// app 
const app = new Koa();
const router = new Router(); // 使用Router

app.use(bodyParser()); // 接受参数
app.use(static(__dirname + "/public"))
app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger({
  routePrefix: '/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
  }
}))
app.use(checkToken) // 验证token的中间件函数

db.then(() => {
  router.use('/user',users);
  router.use('/goods',goods);
})
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('服务开启成功')
})