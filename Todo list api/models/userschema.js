const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true    
    },
    name:{type:String},
    password:{
        type:String,
        required:true,
        minlength:6
    },
    confirmpassword:{
        type:String,
        required:true,
        minlength:6
    },
    otp:{type:Number},
});

const userschema=mongoose.model('users',userSchema )
module.exports=userschema;