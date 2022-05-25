const mongoose=require('mongoose')

const nftschema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    nftImage:{type:String},
    nftCollection:[{type:mongoose.Schema.Types.ObjectId,ref:'collection'}],
    status:{type:Boolean},
    price:{type:Number},
    isSold:{type:Boolean},
    saleType: {
        type: String,
        enum : ['buy','bid'],
        default:'buy'
    }

})
const nft=mongoose.model('nft',nftschema)
module.exports=nft