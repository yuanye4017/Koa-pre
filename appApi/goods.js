const Router = require('koa-router') // router
const qs = require('qs') // 解析body
const multer = require('@koa/multer'); // 解析文件
const fs = require('fs')
const path = require('path')

const router = new Router()
var upload = multer()
// 数据库
const goodsModel = require('../db/schema/goods')
let time = new Date().getTime()
router.post('/addGoods', upload.single('file'),async (ctx) => { // 添加商品
  let file = ctx.request.file;
  let data = ctx.request.body;
  // 查看数据是否重复
  const result = await goodsModel.find({ goods_name: data.goods_name })
  if(result.length <= 0) {
    fs.writeFile(path.resolve(__dirname,`../public/image/${time}.png`), file.buffer, async (err) => {
      let url = `127.0.0.1:3000/image/${time}.png`;
      const result = await goodsModel.create({
        ...data,
        goods_img: url
      })
      if(result) {
        ctx.body = { 
          status: 200, 
          success: false, 
          message: '商品添加成功！'
        }
      }else {
        ctx.body = { 
          status: 100, 
          success: false, 
          message: '商品添加失败！'
        }
      }
    })
  }else {
    ctx.body = { 
      status: 100, 
      success: false, 
      message: '商品已存在,不能重复添加！'
    }
  }
})
router.post('/getGoodsList', async (ctx) => { // 添加商品
  const result = await goodsModel.find({})
  ctx.body = { 
    status: 200, 
    success: true,
    message: '商品列表获取成功',
    data: result
  };
})

router.post('/update', upload.single('file'), async (ctx) => { // 添加商品
  let file = ctx.request.file;
  let data = ctx.request.body;
})


module.exports = router.routes();