const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')
const {authenticator} = require('../middleware/auth')



// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 
router.use('/todos', authenticator, todos)

router.use('/users', users)
router.use('/auth', auth)
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', authenticator, home)

module.exports = router