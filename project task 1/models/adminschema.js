const mongoose=require('mongoose')

const adminschema=mongoose.Schema({
    name:{type:String,required:true},
    creatorName:{type:String,required:true},
    collectionImage:{type:String},
    status:{type:String,default:"pending"},

})
const admin=mongoose.model('admin',adminschema)
module.exports=admin