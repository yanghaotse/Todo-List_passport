const Todo = require('../todo') //載入todo model
const db = require('../../config/mongoose')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')


if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const SEEDER_USER = {
  name: 'root',
  email: 'root@example.com',
  password:'12345678'
}

// 修改種子資料寫入
db.once('open', async() => {
  bcrypt
   .genSalt(10)
   .then( salt => bcrypt.hash(SEEDER_USER.password, salt))
   .then( hash => User.create({
      name: SEEDER_USER.name,
      email: SEEDER_USER.email,
      password: hash
   }))
   .then( user => {
      const userId = user._id
      return Promise.all(Array.from({length: 10}, (_, i) =>
        Todo.create({name:`name-${[i]}`, userId})
      ))
   })
   .then(() => {
      console.log('done.')
      process.exit()// process.exit(): dotenv語法->關閉這段 Node 執行程序
   })   
})

// 種子資料寫入(方法二)->測試成功
// db.once('open', async() => {
//   bcrypt
//   .genSalt(10)
//   .then( salt => bcrypt.hash(SEEDER_USER.password, salt))
//   .then( hash => User.create({
//     name: SEEDER_USER.name,
//     email: SEEDER_USER.email,
//     password: hash
//   }))
//   .then( async(user) => {
//     const userId = user._id
//     try{
//       for(let i = 0; i < 10; i++){
//         await Todo.create({name : `name-${i}`, userId})
//       }
//     }catch(error){
//       console.log(error)
//     }finally{
//       db.close()
//     }
//   })
//   .then( () => console.log('done.'))
//   .catch(err => console.log(err))
// })

