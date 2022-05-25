const mongoose=require('mongoose')

const userschema=mongoose.Schema({
    name:{type:String,required:true},
    walletaddress:{type:String,required:true},
    email:{  type:String,
        required:true,
        unique:true,
        lowercase:true},
    profilephoto:{type:String},
    status:{type:Boolean}
})
const user=mongoose.model('user',userschema)
module.exports=user