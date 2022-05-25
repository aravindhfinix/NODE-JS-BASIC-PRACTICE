const mongoose=require('mongoose')

const collectionschema=mongoose.Schema({
    name:{type:String,required:true},
    creatorName:{type:String,required:true},
    collectionImage:{type:String},
    status:{type:Boolean},

})
const collection=mongoose.model('collection',collectionschema)
module.exports=collection