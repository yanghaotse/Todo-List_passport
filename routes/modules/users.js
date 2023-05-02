const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport') // 引用 passport

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
  const {name, email, password, confirmPassword} = req.body
  User.findOne({ email }).then((user) => {
    if(user){
      console.log('User already exist')
      res.render('register', {name, email, password, confirmPassword})
    }else{
      return User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(error))
})

//route-GET logout
router.get('/logout', (req, res) => {
  req.logout() //logout() 為Passport.js 提供的函式
  res.redirect('/users/login')
})



module.exports = router