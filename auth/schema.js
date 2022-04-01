const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
        
    },
    name:{type:String},
    mobile:{type:Number},
    password:{
        type:String,
        required:true,
        minlength:6
    },
});
 
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
const Schema=mongoose.model('news',userSchema )
module.exports=Schema;
