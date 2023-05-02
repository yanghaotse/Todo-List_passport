const express = require('express')
const Todo = require('../../models/todo')
const router = express.Router()


router.get('/', (req,res) =>{
  const userId = req.user._id //mongoDB預設給user的_id
  Todo.find({ userId }) 
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id : 'asc'}) //sort()排序，asc正序/desc反序
    .then(todos => res.render("index", { todos } )) //todos為取完的資料陣列，再將資料傳給index樣板
    .catch(error => console.error(error))
})

module.exports = router