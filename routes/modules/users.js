const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport') // 引用 passport
const bcrypt = require('bcryptjs')

router.get('/login',(req, res) => {
  res.render('login')
})


// route post-login: 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', { // passport.authenticate('<strategyName>')--> 用passport.js定義好的策略'local'
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
// route-POST login(寫法2): 登入後可以得到 req.user 這個物件
// router.post('/login', passport.authenticate('local', (req, res) =>{ 
//   // 如果這個 function 有執行，表示通過驗證
//   res.redirect(`users/${req.user.username}`) 
//   //在預設的情況下，如果認證失敗，Passport 會回傳 401 Unauthorized 的狀態，後續的路由都不會在被處理；
// }))


//route-GET register
router.get('/register',(req, res) => {
  res.render('register')
})


//route-POST register
router.post('/register',(req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  // 由於 errors 是一組陣列，需要在 views/partials/message.hbs 中增加一段邏輯{{#each}}，使用迴圈來印出訊息
  if(!name || !email || !password || !confirmPassword){
    errors.push({ message: '所有欄位都是必填。'})
  }
  if (password !== confirmPassword){
    errors.push({ message: '密碼與確認密碼不相符!'})
  }
  if (errors.length){
    return res.render('register', {errors, name, email, password, confirmPassword})
  }
  User.findOne({ email }).then((user) => {
    if(user){
      errors.push({ message: '這個Email已經註冊過了。'})
      return res.render('register', {errors, name, email, password, confirmPassword})
    }
    return bcrypt
      .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
      .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
      .then(hash => User.create({
        name,
        email,
        password: hash // 用雜湊值取代原本的使用者密碼

      }))
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })
  .catch(error => console.log(error))
})

//route-GET logout
router.get('/logout', (req, res) => {
  req.logout() //logout() 為Passport.js 提供的函式
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})



module.exports = router