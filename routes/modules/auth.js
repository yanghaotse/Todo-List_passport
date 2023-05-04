const express = require('express')
const router = express.Router()
const passport = require('passport')

// 使用者要求使用 Facebook 帳號登入的按鈕
router.get('/facebook', passport.authenticate('facebook', {scope:['email','public_profile']})); // scope: 是我們向 Facebook 要求的資料
// Facebook 獲得使用者同意之後，將使用者資料發送給 Express 的位址
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router