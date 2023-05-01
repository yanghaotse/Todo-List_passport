const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  email: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  password: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  createAt: {
    type: Date,
    default: Date.now
    // Date.now() v.s. Date.now
    // 沒加括號時，代表你傳入的是函式本身，而加了括號的話，代表你直接呼叫了這個函式，並傳入函式的回傳值。
    // Date.now(): 「伺服器建立並運作起來時」就被執行，並且當專案啟動的時間戳記儲存在 createdAt 中。
    // Date.now: 伺服器將註冊資料送給資料庫時」，執行 Date.now 並產生當下的時間戳記。
  }
})
module.exports = mongoose.model('User', userSchema)