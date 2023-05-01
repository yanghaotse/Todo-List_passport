const express = require('express')
// const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
// const Todo = require('./models/todo') //載入Todo model
const bodyParser = require('body-parser')

const methodOverride = require('method-override')
const routes = require('./routes')//引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案
require('./config/mongoose')
const PORT = process.env.PORT || 3000
const app = express()


app.engine('hbs', exphbs({defaultLayout : 'main', extname : '.hbs'}))//在應用程式裡新增了一個叫 hbs 的樣板引擎
// {extname: '.hbs'}，是指定副檔名為 .hbs
app.set('view engine', 'hbs')//hbs元件 正式掛載
app.use(express.urlencoded({ extended: true}))//body-parser
app.use(methodOverride('_method'))



app.use(routes)

app.listen(PORT, () => {
  console.log(`express is running on http://localhost:${PORT}` )
})




