const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

// 定义数据库名
const DB_NAME = 'shop'
// 定义数据库地址
const DB_URL = 'localhost:27017'
// 定义数据库连接次数
let maxConnectTimes = 0 

// 连接数据库
module.exports = new Promise((resolve, reject) => {
  // 连接数据库
  mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`)
  // 监听连接状态
  mongoose.connection.on('open', err => {
    if (!err) {
      resolve()
      console.log('数据库连接成功')
    } else {
      console.log(err)
      reject(err)
    }
  })
  //增加数据库监听事件
  mongoose.connection.on('disconnected', () => {
    console.log('***********数据库断开***********')
    if (maxConnectTimes < 3) {
      maxConnectTimes++
      mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`)
    } else {
      reject()
      throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
    }
  })
  mongoose.connection.on('error', err => {
    console.log('***********数据库错误***********')
    if (maxConnectTimes < 3) {
      maxConnectTimes++
      mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`)
    } else {
      reject(err)
      throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
    }
  })
  //链接打开的时
  mongoose.connection.once('open', () => {
    resolve()
  })
})
