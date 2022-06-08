const mongoose=require('mongoose')

const todoschema=mongoose.Schema({
    username:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    taskname:{type:String},
    taskdetailes:{type:String},
    tasktiming:{type:Date},
    taskedited:{type:Date},
    status:{type:Boolean,default:false},
    comment:{type:String}

}) 
const todo=mongoose.model('task_list',todoschema)
module.exports=todo