const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型

//创建我们的用户Schema
const userSchema = new Schema({
  UserId: ObjectId,
  user_account: {
    type: String, // 限制类型
    unique: true, // 限制唯一性
    required: true, // 限制必填
  },
  user_password: {
    type: String,
    required: true,
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
let usersModel = mongoose.model('users', userSchema)
module.exports = usersModel