const mongoose=require('mongoose');

const todoschema=new mongoose.Schema({
    user:{type:String,required:true},
    time : { type: Number, default: (new Date()).getTime() },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    },
    password:{type:Number,required:true}
})
const model=mongoose.model('userslist',todoschema)

module.exports= model