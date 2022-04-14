const express=require('express')
const app=express();
const movieSchema=require('../models/movieschema');
const theater = require('../models/theaterschema');
app.use(express.json())
app.use(express.urlencoded({extended:true}))


exports.create=async(req,res)=>{
    await movieSchema.create({
        name:req.body.name,
        language:req.body.language,
        theaters:await theater.findOne({name:req.body.theaters})
    })
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}
exports.update=async(req,res)=>{
    const id = req.params.id
    await userschema.findOneAndUpdate({id:id},{$set:req.body} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}