const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: { //加入關聯設定: 用這個屬性來連結 User 的唯一值 _id
    type: Schema.Types.ObjectId, // ObjectId 為mongoDB預設給的_id
    ref: 'User',
    index: true, //把 userId 設定成「索引」
    required: true
  }
  // type：定義 userId 這個項目是一個 ObjectId，也就是它會連向另一個資料物件
  // ref：定義參考對象是 User model
})
module.exports = mongoose.model('Todo', todoSchema)