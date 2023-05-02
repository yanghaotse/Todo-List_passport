const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport') // 引用 passport

router.get('/login',(req, res) => {
  res.render('login')
})

// route post : login ->加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register',(req, res) => {
  res.render('register')
})

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



module.exports = router