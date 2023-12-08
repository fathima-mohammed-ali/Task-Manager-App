const mongoose = require('mongoose')
const schema = mongoose.Schema
const taskSchema = new schema({
  name:{type:String},
  description:{type:String},
  status:{type:String},
})
const taskModel = mongoose.model('task_tb', taskSchema)
module.exports = taskModel