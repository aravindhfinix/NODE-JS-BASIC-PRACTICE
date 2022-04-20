const mongoose=require('mongoose')
const theater = require('./theaterschema')


const seatschema=mongoose.Schema({
    seatnumber:{type:Number},
    status:{type:String},
    screen:{type:Number},
    time:{type:String,Number},
    movie:{type:mongoose.Schema.Types.ObjectId,ref:'movies'}
})

const seats=mongoose.model('seats',seatschema)
module.exports=theater

