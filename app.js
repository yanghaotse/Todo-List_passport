const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')//引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案
require('./config/mongoose')
const session = require('express-session')
const usePassport = require('./config/passport')// !! 載入設定檔，要寫在express-session 以後


const PORT = process.env.PORT || 3000
const app = express()


app.engine('hbs', exphbs({defaultLayout : 'main', extname : '.hbs'}))//在應用程式裡新增了一個叫 hbs 的樣板引擎
// {extname: '.hbs'}，是指定副檔名為 .hbs
app.set('view engine', 'hbs')//hbs元件 正式掛載
app.use(express.urlencoded({ extended: true}))//body-parser
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false, 
  //resave: 當設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
  saveUninitialized: true
  //saveUninitialized: 強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
}))

usePassport(app)// !! 呼叫 Passport 函式並傳入 app，這條要寫在路由之前

// 使用 app.use 代表這組 middleware 會作用於所有的路由
app.use((req, res, next) => {
  console.log(req.user) //檢查用
  // req.user 是在反序列化的時候，取出的 user 資訊，之後會放在 req.user 裡以供後續使用
  // 把 req.isAuthenticated() 回傳的布林值，交接給 res 使用

  res.locals.isAuthenticated = req.isAuthenticated() //為何這邊的isAuthenticated()不用require?因為有require('passport.js')?
  //res.locals 是 Express.js 幫我們開的一條捷徑，放在 res.locals 裡的資料，所有的 view 都可以存取。
  res.locals.user = req.user //把使用者資料交接給 res 使用
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`express is running on http://localhost:${PORT}` )
})




