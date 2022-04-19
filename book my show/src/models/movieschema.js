const mongoose=require('mongoose')

const movieschema=mongoose.Schema({
    name:{type:String,required:true},
    language:{type:String,required:true},
    theaters:{type:mongoose.Schema.Types.ObjectId,ref:'theater'},
    screen1:{type:String,Number},
    screen2:{type:String,Number},
    screen3:{type:String,Number}
})
const movies=mongoose.model('movies',movieschema)
module.exports=movies