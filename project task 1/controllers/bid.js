const express=require('express')
const nftschema=require('../models/nftschema')
const bidschema=require('../models/bidschema')
const collectionschema=require('../models/collectionschema')
const userschema=require('../models/userschema')


exports.auction=async(req,res)=>{
   const data= await nftschema.findOne({_id:req.params.id})
    await bidschema.create(
        {
            name:data.name,
            description:data.description,
            nftImage:data.nftImage,
            nftCollection:data.nftCollection,
            status:true,
            price:req.body.price||data.price,
            startingtime:req.body.startingtime,
            issold:false,
            endingtime:req.body.endingtime
        }
    )
    .then(result=>{
        console.log(result);
        res.send(result)
    })
    .catch(err=>{console.log(err.message)
        res.send(err.message)})

}

exports.biding=async(req,res)=>{
const data=await userschema.findById({_id:req.params.id1})
const data1=await bidschema.find(req.params.id)
const data3=await collectionschema.find({owner:req.body.id1})
if(data1.bidingtime===data1.endingtime){
const data2=await bidschema.findByIdAndUpdate({_id:req.params.id},{issold:true})
if(data2.issold===true){
await nftschema.create(
    {
    name:req.body.name,
    description:data1.name,
    nftImage:data1.nftImage,
    nftCollection:data3,
    status:true,
    price:data1.price
    }
)
}
}
else{
if(data1.startingtime>=req.body.bidingtime){
if(data1.endingtime<req.body.bidingtime){
if(data1.price<req.body.price){
await bidschema.updateOne({biders:data},{price:req.body.price})


    .then(result=>{
        console.log(result);
        res.send(result)
    })
    .catch(err=>{console.log(err.message)
        res.send(err.message)})
    }
    else{
        res.send('invalid bid amound')
        .catch(err=>{console.log(err.message)
            res.send(err.message)})
    }
}else{
    res.send('bid has ended')
    .catch(err=>{console.log(err.message)
        res.send(err.message)})
}
  
}else{
    res.send('bid has not started')
    .catch(err=>{console.log(err.message)
        res.send(err.message)})
}
}}


