// 載入localStrategy模組
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = (app) => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {  //LocalStrategy({ usernameField: 'email'} 驗證項目設定為email
    User.findOne({ email }).then(user => {
      if(!user){
        return done(null,false,{ message: 'That email is not registered!'})
      }
      return bcrypt.compare(password, user.password).then(isMatch => {
        if(!isMatch){
          return done(null, false, {message: 'Email or Password incorrect.'})
        }
        return done(null, user)
      }) 
    })
    .catch(error => console.log(error))
  }))
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName'] //Facebook 上的公開名稱，也許能和 User 的 name 屬性對應起來
  },(accessToken, refreshToken, profile, done) => {
      const {name, email} = profile._json
      User.findOne( {email} )
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(() => done(null, user))
            .catch(err => done(null, false))
        })
    }
  ));
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