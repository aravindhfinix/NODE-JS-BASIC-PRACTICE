const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    user:{type:String,required:true},
    age:{type:Number},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    password:{type:Number,required:true}
})
const model=mongoose.model('usertask',schema)

module.exports= model