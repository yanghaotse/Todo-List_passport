//mongoose refactor: 有重複的程式碼皆可刪除

// const mongoose = require('mongoose')
const Todo = require('../todo') //載入todo model
// if (process.env.NODE_ENV !== 'production'){
//   require('dotenv').config()
// }

const db = require('../../config/mongoose')

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// const db = mongoose.connection
// db.on('error', () => {
//   console.log("mongodb error!")
// })
db.once('open', async() => {
  console.log('mongodb connected')
  try{
    for(let i = 0; i < 10; i++){
      await Todo.create({name : `name-${i}`})
    }
    console.log('done.')
  }catch(error) { 
    console.log(error)
  }finally{
    db.close()
  }
})