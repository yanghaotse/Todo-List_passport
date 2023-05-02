// 載入localStrategy模組
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')



module.exports = (app) => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {  //LocalStrategy({ usernameField: 'email'} 驗證項目設定為email
    User.findOne({ email }).then(user => {
      if(!user){
        return done(null,false,{ message: 'That email es not registered!'})
      }
      if(user.password !== password){
        return done(null, false, {message: 'Email or Password incorrect.'})
      }
      return done(null, user)
    })
    .catch(error => console.log(error))
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id,done) => {
    User.findById(id)
    .lean()
    .then( user => done(null, user)) //這邊取出的user資訊之後會放入req.user供後續使用
    .catch( error => done (error, null))
  })
}