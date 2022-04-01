const { type } = require('express/lib/response')
const mongoose=require('mongoose')
const department=require('./model/department')

const employeSchema=new mongoose.Schema({
    employe:{type:String},
    number:Number,
    email:String,
    department:{type:this.schema.Types.ObjectId,ref:'department'}
})
const employe=mongoose.model('employees',employeSchema)
module.exports=employe

