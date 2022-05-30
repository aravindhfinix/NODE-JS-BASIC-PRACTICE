const express=require('express')
const nftschema=require('../models/nftschema')
const bidschema=require('../models/bidschema')
const userschema=require('../models/userschema')
const nft = require('../models/nftschema')


exports.auction=async(req,res)=>{
   const body= await nftschema.findOne(req.params.id)
    await bidschema.create(
        {
            name:data.name,
            description:data.description,
            nftImage:data.nftImage,
            nftCollection:Data.nftCollection,
            status:req.body.status,
            price:req.body.price||data.price,
            startingtime:req.body.startingtime,
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

await bidschema.find()

    .then(result=>{
        console.log(result);
        res.send(result)
    })
    .catch(err=>{console.log(err.message)
        res.send(err.message)})
}


exports.buy=async(req,res)=>{

    await bidschema.find()
    .then(result=>{
        console.log(result);
        res.send(result)
    })
    .catch(err=>{console.log(err.message)
        res.send(err.message)})
}

exports.transfer=async(req,res)=>{
    await bidschema.find()
    .then(result=>{
        console.log(result);
        res.send(result)
    })
    .catch(err=>{console.log(err.message)
        res.send(err.message)})


}