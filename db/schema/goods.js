const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型

//创建我们的用户Schema
const goodsSchema = new Schema({
  goodsId: ObjectId,
  goods_name: { // 商品名
    type: String, 
    unique: true, 
    required: true, 
  },
  goods_price: { // 价格
    type: Number,
    required: true, 
  },
  goods_img: { // 商品图片地址
    type: String, 
  },
  goods_info: { // 商品描述
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
})

//发布模型
let goodsModel = mongoose.model('goods', goodsSchema)
module.exports = goodsModel